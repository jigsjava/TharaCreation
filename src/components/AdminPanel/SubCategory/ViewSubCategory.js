import React, { useState } from 'react';
import { ViewIcon } from '../../../assets/icons';
import { Button, Modal } from 'react-bootstrap';

const ViewSubCategory = ({subCategory}) => {
  const [showSubCategory, setshowSubCategory] = useState(false);

  const handleShowSubCategory = () => {
    setshowSubCategory(true);
  };

  const handleCloseSubCategory = () => {
    setshowSubCategory(false);
  };

  return (
    <>
    <span onClick={() => handleShowSubCategory()} style={{ cursor: 'pointer' }}>
      <ViewIcon />
    </span>
    <Modal
        show={showSubCategory}
        onHide={handleCloseSubCategory}
        animation={false}
        centered
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>Your SubCategory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center align-items-center flex-column">
            <h3>{subCategory?.subCategoryName}</h3>
            <div>
              {subCategory?.images &&
                subCategory?.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={subCategory?.subCategoryName}
                    style={{ width: '200px', height: 'auto', margin: '10px 0' }}
                  />
                ))}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSubCategory}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewSubCategory;
