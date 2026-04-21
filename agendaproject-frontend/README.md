# AgendaProject Pro

SaaS de agendamento para consultórios e clínicas — visual dark premium, mobile-first.

## Como rodar

```bash
# 1. Instale as dependências
npm install

# 2. Rode o projeto
npm run dev

# 3. Acesse no navegador
# http://localhost:3000/empresa/login  → painel da clínica
# http://localhost:3000/cliente/login  → portal do paciente
```

**Login:** qualquer e-mail + senha (sem backend por enquanto).

---

## Estrutura

```
src/
├── main.jsx
├── App.jsx                        ← rotas /empresa e /cliente
├── index.css                      ← design system completo
├── context/
│   ├── AuthContext.jsx            ← login/logout por role
│   └── ToastContext.jsx           ← notificações visuais
├── components/
│   └── Badge.jsx                  ← badge de status
├── services/
│   └── db.js                      ← dados mock + helpers de data
└── pages/
    ├── empresa/
    │   ├── EmpresaLogin.jsx
    │   ├── EmpresaLayout.jsx      ← nav inferior
    │   ├── EmpresaAgenda.jsx      ← dashboard principal
    │   ├── EmpresaClientes.jsx
    │   ├── EmpresaServicos.jsx
    │   └── EmpresaChat.jsx
    └── cliente/
        ├── ClienteLogin.jsx
        ├── ClienteLayout.jsx
        ├── ClienteAgendar.jsx     ← serviço → dia → horário
        ├── ClienteAgendamentos.jsx
        └── ClienteChat.jsx
```

---

## Funcionalidades

### /empresa — Painel da clínica
- Dashboard: KPIs (confirmados, aguardando, total, receita)
- Lista de agendamentos do dia com busca
- Confirmar agendamento com toque
- Criar novo agendamento (modal)
- Lista de pacientes
- Gerenciar serviços (toggle on/off)
- Chat com pacientes

### /cliente — Portal do paciente
- Ativar notificações push
- Selecionar serviço → dia → horário disponível
- Confirmar agendamento
- Ver próximas consultas + histórico
- Cancelar agendamento
- Chat com a clínica

---

## Próximos passos

1. **Backend:** Node.js + Express com as rotas da API
2. **Banco de dados:** Prisma + PostgreSQL (Supabase ou Neon)
3. **Notificações push:** Firebase FCM (serviceAccountKey.json)
4. **Deploy:** Vercel (frontend) + Railway (backend)
