import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ChatWidget } from 'highfi-chat-widget';
// import ChatWidget from "./lib/components/ChatWidget";
import Onboard from "@web3-onboard/core";
import injectedModule from "@web3-onboard/injected-wallets";
import { ethers } from "ethers";
import { Button } from "react-bootstrap";

const MAINNET_RPC_URL = "https://mainnet.infura.io/v3/<INFURA_KEY>";

const injected = injectedModule();

const onboard = Onboard({
    wallets: [injected],
    chains: [
        {
            id: "0x1",
            token: "ETH",
            label: "Ethereum Mainnet",
            rpcUrl: MAINNET_RPC_URL,
        },
    ],
});

function App() {
    const [data, setData] = useState(null);
    const [wallets, setWallets] = useState([]);
    const [provider, setProvider] = useState(null);

    useEffect(() => {
        console.log("here");
    }, [wallets]);

    const connectWallet = async () => {
        let wallets = await onboard.connectWallet();
        setWallets(wallets);
        setProvider(wallets[0].provider);
    };

    return (
        <div className="App">
            <div className="intro-text">
                Highfi Me Test Client
                <br />
                Please click on the chat plugin bottom right to chat with us
                <br />
                <Button variant="info" onClick={connectWallet}>
                    Connect Wallet
                </Button>
            </div>
            <ChatWidget accessToken="some-token" provider={provider} />
        </div>
    );
}

export default App;
