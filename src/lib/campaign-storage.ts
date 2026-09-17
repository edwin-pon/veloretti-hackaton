// Campaign drafts, kept in localStorage.
//
// A campaign is a working document: someone reads a briefing, edits half the
// fields, gets pulled into a meeting and comes back. Losing that to a refresh
// is the one failure this flow cannot afford, so every change is written out.
//
// Nothing here talks to a server. When there is a backend, this module is the
// seam to replace, and the record shape is what it has to store.

import type { CampaignState } from './campaign-store'

const KEY = 'veloretti-brand-studio/campaigns/v1'

/** The File a user picked cannot be serialised, so only its description is kept. */
export type StoredCampaignState = Omit<CampaignState, 'upload'> & {
  upload: { name: string; meta: string } | null
}

export interface SavedCampaign {
  id: string
  createdAt: string
  updatedAt: string
  state: StoredCampaignState
}

function read(): SavedCampaign[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as SavedCampaign[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    // A corrupt or unavailable store is not worth crashing a demo over.
    return []
  }
}

function write(records: SavedCampaign[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(records))
  } catch {
    // Private mode, or the quota is full. The session still works in memory.
  }
}

/** Most recently touched first, which is the order the list wants. */
export function loadCampaigns(): SavedCampaign[] {
  return read().sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
}

export function loadCampaign(id: string): SavedCampaign | undefined {
  return read().find((record) => record.id === id)
}

/** Upsert by id, stamping `updatedAt`. */
export function saveCampaign(id: string, state: CampaignState): SavedCampaign {
  const records = read()
  const existing = records.find((record) => record.id === id)
  const now = new Date().toISOString()
  const stored: StoredCampaignState = {
    ...state,
    upload: state.upload ? { name: state.upload.name, meta: state.upload.meta } : null,
  }
  const record: SavedCampaign = {
    id,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    state: stored,
  }
  write([record, ...records.filter((r) => r.id !== id)])
  return record
}

export function deleteCampaign(id: string): void {
  write(read().filter((record) => record.id !== id))
}

export function newCampaignId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `campaign-${Date.now()}-${Math.round(Math.random() * 1e6)}`
}

/** "3 minutes ago", for a list where the exact second never matters. */
export function since(iso: string): string {
  const seconds = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 1000))
  if (seconds < 60) return 'just now'
  const minutes = Math.round(seconds / 60)
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`
  const days = Math.round(hours / 24)
  return `${days} day${days === 1 ? '' : 's'} ago`
}
