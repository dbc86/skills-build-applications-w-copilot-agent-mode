// /api/activities/

import { useEffect, useState } from 'react'
import { fetchResource, normalizeResponseArray } from './api'

function Activities() {
  const [activities, setActivities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetchResource('activities')
      .then((payload) => {
        setActivities(normalizeResponseArray<any>(payload, ['activities']))
      })
      .catch((reason) => {
        setError(reason instanceof Error ? reason.message : String(reason))
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="page">
      <h2>Activities</h2>
      {error ? (
        <div className="error">Unable to load activities: {error}</div>
      ) : loading ? (
        <div className="loading">Loading activities…</div>
      ) : activities.length === 0 ? (
        <div className="empty">No activities were found.</div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>User</th>
              <th>Type</th>
              <th>Duration</th>
              <th>Distance</th>
              <th>Calories</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr key={activity._id ?? index}>
                <td>{activity.title ?? 'Untitled'}</td>
                <td>{activity.user?.name ?? activity.user?.email ?? 'Unknown'}</td>
                <td>{activity.type ?? '—'}</td>
                <td>{activity.durationMinutes ? `${activity.durationMinutes} min` : '—'}</td>
                <td>{activity.distanceKm ? `${activity.distanceKm} km` : '—'}</td>
                <td>{activity.calories ?? '—'}</td>
                <td>{activity.date ? new Date(activity.date).toLocaleDateString() : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}

export default Activities
