import express from 'express'
const { Router } = express

const programs = Router()
const PROGRAMS_BASE_URL = "/v1/programs"

programs.get('/', async (req, res) => {
  const axios = req.app.get('axios')
  
  const apiResponse = await axios.get(PROGRAMS_BASE_URL).catch(console.log)

  res.status(200).send(apiResponse.data.items)
})

export default programs
