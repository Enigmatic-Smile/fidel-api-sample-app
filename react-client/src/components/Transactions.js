import React from "react";
import axios from "axios";
import env from "react-dotenv";

import { formatCard } from "../utils";

const Transactions = ({ transaction, type }) => {
  async function clearTransaction(transaction) {
    try {
      await axios.get(
        `${env.MIDDLEWARE_API_ENDPOINT}/api/transactions/clear?transaction=${transaction.id}`
      );
    } catch (error) {}
  }

  return (
    <div class="mt-6 flex-row">
      <div class="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md">
        <div class="flex justify-between items-center">
          <span class="font-light text-gray-600">
            {new Date(transaction?.created).toLocaleString()}
          </span>
          {transaction.cleared === false && (
            <button
              onClick={() => clearTransaction(transaction)}
              class="px-2 py-1 bg-gray-100 text-gray-600 font-bold rounded hover:bg-gray-300"
            >
              Clear Transaction
            </button>
          )}
          <button class="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500">
            {type}
          </button>
        </div>
        <div class="flex flex-row justify-between">
          <div class="mr-5 mt-5 w-full bg-blue-400 rounded-lg overflow-hidden md:max-w-sm">
            <div class="md:flex">
              <div class="w-full p-4">
                <div class="flex justify-between items-center text-white">
                  {" "}
                  <span class="text-3xl font-bold">
                    {transaction?.card?.scheme.toUpperCase()}
                  </span>
                </div>
                <div class="flex justify-between items-center mt-10">
                  <span class="text-white text-lg mr-1 font-bold">
                    {formatCard(transaction?.card)}
                  </span>
                </div>
                <div class="mt-8 py-8 flex justify-between items-center text-white"></div>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <div class="mt-2">
              <p class="text-5xl text-gray-700 font-bold hover:underline">
                {transaction?.amount} {transaction?.currency}
              </p>
            </div>
            <div class="mt-2">
              at{" "}
              <span class="text-2xl text-gray-700 font-bold hover:underline">
                <img
                  src={
                    transaction?.brand?.logoUrl ||
                    "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/271/waving-hand_1f44b.png"
                  }
                  alt="avatar"
                  class="mx-2 w-5 h-5 rounded-full inline"
                />
                {transaction?.brand?.name}
              </span>
            </div>
          </div>
        </div>
        <div class="flex justify-end mt-4">
          <div>
            <span class="flex items-center">
              <h1 class="text-gray-700 font-bold hover:underline">
                {transaction?.location?.address}, {transaction?.location?.city},{" "}
                {transaction?.location?.countryCode}
              </h1>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
