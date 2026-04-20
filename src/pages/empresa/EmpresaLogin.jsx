import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function EmpresaLogin() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const { login }               = useAuth()
  const navigate                = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) { setError('Preencha todos os campos.'); return }
    setLoading(true)
    setError('')
    // Autenticação mock — substitua por chamada real à API
    setTimeout(() => {
      login({ id: '1', name: 'AgendaProject Pro', email }, 'empresa')
      navigate('/empresa')
      setLoading(false)
    }, 600)
  }

  return (
    <div className="login-page">
      <div className="login-form">
        <div className="login-logo">
          Agenda<span style={{ color: 'var(--indigo2)' }}>Project</span> Pro
        </div>
        <div className="login-sub">Painel da empresa — faça login para continuar</div>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="field-label">E-mail</label>
            <input className="input" type="email" placeholder="empresa@email.com"
              value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="field">
            <label className="field-label">Senha</label>
            <input className="input" type="password" placeholder="••••••••"
              value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          {error && <div style={{ color:'var(--rtext)', fontSize:13, marginBottom:10 }}>{error}</div>}
          <button className="btn btn-indigo mt8" type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar como empresa'}
          </button>
        </form>

        <div className="login-link">
          É paciente? <Link to="/cliente/login">Acesse o portal do paciente →</Link>
        </div>
      </div>
    </div>
  )
}
