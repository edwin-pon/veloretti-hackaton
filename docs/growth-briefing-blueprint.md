# Growth Briefing Blueprint — reverse-engineered from Veloretti "Back to School 2026"

Source: Figma `VJ3qSYE8RMu5Yc5YcbfsRb` — *Growth briefing for Back to School 2026 (Copy)*.

Inspected in two passes: `get_metadata` / `get_screenshot` for structure, then **`use_figma` to read actual `characters` from all 1,571+ text nodes**. The second pass was decisive — see §0.

Purpose: turn this hand-built Figma briefing into a **reusable, machine-readable campaign spec** that an AI marketing brand flow can take as input and expand into channel deliverables.

---

## 0. Read this first: layer names lie

Figma layer names in this file are stale copies. The Advertisement page's 458 ad frames all share the layer name:

```
Image Lifestyle Tricycle CTA button Get the deal, Get the discount, Find out more Logo + Discount code + Discount
```

That string appears **nowhere in the actual content**. It is a leftover from a previous campaign. A first pass over layer names concluded "the briefing contains zero headlines" — **wrong**. Reading `node.characters` via `use_figma` revealed **66 distinct real creative briefs**, one per ad slot, each with a structured 6-part anatomy (§1.5).

**Rule for the flow: never ingest a Figma briefing via layer names. Read `characters`.** Same for dimensions — read `width`/`height`, never the `_1x1` suffix.

*(Minor encoding note: one text node contains U+2028 LINE SEPARATOR, which breaks JSON transport over this MCP connection. Sanitise non-ASCII control characters on ingest.)*

---

## Part 1 — What the source briefing actually contains

### 1.1 File anatomy

| Figma page | Node | Role |
|---|---|---|
| `BRIEFING` | `4013:2` | Cover. Campaign name, product line, window, regional dates. |
| `Concept & promotional offer` | `0:1` | The strategy — one 344-char text node (`6001:53`). |
| `Email inspiration` | `6001:4` | Competitor reference board, annotated *"Inspiration: Different types of headers"* / *"…product grids"*. |
| `Landing page` | `4013:17` | Wireframe scaffold, partially real copy. |
| `Advertisement` | `4013:15` | The creative matrix — ~458 briefed ad slots. The engine. |
| `Newsletter` | `4013:16` | Two email wireframes: `Announcement`, `24h left`. |
| `---` ×2 | `6422:2`, `6422:3` | Separators. |

**Structural insight:** the briefing is a **grid**, not a document. Pages 4–7 are one campaign concept projected onto different axes. The grid is what should be generated.

### 1.2 Campaign header (verbatim, `4013:2`)

```
Growth briefing : Back to School
Product line    : Electric
Year            : August 2026
Window          : August 15 - September 1
Back to school dates:
  Noord  - August 17
  Midden - September 1
  Zuid   - August 24
```

**Regional stagger is a first-class field** — one campaign, three in-market dates. Flighting depends on it.

Note these three regions are *Dutch* (Noord / Midden / Zuid). **Belgium and Germany run the same period** — the `August 15 - September 1` window, without a regional stagger. So the regional dates are an NL-only refinement inside a window shared by all three markets.

### 1.3 Concept & offer (verbatim, `6001:53`)

```
Back to school → Return to routine
Crisp mornings, getting back to the office, school runs, effortlessly navigating the city

The art of the commute

Electric 15% discount
No discount (unless behind on target)
Focus on aspiration
Ultimate commute upgrade
Arrive at the office sweat-free, bypassing traffic, design

Languages: Dutch, English and German
Markets: Netherlands, Belgium and Germany
```

| Field | Value |
|---|---|
| Reframe | `Back to school` → `Return to routine` |
| Context cues | crisp mornings, return to office, school runs, navigating the city |
| Campaign line | *The art of the commute* |
| Offer (Electric) | 15% discount |
| Offer (other lines) | none — **conditional**, unlocks only if behind on target |
| Posture | aspiration over discount |
| Value prop | the ultimate commute upgrade |
| Proof points | sweat-free arrival, bypass traffic, design |
| Languages | NL, EN, DE |
| Markets | Netherlands, Belgium, Germany |

**Market → language is 1:1** (confirmed):

| Market | Language | Dates |
|---|---|---|
| Netherlands | `NL` | `August 15 - September 1`, staggered: Noord Aug 17 · Midden Sep 1 · Zuid Aug 24 |
| Belgium | `ENG` | `August 15 - September 1` (same period, no stagger) |
| Germany | `DE` | `August 15 - September 1` (same period, no stagger) |

