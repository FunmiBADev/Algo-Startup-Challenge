import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface StatCardProps {
  value: string | number
  label: string
  icon?: ReactNode
  gradient?: string
  delay?: number
}

export default function StatCard ({
  value,
  label,
  icon,
  gradient,
  delay = 0
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      className={`p-6 rounded-2xl shadow-lg inner-card-bg border-2 ${
        gradient || 'border-sky-600'
      } flex flex-col justify-center items-center text-center backdrop-blur-sm`}
    >
      {icon && <div className='mb-3 text-3xl'>{icon}</div>}
      <div className='text-5xl font-extrabold bg-gradient-to-br from-white via-sky-100 to-sky-400 bg-clip-text text-transparent leading-none mb-2'>
        {value}
      </div>
      <div className='text-sm font-semibold uppercase tracking-wider text-sky-300'>
        {label}
      </div>
    </motion.div>
  )
}
