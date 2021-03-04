import React from "react";
import axios from "axios";
import env from "react-dotenv";

import { formatCard } from "../utils";

const Transaction = ({ transaction, type, transactions }) => {
  async function clearTransaction(transaction) {
    try {
      await axios.get(
        `${env.MIDDLEWARE_API_ENDPOINT}/api/transactions/clear?transaction=${transaction.id}`
      );
    } catch (error) {}
  }

  return (
    <div className="mt-6 flex-row">
      <div className="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <span className="font-light text-gray-600">
            {new Date(transaction?.created).toLocaleString()}
          </span>
          {(transactions.filter(tr => tr.transaction.id === transaction.id).length !== 2) && (
            <button
              onClick={() => clearTransaction(transaction)}
              className="px-2 py-1 bg-gray-100 text-gray-600 font-bold rounded hover:bg-gray-300"
            >
              Clear Transaction
            </button>
          )}
          <button className="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500">
            {type}
          </button>
        </div>
        <div className="flex flex-row justify-between">
          <div className="mr-5 mt-5 w-full bg-blue-400 rounded-lg overflow-hidden md:max-w-sm">
            <div className="md:flex">
              <div className="w-full p-4">
                <div className="flex justify-between items-center text-white">
                  {" "}
                  <span className="text-3xl font-bold">
                    {transaction?.card?.scheme.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-10">
                  <span className="text-white text-lg mr-1 font-bold">
                    {formatCard(transaction?.card)}
                  </span>
                </div>
                <div className="mt-8 py-8 flex justify-between items-center text-white"></div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="mt-2">
              <p className="text-5xl text-gray-700 font-bold hover:underline">
                {transaction?.amount} {transaction?.currency}
              </p>
            </div>
            <div className="mt-2">
              at{" "}
              <span className="text-2xl text-gray-700 font-bold hover:underline">
                <img
                  src={
                    transaction?.brand?.logoUrl ||
                    "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/271/waving-hand_1f44b.png"
                  }
                  alt="avatar"
                  className="mx-2 w-5 h-5 rounded-full inline"
                />
                {transaction?.brand?.name}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <div>
            <span className="flex items-center">
              <h1 className="text-gray-700 font-bold hover:underline">
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

export default Transaction;
