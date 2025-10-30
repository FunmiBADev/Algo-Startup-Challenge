import { ThemeMode, TimeOfDay } from '../types'

export const LIGHT_MODE_COLORS_RAW: Record<TimeOfDay, string[]> = {
  morning: ['#0288D1', '#3949AB', '#540773'],
  afternoon: ['#044063', '#008080', '#6e2736'],
  evening: ['#01579B', '#6e2736', '#01579B'],
  night: ['#6e2736', '#4A8FE7', '#044063'],
}

export const DARK_MODE_COLORS_RAW: Record<TimeOfDay, string[]> = {
  morning: ['#0a0209', '#000000', '#000802', '#0a1a2e'],
  afternoon: ['#000802', '#0a1a2e', '#0a0209', '#000000'],
  evening: ['#0a1a2e', '#0a0209', '#000000', '#000802'],
  night: ['#000000', '#0a0209', '#0a1a2e', '#000802'],
}

/**
 * Determines the current segment of the day based on the hour.
 */
export function getTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) {
    return 'morning'
  } else if (hour >= 12 && hour < 17) {
    return 'afternoon'
  } else if (hour >= 17 && hour < 21) {
    return 'evening'
  } else {
    return 'night'
  }
}

/**
 * Generates Tailwind classes for the background gradient.
 * Note: This is kept for compatibility but we use CSS custom properties in applyThemeToBody
 */
export function getGradientClasses(mode: ThemeMode, timeOfDay: TimeOfDay): string {
  const colorMap = mode === 'light' ? LIGHT_MODE_COLORS_RAW : DARK_MODE_COLORS_RAW
  const colors = colorMap[timeOfDay] || colorMap.night

  if (!colors || colors.length < 3) return ''

  const classes = ['bg-gradient-to-br']

  // Handle 3-color gradients (Light Mode)
  if (colors.length === 3) {
    classes.push(`from-[${colors[0]}]`, `via-[${colors[1]}]`, `to-[${colors[2]}]`)
  }
  // Handle 4-color gradients (Dark Mode)
  else if (colors.length === 4) {
    classes.push(
      `from-[${colors[0]}]`,
      `via-[${colors[1]}]`,
      `via-[${colors[2]}]`,
      `to-[${colors[3]}]`
    )
  }

  return classes.join(' ')
}

/**
 * Applies the selected theme mode and dynamic background gradient to the body element.
 * Uses inline styles for reliable gradient rendering with dynamic colors.
 */
export function applyThemeToBody(mode: ThemeMode, timeOfDay: TimeOfDay): void {
  const body = document.body
  const colorMap = mode === 'light' ? LIGHT_MODE_COLORS_RAW : DARK_MODE_COLORS_RAW
  const colors = colorMap[timeOfDay] || colorMap.night

  // Update data-theme attribute
  body.setAttribute('data-theme', mode)
  body.setAttribute('data-time-of-day', timeOfDay)

  // Build gradient string directly for reliable rendering
  if (colors && colors.length >= 3) {
    let gradientString: string

    if (colors.length === 4) {
      // 4-color gradient (Dark Mode): from -> via -> via-2 -> to
      gradientString = `linear-gradient(to bottom right, ${colors[0]} 0%, ${colors[1]} 33%, ${colors[2]} 66%, ${colors[3]} 100%)`
    } else {
      // 3-color gradient (Light Mode): from -> via -> to
      gradientString = `linear-gradient(to bottom right, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`
    }

    // Apply gradient directly as inline style
    body.style.background = gradientString
    body.style.backgroundAttachment = 'fixed'
    body.style.minHeight = '100vh'
    body.style.transition = 'background 0.5s ease'
  }
}

