// src/pages/empresa/EmpresaLogin.jsx
// SUBSTITUA o arquivo atual por este.
// Inclui tela de login E cadastro para empresa.

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login, register } from '../../services/authService'

export default function EmpresaLogin() {
  const [mode, setMode]         = useState('login') // 'login' | 'register'
  const [name, setName]         = useState('')
  const [clinicName, setClinicName] = useState('')
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
      await login(email, password, 'empresa')
      navigate('/empresa')
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
      await register(name, email, password, 'empresa', { clinicName })
      navigate('/empresa')
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

        {/* Logo */}
        <div className="login-logo">
          Agenda<span style={{ color: 'var(--indigo2)' }}>Project</span> Pro
        </div>
        <div className="login-sub">
          {mode === 'login' ? 'Painel da empresa' : 'Cadastrar nova empresa'}
        </div>

        {/* Toggle login / cadastro */}
        <div style={{ display: 'flex', background: 'var(--bg3)', borderRadius: 10, padding: 4, marginBottom: 24 }}>
          {['login', 'register'].map(m => (
            <button key={m}
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

        {/* FORMULÁRIO LOGIN */}
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
            {error && <p style={{ color: 'var(--rtext)', fontSize: 13, marginBottom: 10 }}>{error}</p>}
            <button className="btn btn-indigo mt8" type="submit" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar como empresa'}
            </button>
          </form>
        )}

        {/* FORMULÁRIO CADASTRO */}
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
            {error && <p style={{ color: 'var(--rtext)', fontSize: 13, marginBottom: 10 }}>{error}</p>}
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
