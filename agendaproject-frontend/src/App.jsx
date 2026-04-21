// src/App.jsx
// SUBSTITUA o arquivo atual por este.
// Guard agora usa Firebase — verifica role em tempo real.

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'

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

// Protege rotas verificando o papel do usuário no Firebase
function Guard({ children, role }) {
  const { user, role: userRole, loading } = useAuth()

  if (loading) {
    return (
      <div className="loading">
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 20, marginBottom: 8 }}>⚡</div>
          <div>Verificando acesso...</div>
        </div>
      </div>
    )
  }

  // Não logado → redireciona para login
  if (!user) return <Navigate to={`/${role}/login`} replace />

  // Logado mas com papel errado → redireciona para o login correto
  if (userRole !== role) return <Navigate to={`/${userRole}/login`} replace />

  return children
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            {/* ── EMPRESA ── */}
            <Route path="/empresa/login" element={<EmpresaLogin />} />
            <Route path="/empresa" element={<Guard role="empresa"><EmpresaLayout /></Guard>}>
              <Route index          element={<EmpresaAgenda />} />
              <Route path="clientes" element={<EmpresaClientes />} />
              <Route path="servicos" element={<EmpresaServicos />} />
              <Route path="chat"     element={<EmpresaChat />} />
            </Route>

            {/* ── CLIENTE ── */}
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
  )
}
