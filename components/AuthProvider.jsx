'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Fetch user data on mount
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
            console.error('Failed to fetch user:', data.error)
            localStorage.removeItem('token')
            setUser(null)
            router.push('/login')
          }
        } catch (error) {
          console.error('Error fetching user:', error.message)
          localStorage.removeItem('token')
          setUser(null)
          router.push('/login')
        }
      }
      setLoading(false)
    }
    fetchUser()
  }, [router])

  // Logout function
  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}