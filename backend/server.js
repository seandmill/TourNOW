import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REGION = 'us-east-1'; 
const client = new DynamoDBClient({ region: REGION });
const docClient = DynamoDBDocumentClient.from(client);

const app = express();
const port = process.env.PORT || 3001; 

app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'] 
}));

app.get('/api/tours', async (req, res) => {
  console.log('Received request for /api/tours'); 
  try {
    const command = new ScanCommand({ TableName: 'tournow_tours_prod' });
    const { Items } = await docClient.send(command);
    console.log(`Successfully fetched ${Items?.length ?? 0} tours`); 
    res.json(Items ?? []);
  } catch (e) {
    console.error('Error fetching tours from DynamoDB:', e);
    res.status(500).json({ error: 'Failed to fetch tours', details: e.message });
  }
});

app.get('/api/users', async (req, res) => {
  console.log('Received request for /api/users'); 
  try {
    const command = new ScanCommand({ TableName: 'tournow_users_prod' });
    const { Items } = await docClient.send(command);
    console.log(`Successfully fetched ${Items?.length ?? 0} users`); 
    res.json(Items ?? []);
  } catch (e) {
    console.error('Error fetching users from DynamoDB:', e);
    res.status(500).json({ error: 'Failed to fetch users', details: e.message });
  }
});

// --- Static File Serving ---
const frontendBuildPath = path.join(__dirname, '../dist');

app.use(express.static(frontendBuildPath));

// Catch-all route using regex to exclude /api paths
app.get(/^(?!\/api).*/, (req, res) => {
  // Log the request path that hits the catch-all
  console.log(`Catch-all route hit for: ${req.path}. Serving index.html`);
  const indexPath = path.join(frontendBuildPath, 'index.html');
  res.sendFile(indexPath, (err) => {
      if (err) {
          console.error(`Error sending index.html: ${err}`);
          res.status(500).send(err);
      }
  });
});
// --- End Static File Serving ---


app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
  console.log(`Serving static files from: ${frontendBuildPath}`); 
});