import { useWeb3Modal, useWeb3ModalState } from '@web3modal/wagmi/react'
import { useAccount, useSignMessage, useDisconnect } from 'wagmi'
import { etherService } from '../services/ether.service';
import { useState, useEffect } from 'react'

export default function ConnectWagmiButton() {
  const { open } = useWeb3Modal()
  const { selectedNetworkId } = useWeb3ModalState()
  const { address, isConnected } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const { disconnect } = useDisconnect();
  const [isSignedIn, setIsSignedIn] = useState(() => {
    return localStorage.getItem('isSignedIn') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isSignedIn', String(isSignedIn))
  }, [isSignedIn])

  const getSignMessage = async () => {
    try {
      const res = await etherService.getSign();
      return res.data;
    } catch (error) {
      console.error('Error fetching sign message:', error);
      return null;
    }
  };

  const signIn = async (signature: string, nonce: string, public_address: string, chain_id: number) => {
    try {
        const res = await etherService.signIn({
            signature: signature,
            nonce: nonce,
            public_address: public_address,
            chain_id: chain_id,
        });
        const data = res as any;
        if (data.msg === "") {
            console.log(data.data.nonce)
            setIsSignedIn(true);
        } else {
            console.error('Sign in failed:', data.msg);
        }
    } catch (error) {
        console.error('Error during sign in:', error);
    }
};

  const handleSignMessage = async () => {
    const data = await getSignMessage();
    if (data) {
      const sig = await signMessageAsync({ message: data.sign_msg });
      const chain_id = selectedNetworkId;
      await signIn(sig, data.nonce, String(address), Number(chain_id));
    }
  }
  const handleConnectWallet = () => {
    open()
  }
  useEffect(() => {
    const signedIn = localStorage.getItem('isSignedIn')
    if(isConnected && signedIn === 'false' && address) {
      handleSignMessage();
    }
  }, [isConnected, address]);

  const handleDisconnectWallet = () => {
    disconnect();
    setIsSignedIn(false);
  }
  if (!isSignedIn) return <button className="btn" style={{border: '1px solid', marginRight: '10px'}} onClick={() => handleConnectWallet()}>Connect Wallet with Wagmi</button>
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