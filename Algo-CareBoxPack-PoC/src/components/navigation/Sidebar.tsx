import React from 'react'
import { ViewId } from '../../types'
import { HiHome, HiCalendar, HiSearch, HiBookmark, HiCog } from 'react-icons/hi'
import logoImage from '../../assets/careboxpack-logo.png'

interface SidebarProps {
  currentView: ViewId
  onNavigate: (view: ViewId) => void
}

export default function Sidebar ({ currentView, onNavigate }: SidebarProps) {
  const menuItems = [
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
    <aside className='w-64 p-6 flex-shrink-0 flex-col justify-between hidden md:flex nav-shell border-r'>
      <div>
        <div className='flex items-center'>
          <img
            src={logoImage}
            alt='CareBox Pack'
            className='h-24 w-auto object-contain'
          />
        </div>

        <div className='mt-8'>
          {menuItems.map(item => {
            const IconComponent = item.icon
            return (
              <div
                key={item.label}
                className={`sidebar-menu-item ${
                  isActive(item.id) ? 'active-link' : ''
                }`}
                onClick={() => onNavigate(item.id)}
              >
                <IconComponent className='h-5 w-5' />
                <span>{item.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
