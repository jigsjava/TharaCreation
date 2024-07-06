import React from 'react'
import "./scss/AdminDashboard.scss"

const AdminDashoboard = () => {
  return (
    <div>
        <div className='container mt-5'>
            <div className='row g-5'>
                <div className='col-lg-4 col-md-6 col-sm-12'>
                    <div className='display-box'>
                    <h1> Category</h1>
                    <p>52</p>
                    </div>
                </div>
                <div className='col-lg-4 col-md-6 col-sm-12'>
                    <div className='display-box'>
                    <h1> Category</h1>
                    <p>52</p>
                    </div>
                </div>
                <div className='col-lg-4 col-md-6 col-sm-12'>
                    <div className='display-box'>
                    <h1>Sub Category</h1>
                    <p>52</p>
                    </div>
                </div>
                <div className='col-lg-4 col-md-6 col-sm-12'>
                    <div className='display-box'>
                    <h1>Total Order</h1>
                    <p>52</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminDashoboard