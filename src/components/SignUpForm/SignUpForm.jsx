import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { signUp } from '../../services/authService'
import { UserContext } from '../../contexts/UserContext'

const SignUpForm = () => {
    const navigate = useNavigate()
    const { setUser } = useContext(UserContext)

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    })

    const [errors, setErrors] = useState({})

    const { username, password, passwordConfirmation } = formData

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value })
        setErrors({ ...errors, [evt.target.name]: '' })
    }

   const handleSubmit = async (evt) => {
  evt.preventDefault()
  setErrors({})

  try {
    const newUser = await signUp(formData)
    setUser(newUser)
    navigate('/dashboard')   
  } catch (err) {
    const response = err.response?.data
    if (response) {
      setErrors(response)
    } else {
      setErrors({ general: 'Sign up Failed. Please try again.' })
    }
  }
}

    const isFormInvalid = () => {
        return !(username && password && passwordConfirmation && password === passwordConfirmation)
    }

    return (
       <main>
        <h1>Sign up</h1>
        
        {errors.general && <p className="error">{errors.general}</p>}
        
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor='username'>Username:</label>
            <input
              type='text'
              id='username'
              value={username}
              name='username'
              onChange={handleChange}
              required 
            />
            {errors.username && <p className="error">{errors.username}</p>}            
            </div>

            <div>
                <label htmlFor="email">Email:</label>
                <input 
                type="email" 
                id="email"
                value={formData.email || ''}
                name="email"
                onChange={handleChange}
                required
                />
                {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div>
               <label htmlFor="password">Password:</label>
               <input
               type='password'
               id='password'
               value={password}
               name='password'
               onChange={handleChange}
               required
               />
               {errors.password && <p className="error">{errors.password}</p>}
                </div>

               <div>
                <label htmlFor="passwordConfirmation">Confirm Password</label>
                <input 
                type='password'
                id='passwordConfirmation'
                value={passwordConfirmation}
                name='passwordConfirmation'
                onChange={handleChange}
                required
                />
                {errors.passwordConfirmation && <p className="error">{errors.passwordConfirmation}</p>}
                </div>
                <div>
                  <button type="submit" disabled={isFormInvalid()}>Sign Up</button>
                  <button type="button" onClick={() => navigate('/')}>Cancel</button>  
                    </div>     
        </form>
        </main>
    )
}

export default SignUpForm