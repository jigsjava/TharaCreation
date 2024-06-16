import React, { useState } from 'react';
import './FreqBought.scss';
import mainProductImage from '../assets/images/saree3.webp';
import addonProductImage from '../assets/images/saree4.webp';

const FreqBought = () => {
  const [mainProductSelected, setMainProductSelected] = useState(true);
  const [addonSelected, setAddonSelected] = useState(true);

  const mainProductPrice = 299;
  const addonPrice = 449;
  const totalPrice = mainProductPrice + addonPrice;

  return (
    <div className="frequently-bought-together mt-5">
      <h2>Frequently bought together</h2>
      <div className="products">
        <div className="product">
          <img src={mainProductImage} alt="Main Product" />
          <div className="overlay">
            <span>Main Product</span>
            <input 
              type="checkbox" 
              checked={mainProductSelected} 
              onChange={() => setMainProductSelected(!mainProductSelected)}
            />
          </div>
          <p>Siril Floral Print, Ge...</p>
          <span className="price">₹299</span>
        </div>
        <span className="plus">+</span>
        <div className="product">
          <img src={addonProductImage} alt="Addon Product" />
          <div className="overlay">
            <span>Rensilafab Polycotton Printed Kurta & Patiyala Material</span>
            <input 
              type="checkbox" 
              checked={addonSelected} 
              onChange={() => setAddonSelected(!addonSelected)}
            />
          </div>
          <p>Rensilafab Unstitched Polycotton...</p>
          <span className="price">₹449</span>
        </div>
      </div>
      <div className="price-summary">
        <p>Main Product selected<span>₹299</span></p>
        <p>1 Addon selected<span>+ ₹449</span></p>
        <p>Total<span>₹748</span></p>
      </div>
      <button className="add-to-cart-button">Add 2 items to cart</button>
    </div>
  );
};

export default FreqBought;