No French — Belgium runs English.

> **Consequence for the model:** language is *derivable from market*, not an independent axis. That collapses one dimension of the slot matrix — resolve `market`, and language follows. The three language tag counts in the matrix (ENG 134 · NL 124 · DE 86) are therefore per-market volumes, and the DE shortfall is a real coverage gap rather than a tagging artefact.

*"No discount (unless behind on target)"* is the most important mechanic in the brief: **the offer is a switchable state, not a constant.** Model it as `offer.mode ∈ {aspiration, discount}`, never as a baked-in percentage.

> ⚠️ **Live contradiction:** the concept says **15%**, every ad sale sticker says **(-10%)**. Unresolved in the source. A reusable flow must make the discount a single-sourced field so this cannot diverge.

### 1.4 Ad matrix structure (`4013:15`)

Two product tracks — `X` (`6004:2041`) and `Electric` (`6004:2042`) — plus a `FOCUS POINTS` legend (`6060:134`). Each track is banded by funnel phase:

| Phase | Awareness transition (verbatim) |
|---|---|
| `SEE` | Unaware > Solution aware |
| `THINK` | Solution aware > Product aware |
| `DO` | Product aware > Most aware |

Within each phase, slots group by **platform × aspect ratio**:

| Platform | Ratios | Phases |
|---|---|---|
| Google | `1x1`, `4x5`, `1.91x1`, `9x16` | THINK, DO |
| Meta | `1x1`, `9x16` | SEE, THINK, DO |
| TikTok | `9x16` | SEE only |

Frame naming: `<PHASE>_<ratio>`. Pinterest, Snapchat and LinkedIn appear nowhere.

Scope flag (verbatim, ×2): `DE - YouTube / Demand gen Think campaigns TBD (Optional)`

### 1.5 Ad slot brief anatomy — the real payload

Every slot carries a structured brief in this 6-part shape:

```
Concept ‘commute upgrade’
Focus on <funnel angle>

<creative treatment / focus point>

<offer treatment>

CTA button
<cta>

Logo
```

**Funnel angle** is fixed per phase (verbatim):

| Phase | Angle |
|---|---|
| SEE (City) | `Focus on value of City bikes with carrier & basket on your lifestyle` |
| SEE (Kids) | `Focus on value of kids bikes` |
| THINK | `Focus on added value of free bundle/accessories` |
| DO | `Focus on Klarna, availability, trust and the offer (value of €x)` |

**Creative treatment** varies within phase (verbatim):

| Phase | Treatments |
|---|---|
| SEE | `#1` / `#2` / `#3` — `Summer image` or `Summer video`, *"focussed on how our bike/brand makes the commute better"* |
| THINK | `Review - zoomed in product focus (no render)` · `USP 1 - Render images, focussed on the value and urgency of the offer` · `USP 2 - Summer/fall images, focussed on the value and urgency of the offer` |
| DO | `Klarna focus - 3 interest free payments with` · `Klarna logo - Pay later with Klarna` · `Review focus` · `Warranty focus` |

**Offer treatment** — two mutually exclusive variants in THINK/DO:

```
Sale sticker (-10%)        |  From €x to €xx price
```

In SEE there is no offer — a slogan instead: `At the speed of life` (City) or `+ Slogan` (Kids).

**CTA is strictly phase-mapped** (this is the real vocabulary — the layer-name CTAs are dead):

| Phase | CTA |
|---|---|
| SEE | `Get inspired` |
| THINK | `Discover now` |
| DO | `Buy now` |

Most frequent single brief (48 slots): THINK / `Review - zoomed in product focus (no render)` / `Sale sticker (-10%)` / `Discover now`.

**Key insight:** the brief is *compositional*. `phase → angle`, `phase → cta`, and a small set of treatment × offer combinations. 66 distinct briefs across 458 slots is a **template with ~4 parameters**, not 458 bespoke briefs. That is exactly what should be generated rather than hand-placed.

### 1.6 Tag vocabulary (counts from actual text, `FOCUS POINTS` + in-slot chips)

| Axis | Values (count) |
|---|---|
| **Asset type** | `Image` (227) · `Lifestyle (zoomed-in)` (172) · `Video, 15s` (105) · `Lifestyle` (104) · `Render` (95) · `Video, 6s` (44) |
| **Language** | `ENG` (134) · `NL` (124) · `DE` (86) |
| **Platform chip** | `Google` (62) · `Meta\nGoogle` (16) · `Meta` (10) |
| **Focus point** | `Review` · `USP` · `Electric Two` · `City` · `Kids` |

