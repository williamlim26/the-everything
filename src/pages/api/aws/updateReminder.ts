import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb'
import type { NextApiRequest, NextApiResponse } from 'next'

const client = new DynamoDBClient({})
const docClient = DynamoDBDocumentClient.from(client)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { id, item, completed } = req.body

    if (!id || !item) {
      return res.status(400).json({ message: 'Missing reminder ID or Item' })
    }

    const command = new UpdateCommand({
      TableName: 'Reminder',
      Key: {
        Id: id,
        Item: item,
      },
      UpdateExpression: 'SET completed = :completed',
      ExpressionAttributeValues: {
        ':completed': completed,
      },
      ReturnValues: 'ALL_NEW',
    })

    const response = await docClient.send(command)

    return res.status(200).json({
      message: 'Reminder updated successfully',
      reminder: response.Attributes,
    })
  } catch (error) {
    console.error('Error updating reminder:', error)
    return res.status(500).json({ message: 'Failed to update reminder' })
  }
}
