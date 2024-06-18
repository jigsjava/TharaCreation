import React from 'react'
import Sidebar from '../../components/AdminPanel/Sidebar'
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {

  return (
    <>
  <div className='row'>
    <div className='col-xl-2 col-md-4'><Sidebar /></div>
  </div>
    </>
  )
}

export default AdminHome