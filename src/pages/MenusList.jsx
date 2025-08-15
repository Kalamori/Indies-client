import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../contexts/AuthContext.jsx"
import { deleteMenu } from '../api/menu.js'

const MenusList = () => {
  const { user } = useAuth()
  const [menus, setMenus] = useState([])

  const fetchMenus = async () => {
    try {
      const API_URL = import.meta.env.VITE_BACK_END_SERVER_URL
      const res = await axios.get(`${API_URL}/api/menu`)
      setMenus(res.data)
    } catch (err) {
    }
  }

  useEffect(() => {
    fetchMenus()
  }, [])

  const handleDelete = async (menuId) => {
    if (!window.confirm("Are you sure you want to delete this menu?")) return

    try {
      await deleteMenu(menuId, user.token)
      fetchMenus()
    } catch (err) {
      alert("Failed to delete menu")
    }
  }

  if (!menus.length) return <p>Loading menus...</p>

  return (
    <div className="menus-page">
  <h1>Menus</h1>
  <ul className="menus-list">
    {menus.map((menu) => (
      <li key={menu._id} className="menu-card">
        <h2>
          <Link to={`/menus/${menu._id}`} className="menu-title">
            {menu.title}
          </Link>
        </h2>
        <p>{menu.description}</p>
        <p>Items: {menu.items.length}</p>

        {user?.user?.role === "admin" && (
          <div className="admin-actions">
            <Link to={`/menus/${menu._id}/edit`} className="btn-link">
              Edit Menu
            </Link>
            <Link to={`/menus/${menu._id}/item/create`} className="btn-link">
              Add Item
            </Link>
            <button
              onClick={() => handleDelete(menu._id)}
              className="btn-delete"
            >
              Delete
            </button>
          </div>
        )}
      </li>
    ))}
  </ul>

  {user?.user?.role === "admin" && (
    <Link to="/menus/create" className="btn-primary">
      Create New Menu
    </Link>
  )}
</div>
  )
}

export default MenusList