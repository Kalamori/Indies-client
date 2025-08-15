import { createContext, useState, useEffect } from 'react'

const AuthContext = createContext()

function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('token')
        if (!token) return null
        const decoded = JSON.parse(atob(token.split(".")[1]))
        return decoded.user || decoded
    })
    const [token, setToken] = useState(() => localStorage.getItem("token") || "")

    const login = (token) => {
        const decoded = JSON.parse(atob(token.split(".")[1]))
        setToken(token)
        setUser(decoded.user || decoded)
    }
    const logout = () => {
        localStorage.removeItem("token")
        setToken("")
        setUser(null)
    }
    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext }