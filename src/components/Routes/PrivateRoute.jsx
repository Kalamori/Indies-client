import { Navigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"


const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user } = useAuth()

  if (!user) {
    
    return <Navigate to="/login" replace />
  }

  if (adminOnly && user.user.role !== 'admin') {

    return <Navigate to="/" replace />
  }

  return children
}

export default PrivateRoute