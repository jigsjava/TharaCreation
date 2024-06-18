import React from 'react';
import './ProductHistory.scss';
import { Container } from 'react-bootstrap';
import saree8 from "../assets/images/saree8.webp"
import saree7 from "../assets/images/saree7.webp"
import saree6 from "../assets/images/saree6.webp"

const ProductHistory = () => {
  const products = [
    {
      name: 'Spotify Premium - 3M at Rs 119',
      status: 'Cancelled on Aug 08, 2023',
      statusclassName: 'cancelled',
      price: 'FREE',
      imageUrl: saree8,
      description: 'Shipment is cancelled',
    },
    {
      name: 'TUPPERWARE - 1700 ml Polypropylene Groc...',
      status: 'Delivered on Sep 29, 2022',
      statusclassName: 'delivered',
      price: '₹1,849',
      imageUrl: saree7,
      description: 'Your item has been delivered',
    },
    {
      name: 'Wynona Wynona stainless steel rose gold ...',
      status: 'Delivered on May 19, 2022',
      statusclassName: 'delivered',
      price: '₹290',
      imageUrl: saree6,
      description: 'Your item has been delivered',
    },
  ];

  return (
    <Container>
         <h1 className='mt-5 mb-3'>Your Order Details</h1>
   
    <div className="row mt-5 g-5">
      {products.map((product, index) => (
        <div key={index} className="col-lg-3 col-md-4 col-sm-6 col-12">
           <div className="p-3 border h-100 d-flex flex-column justify-content-between" style={{borderRadius:'10px',background:'#fff6dc78'}}>
           <div className="product-image text-center mb-3">
              {product.imageUrl && <img src={product.imageUrl} alt={product.name} />}
            </div>
            <div className="product-details">
              <h3 className='mb-4'>{product.name.length > 25 ? `${product.name.slice(0, 25)}...` : product.name}</h3>
              <p className={`status ${product.statusclassName}`}>{product.status}</p>
              <p className="price">{product.price}</p>
              <p className="description">{product.description}</p>
            </div>
           </div>
        </div>
      ))}
      </div>
    </Container>
  );
};

export default ProductHistory;