### 1.7 Creative direction note (verbatim, `6060:136`)

> "Let's try to use different images per phase and channel, to differentiate. Let's try to utilise personas and contextual clues that match where our audience is in the funnel"

### 1.8 Landing page (`4013:17`) — real copy

**Nav:** Electric · City · Kids · Lease · Stores · Accessories · Spare parts · About us · Journal · Support · `Book a test ride` · NL · brand tagline **`Forever forward.`**

**Hero:** eyebrow `Back to school/work` → H1 **`Reimagine your routine`** → `subtext` *(unfilled)* → CTAs `Shop Electric` / `Shop City` / `Shop Kids`

**Three propositions**, each = header + body slot + 4-up product collection, with a distinct treatment:

| Proposition | Treatment | Body copy in file |
|---|---|---|
| Electric | plain section | `Something something / with about / 4 lines / of something` *(unfilled)* |
| City | full-bleed text-media | `Mention the bundle, what is included etc.` + `Something super poetic about City bikes, back to school, carrier your bags etc` *(unfilled)* |
| Kids | carousel | `1 slide per bike model` · `discount and usps` · `1/4` *(unfilled)* |

**Products:** `Ace Two Pro` · `Ace Two Lite` · `Ivy Two Pro` · `Ivy Two Lite` · `Electric Ace Two` — each with `USPs`, `Buy`, `€2.999,00`

**Pre-configured PDP** (`6001:957`, mobile): `Caféracer` / *"Made for the city."* / `Colour` → `Blazin Salmon` / `What's included`: `3-speed + Handbrakes`, `Coaster brake`, `AXA Defender Ringslot + 140 cm ketting`, `Porteur drager - zwart` / `€549.00` / `Delivered within 15 days` / `Add to cart`

Then image grid / UGC, then footer with newsletter signup.

### 1.9 Newsletter (`4013:16`)

Two variants, identical skeleton (590×1848):

| Variant | Node | Intent slot (verbatim) |
|---|---|---|
| `Announcement` | `6006:2226` | `Campaign intro` |
| `24h left` | `6006:2245` | `Urgency and last 24h` |

Skeleton: logo → header image (`Title mock-up` + `Sub-title mock-up`) → `Title` + intro + `CTA` → three blocks alternating image left/right → UGC strip → `Terms & conditions` → footer.

| Block | Line | Subline |
|---|---|---|
| Electric | `Upgrade your commute` | `Go Lite or Pro` |
| City | `Subtitle` *(unfilled)* | `Bundle offer` |
| Kids | `Subtitle` *(unfilled)* | `Discount offer` |

Footer: Privacy policy · Terms and conditions · Help center · Manage preferences · Unsubscribe · Instagram · TikTok · © 2026 Veloretti

**Variant = intent parameter, not a separate template.** Same three-proposition spine as the landing page, so one proposition object should feed both surfaces.

Unplaced alternate hero on the page: **`Restoring routine`** / `A new pace`.

### 1.10 Copy lines in play

| Line | Where |
|---|---|
| `Forever forward.` | brand tagline (site footer) |
| `The art of the commute` | campaign line (concept) |
| `Reimagine your routine` | landing hero H1 |
| `Restoring routine` / `A new pace` | unplaced alternate |
| `At the speed of life` | SEE-phase slogan, City |
| `Upgrade your commute` / `Go Lite or Pro` | newsletter, Electric |
| `Made for the city.` | PDP, Caféracer |

### 1.11 Brand tokens (`get_variable_defs`)

```
Core-brown/400        #2a2926   (primary dark)
Secondary-brown/100   #d9d7d4
Neutrals/smoke        #f5f5f4   (light surface)
Neutrals/white        #ffffff

Typeface              PP Neue Montreal
Desktop/Heading/sm    Medium 40 / lh 1.0 / ls 0
Neue Montreal/Text-big Regular 20 / lh 1.5
Text/md               Regular 16 / lh 1.4

Spacing scale         4 · 8 · 12 · 16 · 24 · 32
```

---

## Part 2 — The reusable blueprint

### 2.1 Core model

