import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  delay?: number
}

export default function Card ({
  children,
  className = '',
  hover = true,
  delay = 0
}: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : {}}
      className={`card-bg p-6 rounded-2xl shadow-xl backdrop-blur-xl border border-white/10 ${className}`}
    >
      {children}
    </motion.div>
  )
}
