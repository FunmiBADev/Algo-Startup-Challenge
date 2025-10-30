import React from 'react'
import {
  SupportedWallet,
  WalletId,
  WalletManager,
  WalletProvider
} from '@txnlab/use-wallet-react'
import { ThemeProvider } from './contexts/ThemeContext'
import { StreakProvider } from './contexts/StreakContext'
import Dashboard from './components/Dashboard'

// For now, we'll configure for TestNet by default
// This can be enhanced later to detect environment
const algodConfig = {
  network: 'testnet' as const,
  server: 'https://testnet-api.algonode.cloud',
  port: 443,
  token: ''
}

let supportedWallets: SupportedWallet[]
if (import.meta.env.VITE_ALGOD_NETWORK === 'localnet') {
  // LocalNet configuration would go here
  supportedWallets = [
    {
      id: WalletId.KMD,
      options: {
        baseServer: 'http://localhost',
        token: '',
        port: '4002'
      }
    }
  ]
} else {
  supportedWallets = [{ id: WalletId.DEFLY }, { id: WalletId.PERA }]
}

const walletManager = new WalletManager({
  wallets: supportedWallets,
  defaultNetwork: algodConfig.network,
  networks: {
    [algodConfig.network]: {
      algod: {
        baseServer: algodConfig.server,
        port: algodConfig.port,
        token: String(algodConfig.token)
      }
    }
  },
  options: {
    resetNetwork: true
  }
})

function App () {
  return (
    <WalletProvider manager={walletManager}>
      <ThemeProvider>
        <StreakProvider>
          <Dashboard />
        </StreakProvider>
      </ThemeProvider>
    </WalletProvider>
  )
}

export default App
