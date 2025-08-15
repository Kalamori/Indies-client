import axios from "axios"

export const deleteMenu = async (menuId, token) => {
  const API_URL = import.meta.env.VITE_BACK_END_SERVER_URL
  try {
    await axios.delete(`${API_URL}/api/menu/${menuId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return true
  } catch (err) {
    throw new Error("Failed to delete menu")
  }
}