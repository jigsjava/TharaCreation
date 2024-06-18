import React, { useState } from 'react';
import './Sidebar.scss';
import { useNavigate } from 'react-router-dom';


const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="sidebar">
        <h3 className='mt-5 ms-2'>MAIN MENU</h3>
        <div className='mt-5 ms-2'onClick={() =>navigate('/admindashboard')}>Dashboard</div>
        <div className='mt-5 ms-2'onClick={() =>navigate('/categorymanager')}>Category</div>
        <div className='mt-5 ms-2'onClick={() =>navigate('/adminsubcategory')}>SubCategory</div>
        <div className='mt-5 ms-2'onClick={() =>navigate('/adminaddproduct')}>Product</div>
      </div>
    </div>
  );
};

export default Sidebar;
