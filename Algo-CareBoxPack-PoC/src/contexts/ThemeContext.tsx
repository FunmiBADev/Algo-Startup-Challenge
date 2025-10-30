import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from 'react'
import { ThemeMode, TimeOfDay } from '../types'
import { applyThemeToBody, getTimeOfDay } from '../utils/theme'

interface ThemeContextType {
  currentMode: ThemeMode
  setTheme: (mode: ThemeMode) => void
  timeOfDay: TimeOfDay
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const THEME_KEY = 'wellnessThemeMode'

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider ({ children }: ThemeProviderProps) {
  const [currentMode, setCurrentMode] = useState<ThemeMode>(
    () => (localStorage.getItem(THEME_KEY) as ThemeMode) || 'light'
  )
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>(getTimeOfDay())

  useEffect(() => {
    // Update time of day periodically
    const interval = setInterval(() => {
      setTimeOfDay(getTimeOfDay())
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    applyThemeToBody(currentMode, timeOfDay)
  }, [currentMode, timeOfDay])

  const setTheme = (mode: ThemeMode) => {
    setCurrentMode(mode)
    localStorage.setItem(THEME_KEY, mode)
  }

  return (
    <ThemeContext.Provider value={{ currentMode, setTheme, timeOfDay }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme () {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
