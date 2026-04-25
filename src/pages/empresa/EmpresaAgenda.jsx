import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '../../context/AuthContext'
import { ToastProvider } from '../../context/ToastContext'
import { ThemeProvider } from '../../context/ThemeContext'

import EmpresaLayout      from './EmpresaLayout'
import EmpresaAgenda      from './EmpresaAgenda'
import EmpresaClientes    from './EmpresaClientes'
import EmpresaServicos    from './EmpresaServicos'
import EmpresaChat        from './EmpresaChat'
import EmpresaLogin       from './EmpresaLogin'

import ClienteLayout      from './ClienteLayout'
import ClienteAgendar     from './ClienteAgendar'
import ClienteAgendamentos from './lienteAgendamentos'
import ClienteChat        from './ClienteChat'
import ClienteLogin       from './ClienteLogin'

function Guard({ children, role }) {
  const { user, role: r, loading } = useAuth()
  if (loading) return <div className="loading">Carregando...</div>
  if (!user || r !== role) return <Navigate to={`/${role}/login`} replace />
  return children
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/empresa/login" element={<EmpresaLogin />} />
            <Route path="/empresa" element={<Guard role="empresa"><EmpresaLayout /></Guard>}>
              <Route index        element={<EmpresaAgenda />} />
              <Route path="clientes" element={<EmpresaClientes />} />
              <Route path="servicos" element={<EmpresaServicos />} />
              <Route path="chat"     element={<EmpresaChat />} />
            </Route>

            <Route path="/cliente/login" element={<ClienteLogin />} />
            <Route path="/cliente" element={<Guard role="cliente"><ClienteLayout /></Guard>}>
              <Route index              element={<ClienteAgendar />} />
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
