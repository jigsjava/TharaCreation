import React, { useEffect, useState } from "react";
import SearchForm from "../../components/SearchForm";
import AxiosInstance from "../../helpers/AxiosRequest";
import { toast } from "react-toastify";
import PaginationComponent from "../../components/Pagination";
import { Table } from "react-bootstrap";

const OrderList = () => {
  const limit = 5;
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData(page);
  }, [page, searchQuery]); 

  const fetchData = async (pageNumber) => {
    try {
      const response = await AxiosInstance.get(
        `/order/getOrder?page=${pageNumber}&limit=${limit}&searchQuery=${searchQuery}`
      );
      setOrders(response?.data?.data);
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
    <div className="order-manager">
      <div className="order-list">
        <h2 className="mb-0">Order List</h2>
        <div className="w-100 d-flex justify-content-end my-0">
          <SearchForm onSearch={handleSearch} />
        </div>
        <Table striped bordered hover responsive>
          <thead className="thead-dark">
            <tr>
              <th scope="col">Index</th>
              <th scope="col">Address</th>
              <th scope="col">Receiver Name</th>
              <th scope="col">Order Date</th>
              <th scope="col">Product Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">Grand Total</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order, index) => {
                const overallIndex = (page - 1) * limit + index;

                console.log("first",order)
                const { orderItems, receiverName, address, createdAt, GrandTotal } = order;

                return (
                  <>
                    {orderItems.map((item, itemIndex) => (
                      <tr key={itemIndex}>
                        {itemIndex === 0 && (
                          <>
                            <td rowSpan={orderItems.length}>{overallIndex + 1}</td>
                            <td rowSpan={orderItems.length}>{receiverName}</td>
                            <td rowSpan={orderItems.length}>{address}</td>
                            <td rowSpan={orderItems.length}>{new Date(createdAt).toLocaleDateString()}</td>
                          </>
                        )}
                        <td>{item.productDetails.productName}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                        {itemIndex === 0 && (
                          <td rowSpan={orderItems.length}>{GrandTotal}</td>
                        )}
                      </tr>
                    ))}
                  </>
                );
              })}
          </tbody>
        </Table>
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4">
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

export default OrderList;
