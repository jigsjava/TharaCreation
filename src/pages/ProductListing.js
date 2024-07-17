import React, { useEffect, useState } from "react";
import Fashion from "../assets/images/saree1.webp";
import Kitchen from "../assets/images/saree2.webp";
import Furniture from "../assets/images/saree3.webp";
import Travel from "../assets/images/saree5.webp";
import Beauty from "../assets/images/saree4.webp";
import saree6 from "../assets/images/saree6.webp";
import saree7 from "../assets/images/saree7.webp";
import saree8 from "../assets/images/saree8.webp";
import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import AxiosInstance from "../helpers/AxiosRequest";
import { toast } from "react-toastify";
// import SearchForm from '../components/SearchForm';

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

  return (
    <Container>
      <h2 className="mt-5">{subCategoryName} Product Listing</h2>
      {/* <SearchForm /> */}
      <div className="categories row mt-5 g-3">
        {products?.length > 0 &&
          products.map((product, index) => {
            const {
              description,
              status,
              productName,
              images,
              price,
              discountPrice,
              quantity,
            } = product;
            const cleanedDescription = description?.replace(/<\/?p>/g, "");

            return (
              status && (
                <div key={index} className="col-lg-3 col-md-4 col-sm-6 col-12">
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

                    <p className="mt-3">Name:{productName}</p>
                    <p>
                      Price:
                      {price}
                    </p>
                    <p>
                      Discount Price:
                      {discountPrice}
                    </p>
                    <p>
                      Quantity:
                      {quantity}
                    </p>
                    <p>
                      Description:
                      {cleanedDescription}
                    </p>
                  </div>
                </div>
              )
            );
          })}
      </div>
      <button
        className="btn btn-success m-5"
        onClick={() => {
          navigate("/producdetails");
        }}
      >
        ProductListing
      </button>
    </Container>
  );
};

export default ProductListing;
