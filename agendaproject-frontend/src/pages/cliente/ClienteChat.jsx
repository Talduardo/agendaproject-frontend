import { useState, useEffect, useRef } from 'react'
import { db, now } from '../../services/db'
import { useToast } from '../../context/ToastContext'

export default function ClienteChat() {
  const [msgs,  setMsgs]  = useState([...db.cliChats])
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)
  const toast = useToast()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs])

  const send = () => {
    if (!input.trim()) return
    const msg = { id: Date.now(), side: 'me', content: input.trim(), time: now() }
    db.cliChats.push(msg)
    setMsgs([...db.cliChats])
    setInput('')
    toast.show('Mensagem enviada', 'A clínica responderá em breve', 'info')
  }

  return (
    <>
      <div className="hero">
        <div className="hero-top">
          <div>
            <div className="hero-brand">Agenda<span className="cli">Project</span> Pro</div>
            <div className="hero-sub">Portal do paciente</div>
          </div>
          <div className="av-ring cli">LM</div>
        </div>
        <div className="hero-title" style={{ color: 'var(--etext)' }}>Chat com a clínica</div>
      </div>

      <div className="chat-messages">
        {msgs.map(m => (
          <div key={m.id}>
            <div className={`bubble ${m.side === 'me' ? 'bubble-cli' : 'bubble-them'}`}>
              {m.content}
            </div>
            <div className="bubble-time" style={{ textAlign: m.side === 'me' ? 'right' : 'left' }}>
              {m.time}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input-bar">
        <input
          className="chat-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Mensagem para a clínica..."
        />
        <button
          className="chat-send"
          style={{ background: 'var(--emerald)', color: '#022c22' }}
          onClick={send}
        >
          ➤
        </button>
      </div>
    </>
  )
}
