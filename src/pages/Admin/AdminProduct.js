import React, { useEffect, useState } from "react";
import "./scss/CategoryManager.scss";
import SearchForm from "../../components/SearchForm";
import AxiosInstance from "../../helpers/AxiosRequest";
import { toast } from "react-toastify";
import PaginationComponent from "../../components/Pagination";
import { Image } from "react-bootstrap";
import DeleteProducts from "../../components/AdminPanel/Products/DeleteProducts"
import ViewProducts from  '../../components/AdminPanel/Products/ViewProducts'
import EditProducts from "../../components/AdminPanel/Products/EditPoducts"
import AddNewProducts from '../../components/AdminPanel/Products/AddProducts'

const AdminProduct = () => {
  const limit = 2;
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  

  useEffect(() => {
    fetchData(page);
  }, [page, searchQuery]); 

  const fetchData = async (pageNumber) => {
    try {
      const response = await AxiosInstance.get(
        `/product/getproduct?page=${pageNumber}&limit=${limit}&searchQuery=${searchQuery}`
      );
      setProduct(response?.data?.data);
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
      <AddNewProducts fetchData={() => fetchData(page)} />
      <div className="category-list">
        <h3>Products List</h3>
        <div className="w-100 d-flex justify-content-end">  
        <SearchForm onSearch={handleSearch} />
        </div>
        <table className="table table-striped">
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
            {product &&
              product?.map((products, index) => {
                const { productName, images, _id,categoryData} = products;
                console.log("products",products)
                const overallIndex = (page - 1) * limit + index;
                return (
                  <tr key={index}>
                    <th scope="row">{overallIndex + 1}</th>
                    <td>{categoryData?.categoryName}</td>
                    <td>{productName}</td>
                    <td>
                      {images &&
                        images?.map((image, index) => (
                          <Image
                            key={index}
                            src={image}
                            alt={products?.productName}
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
                      <EditProducts id={_id} products={products} fetchData={() => fetchData(page)}/>
                      <ViewProducts products={products}/>
                      <DeleteProducts id={_id} fetchData={() => fetchData(page)} />
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

export default AdminProduct;
