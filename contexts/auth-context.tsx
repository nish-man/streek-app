"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface AuthContextType {
  isAuthenticated: boolean
  user: any | null
  login: (token: string, userData: any) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for existing token and user data
    const token = localStorage.getItem("streek-token")
    const userData = localStorage.getItem("streek-user")
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
        setIsAuthenticated(true)
      } catch (error) {
        // If there's an error parsing the user data, clear everything
        localStorage.removeItem("streek-token")
        localStorage.removeItem("streek-user")
      }
    }
    
    setIsLoading(false)
  }, [])

  const login = (token: string, userData: any) => {
    localStorage.setItem("streek-token", token)
    localStorage.setItem("streek-user", JSON.stringify(userData))
    setUser(userData)
    setIsAuthenticated(true)
    router.push("/")
  }

  const logout = () => {
    localStorage.removeItem("streek-token")
    localStorage.removeItem("streek-user")
    setUser(null)
    setIsAuthenticated(false)
    router.push("/")
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
} 