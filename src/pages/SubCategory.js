import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import AxiosInstance from "../helpers/AxiosRequest";
import { toast } from "react-toastify";

const SubCategory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { categoryId, categoryName } = location.state || {};
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (categoryId) {
        try {
          const response = await AxiosInstance.get(
            `/subcategory/getsubcategory?categoryId=${categoryId}`
          );
          setSubCategories(response?.data?.data);
        } catch (error) {
          toast.error("Failed to load subcategories", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      }
    };
    fetchSubCategories();
  }, [categoryId]);

  return (
    <Container className="mt-5">
      <h2 className="mt-5">{categoryName} Subcategories</h2>
      <div className="row mt-3 g-5">
        {subCategories?.length > 0 &&
          subCategories.map(
            (subcategory, index) =>
              subcategory?.status && (
                <div key={index} className="col-lg-3 col-md-4 col-sm-6 col-12">
                  <div className="p-3 border bg-light subcategory-block">
                    {subcategory.images &&
                      subcategory.images.map((image, index) => (
                        <img
                          src={image}
                          alt={subcategory.name}
                          className="img-fluid"
                          key={index}
                        />
                      ))}
                    <p className="mt-3 text-center fs-4">
                      {subcategory.subCategoryName}
                    </p>
                  </div>
                </div>
              )
          )}
      </div>
      <button
        className="btn btn-success m-5"
        onClick={() => navigate("/productlist")}
      >
        Product Listing
      </button>
    </Container>
  );
};

export default SubCategory;
