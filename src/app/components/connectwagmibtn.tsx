import { useWeb3Modal } from '@web3modal/ethers/react'

export default function ConnectWagmiButton() {
  // 4. Use modal hook
  const { open } = useWeb3Modal()

  return (
    <>
      <button className="btn" style={{border: '1px solid'}} onClick={() => open()}>Connect Wallet with Wagmi</button>
    </>
  )
}