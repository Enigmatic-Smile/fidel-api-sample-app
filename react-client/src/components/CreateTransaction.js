import React, { useState, useEffect } from "react";
import axios from "axios";
import env from "react-dotenv";

import Select from "./Select";
import { formatCard } from "../utils";

const addSDK = (programId) => {
  document.getElementById("fidel-form")?.remove();

  const sdkScript = document.createElement("script");
  sdkScript.src = "https://resources.fidel.uk/sdk/js/v2/fidel.js";
  sdkScript.id = "fidel-form";

  const attributes = {
    "data-auto-open": "false",
    "data-key": env.FIDEL_SDK_KEY,
    "data-program-id": programId,
    "data-company-name": "Fidel Examples Application",
  };

  Object.keys(attributes).forEach((key) =>
    sdkScript.setAttribute(key, attributes[key])
  );

  document.body.appendChild(sdkScript);
};

export default function CreateTransaction({
  programs,
  selectedProgram,
  setSelectedProgram,
}) {
  const [locations, setLocations] = useState([]);
  const [cards, setCards] = useState([]);

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [amount, setAmount] = useState(10);

  useEffect(() => {
    if (selectedProgram) {
      const fetch = async () => {
        try {
          const locationsResponse = await axios.get(
            `${env.MIDDLEWARE_API_ENDPOINT}/api/locations?program=${selectedProgram}`
          );
          setLocations([...locationsResponse.data]);

          const cardsResponse = await axios.get(
            `${env.MIDDLEWARE_API_ENDPOINT}/api/cards?program=${selectedProgram}`
          );
          setCards([...cardsResponse.data]);

          addSDK(selectedProgram);
        } catch (error) {
          console.log(error);
        }
      };
      fetch();
    }
  }, [selectedProgram]);

  async function createTransaction() {
    if (selectedLocation && selectedCard && amount) {
      try {
        await axios.post(
          `${env.MIDDLEWARE_API_ENDPOINT}/api/transactions/create`,
          {
            amount: amount,
            location: selectedLocation,
            card: selectedCard,
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div class="flex flex-col bg-white max-w-sm px-6 py-4 mx-auto rounded-lg shadow-md">
      <Select label="Program" items={programs} onChange={setSelectedProgram} />
      {locations.length > 0 && (
        <Select
          label="Location"
          items={locations.map((location) => ({
            ...location,
            name: location.address,
          }))}
          onChange={setSelectedLocation}
        />
      )}
      {cards.length > 0 && (
        <Select
          label="Card"
          items={cards.map((card) => ({ ...card, name: formatCard(card) }))}
          onChange={setSelectedCard}
        />
      )}
      <div class="my-2 relative w-full inline-flex items-center">
        <label class="w-40">Amount</label>
        <input
          onChange={(e) => setAmount(e.target.value)}
          placeholder="10"
          defaultValue={amount}
          class="w-60 border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
        ></input>
      </div>
      <div class="my-2 relative w-full inline-flex items-center">
        <button
          onClick={createTransaction}
          class="w-full bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
        >
          Create Transaction
        </button>
      </div>
    </div>
  );
}
