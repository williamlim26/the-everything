import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function fetchItems(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id = undefined, shortUrl = undefined } = req.query

  const client = new DynamoDBClient({})
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
    return res.status(200).json(response)
  } catch (error) {
    console.error('Error fetching items:', error)
    return res.status(500).json({
      message: 'Error fetching items',
      error,
    })
  }
}