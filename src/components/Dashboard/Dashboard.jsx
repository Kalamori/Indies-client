import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { index as fetchUsers } from '../../services/userService'

const Dashboard = () => {
    const { user } = useContext(AuthContext)
    const [users, setUsers] = useState([])
    const [error, setError] = useState([])

    useEffect(() => {
        const getUsers = async () => {
            try {
                const userList = await fetchUsers()
                setUsers(userList)
            } catch (err) {
                setError(err.message)
            }
        }
        getUsers()
    }, [])
    return (
        <main>
            <h1>Welcome, {user.username}</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <h2>All Users:</h2>
            <ul>
                {users.map((u) => (
                    <li key={u._id}>{u.username}</li>
                ))}
            </ul>
        </main>
    )
}

export default Dashboard