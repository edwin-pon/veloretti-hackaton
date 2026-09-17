// Deterministic self-check for the intake pipeline: resolve the seeded Back to
// School briefing, print the shape of the matrix and run every QA gate.
//
//   npm run check:matrix
//
// It is a smoke test, not a test suite: it fails only when the resolver throws
// or a blocking gate that is meant to pass starts failing.

import { seedCampaign } from '../src/data/briefing'
import { blockingFailures, resolveSlots, runGates, summarise, briefText } from '../src/lib/matrix'

const campaign = seedCampaign()
const matrix = resolveSlots(campaign)
const summary = summarise(matrix.slots)

console.log(`slots            ${summary.total}`)
console.log(`distinct briefs  ${summary.distinctBriefs}`)
console.log(`by market        ${summary.byMarket.map((m) => `${m.key} ${m.count}`).join(' · ')}`)
console.log(`by phase         ${summary.byPhase.map((p) => `${p.key} ${p.count}`).join(' · ')}`)
console.log(`by platform      ${summary.byPlatform.map((p) => `${p.label} ${p.count}`).join(' · ')}`)
console.log(`by track         ${summary.byTrack.map((t) => `${t.key} ${t.count}`).join(' · ')}`)
console.log(`dropped          ${matrix.dropped.length}`)
console.log('')

const gates = runGates(campaign, matrix)
for (const gate of gates) {
  console.log(`${gate.passed ? 'pass' : gate.severity.toUpperCase()}  ${gate.label}: ${gate.detail}`)
}

console.log('')
console.log('first slot')
console.log(matrix.slots[0].id)
console.log(briefText(matrix.slots[0].brief))

// The offer conflict is seeded on purpose, so it is the one expected failure.
const unexpected = blockingFailures(gates).filter((g) => g.id !== 'offer-consistency')
if (unexpected.length) {
  console.error('\nunexpected blocking failures:', unexpected.map((g) => g.id).join(', '))
  process.exit(1)
}
