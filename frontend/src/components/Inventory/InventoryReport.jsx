import { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import axios from "axios";
import Sidebar from './Navbar';

const InventoryReport = () => {
  const [items, setItems] = useState([]);
  const [excelData, setExcelData] = useState([]);

  useEffect(() => {
    // Fetch the item data from the server
    axios
      .get("http://localhost:5000/api/v1/get-items")
      .then((response) => {
        // Store the item data in state
        setItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (items) {
      // Convert the item data to an array of arrays
      const data = items.map((item) => [
        item.name,
        item.category,
        item.price,
        item.quantity,
        item.description,
        item.date,
      ]);

      // Add a header row to the data
      data.unshift(["Name", "Category", "Price", "Quantity", "Description", "Date"]);

      // Set the data state variable
      setExcelData(data);
    }
  }, [items]);

  const handleExportClick = () => {
    if (items) { // Make sure items is not null
      // Create a new workbook and worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(excelData);

      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(wb, ws, "Inventory");

      // Convert the workbook to a buffer
      const wbBuf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

      // Save the buffer as a file
      saveAs(new Blob([wbBuf], { type: "application/octet-stream" }), "inventory.xlsx");
    }
  };

  return (
    <div><Sidebar/>
    <div className="Inventory-report" style={{ marginLeft: '300px' }} >
      <h3>Inventory Report</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {items && items.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.description}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleExportClick} style={{ 
  background: 'var(--primary)', 
  border: '0', 
  color: '#fff', 
  padding: '10px', 
  fontFamily: 'Poppins', 
  borderRadius: '4px', 
  cursor: 'pointer' 
}}>Export to Excel</button>
    </div>
    </div>
  );
};

export default InventoryReport;
