import React, { useEffect, useState } from "react";
import { Breadcrumb, Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import AxiosInstance from "../../helpers/AxiosRequest";
import { toast } from "react-toastify";
import FreqBought from "../../components/FreqBought";

const ProductListing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);

  const queryParams = new URLSearchParams(location.search);
  const subCategoryId = queryParams.get("id");
  const subCategoryName = queryParams.get("name");
  const categoryId = queryParams.get("categoryId");
  const categoryName = queryParams.get("categoryName");

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

  const getMaxHeight = (length) => {
    if (length === 3) {
      return "100px";
    } else if (length === 5) {
      return "70px";
    } else {
      return "350px"; // Default max height for other lengths
    }
  };

  return (
    <Container className="mt-5">
       <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href={`/subcategory?id=${categoryId}&name=${categoryName}`}>subCategories</Breadcrumb.Item>
        <Breadcrumb.Item active>Products</Breadcrumb.Item>
      </Breadcrumb>
      <h2 className="mt-3">{subCategoryName}</h2>
      <div className="categories row mt-3 g-3">
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
                          className="img-fluid mb-2"
                          style={{ height: getMaxHeight(images.length)}}
                        />
                      ))}

                    <p className="mt-3 fs-4">{productName}</p>
                    <div className="d-flex flex-wrap">
                    <span className="me-2" style={{textDecoration:'line-through'}}>₹{price.toFixed(2)}</span>
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

      <FreqBought />
    </Container>
  );
};

export default ProductListing;
