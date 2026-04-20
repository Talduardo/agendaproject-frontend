import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function ClienteLogin() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const { login }               = useAuth()
  const navigate                = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      login({ id: '2', name: 'Lucas Martins', email }, 'cliente')
      navigate('/cliente')
      setLoading(false)
    }, 600)
  }

  return (
    <div className="login-page">
      <div className="login-form">
        <div className="login-logo">
          Agenda<span style={{ color:'var(--etext)' }}>Project</span> Pro
        </div>
        <div className="login-sub">Portal do paciente — acesse seus agendamentos</div>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="field-label">E-mail</label>
            <input className="input" type="email" placeholder="paciente@email.com"
              value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="field">
            <label className="field-label">Senha</label>
            <input className="input" type="password" placeholder="••••••••"
              value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button className="btn btn-emerald mt8" type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar como paciente'}
          </button>
        </form>
        <div className="login-link">
          É da clínica? <Link to="/empresa/login" style={{ color:'var(--indigo2)' }}>Acesse o painel da empresa →</Link>
        </div>
      </div>
    </div>
  )
}
