import { useState, useEffect, useRef } from 'react'
import { db, now } from '../../services/db'

export default function EmpresaChat() {
  const [msgs, setMsgs] = useState([...db.empChats])
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs])

  const send = () => {
    if (!input.trim()) return
    const msg = { id: Date.now(), side: 'me', content: input.trim(), time: now() }
    db.empChats.push(msg)
    setMsgs([...db.empChats])
    setInput('')
  }

  return (
    <>
      <div className="hero">
        <div className="hero-brand">Agenda<span>Project</span> Pro</div>
        <div className="hero-title" style={{ marginTop: 8 }}>Chat com pacientes</div>
      </div>
      <div className="chat-messages">
        {msgs.map(m => (
          <div key={m.id}>
            <div className={`bubble ${m.side === 'me' ? 'bubble-emp' : 'bubble-them'}`}>{m.content}</div>
            <div className="bubble-time" style={{ textAlign: m.side === 'me' ? 'right' : 'left' }}>{m.time}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="chat-input-bar">
        <input className="chat-input" value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Responder paciente..." />
        <button className="chat-send" style={{ background:'var(--indigo)', color:'#fff' }} onClick={send}>➤</button>
      </div>
    </>
  )
}
