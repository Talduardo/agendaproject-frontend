// src/pages/cliente/ClienteLogin.jsx
// SUBSTITUA o arquivo atual por este.

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login, register } from '../../services/authService'

export default function ClienteLogin() {
  const [mode, setMode]         = useState('login')
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const navigate                = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password, 'cliente')
      navigate('/cliente')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    if (password !== confirm) { setError('As senhas não coincidem.'); return }
    if (password.length < 6)  { setError('A senha deve ter ao menos 6 caracteres.'); return }
    setLoading(true)
    try {
      await register(name, email, password, 'cliente')
      navigate('/cliente')
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') setError('Este e-mail já está cadastrado.')
      else setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-form">

        <div className="login-logo">
          Agenda<span style={{ color: 'var(--etext)' }}>Project</span> Pro
        </div>
        <div className="login-sub">
          {mode === 'login' ? 'Portal do paciente' : 'Criar conta de paciente'}
        </div>

        {/* Toggle */}
        <div style={{ display: 'flex', background: 'var(--bg3)', borderRadius: 10, padding: 4, marginBottom: 24 }}>
          {['login', 'register'].map(m => (
            <button key={m}
              onClick={() => { setMode(m); setError('') }}
              style={{
                flex: 1, padding: '8px 0', borderRadius: 8, border: 'none',
                fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                background: mode === m ? 'var(--emerald)' : 'transparent',
                color: mode === m ? '#022c22' : 'var(--text2)',
                transition: 'all .2s',
              }}
            >
              {m === 'login' ? 'Entrar' : 'Cadastrar'}
            </button>
          ))}
        </div>

        {/* LOGIN */}
        {mode === 'login' && (
          <form onSubmit={handleLogin}>
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
            {error && <p style={{ color: 'var(--rtext)', fontSize: 13, marginBottom: 10 }}>{error}</p>}
            <button className="btn btn-emerald mt8" type="submit" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar como paciente'}
            </button>
          </form>
        )}

        {/* CADASTRO */}
        {mode === 'register' && (
          <form onSubmit={handleRegister}>
            <div className="field">
              <label className="field-label">Nome completo</label>
              <input className="input" placeholder="Seu nome"
                value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div className="field">
              <label className="field-label">E-mail</label>
              <input className="input" type="email" placeholder="paciente@email.com"
                value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="frow">
              <div className="field">
                <label className="field-label">Senha</label>
                <input className="input" type="password" placeholder="Min. 6 caracteres"
                  value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
              <div className="field">
                <label className="field-label">Confirmar</label>
                <input className="input" type="password" placeholder="Repita a senha"
                  value={confirm} onChange={e => setConfirm(e.target.value)} required />
              </div>
            </div>
            {error && <p style={{ color: 'var(--rtext)', fontSize: 13, marginBottom: 10 }}>{error}</p>}
            <button className="btn btn-emerald mt8" type="submit" disabled={loading}>
              {loading ? 'Cadastrando...' : 'Criar conta de paciente'}
            </button>
          </form>
        )}

        <div className="login-link">
          É da clínica? <Link to="/empresa/login" style={{ color: 'var(--indigo2)' }}>
            Acesse o painel da empresa →
          </Link>
        </div>
      </div>
    </div>
  )
}
