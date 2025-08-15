import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext.jsx"
import axios from "axios"

const EditMenuItem = () => {
    const { user } = useAuth()
  const { menuId, itemId } = useParams()
  const navigate = useNavigate()

  const [item, setItem] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    img_URL: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const API_URL = import.meta.env.VITE_BACK_END_SERVER_URL
        const res = await axios.get(`${API_URL}/api/menu/${menuId}/item/${itemId}`)
        setItem(res.data)
      } catch (err) {
        setError("Failed to load item data")
      }
    }
    fetchItem()
  }, [menuId, itemId])

  const handleChange = (field, value) => {
    setItem({ ...item, [field]: field === "price" ? parseFloat(value) : value })
  }

const handleSubmit = async (e) => {
  e.preventDefault()
  if (!user?.token) {
    setError("You must be logged in to edit items")
    return
  }

  setLoading(true)
  setError(null)
  const API_URL = import.meta.env.VITE_BACK_END_SERVER_URL

  try {
    await axios.put(
      `${API_URL}/api/menu/${menuId}/item/${itemId}`,
      item,
      {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
    )
    navigate(`/menus/${menuId}`)
  } catch (err) {
    setError("Failed to save changes. Make sure you are authorized.")
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="form-container">
  <h2 className="form-title">Edit Menu Item</h2>
  {error && <p className="error-text">{error}</p>}

  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label>Name</label>
      <input
        value={item.name}
        onChange={e => handleChange("name", e.target.value)}
        required
        className="form-input"
      />
    </div>

    <div className="form-group">
      <label>Description</label>
      <textarea
        value={item.description}
        onChange={e => handleChange("description", e.target.value)}
        required
        className="form-textarea"
      />
    </div>

    <div className="form-group">
      <label>Price</label>
      <input
        type="number"
        value={item.price}
        onChange={e => handleChange("price", e.target.value)}
        required
        className="form-input"
      />
    </div>

    <div className="form-group">
      <label>Category</label>
      <input
        value={item.category}
        onChange={e => handleChange("category", e.target.value)}
        required
        className="form-input"
      />
    </div>

    <div className="form-group">
      <label>Image URL</label>
      <input
        value={item.img_URL}
        onChange={e => handleChange("img_URL", e.target.value)}
        className="form-input"
      />
    </div>

    <button type="submit" disabled={loading} className="btn-primary">
      {loading ? "Saving..." : "Save Changes"}
    </button>
  </form>
</div>
  )
}

export default EditMenuItem