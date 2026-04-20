import { Outlet, useNavigate, useLocation } from 'react-router-dom'

const TABS = [
  { path: '/cliente',                icon: '📅', label: 'Agendar' },
  { path: '/cliente/agendamentos',   icon: '📋', label: 'Meus'    },
  { path: '/cliente/chat',           icon: '💬', label: 'Chat'    },
]

export default function ClienteLayout() {
  const navigate     = useNavigate()
  const { pathname } = useLocation()

  const isActive = (path) =>
    path === '/cliente' ? pathname === '/cliente' : pathname.startsWith(path)

  return (
    <div className="app-shell">
      <Outlet />
      <nav className="bottom-nav">
        {TABS.map(t => (
          <button
            key={t.path}
            className={`nav-btn ${isActive(t.path) ? 'active' : ''}`}
            onClick={() => navigate(t.path)}
          >
            <span className="nav-icon">{t.icon}</span>
            <span className="nav-label">{t.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
