import React, { useState, useEffect } from 'react'

interface ClaimModalProps {
  days: number
  onClose: () => void
  onSuccess: () => void
}

export default function ClaimModal ({
  days,
  onClose,
  onSuccess
}: ClaimModalProps) {
  const [step, setStep] = useState(1)

  useEffect(() => {
    // Simulate transaction flow
    const timer1 = setTimeout(() => {
      setStep(2)
    }, 2500)

    const timer2 = setTimeout(() => {
      setStep(3)
      onSuccess()
    }, 4500)

    const timer3 = setTimeout(() => {
      onClose()
    }, 7500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [onClose, onSuccess])

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
          {step === 2 && 'Wallet Connected - Transaction Pending'}
          {step === 3 && 'Claim Successful!'}
        </h2>

        {/* Step 1: QR Code Scan */}
        {step === 1 && (
          <div id='step1Content'>
            <p className='text-gray-400 mb-4'>
              Scan this QR code with your Algorand Wallet to connect and
              authorise the claim.
            </p>
            <div className='p-4 bg-white rounded-lg inline-block transition-opacity duration-500 ease-in-out'>
              <svg
                viewBox='0 0 100 100'
                className='w-48 h-48 mx-auto'
                fill='#1a1a2e'
              >
                <rect width='100' height='100' fill='#FFFFFF' />
                <rect x='10' y='10' width='20' height='20' />
                <rect x='70' y='10' width='20' height='20' />
                <rect x='10' y='70' width='20' height='20' />
                <rect x='40' y='40' width='20' height='20' fill='#38bdf8' />
                <circle cx='50' cy='50' r='10' fill='#1a1a2e' />
                <text
                  x='50'
                  y='52'
                  fontSize='6'
                  textAnchor='middle'
                  fill='#38bdf8'
                  fontWeight='bold'
                >
                  ALGO
                </text>
              </svg>
            </div>
            <p className='text-sky-400 mt-4 text-sm font-semibold'>
              Awaiting Wallet Connection...
            </p>
            <button
              onClick={onClose}
              className='mt-8 text-gray-400 hover:text-white transition-colors text-sm'
            >
              Cancel Claim
            </button>
          </div>
        )}

        {/* Step 2: Transaction Pending */}
        {step === 2 && (
          <div id='step2Content'>
            <div className='spinner mx-auto mb-4'></div>
            <p className='text-xl text-yellow-400 font-semibold mb-2'>
              Transaction Pending
            </p>
            <p className='text-gray-400'>
              Please confirm the transaction on your Algorand Wallet...
            </p>
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
              Your achievement NFT is now in your wallet.
            </p>
            <p className='text-xs text-gray-500'>
              Milestone: {days} Day Streak Badge
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
