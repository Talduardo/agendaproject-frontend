import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login, register } from '../../services/authService'

export default function ClienteLogin() {
  const [mode, setMode]         = useState('login')
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')
  const [showPwd, setShowPwd]   = useState(false)
  const [showCfm, setShowCfm]   = useState(false)
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const navigate                = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      await login(email, password, 'cliente')
      navigate('/cliente')
    } catch (err) {
      setError(err.message)
    } finally { setLoading(false) }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    if (!name || !email || !password) { setError('Preencha todos os campos.'); return }
    if (password !== confirm) { setError('As senhas não coincidem.'); return }
    if (password.length < 6)  { setError('Mínimo 6 caracteres.'); return }
    setLoading(true)
    try {
      await register(name, email, password, 'cliente')
      navigate('/cliente')
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') setError('E-mail já cadastrado.')
      else setError(err.message)
    } finally { setLoading(false) }
  }

  const eyeBtn = (show, setShow) => (
    <button type="button" onClick={() => setShow(s => !s)} style={{
      position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
      background: 'none', border: 'none', cursor: 'pointer', padding: 0,
      color: 'var(--text2)', fontSize: 18, lineHeight: 1,
    }}>
      {show ? '🙈' : '👁️'}
    </button>
  )

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '0 24px', background: 'var(--bg)', position: 'relative',
    }}>
      <div style={{ width: '100%', maxWidth: 360 }}>
        <div style={{ fontSize: 28, fontWeight: 800, textAlign: 'center', marginBottom: 4, color: 'var(--text)' }}>
          Agenda<span style={{ color: 'var(--etext)' }}>Project</span> Pro
        </div>
        <div style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 24, textAlign: 'center' }}>
          {mode === 'login' ? 'Portal do paciente' : 'Criar conta de paciente'}
        </div>

        {/* Toggle */}
        <div style={{ display: 'flex', background: 'var(--bg3)', borderRadius: 10, padding: 4, marginBottom: 24 }}>
          {['login', 'register'].map(m => (
            <button key={m} type="button" onClick={() => { setMode(m); setError('') }} style={{
              flex: 1, padding: '8px 0', borderRadius: 8, border: 'none',
              fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              background: mode === m ? 'var(--emerald)' : 'transparent',
              color: mode === m ? '#fff' : 'var(--text2)', transition: 'all .2s',
            }}>
              {m === 'login' ? 'Entrar' : 'Cadastrar'}
            </button>
          ))}
        </div>

        {mode === 'login' && (
          <form onSubmit={handleLogin}>
            <div className="field">
              <label className="field-label">E-mail</label>
              <input className="input" type="email" placeholder="paciente@email.com"
                value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="field">
              <label className="field-label">Senha</label>
              <div style={{ position: 'relative' }}>
                <input className="input" type={showPwd ? 'text' : 'password'}
                  placeholder="••••••••" value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{ paddingRight: 42 }} required />
                {eyeBtn(showPwd, setShowPwd)}
              </div>
            </div>
            {error && <div style={{ color: 'var(--rtext)', fontSize: 13, marginBottom: 10 }}>{error}</div>}
            <button className="btn btn-emerald mt8" type="submit" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        )}

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
                <div style={{ position: 'relative' }}>
                  <input className="input" type={showPwd ? 'text' : 'password'}
                    placeholder="Min. 6 caracteres" value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{ paddingRight: 42 }} required />
                  {eyeBtn(showPwd, setShowPwd)}
                </div>
              </div>
              <div className="field">
                <label className="field-label">Confirmar</label>
                <div style={{ position: 'relative' }}>
                  <input className="input" type={showCfm ? 'text' : 'password'}
                    placeholder="Repita a senha" value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    style={{ paddingRight: 42 }} required />
                  {eyeBtn(showCfm, setShowCfm)}
                </div>
              </div>
            </div>
            {error && <div style={{ color: 'var(--rtext)', fontSize: 13, marginBottom: 10 }}>{error}</div>}
            <button className="btn btn-emerald mt8" type="submit" disabled={loading}>
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </form>
        )}

        <div style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: 'var(--text2)' }}>
          É da clínica? <Link to="/empresa/login" style={{ color: 'var(--indigo2)', textDecoration: 'none', fontWeight: 600 }}>
            Acesse o painel da empresa →
          </Link>
        </div>
      </div>
    </div>
  )
}
