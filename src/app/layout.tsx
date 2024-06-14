import type { Metadata } from "next";
import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
// import "./globals.css";
import Header from './components/header'
import { headers } from 'next/headers'

import { cookieToInitialState } from 'wagmi'

import { config } from '@/config'
import Web3ModalProvider from '@/context'
// import { Web3Modal } from '../context/web3modal'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Homepage",
  description: "Homepage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className="mt-3">
        <Web3ModalProvider initialState={initialState}>{children}</Web3ModalProvider>
        {/* <Web3Modal>{children}</Web3Modal> */}
        </div>
        </body>
    </html>
  );
}
