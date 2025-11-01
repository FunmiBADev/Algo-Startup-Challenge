/**
 * NFT Metadata Generator
 * Creates ARC-3 compliant metadata for achievement badges
 */

import { ACHIEVEMENT_BADGES } from './achievementBadges'

interface NFTMetadata {
  name: string
  description: string
  image: string
  attributes: Array<{
    trait_type: string
    value: string | number
  }>
  properties: {
    application: string
    type: string
    milestone: number
    year: number
    colour_theme: string
  }
}

export function generateMetadataForBadge(
  achievementType: keyof typeof ACHIEVEMENT_BADGES,
  year: number
): NFTMetadata {
  const badgeConfig = (ACHIEVEMENT_BADGES[achievementType] as any)[year]
  
  if (!badgeConfig) {
    throw new Error(`Badge config not found for ${achievementType} year ${year}`)
  }

  return {
    name: `${badgeConfig.name} ${year}`,
    description: badgeConfig.description,
    image: badgeConfig.imageUrl,
    attributes: [
      {
        trait_type: 'Achievement Type',
        value: badgeConfig.name.replace(' NFT', '')
      },
      {
        trait_type: 'Streak Duration',
        value: `${badgeConfig.milestone} Days`
      },
      {
        trait_type: 'Year',
        value: String(year)
      },
      {
        trait_type: 'Colour Theme',
        value: badgeConfig.colour.charAt(0).toUpperCase() + badgeConfig.colour.slice(1)
      },
      {
        trait_type: 'Category',
        value: 'Consistency'
      }
    ],
    properties: {
      application: 'CareBox Pack',
      type: 'Achievement Badge',
      milestone: badgeConfig.milestone,
      year: year,
      colour_theme: badgeConfig.colour
    }
  }
}

// Helper to generate all metadata for 2025 POC
export function generateAllPOCMetadata() {
  const badgeTypes: Array<keyof typeof ACHIEVEMENT_BADGES> = [
    'getting_started',
    'monthly_warrior',
    'consistency_champion',
    'quarterly_master',
    'half_year_hero',
    'annual_legend'
  ]

  const metadata: Record<string, NFTMetadata> = {}
  
  for (const type of badgeTypes) {
    metadata[type] = generateMetadataForBadge(type, 2025)
  }

  return metadata
}

// Export metadata for easier access
export const POC_METADATA = generateAllPOCMetadata()

