const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`

const index = async () => {
    try {
        const token = localStorage.getItem('token')

        if (!token) throw new Error('No Token Found')
        
        const res = await fetch(`${BASE_URL}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',

                'Authorization': `Bearer ${token}`
            }
        })

        const data = await res.json()

        if (data.err) {
            throw new Error(data.err)
        }
        return data
    } catch (err) {
        console.log(err)
        throw new Error(err.message)
    }
}

export { index }