import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

const formSchema = z.object({
  title: z.string().min(1, 'Title wajib diisi !'),
  description: z.string().min(1, 'Description wajib diisi !'),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!['POST', 'PATCH', 'PUT'].includes(req.method || '')) {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const mappingUrl = {
      'POST': `${process.env.API_URL}`,
      'PATCH': `${process.env.API_URL}/${req.query.id}`,
    }

    const validatedData = formSchema.parse(req.body)
    const response = await fetch(`${mappingUrl[req.method]}`, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedData),
    }).then((res) => res.json())

    if (response.success) {
      res.status(201).json(response)
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = Object.keys(error.formErrors.fieldErrors)?.reduce(
        (acc, key) => {
          acc[key] = error.formErrors.fieldErrors[key]?.[0] || 'Unknown error'
          return acc
        },
        {} as Record<string, string>,
      )
      console.log('errors => ', errors)
      return res.status(400).json({ errors })
    }

    return res.status(500).json({ message: 'Internal server error' })
  }
}
