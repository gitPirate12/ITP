import { useState, useEffect } from "react";
import { useItemsContext } from "../../hooks/useItemsContext";
import InventoryDetails from "./InventoryDetails";
import SearchFilter from "./SearchFilter";
import Sidebar from './Navbar';

const ItemDisplay = () => {
  const { items, dispatch } = useItemsContext();
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch("http://localhost:5000/api/v1/get-items");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_ITEMS", payload: json });
      }
    };

    fetchItems();
  }, [items]);

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredItems(items);
      return;
    }

    const filtered = items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  return (
  <div className="container" style={{ marginLeft: "400px" }}>
    <Sidebar />
    <div className="content" style={{  width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', alignContent: 'flex-start' }}>
      <div style={{ width: '800px' , marginLeft: '20px' }}>
        <SearchFilter onSearch={handleSearch} />
      </div>
      <div className="home" style={{ flexGrow: 1, display: 'flex' }}>
        <div className="Items" style={{ width: '100%' }}>
          {filteredItems &&
            filteredItems.map((item) => (
              <InventoryDetails item={item} key={item._id} />
            ))}
        </div>
      </div>
    </div>
  </div>
);

  
              }

export default ItemDisplay;
