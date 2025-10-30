import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface SectionHeaderProps {
  icon: ReactNode
  title: string
  subtitle?: string
  action?: ReactNode
}

export default function SectionHeader ({
  icon,
  title,
  subtitle,
  action
}: SectionHeaderProps) {
  return (
    <div className='flex justify-between items-start mb-6'>
      <div className='flex items-center space-x-3'>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, type: 'spring' }}
          className='p-2 rounded-xl bg-gradient-to-br from-sky-500/20 to-blue-600/20'
        >
          {icon}
        </motion.div>
        <div>
          <h2 className='text-2xl font-bold bg-gradient-to-r from-white via-sky-100 to-sky-400 bg-clip-text text-transparent'>
            {title}
          </h2>
          {subtitle && <p className='text-sm text-gray-400 mt-1'>{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  )
}
