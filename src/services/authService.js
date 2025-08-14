const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/auth`

const signUp = async (formData) => {
     try {
        const res = await fetch(`${BASE_URL}/sign-up`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json'},
         body: JSON.stringify(formData),
})

const data = await res.json()

if (!res.ok) {
    throw new Error(data.message || 'Sign up Failed')
}

if (data.token) {
    localStorage.setItem('token', data.token)
    const decoded = JSON.parse(atob(data.token.split('.')[1]))
    return decoded.payload
}
   throw new Error('Invalid response from server')
 } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export {
  signUp
}