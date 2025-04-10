import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function fetchReminders(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = new DynamoDBClient({})
  const docClient = DynamoDBDocumentClient.from(client)

  const command = new ScanCommand({
    TableName: 'Reminder',
    Limit: 50,
  })

  try {
    const response = await docClient.send(command)
    console.log('Successfully fetched reminders:', response)
    return res.status(200).json(response)
  } catch (error) {
    console.error('Error fetching reminders:', error)
    return res.status(500).json({
      message: 'Error fetching reminders',
      error,
    })
  }
}
