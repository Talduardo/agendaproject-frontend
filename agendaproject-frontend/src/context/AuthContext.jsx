// src/context/AuthContext.jsx
// SUBSTITUA o arquivo atual pelo conteúdo abaixo.
// Agora usa Firebase Authentication + Firestore.

import { createContext, useContext, useState, useEffect } from 'react'
import { onAuthChange, logout as firebaseLogout } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null)   // Firebase user object
  const [profile, setProfile] = useState(null)   // Firestore profile
  const [role,    setRole]    = useState(null)   // 'empresa' | 'cliente'
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Escuta mudanças de autenticação em tempo real
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
