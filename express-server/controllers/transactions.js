const express = require('express');

const transactions = express.Router();

const TRANSACTIONS_BASE_URL = "/v1/transactions"

transactions.post('/create', async (req, res) => {

  const axios = req.app.get('axios');

  const apiResponse = await axios.post(`${TRANSACTIONS_BASE_URL}/test`, {
    amount: parseFloat(req.body.amount),
    cardId: req.body.card,
    locationId: req.body.location
  })

  res.status(200).send(apiResponse.data.items)
});

transactions.get('/clear', async (req, res) => {

  const axios = req.app.get('axios');

  const apiResponse = await axios.patch(`${TRANSACTIONS_BASE_URL}/${req.query.transaction}`, {
    "cleared": true
  })

  res.status(200).send(apiResponse.data.items)
});

module.exports = transactions;
