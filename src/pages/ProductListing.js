import React from 'react';
import Fashion from "../assets/images/saree1.webp"
import Kitchen from "../assets/images/saree2.webp"
import Furniture from "../assets/images/saree3.webp"
import Travel from "../assets/images/saree5.webp"
import Beauty from "../assets/images/saree4.webp"
import saree6 from "../assets/images/saree6.webp"
import saree7 from "../assets/images/saree7.webp"
import saree8 from "../assets/images/saree8.webp"
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import SearchForm from '../components/SearchForm';

const categories = [
  { price:'900',name: 'Fashion', icon: Fashion },
  { price:'900',name: 'Home & Kitchen', icon: Kitchen },
  { price:'900',name: 'Furniture', icon: Furniture},
  { price:'900',name: 'Travel', icon: Travel },
  { price:'900',name: 'Beauty', icon: Beauty },
  { price:'900',name: 'Beauty', icon: saree6 },
  { price:'900',name: 'Beauty', icon: saree7 },
  { price:'900',name: 'Beauty', icon: saree8 },
];

const ProductListing = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <h2 className='mt-5'>Product Listing</h2>
      {/* <SearchForm /> */}
        <div className="categories row mt-5 g-3">
      {categories.map((category, index) => (
        <div key={index} className="col-lg-3 col-md-4 col-sm-6 col-12">
           <div className="p-3 border h-100 d-flex flex-column justify-content-between">
           <img src={category.icon} alt={category.name} className='img-fluid' style={{maxHeight:'350px'}}/>
          <p className='mt-3'>{category.name} <br /><b>{category.price}</b></p>
           </div>
        </div>
      ))}
      </div>
    <button className="btn btn-success m-5" onClick={() =>{navigate("/producdetails")}}>ProductListing</button>
    </Container>
  );
};

export default ProductListing;
