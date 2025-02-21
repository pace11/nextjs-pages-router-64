/* eslint-disable @typescript-eslint/no-unused-vars */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name?: string
  age?: number
  errorMessage?: string
  payload?: object
  headers?: string | string[]
  params?: object
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    console.log('req => ', req)
    // if (req.method === 'POST') {
    const response = await fetch(`${process.env.API_URL}`).then((res) =>
      res.json(),
    )

    res.status(200).json(response)

    // res.status(200).json({
    //   payload: req.body,
    //   headers: req.headers['api-token'],
    //   params: req.query,
    // })
    // } else {
    //   res.status(404).json({ errorMessage: 'Not found' })
    // }
  } catch (error) {
    res.status(500).json({ errorMessage: 'Error' })
  }
}
