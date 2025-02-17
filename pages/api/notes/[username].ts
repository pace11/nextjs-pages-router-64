// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    console.log('req => ', req.query)
    res.status(200).json({ query: req.query })
  } catch (error) {
    res.status(500).json({ errorMessage: 'Error' })
  }
}