```
Campaign
├── meta          name, product_line, year, window, regional_dates[]
├── concept       reframe, context_cues[], campaign_line, slogans[], posture
├── offer         mode(aspiration|discount), pct, value, conditions, code
│                 treatments: [sale_sticker, price_was_now]
├── trust_levers  [klarna_instalments, klarna_pay_later, reviews, warranty]
├── propositions  [ { line, headline, body, offer_hook, products[], treatment } ]
├── audiences     [ { persona, funnel_phase, context_cues[] } ]
├── window        start, end                    # shared by all markets
├── markets       [ { market, language, regions: [ { name, in_market_date } ] } ]
│                 NL → nl → [Noord Aug 17, Midden Sep 1, Zuid Aug 24]
│                 BE → eng → []                 # window only
│                 DE → de  → []                 # window only
└── surfaces      landing_page · ads · newsletter · pdp
```

A **slot** — the atomic deliverable:

```
slot = product_track × funnel_phase × platform × ratio × language
       × asset_type × focus_point
```

resolving to a brief:

```
{ angle, treatment, offer_treatment, cta, slogan?, logo: true,
  headline, subline, visual_ref }
```

### 2.2 Controlled vocabularies (lift directly)

```yaml
funnel_phase:
  SEE:   { transition: "Unaware > Solution aware",          cta: "Get inspired" }
  THINK: { transition: "Solution aware > Product aware",    cta: "Discover now" }
  DO:    { transition: "Product aware > Most aware",        cta: "Buy now" }

platform_ratios:
  google: [1x1, 4x5, 1.91x1, 9x16]   # THINK, DO
  meta:   [1x1, 9x16]                # SEE, THINK, DO
  tiktok: [9x16]                     # SEE only

asset_type: [Image, Render, Lifestyle, "Lifestyle (zoomed-in)", "Video, 6s", "Video, 15s"]
focus_point: [Review, USP, "Electric Two", City, Kids]

market:                            # language derives from market — not a free axis
  NL: { language: NL,  regions: { Noord: 2026-08-17, Midden: 2026-09-01, Zuid: 2026-08-24 } }
  BE: { language: ENG, regions: {} }
  DE: { language: DE,  regions: {} }
window: { start: 2026-08-15, end: 2026-09-01 }

treatment:
  SEE:   ["Summer image", "Summer video"]                  # numbered #1..#3
  THINK: ["Review - zoomed in product focus (no render)",
          "USP 1 - Render images",
          "USP 2 - Summer/fall images"]
  DO:    ["Klarna focus - 3 interest free payments",
          "Klarna logo - Pay later with Klarna",
          "Review focus",
          "Warranty focus"]

offer_treatment: ["Sale sticker (-{pct}%)", "From €x to €xx price", null]  # null in SEE
proposition_treatment: [plain_section, full_bleed_text_media, carousel]
newsletter_intent: [campaign_intro, urgency_last_24h]
```

### 2.3 Phase → creative rules (derived from the real briefs)

| Phase | Platforms | Dominant asset | Angle | Offer visible? | CTA |
|---|---|---|---|---|---|
| SEE | Meta, TikTok | Summer image / video | lifestyle value of the bike line | **no** — slogan only | `Get inspired` |
| THINK | Google, Meta | Review zoomed-in, Render, Summer/fall | added value of free bundle/accessories | soft — sticker *or* was/now price | `Discover now` |
| DO | Google, Meta | Render, Image | Klarna, availability, trust, offer value | **yes** | `Buy now` |

This encodes the brief's own instruction: different images per phase and channel, personas and context cues matched to funnel position.

### 2.4 Generation pipeline

```
[0] INGEST      briefing → Campaign object.  Read `characters`, never layer names.
       ↓
[1] RESOLVE     expand matrix → slot list; apply phase rules; drop invalid combos
                (TikTok = SEE only; Google = THINK/DO only; DE YouTube = optional)
       ↓
[2] BRIEF       compose each slot's brief from phase → angle/cta + treatment + offer
                (this is templating, not generation — 66 briefs from ~4 parameters)
       ↓
[3] COPY        per slot: headline + subline, written natively per language
       ↓
[4] VISUAL      select or brief the asset; enforce per-phase/per-channel differentiation
       ↓
[5] COMPOSE     bind copy + visual + logo + offer treatment into the ratio template
       ↓
[6] SURFACE     assemble landing page, newsletter variants, PDP from the same
                proposition objects
       ↓
[7] QA          brand · offer-state · ratio · language · dedupe · legal · coverage
       ↓
[8] EXPORT      per-platform bundles + naming manifest + Figma write-back
```

### 2.5 Stage detail

**[0] Ingest.** Read `node.characters` via `use_figma`, page by page (pages load lazily — `await figma.setCurrentPageAsync(page)` once per call, and fan out across pages in parallel). Sanitise U+2028/U+2029 and other non-ASCII control characters. Derive ratio from dimensions.

