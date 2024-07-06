import React, { useState } from 'react';
import { ViewIcon } from '../../../assets/icons';
import { Button, Modal } from 'react-bootstrap';

const ViewProducts = ({products}) => {
  const [showProduct, setshowProduct] = useState(false);

  const handleShowProduct = () => {
    setshowProduct(true);
  };

  const handleCloseProduct = () => {
    setshowProduct(false);
  };

  return (
    <>
    <span onClick={() => handleShowProduct()} style={{ cursor: 'pointer' }}>
      <ViewIcon />
    </span>
    <Modal
        show={showProduct}
        onHide={handleCloseProduct}
        animation={false}
        centered
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>Your Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center align-items-center flex-column">
            <h3>{products?.productName}</h3>
            <div>
              {products?.images &&
                products?.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={products?.productName}
                    style={{ width: '200px', height: 'auto', margin: '10px 0' }}
                  />
                ))}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseProduct}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewProducts;
