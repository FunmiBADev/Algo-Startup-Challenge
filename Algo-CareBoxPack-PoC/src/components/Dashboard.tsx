import React, { useState } from 'react'
import { ViewId } from '../types'
import Sidebar from './navigation/Sidebar'
import BottomNav from './navigation/BottomNav'
import HomeView from './views/HomeView'
import SettingsView from './views/SettingsView'
import AchievementsView from './views/AchievementsView'
import ThemeSettingsView from './views/ThemeSettingsView'

export default function Dashboard () {
  const [currentView, setCurrentView] = useState<ViewId>('home')

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView onNavigate={setCurrentView} />
      case 'settings':
        return <SettingsView onNavigate={setCurrentView} />
      case 'achievements':
        return <AchievementsView onNavigate={setCurrentView} />
      case 'themeSettings':
        return <ThemeSettingsView onNavigate={setCurrentView} />
      default:
        return <HomeView onNavigate={setCurrentView} />
    }
  }

  return (
    <div className='flex flex-col min-h-screen md:flex-row'>
      <Sidebar currentView={currentView} onNavigate={setCurrentView} />
      <main className='flex-1 p-8 overflow-y-auto pb-20 md:pb-8'>
        {renderView()}
      </main>
      <BottomNav currentView={currentView} onNavigate={setCurrentView} />
    </div>
  )
}
