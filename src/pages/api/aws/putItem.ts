import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function putItem(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { LongUrl = '', ShortUrl, createdAt } = req.body

  const client = new DynamoDBClient({});
  const docClient = DynamoDBDocumentClient.from(client);

  const command = new PutCommand({
    TableName: 'Testing1',
    Item: {
      Id: ShortUrl,
      ShortUrl: ShortUrl,
      LongUrl: LongUrl,
      length: ShortUrl.length,
      createdAt,
    },
  })

  try {
    const response = await docClient.send(command);
    console.log("Successfully stored URL:", response);
  } catch (error) {
    console.error("Error storing URL:", error);
  }
}
