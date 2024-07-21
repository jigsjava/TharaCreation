import React, { useState } from "react";
import FreqBought from "../../components/FreqBought";
import { useNavigate, useLocation } from "react-router-dom";
import { Breadcrumb, Container } from "react-bootstrap";

const ProductDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state || {};

  const handleAddToCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingProduct = cartItems.find((item) => item._id === product._id);

    if (!existingProduct) {
      const productToStore = {
        _id: product._id,
        productName: product.productName,
        images: product.images,
        price: product.price,
        discountPrice: product.discountPrice,
        quantity: 1,
        TotalQuantity:product.quantity-1
      };
      cartItems.push(productToStore);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
    navigate("/addcart");
  };

  if (!product) {
    return <p>No product details available.</p>;
  }

  const discountPercentage = product.discountPrice
    ? ((product.price - product.discountPrice) / product.price) * 100
    : 0;

  return (
    <Container className="mt-5">
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item
          href={`/subcategory?id=${product.categoryId}&name=${product.categoryData.categoryName}`}
        >
          subCategories
        </Breadcrumb.Item>
        <Breadcrumb.Item
          href={`/productlist?id=${product.subCategoryId}&name=${product.subCategoryData.subCategoryName}&categoryId=${product.categoryId}&categoryName=${product.categoryData.categoryName}`}
        >
          Products
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Productsdetails</Breadcrumb.Item>
      </Breadcrumb>
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
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        <FreqBought />
      </div>
    </Container>
  );
};

export default ProductDetails;
