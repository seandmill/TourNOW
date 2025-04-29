import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

// AWS Configuration
const AWS_REGION = 'us-east-1';
const AWS_DYNAMODB_ENDPOINT = 'http://localhost:8000';

// Initialize the DynamoDB client
const client = new DynamoDBClient({
  region: AWS_REGION,
  endpoint: AWS_DYNAMODB_ENDPOINT,
});

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
