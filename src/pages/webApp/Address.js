import React, { useState, useEffect, useContext } from 'react';
import './scss/AddToCart.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AxiosInstance from '../../helpers/AxiosRequest';
import { CartContext } from '../../Context/CartContext';

const Address = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const location = useLocation();
  const { state } = location;
  const { cartItems, setCartItems } = useContext(CartContext);
  const user = JSON.parse(localStorage.getItem('user'));

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRemove = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item._id !== productId);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    handleClose();
    toast.success('Item removed from cart');
  };

  const totalOriginalPrice = state?.totalOriginalPrice || 0;
  const totalDiscount = state?.totalDiscount || 0;
  const totalDiscountedPrice = state?.totalDiscountedPrice || 0;

  if (!user) {
    return (
      <div className="login-message text-center mt-5">
        <h3>You need to log in or sign up to view this page.</h3>
        <Button variant="primary" onClick={() => navigate('/login')}>Log In</Button>
        <Button variant="secondary" onClick={() => navigate('/signup')} className='ms-4'>Sign Up</Button>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        GrandTotal: totalDiscountedPrice,
        address:'Dummy',
        receiverName: 'dummy',
        totalDiscount: totalDiscount,
        products: cartItems.map(item => ({
          product_id: item._id,
          price: item.discountPrice || item.price,
          quantity: item.quantity,
          totalAmout: (item.discountPrice || item.price) * item.quantity,
        })),
      };
  
      const response = await AxiosInstance.post('/order/create', orderData);
      toast.success('Order placed successfully');
      setCartItems([]);
      localStorage.removeItem('cartItems');
      navigate('/order-successful', { state:{ message: response?.data?.message } });
    } catch (error) {
      toast.error('Failed to place order');
    }
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{height:'100vh'}}>
          <div className='d-flex flex-column align-items-center p-3 p-md-5 col-lg-6 col-md-8 col-12' style={{borderRadius:'16px',border:'1px solid #ddd'}}>
          <h3>Your cart is empty!</h3>
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
      ) : (
        <div className="cotainer">
          <h3 className="text-center mt-5">{user.name}</h3>
          <div className="cart-page mt-5">
            <div className="delivery-info">
            {user.address ? (
            <p>
              Deliver to: <strong>{user.name}</strong>
              <br />
              {user.address}
            </p>
          ) : (
            <div>
              <p>
                Deliver to: <strong>{user.name}</strong>
                <br />
                
              </p>
              <div>
              No address available.
              <Button variant="secondary" className='ms-3' onClick={() => navigate('/profile')}>
                Add Address
              </Button>
              </div>
             
            </div>
          )}
              <button className="btn btn-secondary">Deliver Here</button>
            </div>
            {cartItems.length > 0 &&
              cartItems.map((product) => (
                <div className="cart-item" key={product._id}>
                  {product.images?.length > 0 ? (
                    product.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${product.productName}-${index}`}
                        style={{ maxHeight: "400px", maxWidth: "350px" }}
                      />
                    ))
                  ) : (
                    <p>No images available.</p>
                  )}

                  <div className="item-info">
                    <h3>{product.productName}</h3>
                    <p>Seller: {product.seller || "RENSILAFAB"}</p>
                    <p className="delivery-info">
                      Delivery by Wed Jun 19 | Free
                    </p>
                    <div className="price-info">
                      {product.discountPrice ? (
                        <>
                          <span className="original-price">
                            ₹{(product.price * product.quantity).toFixed(2)}
                          </span>
                          <span className="discounted-price">
                            ₹
                            {(product.discountPrice * product.quantity).toFixed(
                              2
                            )}
                          </span>
                          <span
                            className="discount-percentage"
                            style={{ color: "green" }}
                          >
                            (
                            {(
                              ((product.price - product.discountPrice) /
                                product.price) *
                              100
                            ).toFixed(2)}
                            % Off)
                          </span>
                        </>
                      ) : (
                        <span className="price">
                          ₹{(product.price * product.quantity).toFixed(2)}
                        </span>
                      )}
                    </div>
                    <p className="offers">2 offers applied</p>
                    <div className="quantity-control">
                      <button>-</button>
                      <input type="text" value={product.quantity} readOnly />
                      <button>+</button>
                    </div>
                    <div className="item-actions">
                      <button className="save-for-later">SAVE FOR LATER</button>
                      <button className="remove" onClick={handleShow}>
                        REMOVE
                      </button>
                    </div>
                    <Modal
                      show={show}
                      onHide={handleClose}
                      animation={false}
                      centered
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Remove Item</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        Are you sure you want to remove this item?
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => handleRemove(product._id)}
                        >
                          Remove
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </div>
              ))}
            <div className="price-summary">
              <h2>PRICE DETAILS</h2>
              <div className="summary-item">
                <span>
                  Price ({cartItems.length} item
                  {cartItems.length > 1 ? "s" : ""})
                </span>
                <span>₹{totalOriginalPrice.toFixed(2)}</span>
              </div>
              <div className="summary-item">
                <span>Discount</span>
                <span>- ₹{totalDiscount.toFixed(2)}</span>
              </div>
              <div className="summary-item">
                <span>Delivery Charges</span>
                <span>Free</span>
              </div>
              <div className="total-amount">
                <span>Total Amount</span>
                <span>₹{totalDiscountedPrice.toFixed(2)}</span>
              </div>
              <p className="savings">
                You will save ₹{totalDiscount.toFixed(2)} on this order
              </p>
              <button
                className="place-order-button w-25"
                onClick={handlePlaceOrder}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Address;
