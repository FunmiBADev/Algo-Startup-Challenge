import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react'
import { StreakData } from '../types'

interface StreakContextType {
  currentStreak: number
  currentYear: number
  setStreak: (days: number) => void
  incrementStreak: () => void
  resetStreak: () => void
  claimedBadges: Set<number>
  reachedMilestones: Set<number>
  claimBadge: (milestone: number) => void
  getBadgeStatus: (milestone: number) => 'locked' | 'claimable' | 'claimed'
  getAchievementsStatus: () => Array<{
    milestone: number
    reached: boolean
    claimable: boolean
  }>
  getArchiveYears: () => number[]
  getArchivedBadges: (year: number) => Set<number>
  getArchivedReached: (year: number) => Set<number>
  hasReceivedOnboardingAirdrop: () => boolean
  markOnboardingAirdropReceived: () => void
  syncFromMobile: (data: {
    currentStreak: number
    claimedBadges: number[]
    reachedMilestones: number[]
  }) => void
}

const StreakContext = createContext<StreakContextType | undefined>(undefined)

interface StreakProviderProps {
  children: ReactNode
}

// Helper function to check if we need to reset for new year
const shouldResetForNewYear = (lastDate: Date): boolean => {
  const today = new Date()
  const lastYear = lastDate.getFullYear()
  const currentYear = today.getFullYear()

  // Reset if crossing from Dec 31 to Jan 1 (different years)
  return currentYear > lastYear
}

