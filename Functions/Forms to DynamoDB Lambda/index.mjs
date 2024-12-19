import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';

const dynamo = DynamoDBDocument.from(new DynamoDB());

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function handler(event) {
  try {
    // Check if body is present
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'No data received.' }),
        headers: corsHeaders,
      };
    }

    let body;

    // Check if the body is Base64-encoded (API Gateway does this for binary data or large payloads)
    if (event.isBase64Encoded) {
      // Decode the Base64 body to UTF-8 string
      body = Buffer.from(event.body, 'base64').toString('utf-8');
    } else {
      // If not Base64-encoded, use the body as-is
      body = event.body;
    }

    // Parse the JSON body
    const data = JSON.parse(body);
    const { name, email, message } = data;

    // Validate required fields
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields (name, email, message).' }),
        headers: corsHeaders,
      };
    }

    // Prepare data for DynamoDB insertion
    const timestamp = new Date().toISOString();
    const params = {
      TableName: 'FeedbackTable', // DynamoDB table name
      Item: {
        email,
        timestamp,
        name,
        message,
      },
    };

    // Insert into DynamoDB
    await dynamo.put(params);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Form submitted successfully!' }),
      headers: corsHeaders,
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error.', error: error.message }),
      headers: corsHeaders,
    };
  }
}
