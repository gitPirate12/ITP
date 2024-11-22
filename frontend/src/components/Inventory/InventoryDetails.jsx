
  


import { useState } from "react";
import { useItemsContext } from "../../hooks/useItemsContext";


const InventoryDetails = ({ item }) => {
  const { dispatch } = useItemsContext();
  const [showEditForm, setShowEditForm] = useState(false);

  const handleClick = async () => {
    const response = await fetch(
      "http://localhost:5000/api/v1/delete-item/" + item._id,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_ITEM", payload: json });
    }
  };

  const handleEditClick = async (e) => {
    
    const form = e.target;
    const updatedItem = {
      name: form.name.value,
      category: form.category.value,
      price: form.price.value,
      quantity: form.quantity.value,
      description: form.description.value,
      date: form.date.value,
    };
    const response = await fetch(
      `http://localhost:5000/api/v1/update-item/${item._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
      }
    );
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "UPDATE_ITEM", payload: json });
      setShowEditForm(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // handle form submission here
    setShowEditForm(false);
  };

  return (
    
    
    <div className="Inventory-details" >
      <h4>{item.name}</h4>
      <p>
        <strong>Name: </strong>
        {item.name}
      </p>
      <p>
        <strong>Category: </strong>
        {item.category}
      </p>
      <p>
        <strong>Price: </strong>
        {item.price}
      </p>
      <p>
        <strong>Quantity: </strong>
        {item.quantity}
      </p>
      <p>
        <strong>Description: </strong>
        {item.description}
      </p>
      <p>
        <strong>Date: </strong>
        {item.date}
      </p>
      <div style={{ display: "inline-block" }}>
        <span
          style={{ display: "inline-block", marginRight: "60px" }}
          className="material-symbols-outlined"
          onClick={() => setShowEditForm(true)}
        >
          edit
        </span>
        <span
          style={{ display: "inline-block", marginLeft: "60px" }}
          className="material-symbols-outlined"
          onClick={handleClick}
        >
          delete
        </span>
      </div>
      {showEditForm && (
  <form onSubmit={handleEditClick}>
    <label>
      Name:
      <input type="text" name="name" defaultValue={item.name} />
    </label>
    <label>
      Category:
      <input type="text" name="category" defaultValue={item.category} />
    </label>
    <label>
      Price:
      <input type="text" name="price" defaultValue={item.price} />
    </label>
    <label>
      Quantity:
      <input type="text" name="quantity" defaultValue={item.quantity} />
    </label>
    <label>
      Description:
      <input type="text" name="description" defaultValue={item.description} />
    </label>
    <label>
      Date:
      <input type="text" name="date" defaultValue={item.date} />
    </label>
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <button
        style={{
          background: 'var(--primary)',
          border: '0',
          color: '#fff',
          padding: '10px',
          fontFamily: 'Poppins',
          borderRadius: '4px',
          cursor: 'pointer',
          marginRight: '10px',
        }}
        type="submit"
      >
        Save
      </button>
      <button
        style={{
          background: '#e7195a',
          border: '0',
          color: '#fff',
          padding: '10px',
          fontFamily: 'Poppins',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
        onClick={() => setShowEditForm(false)}
      >
        Close
      </button>
    </div>
  </form>
)}

            </div>
            
              
  );
};

export default InventoryDetails;
