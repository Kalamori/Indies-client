import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../contexts/AuthContext.jsx"

const CreateMenu = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [items, setItems] = useState([
    { name: "", description: "", price: 0, category: "", img_URL: "" },
  ])

  const handleItemChange = (index, field, value) => {
    const newItems = [...items]
    newItems[index][field] = value
    setItems(newItems)
  }

  const addItem = () => {
    setItems([...items, { name: "", description: "", price: 0, category: "", img_URL: "" }])
  }

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const API_URL = import.meta.env.VITE_BACK_END_SERVER_URL
    try {
      await axios.post(
        `${API_URL}/api/menu`,
        { title, description, items, owner: user.user._id },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      navigate("/menus")
    } catch (err) {
    }
  }

  return (
    <form onSubmit={handleSubmit} className="menu-form">
  <h2>Create Menu</h2>

  <div className="form-group">
    <label>Title</label>
    <input value={title} onChange={e => setTitle(e.target.value)} required />
  </div>

  <div className="form-group">
    <label>Description</label>
    <textarea value={description} onChange={e => setDescription(e.target.value)} required />
  </div>

  <h3>Items</h3>
  {items.map((item, index) => (
    <div key={index} className="item-group">
      <input
        placeholder="Name"
        value={item.name}
        onChange={e => handleItemChange(index, "name", e.target.value)}
        required
      />
      <input
        placeholder="Description"
        value={item.description}
        onChange={e => handleItemChange(index, "description", e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={item.price}
        onChange={e => handleItemChange(index, "price", e.target.value)}
        required
      />
      <input
        placeholder="Category"
        value={item.category}
        onChange={e => handleItemChange(index, "category", e.target.value)}
        required
      />
      <input
        placeholder="Image URL"
        value={item.img_URL}
        onChange={e => handleItemChange(index, "img_URL", e.target.value)}
        required
      />
      <button type="button" className="remove-item-btn" onClick={() => removeItem(index)}>Remove Item</button>
    </div>
  ))}

  <button type="button" className="add-item-btn" onClick={addItem}>Add Item</button>
  <button type="submit" className="submit-btn">Create Menu</button>
</form>
  )
}

export default CreateMenu