import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface OnboardingModalProps {
  onClose: () => void
}

const ONBOARDING_STEPS = [
  {
    title: 'Download CareBox Pack App',
    icon: '📱',
    content: (
      <div className='space-y-4'>
        <p className='text-gray-300 leading-relaxed'>
          To experience the full wellness journey, download the CareBox Pack app
          from your app store:
        </p>
        <div className='space-y-3'>
          <a
            href='https://apps.apple.com/us/app/health-tracker-w-carebox-pack/id6747051778'
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-3 p-4 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/50 rounded-xl transition-all group'
          >
            <span className='text-3xl'>📱</span>
            <div className='flex-1'>
              <div className='font-semibold text-white group-hover:text-blue-300 transition-colors'>
                Download for iOS
              </div>
              <div className='text-xs text-gray-400'>App Store</div>
            </div>
            <span className='text-blue-400'>→</span>
          </a>
          <a
            href='https://play.google.com/store/apps/details?id=com.oluwamipo.mycarelifeapp'
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-3 p-4 bg-green-600/20 hover:bg-green-600/30 border border-green-500/50 rounded-xl transition-all group'
          >
            <span className='text-3xl'>🤖</span>
            <div className='flex-1'>
              <div className='font-semibold text-white group-hover:text-green-300 transition-colors'>
                Download for Android
              </div>
              <div className='text-xs text-gray-400'>Google Play Store</div>
            </div>
            <span className='text-green-400'>→</span>
          </a>
        </div>
      </div>
    )
  },
  {
    title: 'Install Algorand Wallet',
    icon: '👛',
    content: (
      <div className='space-y-4'>
        <p className='text-gray-300 leading-relaxed'>
          To claim NFT badges on the Algorand blockchain, you'll need either
          Pera or Defly wallet:
        </p>
        <div className='space-y-3'>
          <div className='p-4 bg-sky-600/20 border border-sky-500/50 rounded-xl'>
            <div className='font-semibold text-white mb-1 flex items-center gap-2'>
              <span className='text-2xl'>💙</span> Pera Wallet
            </div>
            <p className='text-sm text-gray-400'>
              Popular Algorand wallet for iOS and Android
            </p>
          </div>
          <div className='p-4 bg-purple-600/20 border border-purple-500/50 rounded-xl'>
            <div className='font-semibold text-white mb-1 flex items-center gap-2'>
              <span className='text-2xl'>💜</span> Defly Wallet
            </div>
            <p className='text-sm text-gray-400'>
              Alternative Algorand wallet with DEX integration
            </p>
          </div>
        </div>
      </div>
    )
  },
  {
    title: 'Switch to TestNet',
    icon: '🌐',
    content: (
      <div className='space-y-4'>
        <div className='bg-yellow-500/20 border border-yellow-500/50 rounded-xl p-4'>
          <p className='text-yellow-300 font-semibold mb-2'>
            ⚠️ Important: Use TestNet
          </p>
          <p className='text-sm text-yellow-200'>
            This is a demo on Algorand TestNet. Make sure your wallet is set to{' '}
            <strong>TestNet mode</strong> before claiming NFTs.
          </p>
        </div>
        <p className='text-gray-300 leading-relaxed mb-3'>
          Follow these steps in your wallet:
        </p>
        <div className='space-y-4'>
          <div className='bg-blue-600/20 border border-blue-500/50 rounded-xl p-3'>
            <p className='text-blue-300 font-semibold mb-2 flex items-center gap-2'>
              💙 Pera Wallet
            </p>
            <ol className='list-decimal list-inside space-y-1 text-gray-300 text-xs ml-2'>
              <li>Menu → Settings Gear</li>
              <li>Developer Settings</li>
              <li>
                Node Settings → Select{' '}
                <strong className='text-white'>TestNet</strong>
              </li>
            </ol>
          </div>
          <div className='bg-purple-600/20 border border-purple-500/50 rounded-xl p-3'>
            <p className='text-purple-300 font-semibold mb-2 flex items-center gap-2'>
              💜 Defly Wallet
            </p>
            <ol className='list-decimal list-inside space-y-1 text-gray-300 text-xs ml-2'>
              <li>More → Preferences</li>
              <li>Advanced → Developer Mode</li>
              <li>
                Enable <strong className='text-white'>Algorand Testnet</strong>
              </li>
            </ol>
          </div>
        </div>
      </div>
    )
  },
  {
    title: 'Navigate & Claim',
    icon: '🎯',
    content: (
      <div className='space-y-4'>
        <p className='text-gray-300 leading-relaxed mb-4'>
          Follow these steps to claim your NFT badge:
        </p>
        <div className='space-y-3'>
          <div className='flex gap-3'>
            <div className='flex-shrink-0 w-8 h-8 bg-sky-600 rounded-full flex items-center justify-center text-white font-bold text-sm'>
              1
            </div>
            <div className='flex-1'>
              <p className='text-white font-semibold mb-1'>
                Select Streak Milestone
              </p>
              <p className='text-sm text-gray-400'>
                Use the simulator dropdown to set your streak (try 10, 30, 60,
                etc.)
              </p>
            </div>
          </div>
          <div className='flex gap-3'>
            <div className='flex-shrink-0 w-8 h-8 bg-sky-600 rounded-full flex items-center justify-center text-white font-bold text-sm'>
              2
            </div>
            <div className='flex-1'>
              <p className='text-white font-semibold mb-1'>
                Click Achievement Badge
              </p>
              <p className='text-sm text-gray-400'>
                Navigate to Achievements screen and click any claimable badge
              </p>
            </div>
          </div>
          <div className='flex gap-3'>
            <div className='flex-shrink-0 w-8 h-8 bg-sky-600 rounded-full flex items-center justify-center text-white font-bold text-sm'>
              3
            </div>
            <div className='flex-1'>
              <p className='text-white font-semibold mb-1'>Claim Your NFT!</p>
              <p className='text-sm text-gray-400'>
                Approve transactions. First-time users get 0.5 ALGO airdrop!
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
]

export default function OnboardingModal ({ onClose }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onClose()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    onClose()
  }

  const step = ONBOARDING_STEPS[currentStep]

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4'>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className='bg-gradient-to-br from-neutral-900 to-neutral-950 border border-white/10 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden'
      >
        {/* Header */}
        <div className='bg-gradient-to-r from-sky-600/20 to-purple-600/20 border-b border-white/10 p-6'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-3'>
              <span className='text-4xl'>{step.icon}</span>
              <div>
                <h2 className='text-2xl font-bold text-white'>{step.title}</h2>
                <p className='text-sm text-gray-400'>
                  Step {currentStep + 1} of {ONBOARDING_STEPS.length}
                </p>
              </div>
            </div>
            <button
              onClick={handleSkip}
              className='text-gray-400 hover:text-white transition-colors'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>

          {/* Progress Bar */}
          <div className='w-full bg-neutral-700 rounded-full h-2 overflow-hidden'>
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${((currentStep + 1) / ONBOARDING_STEPS.length) * 100}%`
              }}
              transition={{ duration: 0.3 }}
              className='h-full bg-gradient-to-r from-sky-500 to-purple-500'
            />
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className='p-6 overflow-y-auto max-h-[calc(90vh-200px)]'
          >
            {step.content}
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <div className='border-t border-white/10 p-6 flex justify-between gap-3'>
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className='px-6 py-3 bg-neutral-700 hover:bg-neutral-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all disabled:hover:bg-neutral-700'
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className='px-6 py-3 bg-gradient-to-r from-sky-600 to-purple-600 hover:from-sky-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all'
          >
            {currentStep === ONBOARDING_STEPS.length - 1
              ? 'Get Started!'
              : 'Next'}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
