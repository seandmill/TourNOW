import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

const AWS_REGION = process.env.VITE_AWS_REGION ?? 'us-east-1';
// For local development (DynamoDB Local), optionally set endpoint
const DYNAMODB_ENDPOINT = process.env.VITE_AWS_DYNAMODB_ENDPOINT;

const clientConfig: any = {
  region: AWS_REGION,
};

if (DYNAMODB_ENDPOINT) {
  clientConfig.endpoint = DYNAMODB_ENDPOINT;
}

// Credentials are automatically provided via the EC2 instance role
const client = new DynamoDBClient(clientConfig);
const docClient = DynamoDBDocumentClient.from(client);

/**
 * Fetch all tours from DynamoDB.
 * If the scan fails (e.g., no permissions or offline), fall back to local JSON.
 */
export const fetchTours = async (): Promise<any[]> => {
  try {
    const { Items } = await docClient.send(
      new ScanCommand({ TableName: 'tournow_tours_prod' })
    );
    return Items ?? [];
  } catch (error) {
    console.error('Error fetching tours from DynamoDB:', error);
    const toursData = await import('../../database/tournow_tours_prod.json');
    return toursData.default;
  }
};

/**
 * Fetch all users from DynamoDB.
 * If the scan fails, fall back to local JSON.
 */
export const fetchUsers = async (): Promise<any[]> => {
  try {
    const { Items } = await docClient.send(
      new ScanCommand({ TableName: 'tournow_users_prod' })
    );
    return Items ?? [];
  } catch (error) {
    console.error('Error fetching users from DynamoDB:', error);
    const usersData = await import('../../database/tournow_users_prod.json');
    return usersData.default;
  }
};
