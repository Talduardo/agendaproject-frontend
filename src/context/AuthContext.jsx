// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import { onAuthChange, logout as firebaseLogout } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null)
  const [profile, setProfile] = useState(null)
  const [role,    setRole]    = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthChange((firebaseUser, userProfile) => {
      setUser(firebaseUser)
      setProfile(userProfile)
      setRole(userProfile?.role || null)
      setLoading(false)
    })
    return unsub
  }, [])

  const logout = async () => {
    await firebaseLogout()
    setUser(null)
    setProfile(null)
    setRole(null)
  }

  return (
    <AuthContext.Provider value={{ user, profile, role, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
