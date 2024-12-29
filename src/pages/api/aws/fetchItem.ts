import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function fetchItem(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url = '' } = req.query

  const client = new DynamoDBClient({})
  const docClient = DynamoDBDocumentClient.from(client)

  const command = new GetCommand({
    TableName: 'Testing1',
    Key: {
      Id: url,
      ShortUrl: url,
    },
  })

  try {
    const response = await docClient.send(command)

    if (!response.Item) {
      // Short URL not found in the database
      return res.status(404).json({ message: 'Short URL not found' })
    }

    const { LongUrl } = response.Item // Extract the long URL from the database result
    // Redirect to the long URL
    // res.setHeader('Access-Control-Allow-Origin', '*')3
    res.redirect(301, LongUrl) // 301 Permanent Redirect
    res.end()
  } catch (error) {
    console.error('Error fetching long URL:', error)
    res.status(500).json({ message: 'Error fetching long URL', error })
  }
}
