import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

const AWS_REGION = process.env.VITE_AWS_REGION ?? 'us-east-1';
const AWS_ACCESS_KEY_ID = process.env.VITE_AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.VITE_AWS_SECRET_ACCESS_KEY;
const AWS_SESSION_TOKEN = process.env.VITE_AWS_SESSION_TOKEN;

// DynamoDB client configuration
const clientConfig: any = {
  region: AWS_REGION,
};

// Explicitly set credentials if they exist in environment variables
if (AWS_ACCESS_KEY_ID && AWS_SECRET_ACCESS_KEY) {
  clientConfig.credentials = {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  };
  
  // Add session token if it exists (required for temporary credentials in AWS Academy)
  if (AWS_SESSION_TOKEN) {
    clientConfig.credentials.sessionToken = AWS_SESSION_TOKEN;
  }
}

// Only set endpoint for local development
// In production, the SDK will use the AWS_REGION to determine the endpoint
if (process.env.VITE_AWS_DYNAMODB_ENDPOINT) {
  clientConfig.endpoint = process.env.VITE_AWS_DYNAMODB_ENDPOINT;
}

// Initialize the DynamoDB client
const client = new DynamoDBClient(clientConfig);

// Create a document client from the DynamoDB client
const docClient = DynamoDBDocumentClient.from(client);

/**
 * Function to fetch all tours from DynamoDB
 * Falls back to local JSON data if connection fails
 */
export const fetchTours = async () => {
  try {
    const command = new ScanCommand({
      TableName: 'tournow_tours_prod',
    });
    
    const response = await docClient.send(command);
    return response.Items ?? [];
  } catch (error) {
    console.error('Error fetching tours from DynamoDB:', error);
    // Return mock data for development/testing or when not connected to AWS
    const toursData = await import('../../database/tournow_tours_prod.json');
    return toursData.default;
  }
};

/**
 * Function to fetch all users from DynamoDB
 * Falls back to local JSON data if connection fails
 */
export const fetchUsers = async () => {
  try {
    const command = new ScanCommand({
      TableName: 'tournow_users_prod',
    });
    
    const response = await docClient.send(command);
    return response.Items ?? [];
  } catch (error) {
    console.error('Error fetching users from DynamoDB:', error);
    // Return mock data for development/testing or when not connected to AWS
    const usersData = await import('../../database/tournow_users_prod.json');
    return usersData.default;
  }
};
