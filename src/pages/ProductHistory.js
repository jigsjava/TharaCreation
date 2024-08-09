import React, { useEffect, useState } from "react";
import './ProductHistory.scss';
import { Container } from 'react-bootstrap';
import { toast } from "react-toastify";
import PaginationComponent from "../../src/components/Pagination";
import AxiosInstance from "../helpers/AxiosRequest";
import SearchForm from "../components/SearchForm"
import { useNavigate } from "react-router-dom";
import ReviewForm from "../components/AdminPanel/ReviewForm";
import { CloudWatchLogs } from "aws-sdk";

const ProductHistory = () => {
  const navigate = useNavigate();
  const limit = 5;
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [productId, setProductId] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [review, setReview] = useState(null);


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
    setPage(1);  
  };

  const openReviewForm = (productId,orderId) => {
    setProductId(productId);
    setOrderId(orderId)
    setShowReviewForm(true);
  };

  
  const backgroundColors = ["#fff6dc78", "#e6f7ff78"];

  console.log("fsfsfsfsfsfsafsffwsff",review)

  return (
    <>
   <Container>
      <h1 className='mt-5 mb-3'>Your Order Details</h1>
      <div className="w-100 d-flex justify-content-end my-0">
        <SearchForm onSearch={handleSearch} />
      </div>
      <div className="row g-4">
        {orders.length > 0 ?
          (orders.map((order, orderIndex) => {
            const orderId = order._id
            return(
            <div key={orderIndex} className="col-12 mb-3">
              <h2 className='mb-3'>{`Order ${orderIndex + 1}`}</h2>
              <div className="row g-3">
                {order.orderItems.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="col-lg-3 col-md-4 col-sm-6 col-12"
                  >
                    <div
                      className="p-3 border h-100 d-flex flex-column justify-content-between"
                      style={{
                        borderRadius: '10px',
                        background: backgroundColors[orderIndex % backgroundColors.length],
                      }}
                    >
                      <div className="product-image text-center mb-3">
                        {item.productDetails.images && item.productDetails.images.map((images,index) =>(
                          <img
                            src={images}
                            alt={index}
                          />
                        ))
                        }
                      </div>
                      <div className="product-details">
                        <h3 className='mb-4'>
                          {item.productDetails.productName.length > 25
                            ? `${item.productDetails.productName.slice(0, 25)}...`
                            : item.productDetails.productName}
                        </h3>
                        <p className="quantity">{`Quantity: ${item.quantity}`}</p>
                        <p className="price">{`Price: $${item.price}`}</p>
                        <button
                            className="btn btn-secondary"
                            onClick={() => openReviewForm(item.product_id,orderId)}
                          >
                            Add Review
                          </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
)})):(
            <div className="d-flex flex-column justify-content-center align-items-center mt-5" >
          <div className='d-flex flex-column align-items-center p-3 p-md-5 col-lg-6 col-md-8 col-12' style={{borderRadius:'16px',border:'1px solid #ddd'}}>
          <h3>Your dont have any order yet!</h3>
          <p>Add items to it now.</p>
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate("/");
            }}
          >
            Shop Now
          </button>
          </div>
          
        </div>
          )
        }
      </div>
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <PaginationComponent
            page={page}
            totalPages={totalPages}
            handlePageClick={handlePageClick}
          />
        </div>
      )}
      {showReviewForm && productId && orderId &&(
        
          <ReviewForm
            productId={productId}
            orderId= {orderId}
            onClose={() => setShowReviewForm(false)}
            setReview={setReview}
          />
        )}
    </Container>
    </>
  );
};

export default ProductHistory;
