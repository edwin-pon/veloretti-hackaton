# Brand Studio

Front end for the Veloretti hackathon build of **Brand Studio** — Pon Datalab's
brand-knowledge and campaign-compliance tool.

The flow implemented here is **brand onboarding**: upload a source document, an
agent extracts the rules campaigns must follow, you review and confirm them, and
the confirmed rules land on a brand dashboard.

```
hub → upload → analyzing → review → (next document) → dashboard
```

## Running it

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run check:matrix  # resolve the seeded briefing and run every QA gate
npm run deploy   # build, then publish to Cloudflare Workers
```

Deploying needs a Cloudflare account to target. It is deliberately not in
`wrangler.jsonc` — put it in a local `.env` (gitignored):

```sh
CLOUDFLARE_ACCOUNT_ID=<your account id>
```

Currently live at https://veloretti-brand-studio.nielskorte.workers.dev

The campaign-intake preview is deployed separately, so it does not overwrite
that one:

```sh
npx wrangler deploy --name veloretti-intake-preview
```

https://veloretti-intake-preview.nielskorte.workers.dev/intake

## Where things live

| Path | What it is |
|---|---|
| `src/screens/` | One file per screen in the flow |
| `src/components/Shell.tsx` | Sidebar, breadcrumb and onboarding progress chrome |
| `src/components/FieldCard.tsx` | An extracted field: value, confidence, citation, agent reasoning |
| `src/lib/store.tsx` | All app state and the actions that move the flow along |
| `src/lib/api.ts` | **The backend seam** — see below |
| `src/data/docs.ts` | The three source documents and their extractable fields |
| `src/data/vocab.ts` | Controlled vocabularies for campaign intake: phases, CTAs, platforms, ratios, markets |
| `src/data/briefing.ts` | The growth briefing the intake extracts, and the seed used offline |
| `src/lib/campaign.ts` | The Campaign object and the slot that is the atomic deliverable |
| `src/lib/matrix.ts` | Resolve, brief templating and the QA gates. Deterministic, no model calls |
| `src/lib/briefing-api.ts` | **The campaign-intake seam** |
| `src/ds/` | Pon Datalab design system (compiled React components + CSS tokens) |
| `design/` | The original Design Canvas prototypes this was ported from |

The design system bundle expects `React` on the global scope, so
`src/ds/index.ts` publishes it there before importing the bundle. Those two
imports must stay in that order.

## Campaign intake

A growth briefing is a grid, not a document: one concept projected onto ads, a
landing page and a newsletter. The Veloretti "Back to School 2026" briefing holds
458 ad slots carrying 66 distinct briefs, which is a template with about four
parameters rather than 458 pieces of writing. Intake exists to capture those
parameters and resolve the grid.

`docs/growth-briefing-blueprint.md` is the source those vocabularies were read
from. Change a vocabulary there first, then here.

The flow:

```
briefing → extract → review → resolve → gates → campaign
```

Three things in the model are load-bearing and easy to get wrong:

- **The offer is a mode, not a percentage.** `offer.mode` is `aspiration` or
  `discount`, because the briefing's real mechanic is "no discount unless behind
  on target". In aspiration mode no percentage may appear on any asset. The
  percentage itself is single-sourced, so the source's own contradiction (15% in
  the concept against -10% on every ad sticker) surfaces as a blocking gate
  instead of quietly diverging across surfaces.
- **Language derives from market.** NL to NL, BE to English, DE to DE. It is not
  an axis of its own, and there is no French.
- **The flight date lives on the market.** One window is shared by all three
  markets; only the Dutch in-market dates stagger inside it, so the stagger has
  to reach individual slots rather than sit on the campaign.

The gates in `src/lib/matrix.ts` run on the resolved matrix alone: offer state,
offer consistency, CTA per phase, no price in SEE, platform and ratio validity,
language derivation, market and phase coverage, flighting, scope status,
placeholder copy and asset differentiation. Brand, legal and rendered-dimension
checks belong to the compose stage, where there is an actual asset to measure,
and are deliberately not faked here.

There is a standalone preview of all of this at `/intake`, built from
`src/preview/`. It imports no design system on purpose, because the studio's own
UI is a separate job: change the offer mode or untick a channel-plan row and the
matrix, the briefs and the gates all re-resolve in place.

`npm run check:matrix` resolves the seeded briefing and prints the matrix and
every gate. Two failures are seeded on purpose and are the point of the exercise:
the 15% against -10% conflict, and Germany trailing the other two markets.

## Connecting n8n

`src/lib/api.ts` and `src/lib/briefing-api.ts` are the only files that talk to a
backend. Set:

```sh
VITE_N8N_ANALYSE_URL=https://<your-n8n>/webhook/analyse-document
VITE_N8N_BRIEFING_URL=https://<your-n8n>/webhook/analyse-briefing
```

With it unset, the flow runs against the values baked into the prototype and
fakes the analysis timing, so the demo works offline.

The webhook receives:

- `multipart/form-data` with `brand`, `doc`, `fileName` and `document` when a
  real file was picked, or
- `application/json` with `brand`, `doc` and `fileName` when the sample
  document was used.

It must respond with the extracted values keyed by field key:

```json
{
  "values": {
    "b1": "Veloretti",
    "b4": ["Netherlands", "Germany", "Belgium", "Denmark"],
    "s1": true
  }
}
```

Field keys, types and the confidence scores they are shown against are defined
in `src/data/docs.ts`.

The briefing webhook works the same way, against the field keys in
`src/data/briefing.ts`, and may additionally return `markets`, `channelPlan` and
`propositions`, which the intake edits as tables rather than as fields.

## Not built yet

Campaign intake has its model, its resolver and its gates, but no screens yet:
`CampaignStart`, the briefing upload, the extracted-brief review and the slot
matrix are still to be built on top of `src/lib/matrix.ts`. The Design Canvas
prototype covers all four.

The prototype in `design/` also covers the asset canvas (variant A is the one to
build), the media manager, settings and the platform console. The sidebar shows
those sections disabled.
