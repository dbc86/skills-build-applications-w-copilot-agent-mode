// /api/users/

import { useEffect, useState } from 'react'
import { fetchResource, normalizeResponseArray } from './api'

function Users() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetchResource('users')
      .then((payload) => {
        setUsers(normalizeResponseArray<any>(payload, ['users']))
      })
      .catch((reason) => {
        setError(reason instanceof Error ? reason.message : String(reason))
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="page">
      <h2>Users</h2>
      {error ? (
        <div className="error">Unable to load users: {error}</div>
      ) : loading ? (
        <div className="loading">Loading users…</div>
      ) : users.length === 0 ? (
        <div className="empty">No users were found.</div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id ?? `${index}-${user.email ?? index}`}>
                <td>{user.name ?? 'Unknown'}</td>
                <td>{user.email ?? '—'}</td>
                <td>{user.role ?? '—'}</td>
                <td>{user.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}

export default Users
