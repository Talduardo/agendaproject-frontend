import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import { ThemeProvider, useTheme } from './context/ThemeContext'

import EmpresaLayout      from './pages/empresa/EmpresaLayout'
import EmpresaAgenda      from './pages/empresa/EmpresaAgenda'
import EmpresaClientes    from './pages/empresa/EmpresaClientes'
import EmpresaServicos    from './pages/empresa/EmpresaServicos'
import EmpresaChat        from './pages/empresa/EmpresaChat'
import EmpresaLogin       from './pages/empresa/EmpresaLogin'

import ClienteLayout       from './pages/cliente/ClienteLayout'
import ClienteAgendar      from './pages/cliente/ClienteAgendar'
import ClienteAgendamentos from './pages/cliente/ClienteAgendamentos'
import ClienteChat         from './pages/cliente/ClienteChat'
import ClienteLogin        from './pages/cliente/ClienteLogin'

function Guard({ children, role }) {
  const { user, role: r, loading } = useAuth()
  if (loading) return <div className="loading">Carregando...</div>
  if (!user || r !== role) return <Navigate to={`/${role}/login`} replace />
  return children
}

// Botão de tema global — aparece em todas as páginas
function GlobalThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      style={{
        position: 'fixed',
        top: 14,
        right: 16,
        zIndex: 999,
        width: 38,
        height: 38,
        borderRadius: '50%',
        border: 'none',
        background: theme === 'dark' ? '#1e2130' : '#ffffff',
        boxShadow: theme === 'dark'
          ? '0 0 0 1px rgba(255,255,255,0.15), 0 2px 8px rgba(0,0,0,0.4)'
          : '0 0 0 1px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.15)',
        cursor: 'pointer',
        fontSize: 18,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <GlobalThemeToggle />
            <Routes>
              <Route path="/empresa/login" element={<EmpresaLogin />} />
              <Route path="/empresa" element={<Guard role="empresa"><EmpresaLayout /></Guard>}>
                <Route index          element={<EmpresaAgenda />} />
                <Route path="clientes" element={<EmpresaClientes />} />
                <Route path="servicos" element={<EmpresaServicos />} />
                <Route path="chat"     element={<EmpresaChat />} />
              </Route>

              <Route path="/cliente/login" element={<ClienteLogin />} />
              <Route path="/cliente" element={<Guard role="cliente"><ClienteLayout /></Guard>}>
                <Route index               element={<ClienteAgendar />} />
                <Route path="agendamentos" element={<ClienteAgendamentos />} />
                <Route path="chat"         element={<ClienteChat />} />
              </Route>

              <Route path="/" element={<Navigate to="/empresa/login" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
