import { Achievement } from '../types'

export const ACHIEVEMENTS: Achievement[] = [
  { days: 10, name: 'Getting Started', icon: '🌱', color: 'text-green-400', bg: 'bg-green-900/40', border: 'border-green-500' },
  { days: 30, name: 'Monthly Warrior', icon: '💪', color: 'text-blue-400', bg: 'bg-blue-900/40', border: 'border-blue-500' },
  { days: 60, name: 'Consistency Champion', icon: '🌟', color: 'text-yellow-400', bg: 'bg-yellow-900/40', border: 'border-yellow-500' },
  { days: 90, name: 'Quarterly Master', icon: '🥇', color: 'text-red-400', bg: 'bg-red-900/40', border: 'border-red-500' },
  { days: 180, name: 'Half-Year Hero', icon: '🦸', color: 'text-purple-400', bg: 'bg-purple-900/40', border: 'border-purple-500' },
  { days: 365, name: 'Annual Legend', icon: '👑', color: 'text-pink-400', bg: 'bg-pink-900/40', border: 'border-pink-500' },
]

export const CURRENT_STREAK = 120 // Mock streak for demo

