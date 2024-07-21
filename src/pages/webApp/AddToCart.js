import React, { useEffect, useState } from 'react';
import './scss/AddToCart.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container } from 'react-bootstrap';

const AddToCart = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [cartItems, setCartItems] = useState(() => JSON.parse(localStorage.getItem('cartItems')) || []);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);


  const handleIncrement = (productId) => {
    
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item._id === productId) {
          if (item.quantity < 5 && item.quantity < item.TotalQuantity) {
            return { ...item, quantity: item.quantity + 1,TotalQuantity:item.TotalQuantity-1};
          } else if (item.quantity >= 5) {
            toast.error('You can only buy up to 5 items.');
          } else if (item.quantity >= item.TotalQuantity) {
            toast.error('Stock quantity exceeded.');
          }
        }
        return item;
      })
    );
  };
  

  const handleDecrement = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== productId));
    handleClose();
  };


  const discountPercentage = (product) =>
  product.discountPrice
    ? ((product.price - product.discountPrice) / product.price) * 100
    : 0;

const calculatePrice = (product) => {
  const originalPrice = product.price * product.quantity;
  const discountedPrice = product.discountPrice
    ? product.discountPrice * product.quantity
    : originalPrice;
  const discount = originalPrice - discountedPrice;

  return {
    originalPrice,
    discountedPrice,
    discount,
  };
};

const totalOriginalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
const totalDiscount = cartItems.reduce((acc, item) => acc + (item.price - (item.discountPrice || item.price)) * item.quantity, 0);
const totalDiscountedPrice = totalOriginalPrice - totalDiscount;

  return (
    <Container className='mt-5'>
      <div className="cart-page my-5">
        {cartItems.length === 0 ? (
          <div className='d-flex flex-column justify-content-center align-items-center py-5'>
          <h3>Your cart is empty!</h3>
          <p>Add items to it now.</p>
          <button className='btn btn-primary'onClick={() =>{navigate('/')}}>Shop Now</button>
          </div>
        ) : (
          cartItems.map((product) => {
            const priceDetails = calculatePrice(product);

            return (
              <div className="cart-item" key={product._id}>
                {product.images?.length > 0 ? (
                  product.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${product.productName}-${index}`}
                      style={{ maxHeight: '400px', maxWidth: '350px' }}
                    />
                  ))
                ) : (
                  <p>No images available.</p>
                )}

                <div className="item-info">
                  <h3>{product.productName}</h3>
                  <p>Seller: RENSILAFAB static</p>
                  <p className="delivery-info">Delivery by Wed Jun 19 | Free static</p>
                  <div className="price-info">
                    {product.discountPrice ? (
                      <>
                        <span className="original-price">
                          ₹{priceDetails.originalPrice.toFixed(2)}
                        </span>
                        <span className="discounted-price">
                          ₹{priceDetails.discountedPrice.toFixed(2)}
                        </span>
                        <span className="discount-percentage" style={{ color: 'green' }}>
                          ({discountPercentage(product).toFixed(2)}% off)
                        </span>
                      </>
                    ) : (
                      <span className="price">₹{product.price.toFixed(2)}</span>
                    )}
                  </div>
                  <p className="offers">2 offers applied static</p>
                  <div className="quantity-control">
                    <button onClick={() => handleDecrement(product._id)}>-</button>
                    <input type="text" value={product.quantity} readOnly />
                    <button onClick={() => handleIncrement(product._id)}>+</button>
                  </div>
                  <div className="item-actions">
                    <button className="save-for-later">SAVE FOR LATER</button>
                    <button className="remove" onClick={handleShow}>REMOVE</button>
                  </div>
                  <Modal show={show} onHide={handleClose} animation={false} centered>
                    <Modal.Header closeButton>
                      <Modal.Title>Remove Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure want to remove this item?</Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Cancel
                      </Button>
                      <Button variant="primary" onClick={() => handleRemove(product._id)}>
                        Remove
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            );
          })
        )}
        {cartItems.length !== 0 &&  <div className="price-summary">
          <h2>PRICE DETAILS</h2>
          <div className="summary-item">
            <span>Price ({cartItems.length} item{cartItems.length > 1 ? 's' : ''})</span>
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
          <p className="savings">You will save ₹{totalDiscount.toFixed(2)} on this order</p>
          <button className="place-order-button" onClick={() =>navigate('/address', {
                  state: {
                    totalOriginalPrice,
                    totalDiscount,
                    totalDiscountedPrice,
                  },
                  })}>PLACE ORDER</button>
        </div>}
       
      </div>
   </Container>
  );
};

export default AddToCart;
