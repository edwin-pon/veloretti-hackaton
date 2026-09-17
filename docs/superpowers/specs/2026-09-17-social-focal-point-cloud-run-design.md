# Social Focal Point Cloud Run Service

## Purpose

Provide the existing content-aware social-media crop analysis to n8n Cloud
without installing a private n8n node. The service runs the current
`sharp` and `smartcrop-sharp` implementation in Cloud Run and is invoked by
an n8n HTTP Request node.

## Scope

Add a deployable TypeScript HTTP service under
`n8n/social-focal-point`. Extract the current focal-point calculation into
framework-independent code shared by the n8n node wrapper and the HTTP
service. Existing n8n-node behavior, including optional cropped-image
attachments, remains unchanged.

The Cloud Run endpoint returns analysis metadata only. It does not persist
source images or create cropped-image files.

## Deployment

The service deploys to Google Cloud project `dev-pon-ai-platform` in
`europe-west4`. A Docker image installs production dependencies, including
the native `sharp` binary, and starts a process that listens on the Cloud Run
provided `PORT`.

The expected API key is exposed to the container as `API_KEY` from Google
Secret Manager. The Cloud Run service accepts unauthenticated infrastructure
requests because n8n Cloud cannot obtain a Google IAM identity token; the
application rejects requests that do not supply the matching API key.

## API

`POST /v1/analyze` accepts `multipart/form-data`:

- `image`: one required image file.
- `targets`: required JSON text containing an array of target definitions.
  A target is either a supported preset key or an object with `label`,
  `width`, and `height`.

Requests include `X-API-Key`. The handler compares it to `API_KEY` using
constant-time comparison after checking that both values have the same byte
length.

On success, the endpoint returns HTTP 200 with:

```json
{
  "sourceWidth": 4032,
  "sourceHeight": 3024,
  "results": [
    {
      "platform": "Instagram — Story / Reels (9:16)",
      "platformKey": "ig_story",
      "targetWidth": 1080,
      "targetHeight": 1920,
      "focalPoint": {
        "x": 1830,
        "y": 1400,
        "xPercent": 45.4,
        "yPercent": 46.3
      },
      "cssObjectPosition": "45.4% 46.3%",
      "cropBox": {
        "x": 1240,
        "y": 0,
        "width": 1701,
        "height": 3024
      }
    }
  ]
}
```

The response uses the same platform names, keys, pixel coordinates, percent
rounding, and crop boxes as the existing node.

## Validation and errors

- Missing or incorrect API key: HTTP 401.
- Unsupported HTTP method: HTTP 405.
- Missing file, malformed multipart form, malformed `targets`, unsupported
  preset, invalid target dimensions, or unreadable image: HTTP 400.
- Only one uploaded `image` part is allowed.
- Unexpected processing failures: HTTP 500 with a generic error response and
  structured server logging; implementation details are not exposed.

No image data, API keys, or multipart bodies are logged.

## n8n configuration

An n8n HTTP Request node sends a `POST` multipart request. Map the workflow's
binary image to the `image` form field and set `targets` to the requested
preset/custom target JSON. Store the API key in an n8n Header Auth credential
and send it as `X-API-Key`. The node consumes the JSON response directly.

## Tests

Unit tests cover target parsing and validation. Endpoint tests cover successful
multipart analysis, missing/invalid API keys, missing image, invalid targets,
and invalid image bytes. A deterministic local fixture verifies that the
response has the defined metadata structure and does not include image data.
