# Veloretti Brand Studio

Front end for the Veloretti hackathon build of **Brand Studio** — a
brand-knowledge and campaign-compliance tool.

Single brand, single workspace: this is Veloretti's studio, so there is no brand
switcher and no per-brand state.

The flow implemented here is **brand onboarding**: upload a source document, an
agent extracts the rules campaigns must follow, you review and confirm them, and
the confirmed rules land on a brand knowledge page.

```
hub → upload → analyzing → review → (next document) → dashboard
```

## Running it

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
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
| `src/ds/` | Veloretti design system — bundle, tokens, and the primitives it does not ship |
| `src/assets/` | The official wordmark, black and white |
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

## Connecting n8n

`src/lib/api.ts` is the only file that talks to a backend. Set:

```sh
VITE_N8N_ANALYSE_URL=https://<your-n8n>/webhook/analyse-document
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

The prototype in `design/` also covers campaigns, the asset canvas (variant A is
the one to build), the media manager, settings and the platform console. The
sidebar shows those sections disabled.
