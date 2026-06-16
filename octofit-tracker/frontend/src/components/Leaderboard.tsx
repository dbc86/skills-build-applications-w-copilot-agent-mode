// /api/leaderboard/

import { useEffect, useState } from 'react'
import { fetchResource, normalizeResponseArray } from './api'

function Leaderboard() {
  const [entries, setEntries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetchResource('leaderboard')
      .then((payload) => {
        setEntries(normalizeResponseArray<any>(payload, ['leaderboard']))
      })
      .catch((reason) => {
        setError(reason instanceof Error ? reason.message : String(reason))
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="page">
      <h2>Leaderboard</h2>
      {error ? (
        <div className="error">Unable to load leaderboard: {error}</div>
      ) : loading ? (
        <div className="loading">Loading leaderboard…</div>
      ) : entries.length === 0 ? (
        <div className="empty">No leaderboard entries were found.</div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={entry._id ?? index}>
                <td>{entry.rank ?? index + 1}</td>
                <td>{entry.user?.name ?? entry.user?.email ?? 'Unknown'}</td>
                <td>{entry.score ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}

export default Leaderboard
