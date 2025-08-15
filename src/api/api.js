const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL

const getToken = () => localStorage.getItem('token')

const headers = (isJson = true) => ({
  'Content-Type': isJson ? 'application/json' : undefined,
  Authorization: `Bearer ${getToken()}`,
})

export const api = {
  get: async (url) => {
    const res = await fetch(`${BASE_URL}${url}`, { headers: headers() })
    return res.json()
  },
  post: async (url, body) => {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(body),
    })
    return res.json()
  },
  put: async (url, body) => {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(body),
    })
    return res.json()
  },
  delete: async (url) => {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: 'DELETE',
      headers: headers(),
    })
    return res.json()
  },
}

export default api