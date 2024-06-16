import React from 'react';
import Electronics from "../assets/images/Electronics.webp"
import Fashion from "../assets/images/Fashion.webp"
import Kitchen from "../assets/images/Kitchen.webp"
import Furniture from "../assets/images/Furniture.webp"
import Travel from "../assets/images/Travel.webp"
import Beauty from "../assets/images/Beauty.webp"
import { Button, Container } from 'react-bootstrap';
import SearchForm from '../components/SearchForm';
import { useNavigate } from 'react-router-dom';

const categories = [
  { name: 'Electronics', icon: Electronics,price: '500'},
  { name: 'Fashion', icon: Fashion,price: '500' },
  { name: 'Home & Kitchen', icon: Kitchen ,price: '500'},
  { name: 'Furniture', icon: Furniture,price: '500'},
  { name: 'Travel', icon: Travel ,price: '500'},
  { name: 'Beauty', icon: Beauty ,price: '500'},
];

const SubCategory = () => {
  const navigate = useNavigate();
  return (
    <Container className='mt-5'>
      <h2 className='mt-5'>subcategory Name</h2>
      <SearchForm />
      <div className="row mt-3 g-5">
        {categories.map((category, index) => (
          <div key={index} className="col-lg-3 col-md-4 col-sm-6 col-12">
            <div className="p-3 border bg-light d-flex justify-content flex-column align-items-center">
            <img src={category.icon} alt={category.name} />
            <p className='mt-3 text-center'>{category.name} <br /><b>{category.price}</b></p>
            </div>
          </div>
        ))}
      </div>
      <button className="btn btn-success m-5" onClick={() =>{navigate("/productlist")}}>ProductListing</button>
    </Container>
  );
};

export default SubCategory;
