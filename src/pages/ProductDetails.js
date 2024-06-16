import React, { useState } from 'react';
import saree from "../assets/images/saree8.webp"

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);

  const sampleProduct = {
    name: 'Saree',
    description: 'Self Design Bollywood Net Saree',
    price: 499,
    discountPrice: 299,
    images: [
        saree
    ],
    otherInfo: [
      'Free shipping on orders over $50.',
      '30-day return policy.',
      'In stock and ready to ship.',
    ],
  };

  const handleAddToCart = () => {
    // Handle add to cart logic here
    console.log(`Added ${quantity} of ${sampleProduct.name} to cart.`);
  };

  return (
    <div className="product-page">
      <div className="product-detail">
        <div className="product-images">
          {sampleProduct.images.map((image, index) => (
            <img key={index} src={image} alt={`${sampleProduct.name}-${index}`} />
          ))}
        </div>
        <div className="product-info">
          <h1>{sampleProduct.name}</h1>
          <p>{sampleProduct.description}</p>
          <div className="product-pricing">
            {sampleProduct.discountPrice ? (
              <>
                <span className="discount-price">${sampleProduct.discountPrice.toFixed(2)}</span>
                <span className="original-price">${sampleProduct.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="price">${sampleProduct.price.toFixed(2)}</span>
            )}
          </div>
          <div className="product-other-info">
            {sampleProduct.otherInfo && sampleProduct.otherInfo.map((info, index) => (
              <p key={index}>{info}</p>
            ))}
          </div>
          <div className="product-quantity">
            <label htmlFor="quantity">Quantity</label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
