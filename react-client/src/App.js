import { useState, useEffect } from "react";
import env from "react-dotenv";
import socketIOClient from "socket.io-client";
import axios from "axios";

import logo from './logo.svg';
import logoWite from './logo-white.svg';
import './App.css';

import Transactions from './components/Transactions';
import CreateTransaction from "./components/CreateTransaction";

function App() {
  var [transactions, setTransactions] = useState([]);
  var [programs, setPrograms] = useState([]);
  var [locations, setLocations] = useState([]);
  var [cards, setCards] = useState([]);

  useEffect(() => {
    let getPrograms = async () => {
      let response = await axios.get(`${env.MIDDLEWARE_API_ENDPOINT}/api/programs`).catch(console.log)
      setPrograms(response.data)
    }

    getPrograms()
  }, [])

  useEffect(() => {
    const socket = socketIOClient(env.MIDDLEWARE_API_ENDPOINT);

    socket.onAny((type, transaction) => {
      setTransactions(transactions.concat([{ type, transaction }]));
    });

    return () => socket.disconnect();
  });

  return (
    <div className="App h-full">
      <div class="h-full bg-gray-100 overflow-x-hidden">
        <nav class="bg-white px-6 py-4 shadow">
          <div class="flex flex-col container mx-auto md:flex-row md:items-center md:justify-between">
            <div class="flex justify-between items-center">
              <div class="flex justify-between items-center">
                <a href="https://fidel.uk/docs" class="w-full"><img src={logo} className="fidel-logo" alt="logo" /></a>
                <button onClick={() => window.Fidel?.openForm()} class="ml-10 w-full bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">Add Card</button>
              </div>
            </div>
            <div class="md:flex flex-col md:flex-row md:-mx-4">
              <a href="https://fidel.uk/docs/web-sdk" class="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0">Read the Docs</a>
            </div>
          </div>
        </nav>

        <div class="px-6 py-8">
          <div class="flex justify-between container mx-auto">
            <div class="w-full lg:w-8/12 ">
              <div class="flex items-center justify-between">
                <h1 class="text-xl font-bold text-gray-700 md:text-2xl">Transactions</h1>
              </div>
              <Transactions transactions={transactions} />
            </div>
            <div class="-mx-8 w-4/12 hidden lg:block">
              <div class="px-8">
                <h1 class="mb-4 text-xl font-bold text-gray-700">Create Transaction</h1>
                  <CreateTransaction programs={programs} />
              </div>
            </div>
          </div>
        </div>

        <footer class="w-full fixed bottom-0 px-6 py-2 bg-gray-800 text-gray-100">
          <div class="flex flex-col justify-between items-center container mx-auto md:flex-row"><a href="https://fidel.uk/" >Examples<img src={logoWite} className="fidel-logo" alt="logo" /></a>
            <p class="mt-2 md:mt-0">All rights reserved 2021.</p>
            <div class="flex -mx-2 mt-4 mb-2 md:mt-0 md:mb-0">
              <a href="https://twitter.com/FidelHQ" class="mx-2 text-gray-100 hover:text-gray-400"><svg viewBox="0 0 512 512" class="h-4 w-4 fill-current">
                <path
                  d="M496,109.5a201.8,201.8,0,0,1-56.55,15.3,97.51,97.51,0,0,0,43.33-53.6,197.74,197.74,0,0,1-62.56,23.5A99.14,99.14,0,0,0,348.31,64c-54.42,0-98.46,43.4-98.46,96.9a93.21,93.21,0,0,0,2.54,22.1,280.7,280.7,0,0,1-203-101.3A95.69,95.69,0,0,0,36,130.4C36,164,53.53,193.7,80,211.1A97.5,97.5,0,0,1,35.22,199v1.2c0,47,34,86.1,79,95a100.76,100.76,0,0,1-25.94,3.4,94.38,94.38,0,0,1-18.51-1.8c12.51,38.5,48.92,66.5,92.05,67.3A199.59,199.59,0,0,1,39.5,405.6,203,203,0,0,1,16,404.2,278.68,278.68,0,0,0,166.74,448c181.36,0,280.44-147.7,280.44-275.8,0-4.2-.11-8.4-.31-12.5A198.48,198.48,0,0,0,496,109.5Z">
                </path>
              </svg></a>
              <a href="https://www.linkedin.com/company/fidel-api/" class="mx-2 text-gray-100 hover:text-gray-400"><svg viewBox="0 0 512 512" class="h-4 w-4 fill-current">
                <path
                  d="M444.17,32H70.28C49.85,32,32,46.7,32,66.89V441.61C32,461.91,49.85,480,70.28,480H444.06C464.6,480,480,461.79,480,441.61V66.89C480.12,46.7,464.6,32,444.17,32ZM170.87,405.43H106.69V205.88h64.18ZM141,175.54h-.46c-20.54,0-33.84-15.29-33.84-34.43,0-19.49,13.65-34.42,34.65-34.42s33.85,14.82,34.31,34.42C175.65,160.25,162.35,175.54,141,175.54ZM405.43,405.43H341.25V296.32c0-26.14-9.34-44-32.56-44-17.74,0-28.24,12-32.91,23.69-1.75,4.2-2.22,9.92-2.22,15.76V405.43H209.38V205.88h64.18v27.77c9.34-13.3,23.93-32.44,57.88-32.44,42.13,0,74,27.77,74,87.64Z">
                </path>
              </svg></a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
