import React from 'react'
import { ViewId } from '../../types'
import { HiHome, HiCalendar, HiSearch, HiBookmark, HiCog } from 'react-icons/hi'

interface BottomNavProps {
  currentView: ViewId
  onNavigate: (view: ViewId) => void
}

export default function BottomNav ({ currentView, onNavigate }: BottomNavProps) {
  const navItems = [
    {
      id: 'home' as ViewId,
      label: 'Home',
      icon: HiHome
    },
    {
      id: 'home' as ViewId,
      label: 'Appointments',
      icon: HiCalendar
    },
    {
      id: 'home' as ViewId,
      label: 'Discover',
      icon: HiSearch
    },
    {
      id: 'home' as ViewId,
      label: 'My Routines',
      icon: HiBookmark
    },
    {
      id: 'settings' as ViewId,
      label: 'Settings',
      icon: HiCog
    }
  ]

  const isActive = (viewId: ViewId) => {
    if (viewId === 'home') return currentView === 'home'
    return currentView === viewId
  }

  return (
    <nav className='fixed bottom-0 left-0 right-0 border-t md:hidden z-20 nav-shell'>
      <div className='flex justify-around items-center h-16 text-xs text-gray-400'>
        {navItems.map(item => {
          const IconComponent = item.icon
          return (
            <div
              key={item.label}
              className={`nav-item ${isActive(item.id) ? 'active-link' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              <IconComponent className='h-6 w-6' />
              <span>{item.label}</span>
            </div>
          )
        })}
      </div>
    </nav>
  )
}
