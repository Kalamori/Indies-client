import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../contexts/AuthContext.jsx"

const CreateMenuItem = () => {
  const { user } = useAuth()
  const { menuId } = useParams()
  const navigate = useNavigate()

  const [item, setItem] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    img_URL: "",
  })

  const handleChange = (field, value) => {
    setItem({ ...item, [field]: value })
  }

 const handleSubmit = async (e) => {
    e.preventDefault()
    const API_URL = import.meta.env.VITE_BACK_END_SERVER_URL
    try {
      await axios.post(`${API_URL}/api/menu/${menuId}/item`, item, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      navigate(`/menus/${menuId}`)
    } catch (err) {
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
  <h2 className="form-title">Create Menu Item</h2>

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
      required
      className="form-input"
    />
  </div>

  <button type="submit" className="btn-primary">Create Item</button>
</form>
  )
}

export default CreateMenuItem