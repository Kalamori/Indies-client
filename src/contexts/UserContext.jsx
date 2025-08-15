import { createContext, useState, useEffect } from "react"

const UserContext = createContext()

function UserProvider({ children }) {
const [user, setUser] = useState(null)

useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
        const decoded = JSON.parse(atob(token.split('.')[1]))
        setUser(decoded)
    }
}, [])

const value = { user, setUser }

return (
    <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
)
}

export { UserProvider, UserContext }