**[1] Resolve.** Emit the slot list explicitly *before* generating anything. Make it reviewable and prunable by a human — this is the cheapest intervention point in the whole flow.

**[2] Brief.** Pure templating. `phase` determines angle and CTA; `treatment × offer_treatment` gives the variants. Deterministic and testable — no model call needed.

**[3] Copy.** The genuinely missing layer: the source has structured briefs but **no headlines or sublines**. Hard rules:
- honour `offer.mode` — in `aspiration` mode no percentage appears anywhere;
- CTA from the phase map only, never invented;
- write natively in NL / EN / DE, do not translate the EN output;
- SEE never names a price; DO always carries the offer treatment.

**[4] Visual.** Enforce differentiation as a constraint: no image reused across two phases within a track, none reused across platforms within a phase. Asset type is already specified per slot — pass it through as the generation/selection brief.

**[5] Compose.** One template per ratio, bound to the tokens in §1.11. Slot anatomy: visual + copy + offer treatment + CTA + logo.

**[6] Surface.** Landing page, newsletter and PDP consume the **same** proposition objects — generate once, render three ways. Newsletter variant is an intent parameter.

**[7] QA gates.** All automatable:

| Gate | Check |
|---|---|
| Brand | only `#2a2926` `#d9d7d4` `#f5f5f4` `#ffffff`; PP Neue Montreal; spacing on the 4px scale |
| Offer state | `aspiration` → zero discount tokens. `discount` → offer treatment present on every THINK/DO slot |
| Offer consistency | one discount value across every surface (the source fails this: 15% vs -10%) |
| Ratio | rendered dimensions match the declared ratio (the source fails this too) |
| Language | declared = detected; no mixed-language slots; matrix languages ⊆ declared languages |
| Market coverage | every market resolves to exactly one language and falls inside the window; every market × phase has slots; report per-market volume skew |
| Phase | SEE has no price; DO has offer + CTA `Buy now`; CTA matches phase map |
| Legal | T&C present on every surface carrying an offer |
| Dedupe | visual-reuse rules from [4] |
| Coverage | every resolved slot has a deliverable; report gaps, never drop silently |

**[8] Export.** Deterministic naming — `{track}_{phase}_{platform}_{ratio}_{lang}_{asset}_{focus}_{nn}` — plus a manifest mapping every file to its slot. Naming is the handoff contract.

### 2.6 Human checkpoints

| Gate | After | Decision |
|---|---|---|
| Brief sign-off | [0] | Is the concept, offer mode and regional stagger right? |
| Matrix sign-off | [1] | Is this the right slot set? Prune before spending on generation. |
| Creative sign-off | [7] | Sample per phase × platform, not all 458. |

### 2.7 Gaps in the source brief to close

| Gap | Fix |
|---|---|
| Layer names are stale and contradict content | Ingest `characters` only; treat names as untrusted |
| **15% (concept) vs -10% (every ad sticker)** | Single-source `offer.pct`; consistency gate |
| No headlines or sublines anywhere | Copy generation, stage [3] — the flow's primary value-add |
| ~~DE in the matrix, absent from stated languages~~ | **Resolved** — concept declares Dutch, English and German |
| ~~Belgium has no language assigned~~ | **Resolved** — Belgium runs English. No French needed |
| ~~No in-market dates for BE or DE~~ | **Resolved** — BE and DE use the same window; regional stagger is NL-only |
| DE slot coverage trails NL/ENG (86 vs 124/134) | Now that language = market, this is a real gap. Coverage gate should report it per market |
| Ratio names contradict actual dimensions | Derive ratio from dimensions |
| `subtext`, `Something something 4 lines`, `Subtitle` placeholders | Typed content slots with per-surface length limits |
| `DE YouTube/Demand gen — TBD (optional)` | `status: confirmed \| optional \| tbd` per slot group |
| Regional stagger absent from deliverables | Flight date on every slot, driven by `markets[]` |
| Conditional offer stated in prose only | `offer.mode` switch + QA gate |
| Typos in briefs (`Warrenty`, `focusr`, `USP 2-`) | Generated briefs eliminate the class entirely |

---

## Part 3 — Next step

Smallest useful build: **[0] Ingest → [1] Resolve → [2] Brief → [7] coverage gate.**

Stages [0]–[2] are deterministic — parsing, cross-product expansion and templating, no model calls. They replace the most laborious part of the Figma file (hand-placing 458 tagged, individually-briefed frames) and produce the reviewable slot matrix that every later stage depends on.

Copy generation [3] is the highest-value stage but depends on a resolved matrix, so it comes second.
