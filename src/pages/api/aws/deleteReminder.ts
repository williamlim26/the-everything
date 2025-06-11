import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DeleteCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { id, item } = req.body

    if (!id || !item) {
      return res.status(400).json({ message: 'Missing required fields: id and item' })
    }

    const client = new DynamoDBClient({})
    const docClient = DynamoDBDocumentClient.from(client)

    const params = {
      TableName: 'Reminder',
      Key: {
        Id: id,
        Item: item,
      },
    }

    await docClient.send(new DeleteCommand(params))

    return res.status(200).json({ message: 'Reminder deleted successfully' })
  } catch (error) {
    console.error('Error deleting reminder:', error)
    return res.status(500).json({ message: 'Failed to delete reminder' })
  }
}
