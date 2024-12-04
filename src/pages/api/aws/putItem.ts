import { CreateTableCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function putItem(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { longUrl = '' } = req.body
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
  console.log(docClient)

  const command = new PutCommand({
    TableName: 'Testing1',
    Item: {
      Id: longUrl,
      ShortUrl: longUrl,
      LongUrl: longUrl,
      length: longUrl.length,
    },
  })

  try {
    const response = await docClient.send(command)
    console.log('Successfully stored URL:', response)
  } catch (error) {
    console.error('Error storing URL:', error)
  }
}
