import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

const NavBar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">MyApp</Link>
      </div>

      <div className="nav-links flex-center">
        <Link to="/menus">Menus</Link>

        {user?.role === 'admin' && (
          <Link to="/menus/create">Create Menu</Link>
        )}

        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/sign-up">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default NavBar