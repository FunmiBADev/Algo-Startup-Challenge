import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import AchievementsViewMobileWeb from '../components/views/AchievementsViewMobileWeb'
import { useStreak } from '../contexts/StreakContext'
import { GradientBackground } from '../components/ui/GradientBackground'

/**
 * Mobile-optimized Achievements Page for WebView
 * Can be accessed at /achievementsMobileWeb
 * Accepts URL params from mobile app to sync streak data
 * Uses GradientBackground for consistent mobile app styling
 */
export default function AchievementsMobileWebPage () {
  const [searchParams] = useSearchParams()
  const { syncFromMobile } = useStreak()
  const [hasSynced, setHasSynced] = React.useState(false)
  const [showConsole, setShowConsole] = useState(false)
  const [consoleLogs, setConsoleLogs] = useState<Array<{ type: string; message: string; timestamp: string }>>([])

  // Capture console logs for mobile debugging
  useEffect(() => {
    if (typeof window === 'undefined') return

    const originalLog = console.log
    const originalError = console.error
    const originalWarn = console.warn

    const addLog = (type: string, ...args: any[]) => {
      const message = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ')
      setConsoleLogs(prev => [
        ...prev.slice(-49), // Keep last 50 logs
        { type, message, timestamp: new Date().toLocaleTimeString() }
      ])
    }

    console.log = (...args: any[]) => {
      originalLog(...args)
      addLog('log', ...args)
    }

    console.error = (...args: any[]) => {
      originalError(...args)
      addLog('error', ...args)
    }

    console.warn = (...args: any[]) => {
      originalWarn(...args)
      addLog('warn', ...args)
    }

    return () => {
      console.log = originalLog
      console.error = originalError
      console.warn = originalWarn
    }
  }, [])

  // Handle mobile app data sync via URL params
  useEffect(() => {
    const source = searchParams.get('source')
    if (source === 'mobile-app' && !hasSynced) {
      const currentStreak = parseInt(searchParams.get('currentStreak') || '0', 10)
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

  return (
    <GradientBackground>
      <div className='min-h-screen relative'>
        <AchievementsViewMobileWeb />
        
        {/* Debug Console Toggle Button */}
        <button
          onClick={() => setShowConsole(!showConsole)}
          className='fixed bottom-4 right-4 z-50 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold'
          style={{ zIndex: 9999 }}
        >
          {showConsole ? 'Hide' : 'Show'} Console
        </button>

        {/* Debug Console Panel */}
        {showConsole && (
          <div
            className='fixed bottom-16 right-4 left-4 bg-black/95 border border-gray-700 rounded-lg shadow-2xl z-50'
            style={{ 
              maxHeight: '60vh',
              zIndex: 9998
            }}
          >
            <div className='flex items-center justify-between p-3 border-b border-gray-700'>
              <h3 className='text-white font-semibold'>Console Logs ({consoleLogs.length})</h3>
              <button
                onClick={() => setConsoleLogs([])}
                className='text-gray-400 hover:text-white text-sm'
              >
                Clear
              </button>
            </div>
            <div className='overflow-y-auto p-3' style={{ maxHeight: 'calc(60vh - 50px)' }}>
              {consoleLogs.length === 0 ? (
                <p className='text-gray-500 text-sm'>No logs yet...</p>
              ) : (
                <div className='space-y-1 font-mono text-xs'>
                  {consoleLogs.map((log, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded ${
                        log.type === 'error'
                          ? 'bg-red-900/30 text-red-300'
                          : log.type === 'warn'
                          ? 'bg-yellow-900/30 text-yellow-300'
                          : 'bg-gray-800/50 text-gray-300'
                      }`}
                    >
                      <span className='text-gray-500 text-xs'>{log.timestamp}</span>
                      <span className={`ml-2 ${
                        log.type === 'error' ? 'text-red-400' : 
                        log.type === 'warn' ? 'text-yellow-400' : 
                        'text-blue-400'
                      }`}>
                        [{log.type.toUpperCase()}]
                      </span>
                      <div className='mt-1 break-words whitespace-pre-wrap'>{log.message}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </GradientBackground>
  )
}

