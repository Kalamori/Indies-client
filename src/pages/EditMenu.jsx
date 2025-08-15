import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../contexts/AuthContext.jsx"

const EditMenu = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [menu, setMenu] = useState({
    title: "",
    description: "",
    items: [],
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const API_URL = import.meta.env.VITE_BACK_END_SERVER_URL
        const res = await axios.get(`${API_URL}/api/menu/${id}`, {
           headers: {
            Authorization: `Bearer ${user.token}`,
          }, 
        })
        setMenu(res.data)
      } catch (err) {
        setError("Failed to fetch menu")
      }
    }
    fetchMenu()
  }, [id])

  const handleChange = (field, value) => {
    setMenu({ ...menu, [field]: value })
  }

  const handleItemChange = (index, field, value) => {
    const newItems = [...menu.items]
    newItems[index][field] = value
    setMenu({ ...menu, items: newItems })
  }

  const addItem = () => {
    setMenu({
      ...menu,
      items: [
        ...menu.items,
        { name: "", description: "", price: 0, category: "", img_URL: "" },
      ],
    })
  }

  const removeItem = (index) => {
    const newItems = menu.items.filter((_, i) => i !== index)
    setMenu({ ...menu, items: newItems })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const API_URL = import.meta.env.VITE_BACK_END_SERVER_URL
      await axios.put(`${API_URL}/api/menu/${id}`, menu, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      navigate("/menus")
    } catch (err) {
      setError("Failed to update menu")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-container">
  <h2 className="form-title">Edit Menu</h2>
  {error && <p className="error-text">{error}</p>}

  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label>Title:</label>
      <input
        type="text"
        value={menu.title}
        onChange={(e) => handleChange("title", e.target.value)}
        required
        className="form-input"
      />
    </div>

    <div className="form-group">
      <label>Description:</label>
      <textarea
        value={menu.description}
        onChange={(e) => handleChange("description", e.target.value)}
        required
        className="form-textarea"
      />
    </div>

    <h3>Items in this menu</h3>
    {menu.items.map((item, index) => (
      <div key={index} className="item-card">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={item.name}
            onChange={(e) => handleItemChange(index, "name", e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Category:</label>
          <input
            type="text"
            value={item.category}
            onChange={(e) => handleItemChange(index, "category", e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            step="0.01"
            value={item.price}
            onChange={(e) => handleItemChange(index, "price", parseFloat(e.target.value))}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={item.description}
            onChange={(e) => handleItemChange(index, "description", e.target.value)}
            required
            className="form-textarea"
          />
        </div>

        <div className="form-group">
          <label>Image URL:</label>
          <input
            type="text"
            value={item.img_URL}
            onChange={(e) => handleItemChange(index, "img_URL", e.target.value)}
            className="form-input"
          />
        </div>

        <button type="button" onClick={() => removeItem(index)} className="btn-danger">
          Remove Item
        </button>
      </div>
    ))}

    <button type="button" onClick={addItem} className="btn-secondary">
      Add New Item
    </button>

    <button type="submit" disabled={loading} className="btn-primary">
      {loading ? "Saving..." : "Save Changes"}
    </button>
  </form>
</div>
  )
}

export default EditMenu