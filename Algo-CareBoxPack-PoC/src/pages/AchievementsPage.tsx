import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import AchievementsView from '../components/views/AchievementsView'
import { useStreak } from '../contexts/StreakContext'

/**
 * Standalone Achievements Page for direct routing
 * Can be accessed at /achievements
 * Accepts URL params from mobile app to sync streak data
 */
export default function AchievementsPage () {
  const [searchParams] = useSearchParams()
  const { syncFromMobile } = useStreak()
  const [hasSynced, setHasSynced] = React.useState(false)

  // Handle mobile app data sync via URL params
  useEffect(() => {
    const source = searchParams.get('source')
    if (source === 'mobile-app' && !hasSynced) {
      const currentStreak = parseInt(
        searchParams.get('currentStreak') || '0',
        10
      )
      const claimedBadgesParam = searchParams.get('claimedBadges')
      const reachedMilestonesParam = searchParams.get('reachedMilestones')

      // Parse badges and milestones
      const claimedBadges = claimedBadgesParam
        ? claimedBadgesParam
            .split(',')
            .map(Number)
            .filter(n => !isNaN(n) && n > 0)
        : []

      const reachedMilestones = reachedMilestonesParam
        ? reachedMilestonesParam
            .split(',')
            .map(Number)
            .filter(n => !isNaN(n) && n > 0)
        : []

      // Sync all data using the context method
      syncFromMobile({
        currentStreak,
        claimedBadges,
        reachedMilestones
      })

      console.log('✅ Mobile app data synced:', {
        currentStreak,
        claimedBadges,
        reachedMilestones
      })

      setHasSynced(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Only run once on mount

  // Dummy navigate function for AchievementsView (not used in standalone mode)
  const handleNavigate = (view: string) => {
    // In standalone mode, we don't navigate - just log
    console.log('Navigate requested:', view)
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
      <AchievementsView onNavigate={handleNavigate} />
    </div>
  )
}
