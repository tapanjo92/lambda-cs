import { DynamoDB } from 'aws-sdk';
import { Context } from 'aws-lambda';

const ddb = new DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME!;

export async function handler(event: any, context: Context) {
  try {
    const { body } = event;
    let logEvent;
    if (body) {
      logEvent = JSON.parse(body);
    } else {
      logEvent = event; // fallback
    }

    // Store the log event with a timestamp
    await ddb.put({
      TableName: TABLE_NAME,
      Item: {
        tenantId: logEvent.tenantId || 'demo-tenant', // In real use, parse out the actual tenant/account ID
        timestamp: Date.now(),
        event: logEvent,
      },
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: (err as Error).message }),
    };
  }
}
