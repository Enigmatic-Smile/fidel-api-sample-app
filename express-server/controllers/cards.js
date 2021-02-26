import express from 'express'
const { Router } = express

const cards = Router()
const CARDS_BASE_URL = "v1/programs/{programId}/cards"

cards.get('/', async (req, res) => {
  const axios = req.app.get('axios')

  const apiResponse = await axios.get(`${CARDS_BASE_URL.replace("{programId}", req.query.program)}`).catch(console.log)

  res.status(200).send(apiResponse.data.items)
})

export default cards
