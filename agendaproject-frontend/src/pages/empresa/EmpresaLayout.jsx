import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import ThemeToggle from '../../components/ThemeToggle'

const TABS = [
  { path: '/empresa',          icon: '📅', label: 'Agenda'    },
  { path: '/empresa/clientes', icon: '👥', label: 'Pacientes' },
  { path: '/empresa/servicos', icon: '🏥', label: 'Serviços'  },
  { path: '/empresa/chat',     icon: '💬', label: 'Chat'      },
]

export default function EmpresaLayout() {
  const navigate     = useNavigate()
  const { pathname } = useLocation()

  const isActive = (path) =>
    path === '/empresa' ? pathname === '/empresa' : pathname.startsWith(path)

  return (
    <div className="app-shell">
      {/* Toggle de tema fixo no canto — disponível em todas as páginas da empresa */}
      <div style={{ position: 'fixed', top: 14, right: 16, zIndex: 30 }}>
        <ThemeToggle />
      </div>

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
