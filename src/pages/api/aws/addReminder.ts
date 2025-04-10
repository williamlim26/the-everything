import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'

export default async function addReminder(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { text } = req.body

  if (!text) {
    return res.status(400).json({ message: 'Text is required' })
  }

  const client = new DynamoDBClient({})
  const docClient = DynamoDBDocumentClient.from(client)

  const id = uuidv4()
  
  const reminder = {
    Id: id,
    Item: text,
    completed: false,
    createdAt: Math.floor(Date.now() / 1000)
  }

  const command = new PutCommand({
    TableName: 'Reminder',
    Item: reminder
  })

  try {
    await docClient.send(command)
    console.log('Successfully added reminder:', reminder)
    return res.status(201).json({ message: 'Reminder added successfully', reminder })
  } catch (error) {
    console.error('Error adding reminder:', error)
    return res.status(500).json({
      message: 'Error adding reminder',
      error,
    })
  }
}
