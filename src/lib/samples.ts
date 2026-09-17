// The sample documents in public/samples, fetched as real files.
//
// Every document the app offers as a sample exists in the repo, so a demo does
// not depend on anyone having a brand book to hand, and a live n8n webhook
// receives actual bytes rather than a filename.

/**
 * Fetches a sample by the filename the data refers to it by. Returns undefined
 * when it cannot be read, which leaves the caller with the filename and size it
 * already had: enough for the offline flow, not enough to POST.
 */
export async function loadSample(fileName: string): Promise<File | undefined> {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}samples/${fileName}`)
    if (!response.ok) return undefined
    const blob = await response.blob()
    return new File([blob], fileName, { type: blob.type })
  } catch {
    return undefined
  }
}
