import React, { useEffect, useState } from "react";
import { Container,Row,Col } from "react-bootstrap";
import { toast } from "react-toastify";
import AxiosInstance from "../helpers/AxiosRequest";
import { useNavigate } from "react-router-dom";
import SearchForm from "./SearchForm";

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const limit = 4;
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, [searchQuery, page]);

  const fetchData = async () => {

    try {
      const response = await AxiosInstance.get(
        `/category/getcategory?searchQuery=${searchQuery}&page=${page}`
      );
      setCategories(response?.data?.data);
    } catch (error) {
      toast.error("Error fetching data");
    }
  };

  const handleCategoryClick = (category) => {
    navigate(`/subcategory?id=${category._id}&name=${category.categoryName}`);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1); // Reset page to 1 on search
  };

  return (
    <Container>
      <Row className="mt-5 mb-3">
        <Col md={{ span: 12, offset: 12 }} className='d-flex justify-content-end'>
          <SearchForm onSearch={handleSearch} />
        </Col>
      </Row>

      <div className="categories row mt-3 g-3">
        {categories.map(
          (category) =>
            category?.status && (
              <div
                key={category._id}
                className="col-lg-2 col-md-4 col-sm-6 col-12"
              >
                <div
                  className="p-3 border category-item"
                  onClick={() => handleCategoryClick(category)}
                >
                  {category.images &&
                    category.images.map((image, index) => (
                      <img
                        src={image}
                        alt={category.categoryName}
                        className="img-fluid"
                        key={index}
                      />
                    ))}
                  <p className="fs-5">{category.categoryName}</p>
                </div>
              </div>
            )
        )}
      </div>
    </Container>
  );
};

export default Categories;
