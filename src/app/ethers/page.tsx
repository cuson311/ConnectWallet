'use client'
import Container from 'react-bootstrap/Container';
import ConnectEther from '../components/connect-ether-btn';
import { useState } from 'react'
const ConnectEtherWallet = () => {
    const [connected, setConnected] = useState(false)
    return(
        <Container>
            <ConnectEther connected={connected} setConnected={setConnected} />
        </Container>
    )
}
export default ConnectEtherWallet;