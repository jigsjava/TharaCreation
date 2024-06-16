import React, { useState } from 'react';
import './AddToCart.scss';
import productImage from '../assets/images/saree1.webp';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

const AddToCart = () => {
    const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <div className="cart-page mt-5">
      <div className="delivery-info">
        <p>Deliver to: <strong>Jignesh, 382350</strong></p>
        <p>D/96, sunrise park, Ahmedabad</p>
        <button className="btn btn-secondary">Change</button>
      </div>
      <div className="cart-item">
        <img src={productImage} alt="Product" />
        <div className="item-info">
          <h3>RENSILAFAB Polycotton Printed Kurta & Patiyala Material</h3>
          <p>Seller: RENSILAFAB</p>
          <p className="delivery-info">Delivery by Wed Jun 19 | Free</p>
          <div className="price-info">
            <span className="original-price">₹1,049</span>
            <span className="discounted-price">₹449</span>
            <span className="discount">57% Off</span>
          </div>
          <p className="offers">2 offers applied</p>
          <div className="quantity-control">
            <button onClick={handleDecrement}>-</button>
            <input type="text" value={quantity} readOnly />
            <button onClick={handleIncrement}>+</button>
          </div>
          <div className="item-actions">
            <button className="save-for-later">SAVE FOR LATER</button>
            <button className="remove" onClick={handleShow}>REMOVE</button>
          </div>
        </div>
      </div>
      <div className="price-summary">
        <h2>PRICE DETAILS</h2>
        <div className="summary-item">
          <span>Price (1 item)</span>
          <span>₹1,049</span>
        </div>
        <div className="summary-item">
          <span>Discount</span>
          <span>- ₹600</span>
        </div>
        <div className="summary-item">
          <span>Delivery Charges</span>
          <span>Free</span>
        </div>
        <div className="total-amount">
          <span>Total Amount</span>
          <span>₹449</span>
        </div>
        <p className="savings">You will save ₹600 on this order</p>
      </div>
      <button className="place-order-button" onClick={() =>navigate('/address')}>PLACE ORDER</button>
    </div>
     {<Modal show={show} onHide={handleClose} animation={false} centered>
     <Modal.Header closeButton>
       <Modal.Title>Remove Item</Modal.Title>
     </Modal.Header>
     <Modal.Body>Are you sure want to remove this item?</Modal.Body>
     <Modal.Footer>
       <Button variant="secondary" onClick={handleClose}>
       Cancle
       </Button>
       <Button variant="primary" onClick={handleClose}>
        Remove
       </Button>
     </Modal.Footer>
   </Modal>}
   </>
  );
};

export default AddToCart;
