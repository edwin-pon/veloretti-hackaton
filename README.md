# Veloretti Brand Studio

Front end for the Veloretti hackathon build of **Brand Studio** — a
brand-knowledge and campaign-compliance tool.

Single brand, single workspace: this is Veloretti's studio, so there is no brand
switcher and no per-brand state.

Two flows are implemented. **Brand onboarding**: upload a source document, an
agent extracts the rules campaigns must follow, you review and confirm them, and
the confirmed rules land on a brand knowledge page.

```
hub → upload → analyzing → review → (next document) → dashboard
```

**Campaign intake**: hand over a growth briefing, the agent reads the campaign
out of it, and the confirmed brief resolves into the slots the campaign has to
deliver.

```
campaigns → start → brief upload → analyzing → brief review → slot matrix
```

Campaigns save themselves from the first edit, so a half-read briefing survives
a closed tab. The list shows every draft with the stage it reached and what it
currently resolves to, and continuing one lands on the screen it was left on.

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
| `src/lib/campaign-store.tsx` | Campaign state, and the matrix and gates derived from it |
| `src/lib/campaign-storage.ts` | Autosaved drafts. **The seam to replace with a backend** |
| `src/lib/briefing-api.ts` | **The campaign-intake seam** |
| `src/ds/` | Veloretti design system — bundle, tokens, and the primitives it does not ship |
| `src/assets/` | The official wordmark, black and white |
| `public/samples/` | The documents the demo uploads, as real files |
| `docs/samples/` | Their plain-text sources, and what `scripts/build-samples.sh` builds from |
| `design/` | The original Design Canvas prototypes this was ported from |

## Brand

The UI follows the Veloretti design system (`Veloretti Design System.zip`):
PP Neue Montreal throughout, the warm-neutral grey ramp, pill controls, hairline
borders, 10px cards, sentence-case headlines and uppercase labels at 0.14em.

Two rules worth keeping in mind when extending it:

- **The wordmark is never redrawn or recoloured.** `src/components/Wordmark.tsx`
  renders the supplied SVGs and nothing else.
- **Orange is the tertiary accent and is promo-only.** It appears in exactly one
  place in this app: the flag on a field the agent was unsure about. Everything
  else stays monochrome. Add a second use only on purpose.

Veloretti's own kit is a commerce kit, so it ships no progress bar, stepper,
spinner, toggle, notice or multiline field. Those are built from the brand's
tokens in `src/ds/primitives.tsx`.

The design system bundle expects `React` on the global scope, so
`src/ds/index.ts` publishes it there before importing the bundle. Those two
imports must stay in that order.

## Campaign intake

Six questions, and the answers go to n8n:

| Field | |
|---|---|
| Campaign name | open text |
| Description | open text, several lines |
| Markets | NL, BE; more than one allowed |
| Channels | Meta, Google, TikTok; more than one allowed |
| Audience | open text, as many as apply |
| Bike model | Ace Two, the only one for now |

```
campaigns → new campaign → send to the agent → handed over
```

Name, description, at least one market and at least one channel have to be
answered before the button does anything. Campaigns save themselves from the
first edit, so a half-written brief survives a closed tab, and the list shows
every draft with what it currently says.

An earlier version read a growth briefing here and resolved it into a slot
matrix of 364 deliverables, with QA gates and an export manifest. That lives in
the history, and the reasoning behind it is still in
`docs/growth-briefing-blueprint.md`. The thinking moved to n8n: the studio asks
what the campaign is, and the agent works out what it takes.

## Demo documents

Every document the app offers is a real file in `public/samples`, named exactly
as the app refers to it:

| File | Stands in for |
|---|---|
| `veloretti-visual-language.pdf` | Brand book, 30 pages |
| `legal-marketing-guidelines-v7.docx` | Legal guidelines, 7 sections |
| `veloretti-visual-language-colour-type.pdf` | Colour and type, 11 pages |
| `growth-briefing-back-to-school-2026.pdf` | The growth briefing, 9 pages |

Each one contains the lines the agent is seeded to quote, on the page or in the
section it cites, so a demo holds together if someone opens the source. They are
stand-ins and say so on their own first page: the identity, voice, palette and
type come from Veloretti's own material, the legal document is invented in full,
and so are the page numbers, the confidence scores and the product claims.

Edit `docs/samples/*.txt` and run `sh scripts/build-samples.sh` to rebuild them
(macOS only, it uses `cupsfilter` and `textutil`). The built files are committed,
so this is only needed when a source changes.

Two things follow from the documents being real:

- **Nothing has to be uploaded.** Opening a step attaches its sample already, so
  a demo is a click-through. Remove swaps it for a real document, and the drop
  zone works as it always did.
- **A live webhook gets bytes.** With `VITE_N8N_ANALYSE_URL` set, the sample is
  POSTed as an actual file rather than as a filename.

To skip onboarding altogether, **Fill in the sample documents** on the hub
confirms all three sources at once and opens brand knowledge.

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

### Pushing a campaign back

The handoff screen can POST a resolved campaign straight to n8n. Set:

```sh
VITE_N8N_CAMPAIGN_URL=https://<your-n8n>/webhook/<id>
```

It sends `{ campaign, slots, summary, gates, exportedAt }`, where `campaign` and
`slots` are byte-identical to the JSON that screen downloads, so a mapping built
on the sample file keeps working.

Two n8n details decide whether it appears to work:

- a `/webhook/` URL answers only while its workflow is **active**; a
  `/webhook-test/` one only after someone clicks **Execute workflow**, and then
  once. Both return the same 404 when they are not listening;
- n8n sends no CORS headers unless the Webhook node's allowed origins are set,
  so the browser is usually refused the *response* even though the request
  arrives. The screen says "sent, but not confirmed" in that case rather than
  claiming a delivery it cannot see.

The briefing webhook works the same way, against the field keys in
`src/data/briefing.ts`, and may additionally return `markets`, `channelPlan` and
`propositions`, which the intake edits as tables rather than as fields.

### About the seeded values

`src/data/docs.ts` is demo data, and the two kinds are worth telling apart:

- **Real** — everything under the style guide (palette, type, usage rules) and
  the brand identity, voice and blocked words. These come from the Veloretti
  design system and visual-language guide.
- **Invented** — the legal-rules document in full, every confidence score,
  citation, page number and line of agent reasoning, and the four markets
  (NL/DE/BE/DK). No legal source was provided; the markets are not stated in the
  design system but the campaign story depends on them.

## Not built yet

The prototype in `design/` also covers the asset canvas (variant A is the one to
build), the media manager, settings and the platform console. The sidebar shows
those sections disabled.
