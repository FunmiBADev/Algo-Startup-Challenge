import React from 'react'
import { ViewId } from '../../types'
import { useTheme } from '../../contexts/ThemeContext'

interface ThemeSettingsViewProps {
  onNavigate: (view: ViewId) => void
}

export default function ThemeSettingsView ({
  onNavigate
}: ThemeSettingsViewProps) {
  const { currentMode, setTheme, timeOfDay } = useTheme()

  return (
    <div className='view-content'>
      <button
        onClick={() => onNavigate('settings')}
        className='flex items-center text-sky-400 hover:text-sky-300 mb-6'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5 mr-1'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M15 19l-7-7 7-7'
          />
        </svg>
        Back to Settings
      </button>
      <h1 className='text-3xl font-bold mb-2'>Theme Details</h1>
      <p className='text-gray-400 mb-8'>
        Customise the look and feel of your dashboard.
      </p>

      <div className='card-bg p-6'>
        <h2 className='text-xl font-semibold mb-4'>Current Theme Mode</h2>

        <div className='flex space-x-4 mb-6'>
          <button
            onClick={() => setTheme('light')}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all shadow-md ${
              currentMode === 'light'
                ? 'bg-sky-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-white'
            }`}
          >
            Light Mode
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all shadow-md ${
              currentMode === 'dark'
                ? 'bg-sky-500 text-white'
                : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
            }`}
          >
            Dark Mode
          </button>
        </div>

        <div className='p-4 inner-card-bg rounded-lg'>
          <h3 className='text-lg font-semibold mb-2'>
            Dynamic Background Status
          </h3>
          <p className='text-sm font-medium text-sky-400'>
            Time of Day:{' '}
            {timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)}
          </p>
          <p className='text-sm text-gray-400'>
            Active Mode:{' '}
            {currentMode.charAt(0).toUpperCase() + currentMode.slice(1)} Mode
          </p>
        </div>
      </div>
    </div>
  )
}
