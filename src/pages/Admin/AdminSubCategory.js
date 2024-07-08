import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import "./scss/CategoryManager.scss";
import SearchForm from "../../components/SearchForm";
import AxiosInstance from "../../helpers/AxiosRequest";
import { toast } from "react-toastify";
import PaginationComponent from "../../components/Pagination";
import { Image } from "react-bootstrap";
import DeleteSubCategory from "../../components/AdminPanel/SubCategory/DeleteSubCategory"
import ViewSubCategory from  '../../components/AdminPanel/SubCategory/ViewSubCategory'
import EditSubCateogry from "../../components/AdminPanel/SubCategory/EditSubCategory"
import AddNewSubCategory from '../../components/AdminPanel/SubCategory/AddNewSubCategory'

const AdminSubCategory = () => {
  const limit = 6;
  const [subCategories, setSubCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  

  useEffect(() => {
    fetchData(page);
  }, [page, searchQuery]); 

  const fetchData = async (pageNumber) => {
    try {
      const response = await AxiosInstance.get(
        `/subcategory/getsubcategory?page=${pageNumber}&limit=${limit}&searchQuery=${searchQuery}`
      );
      setSubCategories(response?.data?.data);
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
      <AddNewSubCategory fetchData={() => fetchData(page)} />
      <div className="category-list">
        <h3 className="mb-0">SubCategory List</h3>
        <div className="w-100 d-flex justify-content-end">  
        <SearchForm onSearch={handleSearch} />
        </div>
        <Table className="striped bordered hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Index</th>
              <th scope="col">CategoryName</th>
              <th scope="col">SubCategory name</th>
              <th scope="col">SubCategory Image</th>
              <th scope="col">status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {subCategories &&
              subCategories.map((subCategory, index) => {
                const { subCategoryName, images, _id,categoryData} = subCategory;
                const overallIndex = (page - 1) * limit + index;
                return (
                  <tr key={index}>
                    <th scope="row">{overallIndex + 1}</th>
                    <td>{categoryData?.categoryName}</td>
                    <td>{subCategoryName}</td>
                    <td>
                      {images &&
                        images?.map((image, index) => (
                          <Image
                            key={index}
                            src={image}
                            alt={subCategory?.subCategoryName}
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
                      <EditSubCateogry id={_id} subCategory={subCategory} fetchData={() => fetchData(page)}/>
                      <ViewSubCategory subCategory={subCategory}/>
                      <DeleteSubCategory id={_id} fetchData={() => fetchData(page)} />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-5">
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

export default AdminSubCategory;
