import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb'
import { NextApiRequest } from 'next'

export async function getItems(req: NextApiRequest) {
  const { id = undefined, shortUrl = undefined } = req.query

  const client = new DynamoDBClient({})
  const docClient = DynamoDBDocumentClient.from(client)

  const command = new ScanCommand({
    TableName: 'Testing1',
    Limit: 50,
    ExclusiveStartKey: typeof id === 'string' ? { Id: id, ShortUrl: shortUrl } : undefined,
  })

  const response = await docClient.send(command)
  return response
}

export async function getItemsByDate(req: NextApiRequest, date: string) {
  const client = new DynamoDBClient({})
  const docClient = DynamoDBDocumentClient.from(client)

  const startOfDay = Math.floor(new Date(date).setUTCHours(0, 0, 0, 0) / 1000)
  const endOfDay = Math.floor(
    new Date(date).setUTCHours(23, 59, 59, 999) / 1000
  )

  console.log('Fetching items created on:', date, 'from', startOfDay, 'to', endOfDay)

  const command = new ScanCommand({
    TableName: 'Testing1',
    Limit: 5,
    FilterExpression: 'createdAt BETWEEN :start AND :end',
    ExpressionAttributeValues: {
      ':start': startOfDay,
      ':end': endOfDay,
    },
  })

  const response = await docClient.send(command)
  return response
}
