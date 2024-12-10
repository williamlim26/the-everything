import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, BatchGetCommand } from "@aws-sdk/lib-dynamodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function batchGetItem(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Fetching AWS credentials and region from environment variables
  const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = process.env;

  // Check if environment variables are present
  if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !AWS_REGION) {
    throw new Error("Missing AWS environment variables");
  }

  const client = new DynamoDBClient({
    region: AWS_REGION,
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
  });
  const docClient = DynamoDBDocumentClient.from(client);

  const command = new BatchGetCommand({
    RequestItems: {
      Testing1: {
        Keys: [
          {
            Id: "coolday",
            ShortUrl: "coolday",
          },
        ],
      },
    },
  });

  try {
    const response = await docClient.send(command);
    console.log('Successfully BatchGetCommand items:', response)
    return res.json(response);
  } catch (error) {
    console.error("Error getting items:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
