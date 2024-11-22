

import { useState } from 'react'
import { useItemsContext } from '../../hooks/useItemsContext'

const ItemForm = () => {
  const {dispatch} = useItemsContext()
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
  
    // Validate price
    if (isNaN(price) || price <= 0) {
      setError('Please enter a valid price greater than 0.')
      return
    }
  
    // Validate quantity
    if (isNaN(quantity) || quantity < 0) {
      setError('Please enter a valid quantity.')
      return
    }
  
    // Validate input for price and quantity
    const numberRegex = /^[0-9]*$/
    if (!numberRegex.test(price) || !numberRegex.test(quantity)) {
      setError('Please enter numbers only for price and quantity.')
      return
    }
  
    const item = {name, category, price, quantity, description, date}
  
    const response = await fetch('http://localhost:5000/api/v1/add-item', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  
    const json = await response.json()
  
    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
  
    if (response.ok) {
      setError(null)
      setName('')
      setCategory('')
      setPrice('')
      setQuantity('')
      setDescription('')
      setDate('')
      setEmptyFields([])
  
      dispatch({type:'CREATE_ITEM', payload: json})
    }
  }
  
  

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Item</h3>

      <label> Item Name:</label>
      <input 
        type="text" 
        onChange={(e) => setName(e.target.value)} 
        value={name}
        className={emptyFields.includes('name') ? 'error' : ''}
      />

      <label>Category:</label>
      <input 
        type="text" 
        onChange={(e) => setCategory(e.target.value)} 
        value={category}
        className={emptyFields.includes('category') ? 'error' : ''}
      />

      <label>Price:</label>
      <input 
        type="number" 
        onChange={(e) => setPrice(e.target.value)} 
        value={price} 
        className={emptyFields.includes('price') ? 'error' : ''}
      />

      <label> Quantity:</label>
      <input 
        type="number" 
        onChange={(e) => setQuantity(e.target.value)} 
        value={quantity}
        className={emptyFields.includes('quantity') ? 'error' : ''}
      />

      <label>Description:</label>
      <input 
        type="text" 
        onChange={(e) => setDescription(e.target.value)} 
        value={description}
        className={emptyFields.includes('description') ? 'error' : ''}
      />

      <label>Date:</label>
      <input 
        type="date" 
        onChange={(e) => setDate(e.target.value)} 
        value={date} 
        className={emptyFields.includes('date') ? 'error' : ''}
      />

      <button>Add Item</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default ItemForm