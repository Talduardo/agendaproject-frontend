import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      title={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
      style={{
        width: 38,
        height: 38,
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.15)',
        background: theme === 'dark' ? '#1e2130' : '#e4e6ed',
        color: theme === 'dark' ? '#a5b4fc' : '#4338ca',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontSize: 18,
        flexShrink: 0,
        boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
      }}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}
