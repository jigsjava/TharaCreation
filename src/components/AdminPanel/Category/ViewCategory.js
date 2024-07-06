import React, { useState } from 'react';
import { ViewIcon } from '../../../assets/icons';
import { Button, Modal } from 'react-bootstrap';

const ViewCategory = ({ category }) => {
  const [showCategory, setShowCategory] = useState(false);

  const handleShowCategory = () => {
    setShowCategory(true);
  };

  const handleCloseShowCategory = () => {
    setShowCategory(false);
  };

  return (
    <>
    <span onClick={() => handleShowCategory()} style={{ cursor: 'pointer' }}>
      <ViewIcon />
    </span>
    <Modal
        show={showCategory}
        onHide={handleCloseShowCategory}
        animation={false}
        centered
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>Your Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center align-items-center flex-column">
            <h3>{category?.categoryName}</h3>
            <div>
              {category?.images &&
                category?.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={category?.categoryName}
                    style={{ width: '200px', height: 'auto', margin: '10px 0' }}
                  />
                ))}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseShowCategory}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    
  );
};

export default ViewCategory;
