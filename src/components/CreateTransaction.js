import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import env from "react-dotenv";

import Select from "./Select";
import { formatCard } from "../utils";

import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'

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
  setSelectedProgram
}) {
  const [locations, setLocations] = useState([]);
  const [cards, setCards] = useState([]);
  const [open, setOpen] = useState(false);

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
      setOpen(false)
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
    <div>
      <button
        onClick={() => setOpen(true)}
        className="ml-10 w-full bg-blue-700 hover:bg-blue-900 text-white py-2 px-4 rounded"
      >
        Create Transaction
  </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" static className="fixed inset-0 overflow-hidden" open={open} onClose={setOpen}>
          <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="relative w-screen max-w-md">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                      <button
                        className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setOpen(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                    <div className="px-4 sm:px-6">
                      <Dialog.Title className="text-xl text-gray-900">Create Transaction</Dialog.Title>
                    </div>
                    <div className="mt-6 relative flex-1 px-4 sm:px-6">
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
                      <div className="my-2 relative w-full z-10">
                        <label htmlFor="amount" className="block text-sm mt-3">Amount</label>
                        <span className="px-4 py-3 bg-gray-100 w-1/6">GBP</span>
                        <input
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="10"
                          id="amount"
                          defaultValue={amount}
                          className="px-4 py-2 focus:outline-none w-5/6 appearance-none border"
                        ></input>
                      </div>
                      <div className="-ml-12 absolute bottom-0 h-full w-full inline-flex justify-end items-end z-0">
                      <button
                          onClick={() => setOpen(false)}
                          className="hover:text-blue-700 py-2 px-4"
                        >
                          Cancel
                      </button>
                        <button
                          onClick={createTransaction}
                          className="bg-blue-700 hover:bg-blue-900 text-white py-2 px-4 rounded"
                        >
                          Done
                      </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
