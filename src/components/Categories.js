import React from 'react';
import Electronics from "../assets/images/Electronics.webp"
import Fashion from "../assets/images/Fashion.webp"
import Kitchen from "../assets/images/Kitchen.webp"
import Furniture from "../assets/images/Furniture.webp"
import Travel from "../assets/images/Travel.webp"
import Beauty from "../assets/images/Beauty.webp"
import { Container } from 'react-bootstrap';

const categories = [
  { name: 'Electronics', icon: Electronics},
  { name: 'Fashion', icon: Fashion },
  { name: 'Home & Kitchen', icon: Kitchen },
  { name: 'Furniture', icon: Furniture},
  { name: 'Travel', icon: Travel },
  { name: 'Beauty', icon: Beauty },
];

const Categories = () => {
  return (
    <Container>
        <div className="categories row mt-5 g-3">
      {categories.map((category, index) => (
        <div key={index} className="col-lg-2 col-md-4 col-sm-6 col-12">
           <div className="p-3 border category-item">
           <img src={category.icon} alt={category.name} />
          <p>{category.name}</p>
           </div>
        </div>
      ))}
    </div>
    </Container>
  );
};

export default Categories;
