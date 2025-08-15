import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../contexts/AuthContext"

const Signup = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({ username: '', email: '', password: '', passwordConfirmation: '' })
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
      const res = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/api/auth/sign-up`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Signup failed')
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
    <div className="auth-page signup-page">
  <h1>Sign Up</h1>

  <form onSubmit={handleSubmit} className="auth-form">
    {error && <p className="error">{error}</p>}

    <div className="form-group">
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
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

    <div className="form-group">
      <label htmlFor="passwordConfirmation">Confirm Password:</label>
      <input
        type="password"
        name="passwordConfirmation"
        placeholder="Confirm Password"
        value={formData.passwordConfirmation}
        onChange={handleChange}
        required
      />
    </div>

    <button type="submit" className="btn-primary" disabled={loading}>
      {loading ? 'Signing up...' : 'Sign Up'}
    </button>
  </form>
</div>
  )
}

export default Signup