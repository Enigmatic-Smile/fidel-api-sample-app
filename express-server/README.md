# express-server
Example server for implementing with the Fidel API using Node.js, Express, Socket.io and Axios.

To run the server:

1. `npm install`
2. `cp example.env .env`
3. Add your Fidel Test API Key in the newly created `.env` file. You can find it in your [Fidel Dashboard](https://dashboard.fidel.uk/account/plan).
4. `npm start`

The server implements a generic catch-all webhook route in `/api/webhooks/:type`. The events received on the webhook are passed on to any client listening via Socket.io.

The server also implements routes for:
 - `GET` `/api/cards/?program=id`
 - `GET` `/api/locations?program=id`
 - `GET` `/api/programs`
 - `GET` `/api/transactions/cleat?transaction=id`
 - `POST` `/api/transactions/create`, expecting a body of `{ amount: number, location: "id", card: "id" }`
