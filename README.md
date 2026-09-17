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
npm run deploy   # build, then publish to Cloudflare Workers
```

## Where things live

| Path | What it is |
|---|---|
| `src/screens/` | One file per screen in the flow |
| `src/components/Shell.tsx` | Sidebar, breadcrumb and onboarding progress chrome |
| `src/components/FieldCard.tsx` | An extracted field: value, confidence, citation, agent reasoning |
| `src/lib/store.tsx` | All app state and the actions that move the flow along |
| `src/lib/api.ts` | **The backend seam** — see below |
| `src/data/docs.ts` | The three source documents and their extractable fields |
| `src/ds/` | Pon Datalab design system (compiled React components + CSS tokens) |
| `design/` | The original Design Canvas prototypes this was ported from |

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

## Not built yet

The prototype in `design/` also covers campaigns, the asset canvas (variant A is
the one to build), the media manager, settings and the platform console. The
sidebar shows those sections disabled.
