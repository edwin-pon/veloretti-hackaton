# Datalab — Design System

> **DISRUPT. INNOVATE. ACCELERATE.**

Datalab is a data & AI consultancy. Its work spans three focus areas:

- **Data** — data science, analytics, engineering and predictive AI.
- **Technology Innovation** — generative AI & AI agents, web development, UX & UI.
- **Business Innovation** — customer experience, AI maturity scans, agentic commerce, strategy and the digital workforce.

The brand voice is confident and outcome-driven, anchored by measurable results (e.g. "5× faster insights delivery"). Visually it is clean, professional and optimistic: a deep navy ink, a vivid mint accent, soft sky-blue and purple supports, generous white space, rounded white cards, and a classic serif/sans pairing (PT Serif + PT Sans).

This repository is the single source of truth for recreating Datalab interfaces and branded assets.

---

## Sources used to build this system

- **Figma:** *"Datalab - design system.fig"* (attached & mounted read-only). A single page / section containing the button set, focus-area cards, a stat card and the core color swatches. This was the primary source of truth for tokens, type and components.
- **Uploaded brand assets:**
  - `Datalab_dark_tagline.svg` — primary wordmark + tagline lockup (→ `assets/datalab-logo-dark.svg`).
  - `PTSans.ttc`, `PTSerif.ttc` — supplied font collections (→ `fonts/`).

> No codebase or live URL was provided. Everything here is reconstructed from the Figma file and brand assets above. Where the system was silent (e.g. form fields, footer chrome, hover states), conventions are extrapolated from the existing visual language and clearly marked as such.

---

## Components

Exported design-system components (`window.DatalabDesignSystem_adceb3.<Name>`), each paired with a `.d.ts`.

**Component library (`components/`)** — reusable UI primitives, all inline-styled to the brand tokens (20px signature radius, 12px inputs, navy-tinted shadows, mint active indicators):

- *Layout:* **Stack**, **Divider**, **Drawer**
- *Forms:* **Field**, **TextInput** (input/textarea/date), **Select**, **Checkbox**, **RadioGroup**, **Toggle**, **SliderInput**, **SearchBar**
- *Navigation:* **Tabs**, **Breadcrumbs**, **Pagination**, **MenuDropdown**, **Stepper**
- *Feedback:* **AlertBanner**, **Toast**, **ModalDialog** (also confirmation dialogs), **Tooltip**, **ProgressBar**, **Spinner**, **Skeleton**, **Badge**
- *Data display:* **DataTable** (sortable + paginated), **Avatar**, **Accordion**, **EmptyState**

**Page-level components (`ui_kits/`):**

- **Header** — sticky marketing nav
- **Hero** — homepage headline + CTA
- **FocusAreas** — 3-up focus-area card grid
- **StatBand** — stat/metric card row
- **CTASection** — navy conversion band
- **ContactModal** — "Get started" dialog
- **DocsPage** — dark developer-docs surface
- **ProductHero** — reusable dark product-page hero (input bar + CTA)
- **ResultsPreview** — dark technical results/detail page

## Repository index

| Path | What it is |
|---|---|
| `README.md` | This file — context, content & visual foundations, iconography, manifest. |
| `styles.css` | **Entry stylesheet** — `@import`s `colors_and_type.css`. Link this and the brand fonts + tokens resolve. |
| `colors_and_type.css` | All design tokens as CSS variables (color, type, radii, shadow, spacing) + self-hosted `@font-face` rules + semantic helper classes. |
| `tech_tokens.css` | **Technical-mode + dark-mode extension** — semantic state colors, dark surfaces, monospace, code/syntax palette, density tokens, form controls + component classes. `@import`s `colors_and_type.css`; dark mode flips via `[data-theme="dark"]`. See `TECH_DARK_MODE_PLAN.md`. |
| `TECH_DARK_MODE_PLAN.md` | Rationale & spec for the technical/dark-mode extension (API references, dashboards, dev tools). |
| `assets/` | Brand assets — the Datalab wordmark (`datalab-logo-dark.svg`). |
| `fonts/` | Self-hosted PT Sans & PT Serif WOFF files — wired via `@font-face`, no CDN. (`.ttc` originals live in `uploads/`.) |
| `preview/` | Small specimen cards that populate the Design System tab (incl. `dev-components.html` and `openapi-reference.html` for tech mode). |
| `components/` | **Component library** — layout, forms, navigation, feedback, and data-display primitives (see Components above); one showcase card per group. |
| `ui_kits/website/` | UI kit: high-fidelity recreation of the Datalab marketing website (light) + a dark developer-docs surface. |
| `ui_kits/product-page/` | UI kit: reusable **dark-mode technical product-page template** — hero (input bar + CTA) + results page. Generic starting point for any Datalab customer product (developer tool, analyzer, dashboard). |
| `SKILL.md` | Agent Skill manifest so this system can be used inside Claude Code. |

