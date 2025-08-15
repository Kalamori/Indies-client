import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../contexts/AuthContext"

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({ identifier: '', password: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/api/auth/sign-in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Login failed')
        setLoading(false)
        return
      }

      if (!data.token) {
        setError('No token returned from server')
        setLoading(false)
        return
      }

      login(data.token)
      navigate('/')
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
   <div className="login-page flex-center" style={{ flexDirection: 'column', padding: '40px 20px' }}>
  <h1 className="page-title">Login</h1>
  <form className="auth-form" onSubmit={handleSubmit}>
    {error && <p className="error-text">{error}</p>}
    
    <div className="form-group">
      <label htmlFor="identifier">Username or Email:</label>
      <input
        type="text"
        name="identifier"
        value={formData.identifier}
        onChange={handleChange}
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
    </div>

    <button type="submit" className="btn-primary" disabled={loading}>
      {loading ? 'Logging in...' : 'Login'}
    </button>
  </form>
</div>
  )
}

export default Login