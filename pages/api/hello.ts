// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

type Error = {
  errorMessage: string
}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  const {query} = req;
  const code = typeof query.code === 'string' ? Number.parseInt(query.code) : 500;
  if (code === 500 || Number.isNaN(code)) {
    res.status(500).json({errorMessage: 'Invalid query params'})
    return;
  }
  const message = typeof query.message === 'string' ? query.message : 'Hello';
  if (message === 'wait') {
    await delay(5_000)
  }
  res.status(code).json({ message })
}
