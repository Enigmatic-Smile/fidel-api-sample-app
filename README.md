# Fidel API Examples

This repository contains examples of using the Fidel API to build and deploy card-linked applications.

Each example has a two-part prefix, `<role>-<framework>`, to indicate which `<role>` and `<framework>` it pertains to.
For example, `<role>` could be one of `server` or `client`. `<framework>` can be any technology used to demonstrate implementing with the Fidel APIs and SDKs.

See the [Fidel API documentation](https://fidel.uk/docs/) for more details on getting started with Fidel API.

## Checking Out a Single Example

You can checkout only the examples you want by using a [sparse checkout](https://git-scm.com/docs/git-sparse-checkout). The following example shows how checkout only the example you want.

```bash
$ mkdir fidel-examples && cd fidel-examples
$ git init
$ git remote add origin -f https://github.com/FidelLimited/fidel-examples/
$ git config core.sparseCheckout true
$ echo <example> >> .git/info/sparse-checkout
$ git pull origin main
```

## Using Fidel Webhooks

To receive real-time transactions from the Fidel API, you'll need to register publicly accessible webhooks either via the [Fidel Dashboard](https://dashboard.fidel.uk/webhooks) or the [Webhooks API](https://reference.fidel.uk/reference#create-webhook-program). You can't register the example servers running locally without exposing them to the internet first. We recommend doing that with [ngrok](https://ngrok.com/download) or something similar. After you've downloaded ngrok, please run it on port 3000; all the example servers also run on port 3000.

`./ngrok http 3000`

ngork will give you a random-looking ngrok.io URL, similar to `https://98c1bcdc8042.ngrok.io`. Please use it to register webhooks in the [Fidel Dashboard](https://dashboard.fidel.uk/webhooks). We recommend you register at least 2 webhooks, `transaction.auth` and `transaction.clearing`, the example clients in this repository are using them. The Webhook URLs should be similar to `https://98c1bcdc8042.ngrok.io/api/webhooks/transaction.auth` and `https://98c1bcdc8042.ngrok.io/api/webhooks/transaction.clearing`.

## Outline

- [Fidel API Examples](#fidel-api-examples)
  - [Checking Out a Single Example](#checking-out-a-single-example)
  - [Using Fidel Webhooks](#using-fidel-webhooks)
  - [Outline](#outline)
  - [Servers](#servers)
    - [JavaScript Servers](#javascript-servers)
  - [Clients](#clients)
    - [JavaScript Clients](#javascript-clients)

## Servers

### JavaScript Servers

Example   | Description |
--------- | --------- |
[express-server](express-server) | Example server for implementing with the Fidel API using Node.js, Express, Socket.io and Axios.

## Clients

### JavaScript Clients

Example   | Description |
--------- | --------- |
[react-client](react-client) | Example client for implementing with the Fidel API & Web SDK using React, TailwindCSS, Socket.io and Axios.