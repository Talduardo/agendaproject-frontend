export default function Badge({ status }) {
  const map = {
    confirmed: ['b-emerald', 'Confirmado'],
    waiting:   ['b-amber',   'Aguardando'],
    scheduled: ['b-indigo',  'Agendado'],
    cancelled: ['b-rose',    'Cancelado'],
  }
  const [cls, label] = map[status] || map.scheduled
  return <span className={`badge ${cls}`}>{label}</span>
}
