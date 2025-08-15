import { createContext, useContext, useState, useEffect } from 'react'
import { getToken, setToken, removeToken } from '../utils/auth'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

useEffect(() => {
  const token = getToken()
  if (token) {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]))
      setUser({ ...decoded, token })
    } catch {
      removeToken()
    }
  }
}, [])

const login = (token) => {
  setToken(token)
  const decoded = JSON.parse(atob(token.split('.')[1]))
  setUser({ ...decoded, token })
}

  const logout = () => {
    removeToken()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)