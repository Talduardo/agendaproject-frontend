import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const show = useCallback((msg, sub = '', type = 'success') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, msg, sub, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3200)
  }, [])

  const icons = {
    success: { bg: 'var(--edim)', color: 'var(--etext)', ic: '✓' },
    warning: { bg: 'var(--adim)', color: 'var(--atext)', ic: '!' },
    info:    { bg: 'var(--idim)', color: 'var(--itext)', ic: 'i' },
    error:   { bg: 'var(--rdim)', color: 'var(--rtext)', ic: '✕' },
  }

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="toast-wrap">
        {toasts.map(t => {
          const s = icons[t.type] || icons.success
          return (
            <div className="toast" key={t.id}>
              <div className="toast-icon" style={{ background: s.bg, color: s.color }}>{s.ic}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{t.msg}</div>
                {t.sub && <div style={{ fontSize: 11, color: 'var(--text2)', marginTop: 1 }}>{t.sub}</div>}
              </div>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
