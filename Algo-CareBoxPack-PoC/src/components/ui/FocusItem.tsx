import React from 'react'
import { motion } from 'framer-motion'
import { HiChevronRight } from 'react-icons/hi'

interface FocusItemProps {
  emoji: string
  title: string
  subtitle: string
  delay?: number
  onClick?: () => void
}

export default function FocusItem ({
  emoji,
  title,
  subtitle,
  delay = 0,
  onClick
}: FocusItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ x: 4, transition: { duration: 0.2 } }}
      onClick={onClick}
      className='flex items-center justify-between p-5 rounded-xl inner-card-bg cursor-pointer group hover:bg-opacity-80 transition-all duration-300 border border-transparent hover:border-white/10'
    >
      <div className='flex items-center space-x-4'>
        <div className='text-3xl transform group-hover:scale-110 transition-transform duration-300'>
          {emoji}
        </div>
        <div>
          <h4 className='font-semibold text-lg mb-1 group-hover:text-sky-300 transition-colors'>
            {title}
          </h4>
          <p className='text-sm text-gray-400 leading-relaxed'>{subtitle}</p>
        </div>
      </div>
      <HiChevronRight className='h-6 w-6 text-gray-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-all duration-300' />
    </motion.div>
  )
}
