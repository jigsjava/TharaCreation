import React, { useState } from 'react';
import AxiosInstance from '../../../helpers/AxiosRequest';
import { toast } from 'react-toastify';
import { ViewIcon } from '../../../assets/icons';
import { Button, Modal } from 'react-bootstrap';

const ViewCategory = ({ id }) => {
  const [showCategory, setShowCategory] = useState(false);
  const [getCategory, setGetCategory] = useState(null);

  const getCategoryDetails = async (id) => {
    try {
      const response = await AxiosInstance.get(`category/getcategorybyid?id=${id}`);
      if (response.status === 200) {
        setGetCategory(response?.data?.data);
      }
    } catch (error) {
      toast.error('An error occurred while fetching category details');
    }
  };

  const handleShowCategory = (id) => {
    setShowCategory(true);
    getCategoryDetails(id);
  };

  const handleCloseShowCategory = () => {
    setShowCategory(false);
  };

  return (
    <>
    <span onClick={() => handleShowCategory(id)} style={{ cursor: 'pointer' }}>
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
            <h3>{getCategory?.categoryName}</h3>
            <div>
              {getCategory?.images &&
                getCategory?.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={getCategory?.categoryName}
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
