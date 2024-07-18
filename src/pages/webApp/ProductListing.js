import React, { useEffect, useState } from "react";

import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import AxiosInstance from "../../helpers/AxiosRequest";
import { toast } from "react-toastify";

const ProductListing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { subCategoryId, subCategoryName } = location.state || {};
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (subCategoryId) {
        try {
          const response = await AxiosInstance.get(
            `/product/getproduct?subCategoryId=${subCategoryId}`
          );
          setProducts(response?.data?.data);
        } catch (error) {
          toast.error("Failed to load Products", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      }
    };
    fetchSubCategories();
  }, [subCategoryId]);

  const handleProductClick = (product) => {
    navigate("/productdetails", { state: { product } });
  };

  return (
    <Container>
      <h2 className="mt-5">{subCategoryName} Product Listing</h2>
      <div className="categories row mt-5 g-3">
        {products?.length > 0 &&
          products.map((product, index) => {
            const {
              status,
              productName,
              images,
              price,
              discountPrice,
            } = product;

            const discountPercentage = discountPrice
              ? ((price - discountPrice) / price) *100 : 0;

            return (
              status && (
                <div
                  key={index}
                  className="col-lg-3 col-md-4 col-sm-6 col-12"
                  onClick={() => handleProductClick(product)}
                >
                  <div className="p-3 border h-100 d-flex flex-column justify-content-between">
                    {images &&
                      images.map((src, index) => (
                        <img
                          src={src}
                          alt={index}
                          className="img-fluid"
                          style={{ maxHeight: "350px" }}
                        />
                      ))}

                    <p className="mt-3 fs-4">{productName}</p>
                    <div className="d-flex flex-wrap">
                    <span className="me-2">₹{price.toFixed(2)}</span>
                    <span className="me-2">₹{discountPrice.toFixed(2)}</span>
                    <span
                      className="discount-percentage me-2"
                      style={{ color: "green" }}
                    >
                      {discountPercentage.toFixed(2)}% off
                    </span>
                    </div>
                  </div>
                </div>
              )
            );
          })}
      </div>
    </Container>
  );
};

export default ProductListing;
