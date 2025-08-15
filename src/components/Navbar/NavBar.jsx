import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'

const NavBar = () => {
  
  const { user } = useContext(AuthContext)
  
  return (
    <nav>
      {user ? (
        <ul>
          <li>Welcome, {user.username}</li>
        </ul>
      ) : (
      <ul>
        <li><Link to='/sign-up'>Sign up</Link></li>
      </ul>
      )}
    </nav>
  )
}

export default NavBar