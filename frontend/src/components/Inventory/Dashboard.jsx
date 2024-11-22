import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import Sidebar from './Navbar';
import "../../styles/InventoryNavbar.css"



import { FaDollarSign, FaBoxOpen, FaListUl, FaShoppingCart } from 'react-icons/fa';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [outOfStockCount, setOutOfStockCount] = useState(0);
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    // Fetch all items
    axios.get('http://localhost:5000/api/v1/get-items')
      .then(res => {
        setItems(res.data);

        // Calculate total value of items
        let total = 0;
        res.data.forEach(item => {
          total += item.price * item.quantity;
        });
        setTotalValue(total);

        // Count number of out of stock items
        const outOfStock = res.data.filter(item => item.quantity === 0);
        setOutOfStockCount(outOfStock.length);

        // Prepare data for pie chart
        const categories = {};
        res.data.forEach(item => {
          if (categories[item.category]) {
            categories[item.category]++;
          } else {
            categories[item.category] = 1;
          }
        });
        const categoryData = Object.entries(categories).map(([name, value]) => ({ name, value }));
        setCategoryData(categoryData);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const getTotalCategories = (items) => {
    const categories = new Set();
    items.forEach(item => categories.add(item.category));
    return categories.size;
  };


  const getTotalProducts = (productName) => {
    const filteredItems = items.filter(item => item.name === productName);
    const total = filteredItems.reduce((acc, item) => acc + item.quantity, 0);
    return total;
  };

  // To get the total count of all the products available
  const productNames = [...new Set(items.map(item => item.name))]; // Get unique product names
  const totalProducts = productNames.reduce((acc, name) => acc + getTotalProducts(name), 0);


  const productData = items.reduce((acc, item) => {
    const existingProduct = acc.find(product => product.name === item.name);
    if (existingProduct) {
      existingProduct.quantity += item.quantity;
    } else {
      acc.push({ name: item.name, quantity: item.quantity });
    }
    return acc;
  }, []);

  return (
    <div>
    <Sidebar/>
    <div className="dashboard-container"  style={{ marginLeft: '200px' }} >
       
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="dashboard-stats">
        <div className="dashboard-stat">
          <div className="dashboard-stat-icon">
            <FaDollarSign />
          </div>
          <div className="dashboard-stat-info">
            <h2 className="dashboard-stat-title">Total Item Value</h2>
            <span className="dashboard-stat-value">${totalValue}</span>
          </div>
        </div>
        <div className="dashboard-stat">
          <div className="dashboard-stat-icon">
            <FaBoxOpen />
          </div>
          <div className="dashboard-stat-info">
            <h2 className="dashboard-stat-title">Out of Stock Items</h2>
            <span className="dashboard-stat-value">{outOfStockCount}</span>
          </div>
        </div>
        <div className="dashboard-stat">
          <div className="dashboard-stat-icon">
            <FaListUl />
          </div>
          <div className="dashboard-stat-info">
            <h2 className="dashboard-stat-title">Total Categories</h2>
            <span className="dashboard-stat-value">{getTotalCategories(items)}</span>
          </div>
        </div>
        <div className="dashboard-stat">
          <div className="dashboard-stat-icon">
            <FaShoppingCart />
          </div>
          <div className="dashboard-stat-info">
            <h2 className="dashboard-stat-title">Total Products</h2>
            <span className="dashboard-stat-value">{totalProducts}</span>
          </div>
        </div>
      </div>
      {categoryData && (
        <div className="dashboard-charts-container">
          <div className="dashboard-chart">
            <h2 className="dashboard-chart-title">Products by Category</h2>
            <PieChart width={400} height={400}>
              <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" fill="#8884d8" label>
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`#${((1 << 24) * Math.random() | 0).toString(16)}`} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
          <div className="dashboard-chart">
            <h2 className="dashboard-chart-title">Total Products by Category</h2>
            <BarChart width={800} height={400} data={categoryData}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </div>
        </div>
      )}
    </div>
    </div>
    
  );
                } 
export default Dashboard;
