import { useState } from 'react'
import { db } from '../../services/db'
import { useToast } from '../../context/ToastContext'

export default function EmpresaServicos() {
  const [svcs, setSvcs] = useState([...db.services])
  const toast = useToast()

  const toggle = (id) => {
    const svc = db.services.find(s => s.id === id)
    if (svc) svc.active = !svc.active
    setSvcs([...db.services])
    const s = db.services.find(s => s.id === id)
    toast.show(s.active ? `${s.name} ativado` : `${s.name} pausado`, '', s.active ? 'success' : 'warning')
  }

  const active   = svcs.filter(s =>  s.active)
  const inactive = svcs.filter(s => !s.active)

  return (
    <>
      <div className="hero">
        <div className="hero-brand">Agenda<span>Project</span> Pro</div>
        <div className="hero-title" style={{ marginTop: 8 }}>Serviços</div>
      </div>
      <div className="sec" style={{ paddingTop: 16 }}>
        <div className="sec-title" style={{ marginBottom: 10 }}>Ativos ({active.length})</div>
        {active.map(s => <SvcRow key={s.id} svc={s} onToggle={toggle} />)}
        {inactive.length > 0 && <>
          <div className="sec-title" style={{ marginTop: 20, marginBottom: 10 }}>Pausados</div>
          {inactive.map(s => <SvcRow key={s.id} svc={s} onToggle={toggle} />)}
        </>}
      </div>
    </>
  )
}

function SvcRow({ svc, onToggle }) {
  return (
    <div className="svc-row">
      <div>
        <div className="appt-name">{svc.name}</div>
        <div className="appt-svc">{svc.duration} · {svc.price}</div>
      </div>
      <button className={`toggle ${svc.active ? 'on' : ''}`} onClick={() => onToggle(svc.id)} />
    </div>
  )
}
