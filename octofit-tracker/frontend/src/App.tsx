import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiHint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api` 
  : 'http://localhost:8000/api'

function Home() {
  return (
    <section className="page">
      <h2>Welcome to OctoFit Tracker</h2>
      <p>
        Use the navigation above to view <strong>Users</strong>, <strong>Teams</strong>,
        <strong> Activities</strong>, <strong>Leaderboard</strong>, and <strong>Workouts</strong>.
      </p>
      <p className="notice">
        The app uses <code>import.meta.env.VITE_CODESPACE_NAME</code> to build the
        backend URL. When this variable is missing, the frontend falls back to
        local development at <code>http://localhost:8000/api</code>.
      </p>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>OctoFit Tracker</h1>
          <p className="app-subtitle">
            This React app loads backend data through the GitHub Codespace host.
          </p>
        </div>
        <div className="app-status">
          <strong>API base:</strong> <code>{apiHint}</code>
        </div>
      </header>

      <nav className="app-nav">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Home
        </NavLink>
        <NavLink to="/users" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Users
        </NavLink>
        <NavLink to="/teams" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Teams
        </NavLink>
        <NavLink to="/activities" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Activities
        </NavLink>
        <NavLink to="/leaderboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Leaderboard
        </NavLink>
        <NavLink to="/workouts" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Workouts
        </NavLink>
      </nav>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
