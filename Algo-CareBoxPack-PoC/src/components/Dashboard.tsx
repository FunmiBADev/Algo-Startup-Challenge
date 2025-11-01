import React, { useState, useEffect } from 'react'
import { ViewId } from '../types'
import Sidebar from './navigation/Sidebar'
import BottomNav from './navigation/BottomNav'
import HomeView from './views/HomeView'
import SettingsView from './views/SettingsView'
import AchievementsView from './views/AchievementsView'
import ThemeSettingsView from './views/ThemeSettingsView'
import OnboardingModal from './modals/OnboardingModal'

export default function Dashboard () {
  const [currentView, setCurrentView] = useState<ViewId>('home')
  const [showOnboarding, setShowOnboarding] = useState(false)

  // Check if user has seen onboarding before
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding')
    if (!hasSeenOnboarding) {
      setShowOnboarding(true)
    }
  }, [])

  const handleOnboardingClose = () => {
    setShowOnboarding(false)
    localStorage.setItem('hasSeenOnboarding', 'true')
  }

  const handleShowOnboarding = () => {
    setShowOnboarding(true)
  }

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView onNavigate={setCurrentView} />
      case 'settings':
        return <SettingsView onNavigate={setCurrentView} onShowOnboarding={handleShowOnboarding} />
      case 'achievements':
        return <AchievementsView onNavigate={setCurrentView} />
      case 'themeSettings':
        return <ThemeSettingsView onNavigate={setCurrentView} />
      default:
        return <HomeView onNavigate={setCurrentView} />
    }
  }

  return (
    <>
      <div className='flex flex-col min-h-screen md:flex-row'>
        <Sidebar currentView={currentView} onNavigate={setCurrentView} />
        <main className='flex-1 p-8 overflow-y-auto pb-20 md:pb-8'>
          {renderView()}
        </main>
        <BottomNav currentView={currentView} onNavigate={setCurrentView} />
      </div>
      {showOnboarding && <OnboardingModal onClose={handleOnboardingClose} />}
    </>
  )
}
