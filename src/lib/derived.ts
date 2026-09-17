// Values that are not answers.
//
// A briefing asks for markets; it does not ask which language each market runs
// in, because that follows. It does not ask for the CTA either, because the
// funnel phase decides it. Showing those as editable fields would invite a
// contradiction the gates would then have to catch, so they are computed here
// and rendered read-only.

import { MARKET_LABEL, MARKET_LANGUAGE, PHASES, PHASE_ORDER, PLATFORMS, ANGLES } from '../data/vocab'
import type { Market } from './campaign'

export function deriveField(key: string, markets: Market[]): string {
  switch (key) {
    case 'mk2':
      return markets.length
        ? markets.map((m) => `${m.key} ${MARKET_LANGUAGE[m.key]}`).join(' · ')
        : 'No markets yet'

    case 'mk3': {
      const staggered = markets.filter((m) => m.regions.length)
      if (!staggered.length) return 'No regional stagger: every market runs the window'
      return staggered
        .map(
          (m) =>
            `${MARKET_LABEL[m.key]} · ${m.regions.map((r) => `${r.name} ${r.inMarketDate}`).join(' · ')}`,
        )
        .join('  |  ')
    }

    case 'ch2':
      return Object.values(PLATFORMS)
        .map((p) => `${p.label} runs ${p.phases.join(' and ')}`)
        .join(' · ')

    case 'cr1':
      return PHASE_ORDER.map((phase) => `${phase}: ${PHASES[phase].cta}`).join(' · ')

    case 'cr2':
      return PHASE_ORDER.map((phase) => `${phase}: ${ANGLES[phase]}`).join('  |  ')

    default:
      return ''
  }
}
