'use client'
import { ethers } from 'ethers';
import { useState } from 'react';
import { etherService } from '../services/ether.service';
import { get } from 'http';
type Props = {
    connected: boolean
    setConnected: (value: boolean) => void
}
const ConnectEther = (props: Props) => {
    const { connected, setConnected } = props;
    const [walletAddress, setWalletAddress] = useState("");

    const getSignMessage = async () => {
        const res = await etherService.getSign()
        const data = res as any
        return data
    }
    const signIn = async (signature: string, nonce: string, public_address: string) => {
        const res = await etherService.signIn({
            signature: signature,
            nonce: nonce,
            public_address: public_address,
            chain_id: 97
        })
        const data = res as any
        if(data.msg === "") {
            setConnected(true);
            setWalletAddress(public_address); 
        }
    }

    // Function to connect/disconnect the wallet
    const connectWallet = async () => {
        if (!connected && typeof window.ethereum != "undefined") {
        // Connect the wallet using ethers.js
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        //get public address
        const public_address = await signer.getAddress();
        //get sign message
        const data = await getSignMessage();
        //Sign the message
        const sig = await signer.signMessage(data.data.sign_msg);
        //Call the signin function 
        signIn(sig, data.data.nonce, public_address)
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