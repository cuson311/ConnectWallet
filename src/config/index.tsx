import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { cookieStorage, createStorage } from 'wagmi'
import { mainnet, goerli, zkSyncSepoliaTestnet } from 'wagmi/chains';
import {
  bsc,
  bscTestnet,
  zkSync,
  baseGoerli
} from 'viem/chains';

// Get projectId at https://cloud.walletconnect.com
export const projectId = '35a67f0f8423b7e019fa9b1e04fc196b'

if (!projectId) throw new Error('Project ID is not defined')

const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Create wagmiConfig
const chains = [
  mainnet,        // Chain ID 1
  // goerli,         // Chain ID 5
  // bsc,            // Chain ID 56
  // zkSync,         // Chain ID 324
  // zkSyncSepoliaTestnet,  // Chain ID 280
  // baseGoerli      // Chain ID 84531
  // bscTestnet,     // Chain ID 97
] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
   // Optional - Override createConfig parameters
})