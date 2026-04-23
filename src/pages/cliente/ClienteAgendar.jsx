import { useState } from 'react'
import { db, ALL_SLOTS, TAKEN_SLOTS, getNextDays, fmtWday, fmtDay, fmtMon, fmtYMD, fmtShort } from '../../services/db'
import { useToast } from '../../context/ToastContext'
import ThemeToggle from '../../components/ThemeToggle'

export default function ClienteAgendar() {
  const [notifOn,    setNotifOn]    = useState(false)
  const [selSvc,     setSelSvc]     = useState(null)
  const [selDayIdx,  setSelDayIdx]  = useState(null)
  const [selSlot,    setSelSlot]    = useState(null)
  const toast = useToast()
  const days  = getNextDays(7)
  const svcs  = db.services.filter(s => s.active)

  const activateNotif = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then(p => {
        if (p === 'granted') {
          setNotifOn(true)
          toast.show('Notificações ativadas!', 'Você receberá lembretes de consulta', 'info')
        } else {
          toast.show('Permissão negada', 'Ative nas configurações do navegador', 'warning')
        }
      })
    } else {
      setNotifOn(true)
      toast.show('Notificações ativadas!', 'Token FCM gerado e salvo', 'info')
    }
  }

  const confirm = () => {
    if (selSvc === null) { toast.show('Selecione um serviço', '', 'warning'); return }
    if (selDayIdx === null) { toast.show('Selecione um dia', '', 'warning'); return }
    const svc = svcs[selSvc]
    const day = days[selDayIdx]
    toast.show('Consulta agendada!', `${svc.name} · ${fmtShort(day)} às ${selSlot}`)
    setSelSvc(null); setSelDayIdx(null); setSelSlot(null)
  }

  return (
    <>
      <div className="hero">
        <div className="hero-top">
          <div>
            <div className="hero-brand">Agenda<span className="cli">Project</span> Pro</div>
            <div className="hero-sub">Portal do paciente</div>
          </div>
          <div className="hero-actions">
            <ThemeToggle />
            <div className="av-ring cli">LM</div>
          </div>
        </div>
        <div className="hero-title">Olá, <em className="cli">Lucas</em> 👋</div>
      </div>

      {!notifOn ? (
        <div className="notif-card">
          <div style={{ fontSize:14, fontWeight:700, color:'var(--stext)', marginBottom:4 }}>
            Ativar lembretes de consulta
          </div>
          <div style={{ fontSize:12, color:'var(--text2)', lineHeight:1.55, marginBottom:12 }}>
            Receba notificações push antes das suas consultas e quando a clínica enviar mensagens.
          </div>
          <button
            style={{ padding:'9px 18px', borderRadius:'var(--rr)', background:'var(--sky)', color:'#03314b', fontSize:13, fontWeight:700, border:'none', cursor:'pointer', fontFamily:'inherit' }}
            onClick={activateNotif}
          >
            Ativar notificações push
          </button>
        </div>
      ) : (
        <div style={{ margin:'12px 16px 0', padding:'10px 14px', background:'var(--edim)', borderRadius:'var(--rs)', fontSize:13, color:'var(--etext)' }}>
          ✓ Notificações push ativadas
        </div>
      )}

      {/* 1. Serviço */}
      <div className="sec" style={{ paddingTop:16 }}>
        <div className="sec-title" style={{ marginBottom:10 }}>1 · Escolha o serviço</div>
        {svcs.map((s, i) => (
          <div key={s.id} className={`svc-card ${selSvc === i ? 'selected' : ''}`} onClick={() => setSelSvc(i)}>
            <div>
              <div className="appt-name">{s.name}</div>
              <div className="appt-svc">{s.duration} · {s.price}</div>
            </div>
            {selSvc === i && <span className="badge b-emerald">Selecionado</span>}
          </div>
        ))}
      </div>

      {/* 2. Dia */}
      {selSvc !== null && (
        <div className="sec">
          <div className="sec-title" style={{ marginBottom:10 }}>2 · Escolha o dia</div>
          <div className="day-strip">
            {days.map((d, i) => (
              <div key={fmtYMD(d)} className={`day-chip ${selDayIdx === i ? 'selected' : ''}`}
                onClick={() => { setSelDayIdx(i); setSelSlot(null) }}>
                <div className="day-wday">{fmtWday(d)}</div>
                <div className="day-num">{fmtDay(d)}</div>
                <div className="day-mon">{fmtMon(d)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Horário */}
      {selSvc !== null && selDayIdx !== null && (
        <div className="sec">
          <div className="sec-title" style={{ marginBottom:10 }}>
            3 · Horários — {fmtShort(days[selDayIdx])}
          </div>
          <div className="slots-grid">
            {ALL_SLOTS.map(s => {
              const taken = TAKEN_SLOTS.includes(s)
              const picked = selSlot === s
              return (
                <div key={s} className={`slot ${taken ? 'taken' : picked ? 'selected' : 'available'}`}
                  onClick={() => !taken && setSelSlot(s)}>
                  {s}
                </div>
              )
            })}
          </div>
          {selSlot && (
            <button className="btn btn-emerald" onClick={confirm}>
              Confirmar {selSlot}
            </button>
          )}
        </div>
      )}
      <div style={{ height: 24 }} />
    </>
  )
}
