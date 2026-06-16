import { useEffect, useState } from 'react'
import { fetchResource, normalizeResponseArray } from './api'

function Teams() {
  const [teams, setTeams] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetchResource('teams')
      .then((payload) => {
        setTeams(normalizeResponseArray<any>(payload, ['teams']))
      })
      .catch((reason) => {
        setError(reason instanceof Error ? reason.message : String(reason))
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="page">
      <h2>Teams</h2>
      {error ? (
        <div className="error">Unable to load teams: {error}</div>
      ) : loading ? (
        <div className="loading">Loading teams…</div>
      ) : teams.length === 0 ? (
        <div className="empty">No teams were found.</div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Members</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <tr key={team._id ?? `${index}-${team.name}`}>
                <td>{team.name ?? 'Untitled'}</td>
                <td>{team.description ?? '—'}</td>
                <td>{Array.isArray(team.members) ? team.members.length : 0}</td>
                <td>{team.createdAt ? new Date(team.createdAt).toLocaleDateString() : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}

export default Teams
