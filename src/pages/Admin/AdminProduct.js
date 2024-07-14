import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import "./scss/CategoryManager.scss";
import SearchForm from "../../components/SearchForm";
import AxiosInstance from "../../helpers/AxiosRequest";
import { toast } from "react-toastify";
import PaginationComponent from "../../components/Pagination";
import { Image,Form } from "react-bootstrap";
import DeleteProducts from "../../components/AdminPanel/Products/DeleteProducts"
import ViewProducts from  '../../components/AdminPanel/Products/ViewProducts'
import EditProducts from "../../components/AdminPanel/Products/EditPoducts"
import AddNewProducts from '../../components/AdminPanel/Products/AddProducts'
import TextEditor from "../../components/Common/TextEditor";

const AdminProduct = () => {
  const limit = 10;
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

    
  const handleStatusToggle = async (id, newStatus) => {
    try {
      await AxiosInstance.put(`/product/updatestatus/${id}`, { status: newStatus });
      fetchData(page);
      toast.success("Status updated successfully");
    } catch (error) {
      toast.error("Error updating status");
    }
  };


  return (
    <div className="category-manager">
      <AddNewProducts fetchData={() => fetchData(page)} />
      <div className="category-list">
        <h3>Products List</h3>
        <div className="w-100 d-flex justify-content-end">  
        <SearchForm onSearch={handleSearch} />
        </div>
        <Table striped bordered hover responsive>
          <thead className="thead-dark">
            <tr>
              <th scope="col" style={{whiteSpace:'nowrap',textAlign:'center'}}>Index</th>
              <th scope="col" style={{whiteSpace:'nowrap',textAlign:'center'}}>Category</th>
              <th scope="col" style={{whiteSpace:'nowrap',textAlign:'center'}}>SubCategory</th>
              <th scope="col" style={{whiteSpace:'nowrap',textAlign:'center'}}>Product</th>
              <th scope="col" style={{whiteSpace:'nowrap',textAlign:'center'}}>Image</th>
              <th scope="col" style={{whiteSpace:'nowrap',textAlign:'center'}}>Price</th>
              <th scope="col" style={{whiteSpace:'nowrap',textAlign:'center'}}>Dis Price</th>
              <th scope="col" style={{whiteSpace:'nowrap',textAlign:'center'}}>Quantity</th>
              <th scope="col" style={{whiteSpace:'nowrap',textAlign:'center'}}>status</th>
              <th scope="col" style={{whiteSpace:'nowrap',textAlign:'center'}}>Action</th>
              <th scope="col" style={{whiteSpace:'nowrap',textAlign:'center'}}>Description</th>
            </tr>
          </thead>
          <tbody>
            {product &&
              product?.map((products, index) => {
                const {description,status,productName, images, _id,subCategoryData,categoryData,price,discountPrice,quantity} = products;
                const overallIndex = (page - 1) * limit + index;

                // Check if description exists and is a non-empty string
                const cleanedDescription = description?.replace(/<\/?p>/g, '');

                return (
                  <tr key={index}>
                    <th scope="row">{overallIndex + 1}</th>
                    <td>{categoryData?.categoryName}</td>
                    <td>{subCategoryData?.subCategoryName}</td>
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

                              height: "40px",
                              padding: "5px",
                            }}
                            thumbnail
                          />
                        ))}
                    </td>
                    <td>{price}</td>
                    <td>{discountPrice}</td>
                    <td>{quantity}</td>
                    <td>
                      <Form.Check
                        type="switch"
                        id={`switch-${_id}`}
                        label={status ? "Approved" : "Closed"}
                        checked={status}
                        onChange={(e) =>
                          handleStatusToggle(_id, e.target.checked)
                        }
                      />
                    </td>
                    <td>
                      <EditProducts
                        id={_id}
                        products={products}
                        fetchData={() => fetchData(page)}
                      />
                      <ViewProducts products={products} />
                      <DeleteProducts
                        id={_id}
                        fetchData={() => fetchData(page)}
                      />
                    </td>
                    <td>
                     {cleanedDescription}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
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