---

## Typography

Two families, both supplied as self-hosted WOFF files in `fonts/` (no CDN). They're wired as `@font-face` rules at the top of `colors_and_type.css`.

**Headings — PT Serif, line-height 1.2.** H1–H4 Bold establish hierarchy; H5–H6 drop to Regular within the same serif family. Heading ink is brand navy `#002C47` on light, `#FFFFFF` on dark.

| Level | Size | Weight |
|---|---|---|
| H1 | 48px | Bold |
| H2 | 36px | Bold |
| H3 | 28px | Bold |
| H4 | 22px | Bold |
| H5 | 18px | Regular |
| H6 | 16px | Regular |

**Body — PT Sans, Regular.** High-emphasis copy (Body Large) uses navy `#002C47`; default/supporting text uses secondary `#4a5068` (light) or `#a0abc6` (dark).

| Level | Size | Line height | Usage |
|---|---|---|---|
| Body Large | 18px | 1.7 | Intro paragraphs, lead copy |
| Body Default | 16px | 1.7 | Standard content |
| Body Small | 14px | 1.6 | Supporting text, notes |
| Caption | 12px | 1.5 | Timestamps, labels, metadata |

Plus a brand **display** figure (PT Serif Bold 44px / 1.1, `-0.5px` tracking) for stat numbers like `5×`, and a **button** label style (PT Sans Bold 15px, `+0.5px` tracking).

```html
<link rel="stylesheet" href="styles.css"><!-- entry: @font-face + tokens, self-hosted -->
```

