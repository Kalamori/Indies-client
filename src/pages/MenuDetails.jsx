import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from "../contexts/AuthContext"

const API_URL = import.meta.env.VITE_BACK_END_SERVER_URL

const MenuDetails = () => {
  const { user } = useAuth()
  const { id } = useParams()
  const [menu, setMenu] = useState(null)

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const API_URL = import.meta.env.VITE_BACK_END_SERVER_URL
        const res = await axios.get(`${API_URL}/api/menu/${id}`)
        setMenu(res.data)
      } catch (err) {
      }
    }
    fetchMenu()
  }, [id])

  if (!menu) return <p>Loading menu...</p>

  return (
   <div className="menu-details">
  <h1>{menu.title}</h1>
  <p>{menu.description}</p>

  <h2>Items</h2>
  {menu.items.length > 0 ? (
    <ul className="grid-container">
      {menu.items.map((item) => (
        <li key={item._id}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p>Category: {item.category}</p>
          <p>Price: ${item.price}</p>
          <img src={item.img_URL} alt={item.name} />

          {user?.user?.role === "admin" && (
            <div className="admin-links">
              <Link to={`/menus/${menu._id}/item/${item._id}/edit`} className="btn-link">
                Edit Item
              </Link>
            </div>
          )}
        </li>
      ))}
    </ul>
  ) : (
    <p>No items yet.</p>
  )}

  {user?.user?.role === "admin" && (
    <Link to={`/menus/${menu._id}/item/create`} className="btn-primary">
      Add New Item
    </Link>
  )}
</div>
  )
}

export default MenuDetails