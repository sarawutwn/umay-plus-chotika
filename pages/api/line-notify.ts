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
        if(response.data.status === 200) {
            res.status(200).json({ status: "success" })
            return;
        }
        res.status(500).json({ status: "error", message: "some thing went wrong!"})
      }).catch(err => {
        console.log(err)
      })
      
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}