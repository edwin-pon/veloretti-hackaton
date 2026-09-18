# Veloretti · Brand Studio

Front-end for **Brand Studio**, a marketing-automation tool for the Veloretti brand
workspace. Brand documents go in, machine-checkable rules come out, and every generated
campaign asset is checked against those rules before it can ship.

This is a front-end only build — there is no backend. Agent runs, extraction and
rendering are simulated against a fixed dataset so the whole flow is walkable.

```bash
npm install
npm run dev
```

---

## What it does

1. **Onboarding** — upload the brand book, legal guidelines and style guide one at a
   time. An agent reads each one and returns editable fields, every one carrying a
   confidence score, a citation and its reasoning.
2. **Knowledge base** — the confirmed rules, browsable by topic, plus agent-drafted
   target audiences that need confirming before campaigns can target them.
3. **Campaigns** — start from confirmed brand data or start clean. The agent reads a
   brief or interviews you, then drafts three creative directions.
4. **Asset canvas** — every market × placement × audience on one pannable canvas. Edit
   copy per asset, apply a background across a chosen scope, run the compliance check,
   approve, and render at scale.
5. **Media manager** — the generated campaign shoot plus a mirrored DAM back
   catalogue (1,452 files in total), each described and tagged by the agent, with
   the low-confidence ones queued for review.
6. **Administration** — workspace, team and roles, approval thresholds, channel
   integrations, and an activity log that names which changes were machine-made.

## Stack

- **React 19 + TypeScript + Vite**
- **Zustand** for the application state machine
- **CSS Modules** over design-system tokens — no utility framework, no CSS-in-JS

## Layout

| Path | What it is |
| --- | --- |
| [src/design-system/](src/design-system) | Veloretti tokens and the UI primitives built on them |
| [src/data/](src/data) | The dataset: documents, campaigns, media, compliance rules, target audiences, workspace |
| [src/store/](src/store) | Typed store and derived selectors |
| [src/features/](src/features) | One folder per area: shell, onboarding, knowledge, campaigns, canvas, media, admin |
| [src/assets/](src/assets) | Wordmark, PP Neue Montreal, editorial and campaign photography |

State is deliberately kept in one store rather than in URLs — the flow is a single
guided session, and every screen reads from the same brand and campaign context.

## Campaign imagery

[src/data/campaignMedia.ts](src/data/campaignMedia.ts) holds the generated shoot: two
models (**Ace**, **Ivy**) across two markets (**Netherlands**, **Germany**), each in the
three placement ratios. The German set is shot on cobbled old-town streets with the rider
helmeted — the kind of market adaptation the canvas and compliance screens exist to
manage. Sources were 49 MB of PNGs; they ship as 1200 px JPEGs totalling ~3.6 MB.

The canvas opens on this shoot rather than on placeholder colour: `defaultAssetBackgrounds`
maps each market and placement to its image. Belgium is a Dutch-language market and follows
the Netherlands shoot, using the Ace set so the two stay tellable apart.

Library items render through [`Photo`](src/design-system/components/Photo.tsx), which
falls back to the item's flat brand tone when there is no image, so the synthetic back
catalogue still looks deliberate.

## Design system

Built on the **Veloretti Design System**: PP Neue Montreal, a warm-neutral grey ramp,
pill-shaped controls, 10px card radius, hairline borders and restrained motion. Tokens
live in [src/design-system/tokens/](src/design-system/tokens) and are the only source of
colour, type, spacing and easing.

Two documented departures from the brand system, both needed because this is an internal
review tool rather than a storefront:

- **[Status tokens](src/design-system/tokens/status.css)** — the brand is monochrome and
  reserves the orange for promotions, but compliance outcomes and confidence scores have
  to be legible at a glance. A muted pine (pass), warm ochre (needs review) and the brand
  orange (blocked) sit beside the existing grey ramp. Status colour is always paired with
  a text label, never used alone.
- **[Line icons](src/design-system/components/icons.tsx)** — the brand ships no icon set.
  These are drawn in-house to the documented spec (1.6px stroke, rounded joins) rather
  than pulled from a third-party family.

Generated campaign assets are a separate surface. They are styled from the **extracted**
style guide — the values sitting in `c1`–`c4` and `f1`–`f4` — never from the app's own
tokens. Edit the palette or typeface on the style-guide screen and every mock, canvas
asset and specimen follows. Because the brand here is Veloretti, the two currently
resolve to the same ink, orange and PP Neue Montreal; onboard a different brand book and
the creative changes while the studio chrome stays put.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```