export function StreakProvider ({ children }: StreakProviderProps) {
  // Get current year
  const getCurrentYear = () => new Date().getFullYear()
  const [currentYear, setCurrentYear] = useState(getCurrentYear())

  const [streakData, setStreakData] = useState<StreakData>(() => {
    const stored = localStorage.getItem('wellnessStreak')
    const storedYear = localStorage.getItem('currentYear')
    const lastDate = new Date()

    if (stored && storedYear) {
      const data = JSON.parse(stored)
      const lastYear = parseInt(storedYear)
      const thisYear = getCurrentYear()

      // Reset if crossing year boundary - but preserve last year's achievements
      if (thisYear > lastYear) {
        // Save last year's data before resetting
        if (lastYear > 0) {
          const lastYearReached = localStorage.getItem(
            `reachedMilestones_${lastYear}`
          )
          const lastYearClaimed = localStorage.getItem(
            `claimedBadges_${lastYear}`
          )

          // Archive last year's data (optional: you can display these separately later)
          if (lastYearReached) {
            localStorage.setItem(`archive_reached_${lastYear}`, lastYearReached)
          }
          if (lastYearClaimed) {
            localStorage.setItem(`archive_claimed_${lastYear}`, lastYearClaimed)
          }
        }

        // Start fresh streak for new year
        localStorage.setItem('currentYear', String(thisYear))
        return {
          currentStreak: 0,
          lastActivityDate: lastDate,
          totalActivities: 0
        }
      }

      return {
        ...data,
        lastActivityDate: new Date(data.lastActivityDate)
      }
    }

    // First time user
    localStorage.setItem('currentYear', String(currentYear))
    return {
      currentStreak: 5, // Demo: Set to 5 days initially
      lastActivityDate: new Date(),
      totalActivities: 5
    }
  })

  // Track claimed badges (year-specific)
  const [claimedBadges, setClaimedBadges] = useState<Set<number>>(() => {
    const stored = localStorage.getItem(`claimedBadges_${currentYear}`)
    return stored ? new Set<number>(JSON.parse(stored)) : new Set<number>()
  })

  // Track reached milestones (permanently unlocked, even if streak drops, year-specific)
  const [reachedMilestones, setReachedMilestones] = useState<Set<number>>(
    () => {
      const stored = localStorage.getItem(`reachedMilestones_${currentYear}`)
      return stored ? new Set<number>(JSON.parse(stored)) : new Set<number>()
    }
  )

  // Track onboarding airdrop status (permanent across all years)
  const [hasOnboardingAirdrop, setHasOnboardingAirdrop] = useState<boolean>(
    () => {
      const stored = localStorage.getItem('hasReceivedOnboardingAirdrop')
      return stored === 'true'
    }
  )

  // Update reached milestones when streak changes
  useEffect(() => {
    const milestones = [10, 30, 60, 90, 180, 365]
    const newReached = milestones.filter(m => streakData.currentStreak >= m)

    if (newReached.length > 0) {
      setReachedMilestones(prev => {
        const newSet = new Set([...prev, ...newReached])
        localStorage.setItem(
          `reachedMilestones_${currentYear}`,
          JSON.stringify([...newSet])
        )
        return newSet
      })
    }
  }, [streakData.currentStreak, currentYear])

  // Claim a badge
  const claimBadge = (milestone: number) => {
    setClaimedBadges(prev => {
      const newSet = new Set(prev)
      newSet.add(milestone)
      localStorage.setItem(
        `claimedBadges_${currentYear}`,
        JSON.stringify([...newSet])
      )
      return newSet
    })
  }

  // Get badge status for a specific milestone
  const getBadgeStatus = (
    milestone: number
  ): 'locked' | 'claimable' | 'claimed' => {
    // If already claimed, show as claimed
    if (claimedBadges.has(milestone)) {
      return 'claimed'
    }
    // If milestone was reached (even if current streak dropped), show as claimable
    if (reachedMilestones.has(milestone)) {
      return 'claimable'
    }
    // If current streak reaches milestone, show as claimable
    if (streakData.currentStreak >= milestone) {
      return 'claimable'
    }
    // Otherwise locked
    return 'locked'
  }

  // Check for year reset on mount and periodically
  useEffect(() => {
    const checkYearReset = () => {
      const currentYearNow = getCurrentYear()

      if (currentYearNow > currentYear) {
        // Year has changed - archive last year's achievements
        const lastYearReached = localStorage.getItem(
          `reachedMilestones_${currentYear}`
        )
        const lastYearClaimed = localStorage.getItem(
          `claimedBadges_${currentYear}`
        )

        if (lastYearReached) {
          localStorage.setItem(
            `archive_reached_${currentYear}`,
            lastYearReached
          )
        }
        if (lastYearClaimed) {
          localStorage.setItem(
            `archive_claimed_${currentYear}`,
            lastYearClaimed
          )
        }

        // Reset for new year
        setCurrentYear(currentYearNow)
        localStorage.setItem('currentYear', String(currentYearNow))

        setStreakData({
          currentStreak: 0,
          lastActivityDate: new Date(),
          totalActivities: 0
        })
        localStorage.setItem(
          'wellnessStreak',
          JSON.stringify({
            currentStreak: 0,
            lastActivityDate: new Date(),
            totalActivities: 0
          })
        )

        // Reset milestones and badges for new year
        setReachedMilestones(new Set<number>())
        setClaimedBadges(new Set<number>())
      }
    }

    checkYearReset()
    // Check daily at midnight
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)
    const msUntilMidnight = tomorrow.getTime() - now.getTime()

    let interval: NodeJS.Timeout | null = null

    const timeout = setTimeout(() => {
      checkYearReset()
      // Then check every 24 hours
      interval = setInterval(checkYearReset, 24 * 60 * 60 * 1000)
    }, msUntilMidnight)

    return () => {
      clearTimeout(timeout)
      if (interval) clearInterval(interval)
    }
  }, [currentYear])

  const setStreak = (days: number) => {
    const newData = {
      currentStreak: days,
      lastActivityDate: new Date(),
      totalActivities: days
    }
    setStreakData(newData)
    localStorage.setItem('wellnessStreak', JSON.stringify(newData))
    localStorage.setItem('currentYear', String(currentYear))
  }

  const incrementStreak = () => {
    setStreakData(prev => {
      const newData = {
        currentStreak: prev.currentStreak + 1,
        lastActivityDate: new Date(),
        totalActivities: prev.totalActivities + 1
      }
      localStorage.setItem('wellnessStreak', JSON.stringify(newData))
      localStorage.setItem('currentYear', String(currentYear))
      return newData
    })
  }

  const resetStreak = () => {
    const newData = {
      currentStreak: 0,
      lastActivityDate: new Date(),
      totalActivities: 0
    }
    setStreakData(newData)
    localStorage.setItem('wellnessStreak', JSON.stringify(newData))
    localStorage.setItem('currentYear', String(currentYear))
  }

  const getAchievementsStatus = () => {
    const milestones = [10, 30, 60, 90, 180, 365]
    return milestones.map(milestone => ({
      milestone,
      reached: streakData.currentStreak >= milestone,
      claimable: streakData.currentStreak >= milestone
    }))
  }

  // Get list of years with archived achievements
  const getArchiveYears = (): number[] => {
    const years: number[] = []
    for (let year = 2020; year < getCurrentYear(); year++) {
      const archivedReached = localStorage.getItem(`archive_reached_${year}`)
      const archivedClaimed = localStorage.getItem(`archive_claimed_${year}`)
      if (archivedReached || archivedClaimed) {
        years.push(year)
      }
    }
    return years.sort((a, b) => b - a) // Most recent first
  }

  // Get archived claimed badges for a year
  const getArchivedBadges = (year: number): Set<number> => {
    const stored = localStorage.getItem(`archive_claimed_${year}`)
    return stored ? new Set<number>(JSON.parse(stored)) : new Set<number>()
  }

  // Get archived reached milestones for a year
  const getArchivedReached = (year: number): Set<number> => {
    const stored = localStorage.getItem(`archive_reached_${year}`)
    return stored ? new Set<number>(JSON.parse(stored)) : new Set<number>()
  }

  // Check if user has received onboarding airdrop
  const hasReceivedOnboardingAirdrop = () => {
    return hasOnboardingAirdrop
  }

  // Mark onboarding airdrop as received (permanent across all years)
  const markOnboardingAirdropReceived = () => {
    setHasOnboardingAirdrop(true)
    localStorage.setItem('hasReceivedOnboardingAirdrop', 'true')
  }

  // Sync data from mobile app - updates both state and localStorage
  const syncFromMobile = (data: {
    currentStreak: number
    claimedBadges: number[]
    reachedMilestones: number[]
  }) => {
    console.log('Syncing data from mobile app:', data)

    // Update streak
    if (data.currentStreak > 0) {
      setStreak(data.currentStreak)
    }

    // Update claimed badges
    if (data.claimedBadges && data.claimedBadges.length > 0) {
      const badgesSet = new Set(data.claimedBadges)
      setClaimedBadges(badgesSet)
      localStorage.setItem(
        `claimedBadges_${currentYear}`,
        JSON.stringify([...badgesSet])
      )
    }

    // Update reached milestones
    if (data.reachedMilestones && data.reachedMilestones.length > 0) {
      const milestonesSet = new Set(data.reachedMilestones)
      setReachedMilestones(milestonesSet)
      localStorage.setItem(
        `reachedMilestones_${currentYear}`,
        JSON.stringify([...milestonesSet])
      )
    }
  }

  return (
    <StreakContext.Provider
      value={{
        currentStreak: streakData.currentStreak,
        currentYear,
        setStreak,
        incrementStreak,
        resetStreak,
        claimedBadges,
        reachedMilestones,
        claimBadge,
        getBadgeStatus,
        getAchievementsStatus,
        getArchiveYears,
        getArchivedBadges,
        getArchivedReached,
        hasReceivedOnboardingAirdrop,
        markOnboardingAirdropReceived,
        syncFromMobile
      }}
    >
      {children}
    </StreakContext.Provider>
  )
}

export function useStreak () {
  const context = useContext(StreakContext)
  if (context === undefined) {
    throw new Error('useStreak must be used within a StreakProvider')
  }
  return context
}
