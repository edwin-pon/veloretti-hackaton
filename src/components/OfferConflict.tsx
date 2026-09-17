import { Button, Notice } from '../ds'
import { useCampaign } from '../lib/campaign-store'

/**
 * The one thing in the source briefing that has to be decided by a person.
 *
 * The concept states 15% and all 458 ad slots carry a -10% sticker, and the
 * briefing never reconciles them. Either number is a defensible campaign; what
 * is not defensible is shipping both. So this offers the choice rather than
 * leaving someone to guess which field to edit, and picking one corrects the
 * other surfaces to it.
 */
export default function OfferConflict() {
  const { campaign, gates, resolveOffer } = useCampaign()
  const conflict = gates.find((gate) => gate.id === 'offer-consistency' && !gate.passed)
  if (!conflict) return null

  const stated = campaign.offer.statedElsewhere
  const options = [
    { pct: campaign.offer.pct, where: 'the concept' },
    ...stated.map((entry) => ({ pct: entry.pct, where: entry.where })),
  ]

  return (
    <Notice title="Offer conflict" tone="attention">
      <span style={{ display: 'block', marginBottom: 18 }}>
        {conflict.detail} Whichever you pick becomes the only discount value on the campaign, and
        the other is treated as an error in the briefing rather than a second offer.
      </span>
      <span style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {options.map((option) => (
          <Button key={option.pct} variant="secondary" onClick={() => resolveOffer(option.pct)}>
            Use {option.pct}%, from {option.where}
          </Button>
        ))}
      </span>
    </Notice>
  )
}
