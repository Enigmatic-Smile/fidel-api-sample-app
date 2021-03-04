import express from 'express'
const { Router } = express

const locations = Router()
const LOCATIONS_BASE_URL = "v1/programs/{programId}/locations"

locations.get('/', async (req, res) => {
  const axios = req.app.get('axios')

  const apiResponse = await axios.get(`${LOCATIONS_BASE_URL.replace("{programId}", req.query.program)}`).catch(console.log)

  res.status(200).send(apiResponse.data.items)
})

export default locations
