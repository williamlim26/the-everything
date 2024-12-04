import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function fetchItems(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id = undefined, shortUrl = undefined } = req.query
  // Fetching AWS credentials and region from environment variables
  const {
    NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    NEXT_PUBLIC_AWS_REGION,
  } = process.env

  // Check if environment variables are present
  if (
    !NEXT_PUBLIC_AWS_ACCESS_KEY_ID ||
    !NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY ||
    !NEXT_PUBLIC_AWS_REGION
  ) {
    throw new Error('Missing AWS environment variables')
  }

  const client = new DynamoDBClient({
    region: NEXT_PUBLIC_AWS_REGION,
    credentials: {
      accessKeyId: NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
      secretAccessKey: NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    },
  })
  const docClient = DynamoDBDocumentClient.from(client);

  const command = new ScanCommand({
    TableName: 'Testing1',
    Limit: 50,
    ExclusiveStartKey:
      typeof id === 'string' ? { Id: id, ShortUrl: shortUrl } : undefined,
  })

  try {
    const response = await docClient.send(command);
    console.log("Successfully fetched items:", response);
    return res.json(response);
  } catch (error) {
    console.error("Error getting items:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}


// Id: 'newDay'
// ShortUrl: 'newDay'
