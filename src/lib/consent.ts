import { useSyncExternalStore } from "react"

export type Consent = { analytics: boolean; updatedAt: string; version: 1 }

type Snapshot = { consent: Consent | null; bannerOpen: boolean }

const KEY = "enlacestudio:consent"

function read(): Consent | null {
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return null
    const value = JSON.parse(raw) as Partial<Consent>
    return value?.version === 1 && typeof value.analytics === "boolean" ? (value as Consent) : null
  } catch {
    return null
  }
}

const initial = typeof window === "undefined" ? null : read()
let snapshot: Snapshot = { consent: initial, bannerOpen: initial === null }
const listeners = new Set<() => void>()

function emit(next: Snapshot) {
  snapshot = next
  listeners.forEach((fn) => fn())
}

export function setConsent(analytics: boolean) {
  const consent: Consent = { analytics, updatedAt: new Date().toISOString(), version: 1 }
  try {
    window.localStorage.setItem(KEY, JSON.stringify(consent))
  } catch {
    // Sin almacenamiento (modo privado): la elección vale solo para esta visita.
  }
  emit({ consent, bannerOpen: false })
}

export function openConsentSettings() {
  emit({ ...snapshot, bannerOpen: true })
}

function subscribe(fn: () => void) {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}

export function useConsent(): Snapshot {
  return useSyncExternalStore(subscribe, () => snapshot, () => snapshot)
}
