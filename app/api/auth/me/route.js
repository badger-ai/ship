// components/AuthProvider.jsx
'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const res = await fetch('/api/auth/me', {
            headers: { 'Authorization': `Bearer ${token}` }
          })
          const data = await res.json()
          if (res.ok) {
            setUser(data.user)
          } else {
            localStorage.removeItem('token')
            setUser(null)
          }
        } catch {
          localStorage.removeItem('token')
          setUser(null)
        }
      }
      setLoading(false)
    }
    fetchUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}