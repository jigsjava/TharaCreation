import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';

const SuccessPage = () => {
    const location = useLocation();
    const { state } = location;
    const message = state?.message;
    const navigate = useNavigate();

  console.log("first",message)
  return (
    <Container className='d-flex justify-content-center align-items-center' style={{height:'100vh'}}>
        <div className='d-flex justify-content-center align-items-center flex-column p-3 p-md-5' style={{borderRadius:'10px',border:'1px solid #000'}}>
        {message && <h1 className='text-success'>{message}</h1>}
         <Button variant="secondary" onClick={() => navigate('/')} className='mt-4'>Continue Shopping</Button>
        </div>
    </Container>
   
  )
}

export default SuccessPage