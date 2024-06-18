import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount, useSignMessage, useDisconnect } from 'wagmi'
import { etherService } from '../services/ether.service';
import { useState, useEffect } from 'react'
export default function ConnectWagmiButton() {
  const { open } = useWeb3Modal()
  const { address, isConnecting, isDisconnected, isConnected } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const { disconnect } = useDisconnect();
  const [isSignedIn, setIsSignedIn] = useState(false)
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
    if (data.msg === "") {
      setIsSignedIn(true)
    }
}

  const handleSignMessage = async () => {
    const data = await getSignMessage();
    const sig = await signMessageAsync({message: data.data.sign_msg});
    await signIn(sig, data.data.nonce, String(address))
  }

  const handleConnectWallet = async () => {
    await open();
  };

  useEffect(() => {
    if (isConnected) {
      handleSignMessage();
    }
  }, [isConnected]);
  const handleDisconnectWallet = () => {
    disconnect();
    setIsSignedIn(false);
  }
  if (isConnecting) return <div>Connecting…</div>

  if (isDisconnected) return <button className="btn" style={{border: '1px solid', marginRight: '10px'}} onClick={() => handleConnectWallet()}>Connect Wallet with Wagmi</button>
  return (
    <>
    {isSignedIn &&
      <>
        <button className="btn" style={{border: '1px solid', marginRight: '10px'}} onClick={() => handleDisconnectWallet()}>Disconnect Wallet with Wagmi</button>
        <button className="btn" style={{border: '1px solid', marginRight: '10px', backgroundColor: 'green', color: 'yellow'}} >Sign In Success</button>

        <div>Address: {address}</div>
      </>
    }
    </>
  )
}