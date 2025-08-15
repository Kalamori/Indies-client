import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'

const LoginForm = () => {
    const navigate = useNavigate()
    const { login } = useContext(AuthContext)

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState({})

    const handleChange = (e) => { 
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setErrors({})
    }
   
    const handleSubmit = async (evt) => {
  evt.preventDefault()

  if (!formData.email || !formData.password) {
    setErrors({ general: "Email and Password are required" })
    return
  }

    try {
      const res = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Login Failed")
        login(data.token)
    navigate('/dashboard')
 } catch (err) {
    setErrors({ general: err.message })
 }
}   

    return (
        <form onSubmit={handleSubmit}>
            {errors.general && <p>{errors.general}</p>}
            <input name='email' value={formData.email} onChange={handleChange} placeholder="Email" />
            <input name='password' value={formData.password} onChange={handleChange} type="password" placeholder="Password" />
            <button type='submit'>Login</button>
        </form>
       
    )
}

export default LoginForm