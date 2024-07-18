import React, { useState } from "react";
import FreqBought from "../../components/FreqBought";
import { useNavigate, useLocation } from "react-router-dom";

const ProductDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state || {};
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.productName} to cart.`);
    navigate("/addcart");
  };

  if (!product) {
    return <p>No product details available.</p>;
  }

  const discountPercentage = product.discountPrice
    ? ((product.price - product.discountPrice) / product.price) * 100
    : 0;

  return (
    <div className="product-page">
      <div className="product-detail">
        <div className="product-images">
          {product.images?.length > 0 ? (
            product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.productName}-${index}`}
                style={{ maxHeight: "400px", maxWidth: "350px" }}
              />
            ))
          ) : (
            <p>No images available.</p>
          )}
        </div>
        <div className="product-infomation">
          <h1>{product.productName}</h1>
          <p>{product.description?.replace(/<\/?p>/g, "")}</p>
          <div className="product-pricing">
            {product.discountPrice ? (
              <>
                <span className="discount-price">
                  ₹{product.discountPrice.toFixed(2)}
                </span>
                <span className="original-price">
                  ₹{product.price.toFixed(2)}
                </span>
                <span
                  className="discount-percentage"
                  style={{ color: "green" }}
                >
                  ({discountPercentage.toFixed(2)}% off)
                </span>
              </>
            ) : (
              <span className="price">₹{product.price.toFixed(2)}</span>
            )}
          </div>
          <div className="product-other-info">
            <p>
              Free shipping on orders over ₹50.
              <br />
              30-day return policy.
              <br />
              In stock and ready to ship.
            </p>
          </div>
          <div>
            <div>
              <button
                className="add-to-cart-button btn btn-primary"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <FreqBought />
    </div>
  );
};

export default ProductDetails;
