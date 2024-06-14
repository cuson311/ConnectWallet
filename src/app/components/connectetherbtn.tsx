'use client'
import { ethers } from 'ethers';
import { useState } from 'react';
type Props = {
    connected: boolean
    setConnected: (value: boolean) => void
}
const ConnectEther = (props: Props) => {
    const { connected, setConnected } = props;
    const [walletAddress, setWalletAddress] = useState("");

    // Function to connect/disconnect the wallet
    async function connectWallet() {
        if (!connected && typeof window.ethereum != "undefined") {
        // Connect the wallet using ethers.js
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const _walletAddress = await signer.getAddress();
        setConnected(true);
        setWalletAddress(_walletAddress);
        } else {
        // Disconnect the wallet
        setConnected(false);
        setWalletAddress("");
        }
    }

    return(
        <div className="app">
            <div className="main">
                <div className="content">
                <button className="btn" style={{border: '1px solid'}} onClick={connectWallet}>
                    {connected ? "Disconnect Wallet" : "Connect Wallet with Ether"}
                </button>
                <h3 style={{marginTop: '20px'}}>
                {connected ? "Address" : ""}</h3>
                <h4 style={{color: 'red'}} className="wal-add">{walletAddress}</h4>
                </div>
            </div>
        </div>
    )
}
export default ConnectEther;