// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './AdminSidebar.scss'; // You will create this CSS file next

const Sidebar = () => {
  return (
    <div className="sidebar p-4">
      <h2>Icon</h2>
      <ul>
        <li className=''>
          <Link to="/admindashboard">admindashboard</Link>
        </li>
        <li>
          <Link to="/categorymanager">Category</Link>
        </li>
        <li>
          <Link to="/adminsubcategory">SubCategory</Link>
        </li>
        <li>
          <Link to="/adminaddproduct">Products</Link>
        </li>
        <li>
          <Link to="#">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
