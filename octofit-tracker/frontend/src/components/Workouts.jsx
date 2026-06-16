// /api/workouts/
// https://dummy-8000.app.github.dev/api/workouts

import { useEffect, useState } from 'react'
import { fetchResource, normalizeResponseArray } from './api'

function Workouts() {
  const [workouts, setWorkouts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetchResource('workouts')
      .then((payload) => {
        setWorkouts(normalizeResponseArray<any>(payload, ['workouts']))
      })
      .catch((reason) => {
        setError(reason instanceof Error ? reason.message : String(reason))
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="page">
      <h2>Workouts</h2>
      {error ? (
        <div className="error">Unable to load workouts: {error}</div>
      ) : loading ? (
        <div className="loading">Loading workouts…</div>
      ) : workouts.length === 0 ? (
        <div className="empty">No workouts were found.</div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Focus</th>
              <th>Difficulty</th>
              <th>Duration</th>
              <th>Created By</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout, index) => (
              <tr key={workout._id ?? index}>
                <td>{workout.title ?? 'Untitled'}</td>
                <td>{workout.focus ?? '—'}</td>
                <td>{workout.difficulty ?? '—'}</td>
                <td>{workout.durationMinutes ? `${workout.durationMinutes} min` : '—'}</td>
                <td>{workout.createdBy?.name ?? workout.createdBy?.email ?? 'Unknown'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}

export default Workouts
