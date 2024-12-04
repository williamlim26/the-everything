import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, BatchGetCommand } from '@aws-sdk/lib-dynamodb'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function batchGetItem(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
  const docClient = DynamoDBDocumentClient.from(client)

  const command = new BatchGetCommand({
    RequestItems: {
      Testing1: {
        Keys: [
          {
            Id: 'coolday',
            ShortUrl: 'coolday',
          },
        ],
      },
    },
  })

  try {
    const response = await docClient.send(command)
    return res.json(response)
  } catch (error) {
    console.error('Error getting items:', error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
