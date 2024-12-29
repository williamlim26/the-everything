import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, BatchGetCommand } from "@aws-sdk/lib-dynamodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function batchGetItem(
  req: NextApiRequest,
  res: NextApiResponse,
) {

  const client = new DynamoDBClient({});
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
