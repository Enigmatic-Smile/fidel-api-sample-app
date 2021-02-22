const express = require('express');

const programs = express.Router();

const PROGRAMS_BASE_URL = "/v1/programs"

programs.get('/', async (req, res) => {
  const axios = req.app.get('axios');
  
  const apiResponse = await axios.get(PROGRAMS_BASE_URL)

  res.status(200).send(apiResponse.data.items)
});

module.exports = programs;
