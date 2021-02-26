import React, { useState, useEffect, Component } from 'react'
import axios from 'axios'
import env from "react-dotenv"

export default function CreateTransaction(props) {
    let [locations, setLocations] = useState([]);
    let [locationItems, setLocationItems] = useState([]);

    useEffect(() => {
        setCardItems(<span></span>)
        setLocationItems(<span></span>)
    }, [])

    useEffect(() => {
        if (locations.length > 0) {
            setLocationItems(<div class="my-2 relative w-full inline-flex items-center">
                <label class="w-40">Location</label>
                <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero" /></svg>
                <select onChange={selectLocation} class="w-full border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                    <option disabled selected>Choose a Location</option>
                    {locations.map(location => <option value={location.id}>{location.address}</option>)}
                </select>
            </div>)
        }
    }, [locations])

    let [cards, setCards] = useState([]);
    let [cardItems, setCardItems] = useState([]);

    useEffect(() => {
        if (cards.length > 0) {
            setCardItems(<div class="my-2 relative w-full inline-flex items-center">
                <label class="w-40">Card</label>
                <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero" /></svg>
                <select onChange={selectCard} class="w-full border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                    <option disabled selected>Choose a Card</option>
                    {cards.map(card => {
                        let cardNumber = card?.firstNumbers + "******" + card?.lastNumbers
                        cardNumber = cardNumber.match(/.{4}/g).join(" ")
                        return (<option value={card.id}>{cardNumber}</option>)
                    })}
                </select>
            </div>)
        }
    }, [cards])

    let [transactionProgram, setTransactionProgram] = useState("")
    let [transactionLocation, setTransactionLocation] = useState("")
    let [transactionCard, setTransactionCard] = useState("")
    let [transactionAmount, setTransactionAmount] = useState(10)

    let selectProgram = async (element) => {
        setTransactionProgram(element.target.value)

        let locationsResponse = await axios.get(`${env.MIDDLEWARE_API_ENDPOINT}/api/locations?program=${element.target.value}`).catch(console.log)
        setLocations([...locationsResponse.data])

        let cardsResponse = await axios.get(`${env.MIDDLEWARE_API_ENDPOINT}/api/cards?program=${element.target.value}`).catch(console.log)
        setCards([...cardsResponse.data])

        addSDK(element.target.value)
    }

    let selectLocation = (element) => {
        setTransactionLocation(element.target.value)
    }

    let selectCard = (element) => {
        setTransactionCard(element.target.value)
    }

    let setAmount = (element) => {
        setTransactionAmount(element.target.value)
    }

    let createTransaction = async () => {
        if (transactionLocation && transactionCard && transactionAmount) {
            let response = await axios.post(`${env.MIDDLEWARE_API_ENDPOINT}/api/transactions/create`,
                { amount: transactionAmount, location: transactionLocation, card: transactionCard }
            ).catch(console.log)
        }
    }
    let addSDK = (program) => {
        document.getElementById("fidel-form")?.remove()

        program = program || "bca59bd9-171b-4d1f-92af-4b2b7305268a";

        const sdkScript = document.createElement('script');
        sdkScript.src = 'https://resources.fidel.uk/sdk/js/v2/fidel.js';
        sdkScript.id = 'fidel-form';

        const attributes = {
            'data-auto-open': 'false',
            'data-key': env.FIDEL_SDK_KEY,
            'data-program-id': program,
            'data-company-name': 'Fidel Examples Application',
        };

        Object.keys(attributes).forEach(key =>
            sdkScript.setAttribute(key, attributes[key]),
        );

        document.body.appendChild(sdkScript);
    }
    return (
        <div class="flex flex-col bg-white max-w-sm px-6 py-4 mx-auto rounded-lg shadow-md">
            <div class="my-2 relative w-full inline-flex items-center">
                <label class="w-40">Program</label>
                <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero" /></svg>
                <select onChange={selectProgram} class="w-full border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                    <option disabled selected>Choose a Program</option>
                    {props.programs.map(program => <option value={program.id}>{program.name}</option>)}
                </select>
            </div>
            {locationItems}
            {cardItems}
            <div class="my-2 relative w-full inline-flex items-center">
                <label class="w-40">Amount</label>
                <input onChange={setAmount} placeholder="10" class="w-60 border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                </input>
            </div>
            <div class="my-2 relative w-full inline-flex items-center">
                <button onClick={createTransaction} class="w-full bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">Create Transaction</button>
            </div>
        </div>
    )
}