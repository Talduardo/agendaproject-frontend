// src/pages/empresa/EmpresaClientes.jsx
import { useState } from 'react'
import { db } from '../../services/db'

export default function EmpresaClientes() {
  const [search, setSearch] = useState('')
  const filtered = db.clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  )
  return (
    <>
      <div className="hero">
        <div className="hero-brand">Agenda<span>Project</span> Pro</div>
        <div className="hero-title" style={{ marginTop: 8 }}>Pacientes</div>
      </div>
      <div className="sec" style={{ paddingTop: 16 }}>
        <input className="search-bar" placeholder="Buscar por nome ou telefone..."
          value={search} onChange={e => setSearch(e.target.value)} />
        <div className="sec-title" style={{ marginBottom: 10 }}>{filtered.length} cadastrados</div>
        {filtered.map(c => (
          <div key={c.id} className="appt">
            <div className="av-md" style={{ background: c.bg, color: c.c }}>{c.av}</div>
            <div className="col">
              <div className="appt-name">{c.name}</div>
              <div className="appt-svc">{c.phone}</div>
            </div>
            <span className="badge b-indigo" style={{ fontSize: 10 }}>
              Última: {c.lastVisit}
            </span>
          </div>
        ))}
      </div>
    </>
  )
}
