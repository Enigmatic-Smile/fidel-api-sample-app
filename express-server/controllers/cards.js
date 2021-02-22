const express = require('express');

const cards = express.Router();

const CARDS_BASE_URL = "v1/programs/{programId}/cards"

cards.get('/', async (req, res) => {
  const axios = req.app.get('axios');

  const apiResponse = await axios.get(`${CARDS_BASE_URL.replace("{programId}", req.query.program)}`)

  res.status(200).send(apiResponse.data.items)
});

module.exports = cards;
