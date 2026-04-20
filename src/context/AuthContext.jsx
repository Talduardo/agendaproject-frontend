import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]     = useState(null)
  const [role, setRole]     = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const u = localStorage.getItem('ap_user')
    const r = localStorage.getItem('ap_role')
    if (u && r) { setUser(JSON.parse(u)); setRole(r) }
    setLoading(false)
  }, [])

  const login = (userData, userRole) => {
    localStorage.setItem('ap_user', JSON.stringify(userData))
    localStorage.setItem('ap_role', userRole)
    setUser(userData)
    setRole(userRole)
  }

  const logout = () => {
    localStorage.clear()
    setUser(null)
    setRole(null)
  }

  return (
    <AuthContext.Provider value={{ user, role, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
