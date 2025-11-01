import React, { useState } from 'react'
import { ViewId } from '../../types'
import { useStreak } from '../../contexts/StreakContext'
import { ACHIEVEMENTS } from '../../constants/achievements'
import ClaimModal from '../modals/ClaimModal'
import Card from '../ui/Card'
import SectionHeader from '../ui/SectionHeader'
import {
  HiLockClosed,
  HiGift,
  HiArrowLeft,
  HiChevronDown,
  HiChevronUp
} from 'react-icons/hi'
import { FaTrophy } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { FaAward } from 'react-icons/fa'
import { useWallet } from '@txnlab/use-wallet-react'
import {
  getAchievementTypeByMilestone,
  getBadgeConfig,
  CURRENT_YEAR
} from '../../config/achievementBadges'

interface AchievementsViewProps {
  onNavigate: (view: ViewId) => void
}

export default function AchievementsView ({
  onNavigate
}: AchievementsViewProps) {
  const {
    currentStreak,
    currentYear,
    getBadgeStatus,
    claimBadge,
    getArchiveYears,
    getArchivedBadges,
    getArchivedReached
  } = useStreak()
  const { activeAddress, wallets } = useWallet()
  const [showClaimModal, setShowClaimModal] = useState(false)
  const [selectedDays, setSelectedDays] = useState(0)
  const [expandedYears, setExpandedYears] = useState<Set<number>>(new Set())

  // Helper to ellipse address
  const ellipseAddress = (address: string, width = 6): string => {
    return `${address.slice(0, width)}...${address.slice(-width)}`
  }

  // Handle wallet disconnect
  const handleDisconnect = async () => {
    if (wallets) {
      const activeWallet = wallets.find(w => w.isActive)
      if (activeWallet) {
        await activeWallet.disconnect()
      } else {
        localStorage.removeItem('@txnlab/use-wallet:v3')
        window.location.reload()
      }
    }
  }

  // DEMO: Hardcoded archive years for testing (2024 and 2023)
  const demoArchiveYears = [2024, 2023]
  const getDemoArchivedBadges = (year: number): Set<number> => {
    if (year === 2024) return new Set([10, 30, 60, 90]) // 2024: claimed these
    if (year === 2023) return new Set([10, 30]) // 2023: claimed these
    return new Set()
  }
  const getDemoArchivedReached = (year: number): Set<number> => {
    if (year === 2024) return new Set([10, 30, 60, 90, 180]) // 2024: reached these
    if (year === 2023) return new Set([10, 30, 60]) // 2023: reached these
    return new Set()
  }

  const handleClaim = (days: number) => {
    setSelectedDays(days)
    setShowClaimModal(true)
  }

  const handleClaimSuccess = () => {
    claimBadge(selectedDays)
    setShowClaimModal(false)
  }

  const toggleYearExpanded = (year: number) => {
    setExpandedYears(prev => {
      const newSet = new Set(prev)
      if (newSet.has(year)) {
        newSet.delete(year)
      } else {
        newSet.add(year)
      }
      return newSet
    })
  }

  // Helper to get IPFS image URL for a badge
  const getBadgeImageUrl = (milestone: number, year: number): string | null => {
    const achievementType = getAchievementTypeByMilestone(milestone)
    if (!achievementType) return null

    const badgeConfig = getBadgeConfig(achievementType, year)
    if (!badgeConfig) return null

    // Convert ipfs:// to HTTP gateway URL
    const ipfsUrl = badgeConfig.imageUrl
    if (!ipfsUrl || !ipfsUrl.startsWith('ipfs://')) return null

    // Use Pinata gateway or public gateway
    // ipfs://bafybeihmv5ec4bimu5yld5wfadc7a6yurlbkpnimiv7uq3ti54eejrwkze/10DaysGetStartedPOC.png
    // Keep the full path for directory structures
    const ipfsPath = ipfsUrl.replace('ipfs://', '')
    return `https://gateway.pinata.cloud/ipfs/${ipfsPath}`
  }

  const renderBadge = (
    achievement: typeof ACHIEVEMENTS[0],
    index: number,
    badgeStatus?: 'locked' | 'claimable' | 'claimed',
    year?: number
  ) => {
    const status = badgeStatus || getBadgeStatus(achievement.days)
    const displayYear = year || currentYear

    if (status === 'claimed') {
      const badgeImageUrl = getBadgeImageUrl(achievement.days, displayYear)

      return (
        <motion.div
          key={achievement.days}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05, y: -8 }}
          className={`achievement-card ${achievement.bg} border-2 ${achievement.border} text-white shadow-2xl relative overflow-hidden`}
        >
          <div className='absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50' />
          <div className='relative z-10'>
            <div className='h-48 flex items-center justify-center mb-4'>
              {badgeImageUrl ? (
                <img
                  src={badgeImageUrl}
                  alt={`${achievement.name} NFT`}
                  className='max-h-full max-w-full object-contain drop-shadow-lg rounded-lg'
                  onError={e => {
                    // Fallback to emoji if image fails to load
                    console.error('Failed to load badge image:', badgeImageUrl)
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    target.parentElement!.innerHTML = `<span class='text-6xl filter drop-shadow-lg'>${achievement.icon}</span>`
                  }}
                />
              ) : (
                <span className='text-6xl filter drop-shadow-lg'>
                  {achievement.icon}
                </span>
              )}
            </div>
            <div className={`text-xl font-bold ${achievement.color} mb-2`}>
              {achievement.name} NFT
            </div>
            <div className='text-sm font-semibold text-gray-300 mb-3'>
              {achievement.days} Day Streak
            </div>
            <div className='px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm inline-block'>
              <div className='flex items-center gap-2 justify-center'>
                <FaAward className='h-4 w-4' />
                <span className='text-xs uppercase tracking-wider font-bold'>
                  Unlocked
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )
    }

    if (status === 'claimable') {
      return (
        <motion.div
          key={achievement.days}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05, y: -8 }}
          className='achievement-card bg-gradient-to-br from-red-900/60 to-orange-900/40 border-2 border-red-500 text-white shadow-2xl relative overflow-hidden'
        >
          <div className='absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-red-500/20 to-transparent animate-pulse' />
          <div className='relative z-10'>
            <div className='h-16 flex items-center justify-center mb-4'>
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className='text-6xl'
              >
                🎁
              </motion.span>
            </div>
            <div className='text-xl font-bold text-yellow-300 mb-2'>
              {achievement.name} NFT
            </div>
            <div className='text-sm font-semibold text-gray-300 mb-4'>
              {achievement.days} Day Streak
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleClaim(achievement.days)}
              className='w-full px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-xl hover:from-red-600 hover:to-orange-600 transition-all shadow-lg flex items-center justify-center gap-2'
            >
              <HiGift className='h-5 w-5' />
              <span>CLAIM NFT</span>
            </motion.button>
          </div>
        </motion.div>
      )
    }

    return (
      <motion.div
        key={achievement.days}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 }}
        className='achievement-card bg-gray-800/30 border-2 border-dashed border-gray-600 text-gray-400 opacity-70'
      >
        <div className='h-16 flex items-center justify-center mb-4'>
          <HiLockClosed className='h-12 w-12 text-gray-500' />
        </div>
        <div className='text-lg font-bold text-gray-300 mb-2'>
          {achievement.name} NFT
        </div>
        <div className='text-sm font-semibold text-gray-500 mb-3'>
          {achievement.days} Day Streak
        </div>
        <div className='px-4 py-2 rounded-full bg-gray-700/50 inline-block'>
          <span className='text-xs uppercase tracking-wider font-medium'>
            Locked
          </span>
        </div>
        <div className='mt-3 text-xs text-gray-500'>
          {achievement.days - currentStreak} days to unlock
        </div>
      </motion.div>
    )
  }

  return (
    <div className='view-content space-y-8'>
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => onNavigate('settings')}
        className='flex items-center text-sky-400 hover:text-sky-300 transition-colors group'
      >
        <HiArrowLeft className='h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform' />
        <span>Back to Settings</span>
      </motion.button>

      {/* Wallet Connection Status Bar */}
      {activeAddress && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className='card-bg p-4 rounded-xl border border-green-500/30 bg-gradient-to-r from-green-900/30 to-emerald-900/30'
        >
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='w-3 h-3 rounded-full bg-green-500 animate-pulse' />
              <div>
                <div className='text-sm font-semibold text-green-400'>
                  Wallet Connected
                </div>
                <div className='text-xs text-gray-300 font-mono'>
                  {ellipseAddress(activeAddress)}
                </div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDisconnect}
              className='px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold rounded-lg transition-colors'
            >
              Disconnect
            </motion.button>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='space-y-4'
      >
        <h1 className='text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-sky-100 to-sky-400 bg-clip-text text-transparent'>
          My Achievements
        </h1>
        <p className='text-lg text-gray-400'>
          View your consistency milestones. Current Streak:{' '}
          <span className='font-bold text-sky-400 text-xl'>
            {currentStreak} Days
          </span>
        </p>
      </motion.div>

      {/* Current Year Badges */}
      <Card delay={0.1} hover={false}>
        <SectionHeader
          icon={<FaTrophy className='h-6 w-6 text-yellow-400' />}
          title={`${currentYear} NFT Badge Collection`}
          subtitle='Current year achievements and badges'
        />

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {ACHIEVEMENTS.map((achievement, index) =>
            renderBadge(achievement, index)
          )}
        </div>
      </Card>

      {/* Previous Years - Expandable */}
      <Card delay={0.2} hover={false}>
        <SectionHeader
          icon={<FaTrophy className='h-6 w-6 text-purple-400' />}
          title='Previous Years'
          subtitle='View your achievements from past years (Demo: 2024, 2023)'
        />

        <div className='space-y-4'>
          {/* DEMO: Use hardcoded years instead of getArchiveYears() */}
          {demoArchiveYears.map(year => {
            const isExpanded = expandedYears.has(year)
            // DEMO: Use hardcoded data instead of actual archive functions
            const archivedClaimed = getDemoArchivedBadges(year)
            const archivedReached = getDemoArchivedReached(year)

            return (
              <div
                key={year}
                className='border border-white/10 rounded-xl overflow-hidden'
              >
                <button
                  onClick={() => toggleYearExpanded(year)}
                  className='w-full px-4 py-3 flex items-center justify-between bg-white/5 hover:bg-white/10 transition-colors'
                >
                  <div className='flex items-center gap-3'>
                    <span className='text-2xl font-bold text-white'>
                      {year}
                    </span>
                    <span className='text-sm text-white/80'>
                      {archivedClaimed.size} claimed · {archivedReached.size}{' '}
                      reached
                    </span>
                  </div>
                  {isExpanded ? (
                    <HiChevronUp className='h-5 w-5 text-white/70' />
                  ) : (
                    <HiChevronDown className='h-5 w-5 text-white/70' />
                  )}
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className='overflow-hidden'
                    >
                      <div className='p-4 bg-black/20'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                          {ACHIEVEMENTS.map((achievement, index) => {
                            // Determine status for archived year
                            let archivedStatus:
                              | 'locked'
                              | 'claimable'
                              | 'claimed' = 'locked'
                            if (archivedClaimed.has(achievement.days)) {
                              archivedStatus = 'claimed'
                            } else if (archivedReached.has(achievement.days)) {
                              archivedStatus = 'claimable'
                            }

                            return renderBadge(
                              achievement,
                              index,
                              archivedStatus,
                              year
                            )
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </Card>

      {showClaimModal && (
        <ClaimModal
          days={selectedDays}
          onClose={() => setShowClaimModal(false)}
          onSuccess={handleClaimSuccess}
        />
      )}
    </div>
  )
}
