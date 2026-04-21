import { useState } from 'react'
import { db } from '../../services/db'
import { useToast } from '../../context/ToastContext'
import Badge from '../../components/Badge'

export default function ClienteAgendamentos() {
  const [proximas,  setProximas]  = useState([...db.upcomingAppts])
  const [cancelId,  setCancelId]  = useState(null)
  const toast = useToast()

  const handleCancel = (id) => {
    setProximas(prev => prev.filter(a => a.id !== id))
    setCancelId(null)
    toast.show('Agendamento cancelado', 'Entre em contato se precisar remarcar', 'warning')
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
        <div className="hero-title" style={{ color: 'var(--etext)' }}>Meus agendamentos</div>
      </div>

      {/* Próximas */}
      <div className="sec" style={{ paddingTop: 16 }}>
        <div className="sec-title" style={{ marginBottom: 10 }}>Próximas consultas</div>

        {proximas.length === 0 && (
          <div style={{ color: 'var(--text2)', fontSize: 14, padding: '16px 0' }}>
            Nenhuma consulta agendada. Use a aba "Agendar" para marcar.
          </div>
        )}

        {proximas.map(a => (
          <div key={a.id} className={`appt ${a.status}`}>
            <div style={{ fontSize: 26, flexShrink: 0 }}>{a.icon}</div>
            <div className="col">
              <div className="appt-name">{a.svc}</div>
              <div className="appt-svc">{a.date} · {a.time} · {a.doctor}</div>
            </div>
            <div className="text-right">
              <Badge status={a.status} />
              <div style={{ display: 'flex', gap: 6, marginTop: 8, justifyContent: 'flex-end' }}>
                <button
                  onClick={() => toast.show('Remarcar', 'Use o chat para remarcar com a clínica', 'info')}
                  style={{ padding: '5px 10px', borderRadius: 'var(--rs)', border: '1px solid rgba(16,185,129,.3)', background: 'none', color: 'var(--etext)', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  Remarcar
                </button>
                <button
                  onClick={() => setCancelId(a.id)}
                  style={{ padding: '5px 10px', borderRadius: 'var(--rs)', border: '1px solid var(--rdim)', background: 'none', color: 'var(--rtext)', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Histórico */}
      <div className="sec" style={{ paddingTop: 4 }}>
        <div className="sec-title" style={{ marginBottom: 10 }}>Histórico</div>
        {db.historyAppts.map(a => (
          <div key={a.id} className="hist-item">
            <div className="hist-icon">{a.icon}</div>
            <div className="col">
              <div className="appt-name" style={{ fontSize: 14 }}>{a.svc}</div>
              <div className="appt-svc">{a.date} · {a.doctor}</div>
            </div>
            <span className="badge b-indigo" style={{ fontSize: 10 }}>Realizado</span>
          </div>
        ))}
      </div>

      {/* Modal cancelar */}
      {cancelId && (
        <div className="modal-overlay" onClick={() => setCancelId(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            <div className="modal-title">Cancelar consulta?</div>
            <div style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.6, marginBottom: 20 }}>
              Tem certeza que deseja cancelar este agendamento? Você pode remarcar pelo chat com a clínica.
            </div>
            <button
              className="btn"
              style={{ background: 'var(--rdim)', color: 'var(--rtext)', marginBottom: 8 }}
              onClick={() => handleCancel(cancelId)}
            >
              Sim, cancelar
            </button>
            <button className="btn btn-ghost" onClick={() => setCancelId(null)}>
              Voltar
            </button>
          </div>
        </div>
      )}

      <div style={{ height: 24 }} />
    </>
  )
}
