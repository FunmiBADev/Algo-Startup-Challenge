import React, { useState } from 'react'
import { ViewId } from '../../types'
import { useStreak } from '../../contexts/StreakContext'
import { useTheme } from '../../contexts/ThemeContext'
import Card from '../ui/Card'
import StatCard from '../ui/StatCard'
import Badge from '../ui/Badge'
import FocusItem from '../ui/FocusItem'
import SectionHeader from '../ui/SectionHeader'
import { HiChartBar, HiCalendar, HiChevronUp, HiSparkles } from 'react-icons/hi'
import { FaFire } from 'react-icons/fa'
import { FaMedal } from 'react-icons/fa6'
import { motion } from 'framer-motion'

interface FocusItemData {
  emoji: string
  title: string
  subtitle: string
}

interface HomeViewProps {
  onNavigate: (view: ViewId) => void
}

export default function HomeView ({ onNavigate }: HomeViewProps) {
  const { currentStreak, setStreak } = useStreak()
  const { timeOfDay } = useTheme()
  const [selectedMilestone, setSelectedMilestone] = useState(5)

  // Reusable target icon for "Next Target" badges
  const nextTargetIcon = <span className='text-4xl'>🎯</span>

  const getGreeting = (): string => {
    switch (timeOfDay) {
      case 'morning':
        return 'Good morning'
      case 'afternoon':
        return 'Good afternoon'
      case 'evening':
        return 'Good evening'
      case 'night':
        return 'Good evening'
      default:
        return 'Good evening'
    }
  }

  const getFormattedDate = (): string => {
    const today = new Date()
    return today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Achievement badges configuration
  const getAchievementBadges = () => {
    const streak = currentStreak
    const milestones = [10, 30, 60, 90, 180, 365]
    const badges: Array<{
      days: number
      title: string
      subtitle: string
      status: 'locked' | 'available' | 'next'
      icon: React.ReactNode
    }> = []

    if (streak < 10) {
      // Show only "10 days Next target"
      badges.push({
        days: 10,
        title: 'Getting Started',
        subtitle: '(10 Days) Next Target!',
        status: 'next',
        icon: nextTargetIcon
      })
    } else if (streak >= 10 && streak < 30) {
      // Show unlocked 10 days and locked 30 days
      badges.push({
        days: 10,
        title: 'Getting Started',
        subtitle: '(10 Days)',
        status: 'available',
        icon: <FaMedal className='text-4xl text-green-400' />
      })
      badges.push({
        days: 30,
        title: 'Monthly Warrior',
        subtitle: '(30 Days) Next Target!',
        status: 'next',
        icon: nextTargetIcon
      })
    } else if (streak >= 30 && streak < 60) {
      // Show unlocked 30 days and locked 60 days
      badges.push({
        days: 30,
        title: 'Monthly Warrior',
        subtitle: '(30 Days)',
        status: 'available',
        icon: <FaMedal className='text-4xl text-green-400' />
      })
      badges.push({
        days: 60,
        title: 'Consistency Champion',
        subtitle: '(60 Days) Next Target!',
        status: 'next',
        icon: nextTargetIcon
      })
    } else if (streak >= 60 && streak < 90) {
      // Show unlocked 60 days and locked 90 days
      badges.push({
        days: 60,
        title: 'Consistency Champion',
        subtitle: '(60 Days)',
        status: 'available',
        icon: <FaMedal className='text-4xl text-green-400' />
      })
      badges.push({
        days: 90,
        title: 'Quarterly Master',
        subtitle: '(90 Days) Next Target!',
        status: 'next',
        icon: nextTargetIcon
      })
    } else if (streak >= 90 && streak < 180) {
      // Show unlocked 90 days and locked 180 days
      badges.push({
        days: 90,
        title: 'Quarterly Master',
        subtitle: '(90 Days)',
        status: 'available',
        icon: <FaMedal className='text-4xl text-green-400' />
      })
      badges.push({
        days: 180,
        title: 'Half-Year Hero',
        subtitle: '(180 Days) Next Target!',
        status: 'next',
        icon: nextTargetIcon
      })
    } else if (streak >= 180 && streak < 365) {
      // Show unlocked 180 days and locked 365 days
      badges.push({
        days: 180,
        title: 'Half-Year Hero',
        subtitle: '(180 Days)',
        status: 'available',
        icon: <FaMedal className='text-4xl text-green-400' />
      })
      badges.push({
        days: 365,
        title: 'Annual Legend',
        subtitle: '(365 Days) Next Target!',
        status: 'next',
        icon: nextTargetIcon
      })
    } else if (streak >= 365) {
      // Show only unlocked 365 days
      badges.push({
        days: 365,
        title: 'Annual Legend',
        subtitle: '(365 Days)',
        status: 'available',
        icon: <FaMedal className='text-4xl text-green-400' />
      })
    }

    return badges
  }

  const focusItems: FocusItemData[] = [
    {
      emoji: '🧘',
      title: 'Daily Self check in till year end 2025',
      subtitle: '1 wellness activity'
    },
    {
      emoji: '✨',
      title: 'Acne Control Routine',
      subtitle: '7 morning step\n6 evening step'
    },
    {
      emoji: '🍃',
      title: 'A plan for my prescription medication',
      subtitle: '1 morning step\n1 evening step'
    },
    {
      emoji: '🧘',
      title: 'Weekly Gym Workout Plan',
      subtitle: '1 wellness activity'
    }
  ]

  const appointmentItems = [
    {
      checked: false,
      title: 'Start Pre-Care Steps from Fri, Aug 28',
      subtitle: '42 weeks before appointment',
      tags: ['1-on-1 session', 'Start saving money']
    },
    {
      checked: true,
      title: 'Book flights to Mexico',
      subtitle: '3 weeks before appointment',
      tags: []
    }
  ]

  return (
    <div className='view-content space-y-8'>
      {/* Header with Greeting */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='flex justify-between items-center'
      >
        <div>
          <h1 className='text-4xl md:text-5xl font-extrabold mb-2 bg-gradient-to-r from-white via-sky-100 to-sky-400 bg-clip-text text-transparent'>
            {getGreeting()}, Jojo
          </h1>
          <p className='text-lg text-gray-400'>
            Let's take care of your wellness today
          </p>
        </div>
      </motion.div>

      {/* Achievement Tracker Card */}
      <Card hover={false}>
        <SectionHeader
          icon={<HiChartBar className='h-6 w-6 text-sky-400' />}
          title='Streak Tracker'
          action={
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            ></motion.div>
          }
        />

        {/* POC Mode: Dropdown for Streak Testing */}
        <div className='mb-4 p-3 rounded-lg bg-white/5 border border-white/10'>
          <label className='text-xs text-gray-400 block mb-2'>
            🎯 Simulate Achievement Unlock Flow
          </label>
          <select
            value={selectedMilestone}
            onChange={e => {
              const value = Number(e.target.value)
              setSelectedMilestone(value)
              setStreak(value)
            }}
            className='w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:border-sky-400 transition-colors'
          >
            <option value={0}>Reset to 0 Days</option>
            <option value={5}>5 Days (Demo Default)</option>
            <option value={10}>10 Days - Getting Started</option>
            <option value={30}>30 Days - Monthly Warrior</option>
            <option value={60}>60 Days - Consistency Champion</option>
            <option value={90}>90 Days - Quarterly Master</option>
            <option value={180}>180 Days - Half-Year Hero</option>
            <option value={365}>365 Days - Annual Legend</option>
          </select>
          <p className='text-xs text-gray-500 mt-2'>
            Select a milestone to instantly simulate achievement badge unlocks
          </p>
        </div>

        {(() => {
          const achievementBadges = getAchievementBadges()
          const totalItems = 1 + achievementBadges.length // Day Streak + achievement badges

          return (
            <div
              className={`grid gap-3 md:gap-6 ${
                totalItems === 2 ? 'grid-cols-2' : 'grid-cols-3'
              }`}
            >
              <StatCard
                value={currentStreak}
                label='Day Streak'
                icon={<FaFire className='text-orange-400' />}
                gradient='border-orange-500'
                delay={0.1}
              />

              {achievementBadges.map((badge, index) => (
                <Badge
                  key={`${badge.days}-${index}`}
                  icon={badge.icon}
                  title={badge.title}
                  subtitle={badge.subtitle}
                  status={badge.status}
                  delay={0.2 + index * 0.1}
                  onClick={() => onNavigate('achievements')}
                />
              ))}
            </div>
          )
        })()}
      </Card>

      {/* Today's Focus Card */}
      <Card delay={0.2}>
        <SectionHeader
          icon={<HiCalendar className='h-6 w-6 text-amber-400' />}
          title="Today's Focus"
          subtitle={getFormattedDate()}
        />

        <div className='grid grid-cols-2 gap-6 mb-8'>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className='text-center p-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30'
          >
            <div className='text-4xl font-bold bg-gradient-to-br from-white to-purple-200 bg-clip-text text-transparent'>
              4
            </div>
            <div className='text-sm text-gray-400 mt-1 uppercase tracking-wide'>
              Routines
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className='text-center p-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-400/30'
          >
            <div className='text-4xl font-bold bg-gradient-to-br from-white to-emerald-200 bg-clip-text text-transparent'>
              96%
            </div>
            <div className='text-sm text-gray-400 mt-1 uppercase tracking-wide'>
              Completion Rate
            </div>
          </motion.div>
        </div>

        <div className='space-y-3'>
          {focusItems.map((item, index) => (
            <FocusItem
              key={`focus-${index}`}
              emoji={item.emoji}
              title={item.title}
              subtitle={item.subtitle}
              delay={0.1 * index + 0.5}
            />
          ))}
        </div>
      </Card>

      {/* Appointment Prep Card */}
      <Card delay={0.3}>
        <SectionHeader
          icon={<HiCalendar className='h-6 w-6 text-purple-400' />}
          title='Appointment Prep'
        />

        <div className='rounded-2xl p-6 inner-card-bg border border-white/10 bg-gradient-to-br from-purple-500/10 to-pink-500/10'>
          <h3 className='text-xl font-bold mb-2 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent'>
            Summertime Fine & Budget ready: Mexico!
          </h3>
          <p className='text-sm text-gray-400 mb-6'>
            On Fri, Jun 28 2026 at 10:10
          </p>

          <div className='space-y-4'>
            {appointmentItems.map((item, index) => (
              <motion.div
                key={`appointment-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className='flex items-start gap-4 p-4 rounded-xl inner-card-bg hover:bg-opacity-80 transition-all border border-white/5'
              >
                <motion.div whileHover={{ scale: 1.2 }} className='mt-1'>
                  <input
                    type='checkbox'
                    checked={item.checked}
                    className='h-5 w-5 rounded-md border-gray-600 bg-white/10 text-sky-500 focus:ring-sky-400 cursor-pointer'
                    readOnly
                    aria-label={item.title}
                  />
                </motion.div>
                <div className='flex-1'>
                  <h4 className='font-semibold mb-1'>{item.title}</h4>
                  <p className='text-sm text-gray-400 mb-2'>{item.subtitle}</p>
                  {item.tags.length > 0 && (
                    <div className='flex gap-2 flex-wrap'>
                      <span className='px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30'>
                        {item.tags[0]}
                      </span>
                      <span className='px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30'>
                        {item.tags[1]} - $100/month
                      </span>
                    </div>
                  )}
                </div>
                <HiChevronUp className='h-5 w-5 text-gray-500 rotate-90' />
              </motion.div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
