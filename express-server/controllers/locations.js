const express = require('express');

const locations = express.Router();

const LOCATIONS_BASE_URL = "v1/programs/{programId}/locations"

locations.get('/', async (req, res) => {

  const axios = req.app.get('axios');

  const apiResponse = await axios.get(`${LOCATIONS_BASE_URL.replace("{programId}", req.query.program)}`)

  res.status(200).send(apiResponse.data.items)
});

module.exports = locations;
