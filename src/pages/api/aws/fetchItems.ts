import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function fetchItems(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id = undefined, shortUrl = undefined } = req.query
  // Fetching AWS credentials and region from environment variables
  const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = process.env

  // Check if environment variables are present
  if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !AWS_REGION) {
    throw new Error('Missing AWS environment variables')
  }

  const client = new DynamoDBClient({
    region: AWS_REGION,
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
  })
  const docClient = DynamoDBDocumentClient.from(client)

  const command = new ScanCommand({
    TableName: 'Testing1',
    Limit: 50,
    ExclusiveStartKey:
      typeof id === 'string' ? { Id: id, ShortUrl: shortUrl } : undefined,
  })

  try {
    const response = await docClient.send(command)
    console.log('Successfully fetched items:', response)
    return res.json(response)
  } catch (error) {
    console.error('Error fetching items:', error)
    console.error('AWS_ACCESS_KEY_ID:', AWS_ACCESS_KEY_ID)
    return res.status(500).json({
      message: 'Error fetching items',
      error,
    })
  }
}