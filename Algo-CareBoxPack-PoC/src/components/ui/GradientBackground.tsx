import React, { useEffect, useState } from 'react'

interface GradientBackgroundProps {
  children: React.ReactNode
}

type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night'

/**
 * Web version of GradientBackground component
 * Matches the mobile app's gradient styling with time-of-day colors
 */
export function GradientBackground ({ children }: GradientBackgroundProps) {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('morning')

  useEffect(() => {
    const determineTimeOfDay = () => {
      const hour = new Date().getHours()
      if (hour >= 5 && hour < 12) {
        return 'morning'
      } else if (hour >= 12 && hour < 17) {
        return 'afternoon'
      } else if (hour >= 17 && hour < 21) {
        return 'evening'
      } else {
        return 'night'
      }
    }

    setTimeOfDay(determineTimeOfDay())

    // Update every hour
    const intervalId = setInterval(() => {
      setTimeOfDay(determineTimeOfDay())
    }, 60 * 60 * 1000)

    return () => clearInterval(intervalId)
  }, [])

  // Define gradient colors based on time of day
  // Matching the mobile app's GradientBackground colors
  const getGradientColors = (): string => {
    switch (timeOfDay) {
      case 'morning':
        // Blue to indigo to deep purple (energizing morning)
        return 'linear-gradient(to bottom right, #0288D1, #3949AB, #540773)'
      case 'afternoon':
        // Deep blue to teal to burgundy (balanced afternoon)
        return 'linear-gradient(to bottom right, #044063, #008080, #6e2736)'
      case 'evening':
        // Burgundy to bright blue to deep blue (transitional evening)
        return 'linear-gradient(to bottom right, #01579B, #6e2736, #01579B)'
      case 'night':
        // Dark Blue to Burgundy to Deep purple
        return 'linear-gradient(to bottom right, #6e2736, #4A8FE7, #044063)'
      default:
        // Fallback gradient
        return 'linear-gradient(to bottom right, #7C4DFF, #008080, #03DAC6)'
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: getGradientColors(),
        position: 'relative',
        width: '100%',
        height: '100%'
      }}
    >
      {children}
    </div>
  )
}

