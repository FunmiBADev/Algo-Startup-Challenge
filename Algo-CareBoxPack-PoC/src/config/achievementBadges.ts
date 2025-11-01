/**
 * Achievement Badge Configuration
 * IPFS URLs for 2025 POC badges
 */

// Year-specific badge configurations
export const ACHIEVEMENT_BADGES = {
  getting_started: {
    2025: {
      name: 'Getting Started NFT',
      unit: 'GS',
      milestone: 10,
      description: 'Achievement badge for completing a 10-day wellness streak in CareBox Pack - 2025 POC',
      icon: '🌱',
      colour: 'blue',
      imageUrl: 'ipfs://bafybeihmv5ec4bimu5yld5wfadc7a6yurlbkpnimiv7uq3ti54eejrwkze/10DaysGetStartedPOC.png',
      metadataUrl: 'ipfs://Qme2MicDHUYcAMcNpkfLrrewaprUo6ig33R46kv3r6rZqB'
    }
  },
  monthly_warrior: {
    2025: {
      name: 'Monthly Warrior NFT',
      unit: 'MW',
      milestone: 30,
      description: 'Achievement badge for completing a 30-day wellness streak in CareBox Pack - 2025 POC',
      icon: '💪',
      colour: 'blue',
      imageUrl: 'ipfs://bafybeihmv5ec4bimu5yld5wfadc7a6yurlbkpnimiv7uq3ti54eejrwkze/30DaysMonthlyWarriorPOC.png',
      metadataUrl: 'ipfs://QmdRP2f8eNYjwRzzhU8rJHwkWqWcWQHrZmD5LNFseAaxsb'
    }
  },
  consistency_champion: {
    2025: {
      name: 'Consistency Champion NFT',
      unit: 'CC',
      milestone: 60,
      description: 'Achievement badge for completing a 60-day wellness streak in CareBox Pack - 2025 POC',
      icon: '👟',
      colour: 'blue',
      imageUrl: 'ipfs://bafybeihmv5ec4bimu5yld5wfadc7a6yurlbkpnimiv7uq3ti54eejrwkze/60DaysConsistencyPOC.png',
      metadataUrl: 'ipfs://QmYhDW5DoMH3TnkywzjAVHQcf84kPwD1FKK35KxVtMrsKe'
    }
  },
  quarterly_master: {
    2025: {
      name: 'Quarterly Master NFT',
      unit: 'QM',
      milestone: 90,
      description: 'Achievement badge for completing a 90-day wellness streak in CareBox Pack - 2025 POC',
      icon: '🍃',
      colour: 'blue',
      imageUrl: 'ipfs://bafybeihmv5ec4bimu5yld5wfadc7a6yurlbkpnimiv7uq3ti54eejrwkze/90DaysQuarterPOC.png',
      metadataUrl: 'ipfs://QmPxzPm4QUJFmHhseazh2s5bSrnJThS8r187N5yjoynUMe'
    }
  },
  half_year_hero: {
    2025: {
      name: 'Half-Year Hero NFT',
      unit: 'HH',
      milestone: 180,
      description: 'Achievement badge for completing a 180-day wellness streak in CareBox Pack - 2025 POC',
      icon: '💪',
      colour: 'blue',
      imageUrl: 'ipfs://bafybeihmv5ec4bimu5yld5wfadc7a6yurlbkpnimiv7uq3ti54eejrwkze/180DaysHalfYearPOC.png',
      metadataUrl: 'ipfs://QmZ6GpvnmyywhXX12DUQ6EvQnsWsCnrGWSrme8pCUUph9y'
    }
  },
  annual_legend: {
    2025: {
      name: 'Annual Legend NFT',
      unit: 'AL',
      milestone: 365,
      description: 'Achievement badge for completing a 365-day wellness streak in CareBox Pack - 2025 POC',
      icon: '⭐',
      colour: 'blue',
      imageUrl: 'ipfs://bafybeihmv5ec4bimu5yld5wfadc7a6yurlbkpnimiv7uq3ti54eejrwkze/365DaysAnnualLegendPOC.png',
      metadataUrl: 'ipfs://Qmd9Ek8McWPsmp3hVQc1SnnpVUNyk15n5WUG4xaiy3PruQ'
    }
  }
} as const

export const MILESTONES = [10, 30, 60, 90, 180, 365] as const

// Current year for POC
export const CURRENT_YEAR = 2025

// Year colour themes
export const YEAR_THEMES = {
  2025: 'blue',
  2026: 'blue',
  2027: 'magenta',
  2028: 'orange',
  2029: 'yellow',
  2030: 'teal'
} as const

// Helper to get badge config for specific year
export function getBadgeConfig(
  achievementType: keyof typeof ACHIEVEMENT_BADGES,
  year: number
) {
  const config = ACHIEVEMENT_BADGES[achievementType]
  if (!config) return undefined
  return (config as any)[year]
}

// Helper to get all badges for a specific year
export function getBadgesForYear(year: number) {
  return [
    (ACHIEVEMENT_BADGES.getting_started as any)[year],
    (ACHIEVEMENT_BADGES.monthly_warrior as any)[year],
    (ACHIEVEMENT_BADGES.consistency_champion as any)[year],
    (ACHIEVEMENT_BADGES.quarterly_master as any)[year],
    (ACHIEVEMENT_BADGES.half_year_hero as any)[year],
    (ACHIEVEMENT_BADGES.annual_legend as any)[year]
  ].filter(Boolean) // Remove undefined entries
}

// Helper to get achievement type by milestone
export function getAchievementTypeByMilestone(milestone: number): keyof typeof ACHIEVEMENT_BADGES | null {
  for (const [type, config] of Object.entries(ACHIEVEMENT_BADGES)) {
    const yearConfig = config[2025]
    if (yearConfig && yearConfig.milestone === milestone) {
      return type as keyof typeof ACHIEVEMENT_BADGES
    }
  }
  return null
}

