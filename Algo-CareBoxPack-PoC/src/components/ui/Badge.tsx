import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface BadgeProps {
  icon: ReactNode
  title: string
  subtitle: string
  status: 'locked' | 'available' | 'next'
  onClick?: () => void
  delay?: number
}

export default function Badge ({
  icon,
  title,
  subtitle,
  status,
  onClick,
  delay = 0
}: BadgeProps) {
  const baseClasses =
    'p-5 rounded-2xl flex flex-col items-center justify-center shadow-xl transition-all duration-300 backdrop-blur-sm cursor-pointer'

  const statusClasses = {
    locked: 'border-2 border-dashed border-gray-600 opacity-70 bg-gray-700/30',
    available:
      'border-2 border-sky-500 bg-gradient-to-br from-sky-500/20 to-sky-600/10 hover:from-sky-500/30 hover:to-sky-600/20',
    next: 'border-2 border-dashed border-sky-500 bg-gradient-to-br from-amber-500/20 to-orange-500/10 hover:border-sky-400'
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.05, y: -4 }}
      onClick={onClick}
      className={`${baseClasses} ${statusClasses[status]} inner-card-bg`}
    >
      <div className='text-5xl mb-3'>{icon}</div>
      <div className='text-xs font-bold uppercase tracking-wider text-sky-300 mb-1'>
        {title}
      </div>
      <div className='text-xs text-gray-400'>{subtitle}</div>
    </motion.div>
  )
}
