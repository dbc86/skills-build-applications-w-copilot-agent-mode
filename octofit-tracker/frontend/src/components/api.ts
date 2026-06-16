const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function getApiUrl(path: string) {
  const sanitizedPath = path.replace(/^\/+/, '')
  return `${API_BASE_URL}/${sanitizedPath}`
}

export async function fetchResource<T = unknown>(endpoint: string): Promise<T> {
  const response = await fetch(getApiUrl(endpoint))
  if (!response.ok) {
    throw new Error(`Fetch error ${response.status}: ${response.statusText}`)
  }
  return response.json() as Promise<T>
}

export function normalizeResponseArray<T = unknown>(payload: unknown, keys: string[] = []): T[] {
  if (Array.isArray(payload)) {
    return payload as T[]
  }

  if (payload === null || typeof payload !== 'object') {
    return []
  }

  const object = payload as Record<string, unknown>
  for (const key of keys) {
    if (Array.isArray(object[key])) {
      return object[key] as T[]
    }
  }

  const fallbackKeys = ['data', 'items', 'results', 'rows']
  for (const key of fallbackKeys) {
    if (Array.isArray(object[key])) {
      return object[key] as T[]
    }
  }

  return []
}
