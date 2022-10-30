import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios"
import qs from "querystring"

export default function userHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { message },
    query: { id, name },
    method,
  } = req

  switch (method) {
    case 'POST':
      axios({
        method: 'post',
        url: 'https://notify-api.line.me/api/notify',
        headers: {
            'Authorization': 'Bearer ' + 'mkMKKL95FSdOpf7nrqERbO2HPxJMwwz0IPqTVjopOpt',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': '*'
          },
          data: qs.stringify({
            message: message,
          })
      }).then((response) => {
        console.log(response.data)
      }).catch(err => {
        console.log(err)
      })
      res.status(200).json({ status: "success" })
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}