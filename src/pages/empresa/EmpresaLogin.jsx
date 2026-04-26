import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function EmpresaLogin() {
  const [mode, setMode]             = useState('login')
  const [name, setName]             = useState('')
  const [clinicName, setClinicName] = useState('')
  const [email, setEmail]           = useState('')
  const [password, setPassword]     = useState('')
  const [confirm, setConfirm]       = useState('')
  const [error, setError]           = useState('')
  const [loading, setLoading]       = useState(false)
  const [theme, setTheme]           = useState(() => localStorage.getItem('ap_theme') || 'dark')
  const { login }                   = useAuth()
  const navigate                    = useNavigate()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('ap_theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  const handleLogin = (e) => {
    e.preventDefault()
    if (!email || !password) { setError('Preencha todos os campos.'); return }
    setLoading(true)
    setError('')
    setTimeout(() => {
      login({ id: '1', name: clinicName || 'AgendaProject Pro', email }, 'empresa')
      navigate('/empresa')
      setLoading(false)
    }, 600)
  }

  const handleRegister = (e) => {
    e.preventDefault()
    setError('')
    if (!name || !email || !password) { setError('Preencha todos os campos.'); return }
    if (password !== confirm) { setError('As senhas não coincidem.'); return }
    if (password.length < 6) { setError('A senha deve ter ao menos 6 caracteres.'); return }
    setLoading(true)
    setTimeout(() => {
      login({ id: '1', name, email, clinicName }, 'empresa')
      navigate('/empresa')
      setLoading(false)
    }, 600)
  }

  return (
    <div className="login-page">
      {/* Botão de tema sem depender do ThemeContext */}
      <button
        onClick={toggleTheme}
        style={{
          position: 'fixed',
          top: 16,
          right: 16,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '2px solid rgba(255,255,255,0.2)',
          background: theme === 'dark' ? '#1e2130' : '#ffffff',
          fontSize: 20,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>

      <div className="login-form">
        <div className="login-logo">
          Agenda<span style={{ color: 'var(--indigo2)' }}>Project</span> Pro
        </div>
        <div className="login-sub">
          {mode === 'login' ? 'Painel da empresa' : 'Cadastrar nova empresa'}
        </div>

        {/* Toggle Entrar / Cadastrar */}
        <div style={{ display: 'flex', background: 'var(--bg3)', borderRadius: 10, padding: 4, marginBottom: 24 }}>
          {['login', 'register'].map(m => (
            <button key={m}
              type="button"
              onClick={() => { setMode(m); setError('') }}
              style={{
                flex: 1, padding: '8px 0', borderRadius: 8, border: 'none',
                fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                background: mode === m ? 'var(--indigo)' : 'transparent',
                color: mode === m ? '#fff' : 'var(--text2)',
                transition: 'all .2s',
              }}
            >
              {m === 'login' ? 'Entrar' : 'Cadastrar'}
            </button>
          ))}
        </div>

        {mode === 'login' && (
          <form onSubmit={handleLogin}>
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
            {error && <div style={{ color: 'var(--rtext)', fontSize: 13, marginBottom: 10 }}>{error}</div>}
            <button className="btn btn-indigo mt8" type="submit" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar como empresa'}
            </button>
          </form>
        )}

        {mode === 'register' && (
          <form onSubmit={handleRegister}>
            <div className="field">
              <label className="field-label">Nome do responsável</label>
              <input className="input" placeholder="Seu nome completo"
                value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div className="field">
              <label className="field-label">Nome da clínica</label>
              <input className="input" placeholder="Ex: Clínica Saúde+"
                value={clinicName} onChange={e => setClinicName(e.target.value)} required />
            </div>
            <div className="field">
              <label className="field-label">E-mail</label>
              <input className="input" type="email" placeholder="empresa@email.com"
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
            {error && <div style={{ color: 'var(--rtext)', fontSize: 13, marginBottom: 10 }}>{error}</div>}
            <button className="btn btn-indigo mt8" type="submit" disabled={loading}>
              {loading ? 'Cadastrando...' : 'Criar conta da empresa'}
            </button>
          </form>
        )}

        <div className="login-link">
          É paciente? <Link to="/cliente/login">Acesse o portal do paciente →</Link>
        </div>
      </div>
    </div>
  )
}
