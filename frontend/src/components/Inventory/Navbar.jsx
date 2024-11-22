import { Link, useLocation } from 'react-router-dom';
import { BiHome, BiBarChartSquare, BiPackage, BiFile, BiPlus } from 'react-icons/bi';
import styled from "styled-components";
const NavbarStyled = styled.div`
.sidebar {
  position: absolute !important;
  top: 80px !important;
  left: 0;
  height: 100%;
  width: 200px;
  background-color: 0B2447 ;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  padding: 15px;
  border-bottom: 1px solid #ddd;
}

.sidebar li:last-child {
  border-bottom: none;
}

.sidebar a {
  color: white !important;
  text-decoration: none;
}

.sidebar a:hover {
  color: #000;
  font-weight: bold;
}
.pages {
  margin-left: 200px; /* adjust this value based on the width of your sidebar */
}

.sidebar-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.sidebar-subtitle {
  font-size: 0.7rem;
  line-height: 1rem;
  color: white;
  margin-bottom: 1.5rem;
}

.sidebar-item.active .sidebar-link {
  font-weight: bold;
}

`; 

const Sidebar = () => {
  const location = useLocation();

  return (
    <NavbarStyled>
    <nav className="sidebar" >
      <h2 className="sidebar-title">SAP Retail</h2>
      <p className="sidebar-subtitle">Inventory Management System</p>
      <ul>
      <li className={location.pathname === '/inventorydashboard' ? 'sidebar-item active' : 'sidebar-item'}>
          <Link to="/inventorydashboard" className="sidebar-link"><BiPackage />Dashboard</Link>
        </li>
        <li className={location.pathname === '/inventory-details' ? 'sidebar-item active' : 'sidebar-item'}>
          <Link to="/inventory-details" className="sidebar-link"><BiHome />Inventory</Link>
        </li>
        
        <li className={location.pathname === '/orders' ? 'sidebar-item active' : 'sidebar-item'}>
          <Link to="/orders" className="sidebar-link"><BiBarChartSquare />Orders</Link>
        </li>
        <li className={location.pathname === '/reports' ? 'sidebar-item active' : 'sidebar-item'}>
          <Link to="/reports" className="sidebar-link"><BiFile />Reports</Link>
        </li>
        <li className={location.pathname === '/add-item' ? 'sidebar-item active' : 'sidebar-item'}>
          <Link to="/add-item" className="sidebar-link"><BiPlus />Add Items</Link>
        </li>
      </ul>
    </nav>
    </NavbarStyled>
  );
};





export default Sidebar;