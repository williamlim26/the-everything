import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { getItems } from './_itemsHelper'

export default async function fetchItems(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await getItems(req)
    return res.status(200).json(response)
  } catch (error) {
    console.error('Error fetching items:', error)
    return res.status(500).json({
      message: 'Error fetching items',
      error,
    })
  }
}
