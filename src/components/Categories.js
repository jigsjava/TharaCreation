import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import AxiosInstance from '../helpers/AxiosRequest';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await AxiosInstance.get('/category/getcategory');
      setCategories(response?.data?.data);
    } catch (error) {
      toast.error("Error fetching data");
    }
  };

  const handleCategoryClick = (category) => {
    navigate("/subcategory", { state: { categoryId: category._id, categoryName: category.categoryName } });
  };

  return (
    <Container>
      <div className="categories row mt-5 g-3">
        {categories.map((category) => (
          category?.status && (
            <div key={category._id} className="col-lg-2 col-md-4 col-sm-6 col-12">
              <div className="p-3 border category-item" onClick={() => handleCategoryClick(category)}>
                {category.images && category.images.map((image, index) => (
                  <img src={image} alt={category.categoryName} className="img-fluid" key={index} />
                ))}
                <p className='fs-5'>{category.categoryName}</p>
              </div>
            </div>
          )
        ))}
      </div>
    </Container>
  );
};

export default Categories;
