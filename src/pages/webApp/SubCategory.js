import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container,Row,Col, Breadcrumb } from "react-bootstrap";
import AxiosInstance from "../../helpers/AxiosRequest";
import { toast } from "react-toastify";
import SearchForm from "../../components/SearchForm";

const SubCategory = () => {
  const navigate = useNavigate();
  const [subCategories, setSubCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get("id");
  const categoryName = queryParams.get("name");

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (categoryId) {
        try {
          const response = await AxiosInstance.get(
            `/subcategory/getsubcategory?searchQuery=${searchQuery}&page=${page}&categoryId=${categoryId}`
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
  }, [categoryId,searchQuery, page]);

  const handleSubCategoryClick = (subcategory) => {
     navigate(`/productlist?id=${subcategory._id}&name=${subcategory.subCategoryName}&categoryId=${categoryId}&categoryName=${categoryName}`);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1); // Reset page to 1 on search
  };

  return (
    <Container className="mt-5">
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>subCategories</Breadcrumb.Item>
      </Breadcrumb>
       <Row className="mt-3 mb-3">
        <Col md={{ span: 12, offset: 12 }} className='d-flex justify-content-end'>
          <SearchForm onSearch={handleSearch} />
        </Col>
      </Row>
      <h2 className="mt-3">{categoryName}</h2>
      <div className="row mt-2 g-5">
        {subCategories?.length > 0 &&
          subCategories.map(
            (subcategory, index) =>
              subcategory?.status && (
                <div key={index} className="col-lg-3 col-md-4 col-sm-6 col-12">
                  <div className="p-3 border bg-light subcategory-block" onClick={() => handleSubCategoryClick(subcategory)}>
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
    </Container>
  );
};

export default SubCategory;
