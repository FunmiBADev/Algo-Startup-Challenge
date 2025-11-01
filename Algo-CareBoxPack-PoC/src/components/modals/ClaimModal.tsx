import React, { useState } from 'react'
import { useWallet, Wallet } from '@txnlab/use-wallet-react'
import { useStreak } from '../../contexts/StreakContext'
import { useToast } from '../../contexts/ToastContext'
import {
  mintAchievementNFT,
  getBadgeMetadataUrl
} from '../../services/nftService'
import { CURRENT_YEAR } from '../../config/achievementBadges'

interface ClaimModalProps {
  days: number
  onClose: () => void
  onSuccess: () => void
}

function resolveBackendBase (): string {
  // Use environment variable for backend URL
  const env = import.meta.env.VITE_API_URL?.trim()
  if (!env) {
    throw new Error('VITE_API_URL environment variable is required')
  }
  return env.replace(/\/$/, '')
}

export default function ClaimModal ({
  days,
  onClose,
  onSuccess
}: ClaimModalProps) {
  const [step, setStep] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const [assetId, setAssetId] = useState<number | null>(null)

  const { activeAddress, transactionSigner, wallets } = useWallet()
  const { hasReceivedOnboardingAirdrop, markOnboardingAirdropReceived } =
    useStreak()
  const { showToast } = useToast()

  // Handle the complete claim flow
  const handleClaim = async () => {
    console.log('🚀 Starting claim flow for', days, 'day badge')

    try {
      // Check if wallet is connected
      if (!activeAddress || !transactionSigner) {
        console.error('❌ Wallet not connected')
        setError('Please connect your wallet first')
        showToast('Please connect your wallet first', 'error')
        return
      }

      console.log('✅ Wallet connected:', activeAddress)
      setStep(2) // Transaction pending

      // Step 1: Check if we need to send airdrop
      const needsAirdrop = !hasReceivedOnboardingAirdrop()
      console.log(
        '💰 Airdrop needed:',
        needsAirdrop,
        'for 10-day:',
        days === 10
      )

      if (needsAirdrop && days === 10) {
        // First-time claim of 10-day badge - send airdrop
        console.log('📤 Sending airdrop...')
        showToast('Sending onboarding reward (0.5 ALGO)...', 'info')
        const backendBase = resolveBackendBase()
        const response = await fetch(`${backendBase}/api/airdrop`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            recipientAddress: activeAddress
          })
        })

        if (!response.ok) {
          const data = await response.json()
          if (data.alreadyReceived) {
            // Already received, continue with NFT mint
            console.log('⚠️  Already received airdrop, continuing...')
            markOnboardingAirdropReceived()
          } else {
            throw new Error(data.error || 'Failed to send airdrop')
          }
        } else {
          // Airdrop successful
          console.log('✅ Airdrop sent successfully')
          markOnboardingAirdropReceived()
          showToast('✅ Onboarding reward received: 0.5 ALGO', 'success')
        }
      }

      // Step 2: Mint the NFT badge
      console.log('🎨 Starting NFT mint process...')
      showToast('Minting NFT badge...', 'info')
      const metadataUrl = getBadgeMetadataUrl(days, CURRENT_YEAR)
      console.log('📋 Metadata URL:', metadataUrl)

      const nftAssetId = await mintAchievementNFT(
        days,
        CURRENT_YEAR,
        metadataUrl,
        activeAddress,
        transactionSigner
      )

      console.log('✅ NFT minted successfully, Asset ID:', nftAssetId)
      setAssetId(nftAssetId)
      setStep(3) // Success

      console.log('🎉 Calling onSuccess callback')
      onSuccess()

      console.log('✅ Claim flow completed successfully!')
      showToast(`🎉 NFT claimed successfully!`, 'success')

      // Close modal after 3 seconds
      setTimeout(() => {
        onClose()
      }, 3000)
    } catch (err: any) {
      console.error('❌ Claim error:', err)
      console.error('Error details:', {
        message: err.message,
        stack: err.stack,
        name: err.name
      })
      setError(err.message || 'Failed to claim NFT badge')
      setStep(1)
      showToast(`Failed to claim badge: ${err.message}`, 'error')
    }
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className='modal-overlay' onClick={handleOverlayClick}>
      <div className='modal-content text-center'>
        <h2 className='text-2xl font-bold text-white mb-6'>
          {step === 1 && `Claim ${days} Day NFT Badge`}
          {step === 2 && 'Processing...'}
          {step === 3 && 'Claim Successful!'}
        </h2>

        {/* Error Display */}
        {error && (
          <div className='mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg'>
            <p className='text-red-300 text-sm'>{error}</p>
          </div>
        )}

        {/* Step 1: Wallet Connection or Ready to Claim */}
        {step === 1 && (
          <div id='step1Content'>
            {!activeAddress ? (
              <>
                <p className='text-gray-400 mb-6'>
                  Connect your wallet to claim this NFT badge
                </p>
                <div className='flex flex-col gap-3 mb-4'>
                  {wallets?.map(wallet => (
                    <button
                      key={wallet.id}
                      onClick={async () => await wallet.connect()}
                      className='w-full flex items-center gap-4 p-4 rounded-xl transition-all bg-neutral-700 hover:bg-neutral-600 border border-transparent hover:border-sky-500'
                    >
                      {wallet.metadata.icon && (
                        <img
                          alt={`${wallet.metadata.name} icon`}
                          src={wallet.metadata.icon}
                          className='w-10 h-10 object-contain rounded-lg'
                        />
                      )}
                      <span className='font-semibold text-lg flex-1 text-left text-white'>
                        {wallet.metadata.name}
                      </span>
                      {wallet.isActive && (
                        <span className='text-green-400 text-sm'>
                          ✓ Connected
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                {(!wallets || wallets.length === 0) && (
                  <p className='text-yellow-400 text-sm mb-4'>
                    No wallets detected. Please install Pera or Defly wallet.
                  </p>
                )}
              </>
            ) : (
              <>
                <p className='text-gray-400 mb-4'>
                  Ready to claim! Click below to authorise the transaction.
                </p>
                <button
                  onClick={handleClaim}
                  className='mt-4 px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors shadow-md w-full'
                >
                  Claim NFT Badge
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className='mt-4 text-gray-400 hover:text-white transition-colors text-sm block mx-auto'
            >
              Cancel
            </button>
          </div>
        )}

        {/* Step 2: Transaction Pending */}
        {step === 2 && (
          <div id='step2Content'>
            <div className='spinner mx-auto mb-4'></div>
            <p className='text-xl text-yellow-400 font-semibold mb-2'>
              Processing Transaction
            </p>
            <p className='text-gray-400 mb-4'>
              Please confirm the transaction in your wallet...
            </p>
            {days === 10 && !hasReceivedOnboardingAirdrop() && (
              <p className='text-sm text-sky-400'>
                💰 Sending onboarding reward (0.5 ALGO)...
              </p>
            )}
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div id='step3Content'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-16 w-16 mx-auto text-green-500 mb-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <p className='text-xl text-green-400 font-semibold mb-2'>
              NFT Claimed!
            </p>
            <p className='text-gray-400 mb-4'>
              Your {days} Day Streak Badge is now in your wallet.
            </p>
            {assetId && (
              <p className='text-xs text-sky-400'>Asset ID: {assetId}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
