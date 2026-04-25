import { useState } from 'react'
import { db, getInitials, now } from '../../services/db'
import { useToast } from '../../context/ToastContext'
import Badge from '../../components/Badge'
import ThemeToggle from '../../components/ThemeToggle'

function NovoModal({ onClose, onSave }) {
  const [form, setForm] = useState({ name:'', svc:'Consulta Geral', time:'09:00', status:'confirmed' })
  const toast = useToast()
  const svcs  = db.services.filter(s => s.active).map(s => s.name)

  const save = () => {
    if (!form.name.trim()) { toast.show('Preencha o nome do paciente', '', 'warning'); return }
    const av = getInitials(form.name)
    db.appointments.push({
      id: Date.now(), name: form.name, svc: form.svc,
      time: form.time, status: form.status,
      av, bg: '#1a1060', c: '#a5b4fc',
    })
    db.appointments.sort((a, b) => a.time.localeCompare(b.time))
    toast.show(`${form.name} agendado`, `${form.svc} às ${form.time}`)
    onSave()
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-handle" />
        <div className="modal-title">Novo agendamento</div>
        <div className="field">
          <label className="field-label">Paciente</label>
          <input className="input" placeholder="Nome completo"
            value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        </div>
        <div className="field">
          <label className="field-label">Serviço</label>
          <select className="input" value={form.svc} onChange={e => setForm({...form, svc: e.target.value})}>
            {svcs.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="frow">
          <div className="field">
            <label className="field-label">Horário</label>
            <input className="input" type="time" value={form.time}
              onChange={e => setForm({...form, time: e.target.value})} />
          </div>
          <div className="field">
            <label className="field-label">Status</label>
            <select className="input" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
              <option value="confirmed">Confirmado</option>
              <option value="waiting">Aguardando</option>
              <option value="scheduled">Agendado</option>
            </select>
          </div>
        </div>
        <button className="btn btn-indigo mt8" onClick={save}>Salvar agendamento</button>
        <button className="btn btn-ghost mt8" onClick={onClose}>Cancelar</button>
      </div>
    </div>
  )
}

export default function EmpresaAgenda() {
  const [appts, setAppts]     = useState([...db.appointments])
  const [search, setSearch]   = useState('')
  const [modal, setModal]     = useState(false)
  const toast = useToast()

  const reload = () => setAppts([...db.appointments])

  const filtered = appts.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.svc.toLowerCase().includes(search.toLowerCase())
  )

  const confirm = (appt) => {
    if (appt.status === 'confirmed') return
    const found = db.appointments.find(a => a.id === appt.id)
    if (found) found.status = 'confirmed'
    reload()
    toast.show(`${appt.name} confirmado`, 'Notificação push enviada ao paciente')
  }

  const today = new Date().toLocaleDateString('pt-BR', { weekday:'long', day:'2-digit', month:'short' })

  return (
    <>
      <div className="hero">
        <div className="hero-top">
          <div>
            <div className="hero-brand">Agenda<span>Project</span> Pro</div>
            <div className="hero-sub" style={{ textTransform:'capitalize' }}>{today}</div>
          </div>
          <div className="hero-actions">
            <ThemeToggle />
            <div className="av-ring">AP</div>
          </div>
        </div>
        <div className="hero-title">Painel da <em>empresa</em></div>
      </div>

      <div className="kpi-grid">
        <div className="kpi">
          <div className="kpi-val" style={{ color:'var(--etext)' }}>
            {appts.filter(a => a.status === 'confirmed').length}
          </div>
          <div className="kpi-lbl"><span className="kpi-dot" style={{ background:'var(--emerald)' }} />Confirmados</div>
        </div>
        <div className="kpi">
          <div className="kpi-val" style={{ color:'var(--atext)' }}>
            {appts.filter(a => a.status === 'waiting').length}
          </div>
          <div className="kpi-lbl"><span className="kpi-dot" style={{ background:'var(--amber)' }} />Aguardando</div>
        </div>
        <div className="kpi">
          <div className="kpi-val" style={{ color:'var(--itext)' }}>{appts.length}</div>
          <div className="kpi-lbl"><span className="kpi-dot" style={{ background:'var(--indigo)' }} />Total hoje</div>
        </div>
        <div className="kpi">
          <div className="kpi-val" style={{ color:'var(--stext)' }}>
            R${(appts.length * 150).toLocaleString('pt-BR')}
          </div>
          <div className="kpi-lbl"><span className="kpi-dot" style={{ background:'var(--sky)' }} />Receita est.</div>
        </div>
      </div>

      <div className="sec">
        <div className="sec-hd">
          <div className="sec-title">Agenda de hoje</div>
          <button className="sec-action" onClick={() => setModal(true)}>+ Novo</button>
        </div>
        <input className="search-bar" placeholder="Buscar paciente ou serviço..."
          value={search} onChange={e => setSearch(e.target.value)} />

        {filtered.map(a => (
          <div key={a.id} className={`appt ${a.status}`} onClick={() => confirm(a)}>
            <div className="av-md" style={{ background: a.bg, color: a.c }}>{a.av}</div>
            <div className="col">
              <div className="appt-name">{a.name}</div>
              <div className="appt-svc">{a.svc}</div>
            </div>
            <div className="text-right">
              <div className="appt-time">{a.time}</div>
              <Badge status={a.status} />
            </div>
          </div>
        ))}
      </div>

      <button className="fab" onClick={() => setModal(true)}>+</button>

      {modal && <NovoModal onClose={() => setModal(false)} onSave={reload} />}
    </>
  )
}
