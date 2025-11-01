import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiX, HiCheckCircle, HiExclamationCircle, HiInformationCircle } from 'react-icons/hi'

export interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
}

interface ToastProps {
  toast: Toast
  onClose: () => void
}

function ToastComponent ({ toast, onClose }: ToastProps) {
  const icons = {
    success: HiCheckCircle,
    error: HiExclamationCircle,
    info: HiInformationCircle,
    warning: HiExclamationCircle
  }

  const colors = {
    success: 'bg-green-900/40 border-green-500',
    error: 'bg-red-900/40 border-red-500',
    info: 'bg-blue-900/40 border-blue-500',
    warning: 'bg-yellow-900/40 border-yellow-500'
  }

  const textColors = {
    success: 'text-green-400',
    error: 'text-red-400',
    info: 'text-blue-400',
    warning: 'text-yellow-400'
  }

  const Icon = icons[toast.type]

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      className={`card-bg border-2 ${colors[toast.type]} text-white shadow-2xl relative overflow-hidden p-4 rounded-xl max-w-md`}
    >
      <div className='flex items-center gap-3'>
        <Icon className={`h-6 w-6 ${textColors[toast.type]} flex-shrink-0`} />
        <p className='flex-1 text-sm'>{toast.message}</p>
        <button
          onClick={onClose}
          className='flex-shrink-0 text-gray-400 hover:text-white transition-colors'
        >
          <HiX className='h-5 w-5' />
        </button>
      </div>
    </motion.div>
  )
}

interface ToastContainerProps {
  toasts: Toast[]
  onClose: (id: string) => void
}

export default function ToastContainer ({
  toasts,
  onClose
}: ToastContainerProps) {
  return (
    <div className='fixed top-4 right-4 z-50 space-y-2 pointer-events-none'>
      <AnimatePresence>
        {toasts.map(toast => (
          <div key={toast.id} className='pointer-events-auto'>
            <ToastComponent toast={toast} onClose={() => onClose(toast.id)} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}

