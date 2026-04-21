// Banco de dados em memória — substitua por chamadas reais à API no futuro

export const db = {
  appointments: [
    { id:1,  name:'Ana Costa',     svc:'Dermatologia',    time:'09:00', status:'confirmed', av:'AC', bg:'#1a1060', c:'#a5b4fc' },
    { id:2,  name:'Carlos Lima',   svc:'Cardiologia',     time:'10:30', status:'confirmed', av:'CL', bg:'#052e16', c:'#6ee7b7' },
    { id:3,  name:'Beatriz Melo',  svc:'Consulta Geral',  time:'11:00', status:'waiting',   av:'BM', bg:'#1c1008', c:'#fcd34d' },
    { id:4,  name:'Juliana Reis',  svc:'Exame de Rotina', time:'14:00', status:'waiting',   av:'JR', bg:'#1a0a10', c:'#fda4af' },
    { id:5,  name:'Roberto Faria', svc:'Dermatologia',    time:'15:00', status:'confirmed', av:'RF', bg:'#03223a', c:'#7dd3fc' },
    { id:6,  name:'Camila Souza',  svc:'Cardiologia',     time:'16:00', status:'scheduled', av:'CS', bg:'#1a1060', c:'#a5b4fc' },
    { id:7,  name:'Pedro Alves',   svc:'Consulta Geral',  time:'17:00', status:'confirmed', av:'PA', bg:'#052e16', c:'#6ee7b7' },
    { id:8,  name:'Lucas Martins', svc:'Exame de Rotina', time:'17:30', status:'scheduled', av:'LM', bg:'#03223a', c:'#7dd3fc' },
  ],

  services: [
    { id:1, name:'Consulta Geral',  duration:'30 min', price:'R$ 120', active:true  },
    { id:2, name:'Cardiologia',     duration:'45 min', price:'R$ 200', active:true  },
    { id:3, name:'Dermatologia',    duration:'40 min', price:'R$ 180', active:true  },
    { id:4, name:'Exame de Rotina', duration:'20 min', price:'R$ 80',  active:true  },
    { id:5, name:'Teleatendimento', duration:'20 min', price:'R$ 90',  active:false },
  ],

  clients: [
    { id:1, name:'Ana Costa',     phone:'(85) 9 9111-2233', lastVisit:'Hoje',   av:'AC', bg:'#1a1060', c:'#a5b4fc' },
    { id:2, name:'Carlos Lima',   phone:'(85) 9 9222-3344', lastVisit:'Hoje',   av:'CL', bg:'#052e16', c:'#6ee7b7' },
    { id:3, name:'Juliana Reis',  phone:'(85) 9 9333-4455', lastVisit:'10 Abr', av:'JR', bg:'#1a0a10', c:'#fda4af' },
    { id:4, name:'Roberto Faria', phone:'(85) 9 9444-5566', lastVisit:'05 Abr', av:'RF', bg:'#03223a', c:'#7dd3fc' },
    { id:5, name:'Lucas Martins', phone:'(85) 9 9555-6677', lastVisit:'Hoje',   av:'LM', bg:'#03223a', c:'#7dd3fc' },
  ],

  empChats: [
    { id:1, side:'them', content:'Boa tarde! Preciso remarcar minha consulta de amanhã.', time:'14:32' },
    { id:2, side:'me',   content:'Claro, qual horário prefere?',                          time:'14:35' },
    { id:3, side:'them', content:'Pode ser terça às 10h?',                                time:'14:36' },
  ],

  cliChats: [
    { id:1, side:'them', content:'Olá Lucas! Sua consulta está confirmada para amanhã às 17:30.', time:'09:00' },
    { id:2, side:'them', content:'Lembre-se de trazer seus exames anteriores.',                    time:'09:01' },
  ],

  upcomingAppts: [
    { id:10, svc:'Exame de Rotina', date:'Amanhã',  time:'17:30', doctor:'Dr. Henrique', status:'confirmed', icon:'🏥' },
    { id:11, svc:'Cardiologia',     date:'25 Abr',  time:'10:00', doctor:'Dr. Renato',   status:'scheduled', icon:'❤️' },
  ],

  historyAppts: [
    { id:7, svc:'Consulta Geral',  date:'10 Abr', doctor:'Dra. Paula',   icon:'🩺' },
    { id:8, svc:'Dermatologia',    date:'28 Mar', doctor:'Dra. Lara',    icon:'💊' },
    { id:9, svc:'Exame de Rotina', date:'15 Mar', doctor:'Dr. Henrique', icon:'🔬' },
  ],
}

export const TAKEN_SLOTS = ['09:00','10:30','15:00']
export const ALL_SLOTS   = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','14:00','14:30','15:00','15:30','16:00']

export function now() {
  const d = new Date()
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2,'0')}`
}

export function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0,2)
}

export function getNextDays(n = 7) {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i + 1)
    return d
  })
}

const WDAYS = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb']
const MONTHS = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']
export const fmtWday = d => WDAYS[d.getDay()]
export const fmtMon  = d => MONTHS[d.getMonth()]
export const fmtDay  = d => String(d.getDate()).padStart(2,'0')
export const fmtYMD  = d => d.toISOString().slice(0,10)
export const fmtShort = d => `${fmtDay(d)} ${fmtMon(d)}`
