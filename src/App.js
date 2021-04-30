import { useState, useEffect } from "react";
import env from "react-dotenv";
import socketIOClient from "socket.io-client";
import axios from "axios";

import { ReactComponent as Logo } from "./assets/logo.svg";

import Transaction from "./components/Transaction";
import CreateTransaction from "./components/CreateTransaction";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);

  useEffect(() => {
    const getPrograms = async () => {
      try {
        const response = await axios.get(
          `${env.MIDDLEWARE_API_ENDPOINT}/api/programs`
        );

        setPrograms(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getPrograms();
  }, []);

  useEffect(() => {
    const socket = socketIOClient(env.MIDDLEWARE_API_ENDPOINT);

    socket.onAny((type, transaction) => {
      setTransactions([{ type, transaction }, ...transactions]);
    });

    return () => socket.disconnect();
  });

  return (
    <div className="App h-full">
      <div className="h-full overflow-x-hidden">
        <nav className="bg-white shadow">
          <div className="flex flex-col container mx-auto md:flex-row md:items-center md:justify-between">
            <div className="flex justify-between items-center">
              <div className="flex justify-between items-center">
                <a href="https://fidel.uk/docs" className="w-full">
                  <Logo style={{ width: "90px", height: "60px" }} />
                </a>
                {selectedProgram && (
                  <button
                    onClick={() => window.Fidel?.openForm()}
                    className="ml-10 w-full bg-blue-700 hover:bg-blue-900 text-white py-2 px-4 rounded"
                  >
                    Add Card
                  </button>
                )}
              </div>
            </div>
            <div className="md:flex flex-col md:flex-row md:-mx-4">
              <a
                href="https://fidel.uk/docs/web-sdk"
                className="my-1 hover:text-gray-800 text-blue-700 md:mx-4 md:my-0"
              >
                Documentation ↗
              </a>
            </div>
          </div>
        </nav>

        <div className="px-6 py-2 py-8">
          <div className="flex justify-between container mx-auto">
            <div className="w-full">
              <div className="flex items-center justify-between">
                <h1 className="text-xl text-gray-700 md:text-2xl">
                  Transactions
                </h1>
                <CreateTransaction
                  programs={programs}
                  selectedProgram={selectedProgram}
                  setSelectedProgram={setSelectedProgram}
                />
              </div>
              <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 py-2 lg:-mx-8 pr-10 lg:px-8">

                <div className="align-middle">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="px-6 py-2 py-3 text-left text-gray-400 font-light text-sm">Amount</th>
                        <th className="px-6 py-2 py-3 text-left text-gray-400 font-light text-sm">Cashback</th>
                        <th className="px-6 py-2 py-3 text-left text-gray-400 font-light text-sm">Scheme</th>
                        <th className="px-6 py-2 py-3 text-left text-gray-400 font-light text-sm">Card</th>
                        <th className="px-6 py-2 py-3 text-left text-gray-400 font-light text-sm">Brand</th>
                        <th className="px-6 py-2 py-3 text-left text-gray-400 font-light text-sm">Location</th>
                        <th className="px-6 py-2 py-3 text-left text-gray-400 font-light text-sm">Status</th>
                        <th className="px-6 py-2 py-3 text-left text-gray-400 font-light text-sm">Date↓</th>
                        <th className="px-6 py-2 py-3 text-left text-gray-400 font-light text-sm">↻</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {transactions.map(({ transaction, type }, idx) => (
                        <Transaction key={idx} transaction={transaction} type={type} transactions={transactions} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default App;
