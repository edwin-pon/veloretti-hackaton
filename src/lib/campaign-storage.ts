// Campaign drafts, kept in localStorage.
//
// A campaign is a working document: someone writes half the brief, gets pulled
// into a meeting and comes back. Losing that to a refresh is the one failure
// this flow cannot afford, so every change is written out.
//
// Nothing here talks to a server. When there is a backend, this module is the
// seam to replace, and the record shape is what it has to store.

import type { CampaignState } from './campaign-store'

// Bumped when the record shape changes. A stored campaign from an older shape
// is not convertible into this one, and reading it would take the app down, so
// the old key is dropped rather than migrated.
const KEY = 'veloretti-brand-studio/campaigns/v2'
const RETIRED_KEYS = ['veloretti-brand-studio/campaigns/v1']

export interface SavedCampaign {
  id: string
  createdAt: string
  updatedAt: string
  state: CampaignState
}

function read(): SavedCampaign[] {
  try {
    RETIRED_KEYS.forEach((key) => localStorage.removeItem(key))
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    // Anything that is not the shape this version reads is dropped. A stored
    // draft is a convenience; letting a stale one blank the screen is not a
    // trade worth making.
    return parsed.filter(isSavedCampaign)
  } catch {
    // A corrupt or unavailable store is not worth crashing a demo over.
    return []
  }
}

function isSavedCampaign(value: unknown): value is SavedCampaign {
  if (!value || typeof value !== 'object') return false
  const record = value as Partial<SavedCampaign>
  if (typeof record.id !== 'string' || typeof record.updatedAt !== 'string') return false
  const state = record.state as Partial<CampaignState> | undefined
  if (!state || typeof state !== 'object') return false
  const input = state.input
  if (!input || typeof input !== 'object') return false
  return (
    typeof input.name === 'string' &&
    typeof input.description === 'string' &&
    Array.isArray(input.markets) &&
    Array.isArray(input.channels) &&
    Array.isArray(input.audiences) &&
    typeof input.bikeModel === 'string'
  )
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
  const record: SavedCampaign = {
    id,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    state,
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
