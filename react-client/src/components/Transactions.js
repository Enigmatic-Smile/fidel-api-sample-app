import React, { Component } from 'react'
import axios from 'axios'
import env from "react-dotenv";

export class Transactions extends Component {
  async clearTransaction(transaction) {
    await axios.get(`${env.MIDDLEWARE_API_ENDPOINT}/api/transactions/clear?transaction=${transaction.id}`).catch()
  }

  render() {
    let transactions = this.props.transactions
    
    let listItems = transactions.map((transaction) => {
      let clearButton = <span></span>

      let clearTransactionEvent = (element) => { 
        element.target.style.display = "none"
        transaction.transaction.cleared = true
        this.clearTransaction(transaction.transaction) 
      }

      if (transaction?.transaction?.cleared === false) clearButton = <button onClick={clearTransactionEvent} class="px-2 py-1 bg-gray-100 text-gray-600 font-bold rounded hover:bg-gray-300">Clear Transaction</button>

      let cardNumber = transaction?.transaction?.card?.firstNumbers + "******" + transaction?.transaction?.card?.lastNumbers
      cardNumber = cardNumber.match(/.{4}/g).join(" ")

      return (
        <div class="mt-6 flex-row">
          <div class="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md">
            <div class="flex justify-between items-center"><span class="font-light text-gray-600">{new Date(transaction?.transaction?.created).toLocaleString()}</span>
              {clearButton}<button class="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500">{transaction.type}</button>
            </div>
            <div class="flex flex-row justify-between">
              <div class="mr-5 mt-5 w-full bg-blue-400 rounded-lg overflow-hidden md:max-w-sm">
                <div class="md:flex">
                  <div class="w-full p-4">
                    <div class="flex justify-between items-center text-white"> <span class="text-3xl font-bold">{transaction?.transaction?.card?.scheme.toUpperCase()}</span></div>
                    <div class="flex justify-between items-center mt-10">
                      <span class="text-white text-lg mr-1 font-bold">{cardNumber}</span>
                    </div>
                    <div class="mt-8 py-8 flex justify-between items-center text-white">
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-4">
                <div class="mt-2"><p class="text-5xl text-gray-700 font-bold hover:underline">{transaction?.transaction?.amount} {transaction?.transaction?.currency}</p>
                </div>
                <div class="mt-2">at <a class="text-2xl text-gray-700 font-bold hover:underline"><img src={transaction?.transaction?.brand?.logoUrl || 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/271/waving-hand_1f44b.png'} alt="avatar" class="mx-2 w-5 h-5 rounded-full inline" />{transaction?.transaction?.brand?.name}</a>
                </div>
              </div>
            </div>
            <div class="flex justify-between items-center mt-4"><a class="text-blue-500 hover:underline"></a>
              <div><a class="flex items-center">
                <h1 class="text-gray-700 font-bold hover:underline">{transaction?.transaction?.location?.address}, {transaction?.transaction?.location?.city}, {transaction?.transaction?.location?.countryCode}</h1>
              </a></div>
            </div>
          </div>
        </div>
      )
    }
    )
    return (
      listItems
    )
  }
}

export default Transactions
