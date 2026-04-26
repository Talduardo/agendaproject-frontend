import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      title={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
      style={{
        width: 36, height: 36, borderRadius: '50%',
        border: '1px solid var(--border2)',
        background: 'var(--bg3)',
        color: 'var(--text2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', fontSize: 16,
        transition: 'all .2s', flexShrink: 0,
      }}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}