> **Navy — resolved.** Brand navy **`#002C47`** is the single navy across the system: headings/high-emphasis text, logo, buttons, and dark surfaces all use it (the typography spec's alternate `#1A2540` was dropped per direction). Body/supporting text uses secondary `#4a5068` on light and `#a0abc6` on dark. Tokens: `--ink-heading` / `--ink-body` (= `#002C47`), `--ink-secondary`, `--ink-secondary-dark`; `--navy` remains the brand/surface navy.

> **Font note:** the genuine PT Sans / PT Serif WOFF files are self-hosted from `fonts/`, so no Google Fonts request is needed. (The original `.ttc` collections remain in `uploads/` if needed for native/print use.)

---

## CONTENT FUNDAMENTALS

**Tone.** Confident, concrete, results-first. The brand sells outcomes, not jargon. Copy leads with a benefit or a number, then names the capability.

**Casing.** Sentence case for body and most headings; Title Case for proper product/area names ("Technology Innovation", "Data Platforms", "AI Maturity scan"). The tagline is the one all-caps moment: **DISRUPT. INNOVATE. ACCELERATE.** Buttons use Title Case with letter-spacing, not all-caps.

**Person.** Third-person and imperative — describes capabilities ("Data science, analytics, engineering and predictive AI") and invites action ("Learn more →"). Not chatty "we/you"-heavy marketing.

**Numbers & proof.** Metrics are hero content. Set the figure large in PT Serif with a multiplier glyph (`5×`), a lowercase caption beneath ("faster insights delivery"), and the related product/area as a bold label. Use the `×` multiplication sign, not a letter "x".

**Lists.** Capabilities are written as comma-separated runs ("Customer experience, AI Maturity scan, Agentic Commerce, Strategy and Digital workforce") — scannable, no terminal period.

**Links & CTAs.** "Learn more →" with a trailing arrow is the standard inline link. Buttons are short verbs/nouns: Primary action on mint, supporting on navy, low-emphasis as an outline.

**Emoji.** None. The brand is professional B2B; do not introduce emoji. Iconography is geometric, not pictographic.

**Vibe.** Crisp, modern consultancy. Optimistic but credible. Lots of breathing room; never busy.

---

## VISUAL FOUNDATIONS

**Color.** A navy-anchored palette with a single energetic accent.
- **Navy `#002C47`** — primary ink, dark sections, footer, secondary button.
- **Mint `#52E9C0`** — the signature accent; primary CTAs (always with navy text on top).
- **Purple `#B399FF`** & **Sky `#DAE7FE`** — secondary accents for icon wells, chips, decorative blocks.
- **Mist `#F0F4F8`** — neutral surface for section bands and media placeholders.
- **Slate `#5C7185`** — secondary/supporting text.
- **White `#FFFFFF`** — page background and cards.
Use **one** dominant accent per view; mint leads, purple/sky support. Backgrounds are flat color — **no gradients**.

**Type.** PT Serif Bold for display, PT Sans for UI/body (see Typography).

**Spacing.** 8-pt base scale (4 / 8 / 12 / 16 / 24 / 32 / 48 / 64). Cards use 24px internal padding; card grids use 24px gaps; CTA rows use 16px gaps.

**Backgrounds.** Predominantly white, broken up by `#F0F4F8` mist bands and occasional full navy sections. No photography baked into the system (media areas are mist-filled placeholders awaiting real imagery), no repeating textures, no noise, no gradients.

**Cards.** White fill, **20px** corner radius, soft shadow `0 2px 8px rgba(0,44,71,0.08)`, 24px padding, no border. A focus-area card stacks: 48px colored icon well (circle) → PT Serif title 28px → PT Sans body 16px in slate → bold "Learn more →" link. Cards never use a colored left-border accent.

**Corner radii.** `20px` (`--radius-lg`) is the signature radius — **every button, card, chip, and input uses it.** Media wells 12px; small badges 8px; fully-round `999px` pills are reserved strictly for circular icon buttons, avatars, and the brand mark — never for rectangular buttons or chips.

**Buttons.** 20px corner radius (not pill-shaped), 14×28 padding, PT Sans Bold 15 / +0.5px tracking.
- *Primary:* mint fill, navy text.
- *Secondary:* navy fill, white text.
- *Tertiary:* transparent fill, navy text, 2px navy border.

**Hover / press (extrapolated — not specified in source).** Hover: subtle lift — primary mint darkens to `#2FCBA1`, navy lightens to `#013A5E`, cards raise to `0 8px 24px rgba(0,44,71,0.12)`. Press: scale to ~0.98 and use the darker shade (`mint-600` / `navy-900`). Keep transitions short (~150ms ease-out). Links shift opacity / the arrow nudges right.

**Borders & dividers.** Hairlines `#E2E8F0` on light surfaces; most separation comes from shadow and white space rather than strokes.

**Shadows.** Two-step elevation, always tinted with navy (never neutral black): `shadow-card` (resting) and `shadow-raised` (hover/menus). No inner shadows.

**Transparency & blur.** Used sparingly — primarily as low-opacity navy in shadows (`rgba(0,44,71,0.08–0.12)`). No glassmorphism / backdrop-blur in the source.

**Animation (extrapolated).** Restrained and functional: short fades and 2–6px translate-ins, ease-out. No bounces, no parallax, no decorative motion. Respect `prefers-reduced-motion`.

**Imagery vibe.** Where real imagery is added it should read cool and clean — bright, slightly cool-toned, professional/editorial, matching the navy-and-mint palette. Avoid warm or heavily-filtered photography.

**Layout rules.** Centered max-width content with generous margins; focus-area content sits on a 3-column card grid (≈410px cards, 24px gaps). Decorative `#DAE7FE` square blocks (228px) appear as a light geometric motif behind/around content.

---

## ICONOGRAPHY

The Figma source contains **no icon set** — focus areas are represented by plain 48px colored **circle "wells"** (sky / purple / mint), and direction is conveyed with a typographic arrow **"→"** in the "Learn more →" links. There is no built-in icon font, no SVG icon library, and no emoji or unicode-symbol usage beyond the arrow and the multiplication sign `×`.

**Approach when icons are needed (substitution — flagged):** because the brand ships none, use **[Lucide](https://lucide.dev)** via CDN — its thin, geometric, rounded-cap stroke style matches Datalab's clean modern feel. Render Lucide glyphs in navy `#002C47` (or white on dark), at ~24px, ~2px stroke, and seat them inside the 48px colored wells to stay on-brand. This is a substitution, not an official Datalab set.

```html
<script src="https://unpkg.com/lucide@latest"></script>
<!-- <i data-lucide="database"></i> then lucide.createIcons(); -->
```

**Assets present:**
- `assets/datalab-logo-navy.svg` — **canonical** Datalab wordmark + "DISRUPT. INNOVATE. ACCELERATE." tagline, in navy `#002C47`. This is the primary logo color.
- `assets/datalab-logo-dark.svg` — original near-black ink version (kept as supplied).

**Placement:** navy logo on white or on **sky `#DAE7FE`** (the sky-on-rounded-block lockup is the standard email-signature treatment). On navy/dark backgrounds use the white knock-out (`filter: brightness(0) invert(1)`). No other logos, app icons, or illustrations were provided — request them if needed.
