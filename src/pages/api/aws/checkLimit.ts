import { NextApiRequest, NextApiResponse } from 'next'
import { getItemsByDate } from './_itemsHelper'
import { LimitStatus } from '@/enums/api'

export default async function checkLimit(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {limit} =  req.query

  try {
    const today = new Date().toISOString()
    const scanResult = await getItemsByDate(req, today)
    const itemCount = scanResult.Items ? scanResult.Items.length : 0
    console.log('Items created today:', itemCount, today)
    let limitStatus = LimitStatus.PERMITTED
    if (itemCount > Number(limit)) {
      console.log('Limit exceeded:', itemCount, '>', limit)
      limitStatus = LimitStatus.REJECTED
    }
    return res
      .status(200)
      .json({ message: 'Limit check OK', status: limitStatus })
  } catch (error) {
    console.error('Error checking limit:', error)
    return res.status(500).json({
      message: 'Error checking limit',
      error,
    })
  }
}
