export type ViewId = 'home' | 'settings' | 'achievements' | 'themeSettings'

export type ThemeMode = 'light' | 'dark'

export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night'

export type BadgeStatus = 'claimed' | 'claim-pending' | 'padlock'

export interface StreakData {
  currentStreak: number
  lastActivityDate: Date
  totalActivities: number
}

export interface Achievement {
  days: number
  name: string
  icon: string
  color: string
  bg: string
  border: string
}

export interface BadgeState {
  status: BadgeStatus
  nftAssetId?: number
  claimedAt?: Date
  year?: number
}

export interface AchievementState {
  currentStreak: number
  badges: {
    [milestone: number]: BadgeState
  }
  walletConnected: boolean
  onboardingRewardClaimed: boolean
}

