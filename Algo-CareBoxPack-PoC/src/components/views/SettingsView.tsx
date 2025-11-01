import React from 'react'
import { ViewId } from '../../types'

interface SettingsViewProps {
  onNavigate: (view: ViewId) => void
  onShowOnboarding?: () => void
}

export default function SettingsView ({
  onNavigate,
  onShowOnboarding
}: SettingsViewProps) {
  const settingsItems = [
    { icon: 'purple', label: 'My Account', view: 'home' as ViewId },
    {
      icon: 'green',
      label: 'Restart how to use CareBox Pack',
      view: 'home' as ViewId,
      action: 'onboarding' as const
    },
    { icon: 'yellow', label: 'Achievements', view: 'achievements' as ViewId },
    { icon: 'pink', label: 'Theme', view: 'themeSettings' as ViewId },
    { icon: 'red', label: 'Notifications', view: 'home' as ViewId },
    {
      icon: 'blue',
      label: 'Check for App Updates & Rate Us',
      view: 'home' as ViewId
    },
    { icon: 'teal', label: 'Share CareBox Pack', view: 'home' as ViewId }
  ]

  const dataManagementItems = [
    { icon: 'yellow', label: 'Data', view: 'home' as ViewId },
    { icon: 'cyan', label: 'Help & Support', view: 'home' as ViewId },
    { icon: 'indigo', label: 'Privacy Policy', view: 'home' as ViewId },
    { icon: 'gray', label: 'Terms of Use', view: 'home' as ViewId }
  ]

  const getIconColor = (color: string) => {
    const colors: Record<string, string> = {
      purple: 'text-purple-400',
      green: 'text-green-400',
      yellow: 'text-yellow-400',
      pink: 'text-pink-400',
      red: 'text-red-400',
      blue: 'text-blue-400',
      teal: 'text-teal-400',
      cyan: 'text-cyan-400',
      indigo: 'text-indigo-400',
      gray: 'text-gray-400'
    }
    return colors[color] || 'text-gray-400'
  }

  return (
    <div className='view-content'>
      <h1 className='text-3xl font-bold mb-8'>Settings</h1>

      {/* Profile Header */}
      <div className='text-center mb-10 p-6 rounded-xl inner-card-bg'>
        <div className='mx-auto h-20 w-20 rounded-full bg-slate-700 flex items-center justify-center text-4xl text-gray-300 mb-3'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-10 w-10'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
            />
          </svg>
        </div>
        <h2 className='text-xl font-semibold'>Jojo</h2>
        <p className='text-sm text-gray-400'>
          For personalisation, add user name and manage subscription in My
        </p>
      </div>

      {/* SETTINGS List */}
      <h3 className='text-sm font-semibold uppercase text-gray-500 mb-2 tracking-wider'>
        SETTINGS
      </h3>
      <div className='space-y-1 p-4 card-bg'>
        {settingsItems.map((item, index) => (
          <div
            key={index}
            className='flex items-center justify-between p-3 rounded-lg hover:bg-opacity-70 cursor-pointer'
            onClick={() => {
              if (
                'action' in item &&
                item.action === 'onboarding' &&
                onShowOnboarding
              ) {
                onShowOnboarding()
              } else {
                onNavigate(item.view)
              }
            }}
          >
            <div className='flex items-center space-x-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className={`h-6 w-6 ${getIconColor(item.icon)}`}
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d={
                    item.icon === 'yellow'
                      ? 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                      : 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                  }
                />
              </svg>
              <span className='text-gray-200'>{item.label}</span>
            </div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 text-gray-500'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M9 5l7 7-7 7'
              />
            </svg>
          </div>
        ))}
      </div>

      {/* DATA MANAGEMENT List */}
      <h3 className='text-sm font-semibold uppercase text-gray-500 mt-8 mb-2 tracking-wider'>
        DATA MANAGEMENT
      </h3>
      <div className='space-y-1 p-4 card-bg'>
        {dataManagementItems.map((item, index) => (
          <div
            key={index}
            className='flex items-center justify-between p-3 rounded-lg hover:bg-opacity-70 cursor-pointer'
            onClick={() => onNavigate(item.view)}
          >
            <div className='flex items-center space-x-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className={`h-6 w-6 ${getIconColor(item.icon)}`}
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d={
                    item.icon === 'yellow'
                      ? 'M4 4v5h5M20 20h-5v-5M4 20h5v-5M20 4h-5v5'
                      : 'M8.228 9.274l1.414 1.414M10 12h2v2M8 10V8m12 6c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8z'
                  }
                />
              </svg>
              <span className='text-gray-200'>{item.label}</span>
            </div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 text-gray-500'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M9 5l7 7-7 7'
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  )
}
