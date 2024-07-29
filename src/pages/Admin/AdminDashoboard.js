import React, { useEffect, useState } from 'react'
import "./scss/AdminDashboard.scss"
import AxiosInstance from '../../helpers/AxiosRequest';
import { toast } from 'react-toastify';


const AdminDashoboard = () => {
const [count, setCount] = useState('')

useEffect(() => {
    fetchData();
  }, []); 

  const fetchData = async () => {
    try {
      const response = await AxiosInstance.get(
        `/order/totalcount`
      );
      console.log("first",response)
      setCount(response?.data);
    } catch (error) {
      toast.error("Error fetching data");
    }
  };

  const {totalCategories,totalOrder,totalProducts,totalSubCategories} =count;

  return (
    <div>
        <div className='container mt-5'>
            <div className='row g-5'>
                <div className='col-lg-4 col-md-6 col-sm-12'>
                    <div className='display-box'>
                    <h1> Category</h1>
                    <p>{totalCategories}</p>
                    </div>
                </div>
                <div className='col-lg-4 col-md-6 col-sm-12'>
                    <div className='display-box'>
                    <h1>SubCategory</h1>
                    <p>{totalSubCategories}</p>
                    </div>
                </div>
                <div className='col-lg-4 col-md-6 col-sm-12'>
                    <div className='display-box'>
                    <h1>Product</h1>
                    <p>{totalProducts}</p>
                    </div>
                </div>
                <div className='col-lg-4 col-md-6 col-sm-12'>
                    <div className='display-box'>
                    <h1>Total Order</h1>
                    <p>{totalOrder}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminDashoboard