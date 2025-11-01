import React from 'react'
import {
  SupportedWallet,
  WalletId,
  WalletManager,
  WalletProvider
} from '@txnlab/use-wallet-react'
import { ThemeProvider } from './contexts/ThemeContext'
import { StreakProvider } from './contexts/StreakContext'
import { ToastProvider, useToast } from './contexts/ToastContext'
import ToastContainer from './components/ui/Toast'
import Dashboard from './components/Dashboard'
import {
  getAlgodConfigFromViteEnvironment,
  getKmdConfigFromViteEnvironment
} from './utils/network/getAlgoClientConfigs'

function AppWithToasts () {
  const { toasts, removeToast } = useToast()

  return (
    <>
      <Dashboard />
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </>
  )
}

let supportedWallets: SupportedWallet[]
if (import.meta.env.VITE_ALGOD_NETWORK === 'localnet') {
  const kmdConfig = getKmdConfigFromViteEnvironment()
  supportedWallets = [
    {
      id: WalletId.KMD,
      options: {
        baseServer: kmdConfig.server,
        token: String(kmdConfig.token),
        port: String(kmdConfig.port)
      }
    }
  ]
} else {
  supportedWallets = [{ id: WalletId.PERA }, { id: WalletId.DEFLY }]
}

export default function App () {
  const algodConfig = getAlgodConfigFromViteEnvironment()

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

  return (
    <WalletProvider manager={walletManager}>
      <ThemeProvider>
        <StreakProvider>
          <ToastProvider>
            <AppWithToasts />
          </ToastProvider>
        </StreakProvider>
      </ThemeProvider>
    </WalletProvider>
  )
}
