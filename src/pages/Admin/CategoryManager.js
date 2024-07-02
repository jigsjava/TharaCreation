import React, { useEffect, useState } from "react";
import "./CategoryManager.scss";
import SearchForm from "../../components/SearchForm";
import AxiosInstance from "../../helpers/AxiosRequest";
import { toast } from "react-toastify";
import PaginationComponent from "../../components/Pagination";
import DeleteCategory from "../../components/AdminPanel/Category/DeleteCategory";
import ViewCategory from "../../components/AdminPanel/Category/ViewCategory";
import EditCateogry from "../../components/AdminPanel/Category/EditCateogry";
import AddNewCategory from "../../components/AdminPanel/Category/AddNewCategory";
import { Image } from "react-bootstrap";

const CategoryManager = () => {
  const limit = 2;
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData(page);
  }, [page, searchQuery]); 

  const fetchData = async (pageNumber) => {
    try {
      const response = await AxiosInstance.get(
        `/category/getcategory?page=${pageNumber}&limit=${limit}&searchQuery=${searchQuery}`
      );
      setCategories(response?.data?.data);
      setTotalPages(response?.data?.pagination?.totalPages);
    } catch (error) {
      toast.error("Error fetching data");
    }
  };

  const handlePageClick = (pages) => {
    fetchData(pages);
    setPage(pages);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1); // Reset page to 1 on search
  };
  
  return (
    <div className="category-manager">
      <AddNewCategory fetchData={() => fetchData(page)} />
      <div className="category-list">
        <h3>Category List</h3>
        <div className="w-100 d-flex justify-content-end">
        <SearchForm onSearch={handleSearch} />
        </div>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Index</th>
              <th scope="col">Category name</th>
              <th scope="col">Category Image</th>
              <th scope="col">status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories.map((category, index) => {
                const { categoryName, images, _id } = category;
                const overallIndex = (page - 1) * limit + index;
                return (
                  <tr key={index}>
                    <th scope="row">{overallIndex + 1}</th>
                    <td>{categoryName}</td>
                    <td>
                      {images &&
                        images?.map((image, index) => (
                          <Image
                            key={index}
                            src={image}
                            alt={category?.categoryName}
                            style={{
                              width: "50px",
                              height: "auto",
                              padding: "5px",
                            }}
                            thumbnail
                          />
                        ))}
                    </td>
                    <td>
                      <span className="badge bg-success">Approved</span>
                    </td>
                    <td>
                      <EditCateogry id={_id} fetchData={() => fetchData(page)}/>
                      <ViewCategory id={_id} />
                      <DeleteCategory id={_id} fetchData={() => fetchData(page)} />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {totalPages > 1 && (
          <div className="d-flex justify-content-center my-5">
            <PaginationComponent
              page={page}
              totalPages={totalPages}
              handlePageClick={handlePageClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryManager;
