import React, { useState } from 'react';
import AxiosInstance from '../../../helpers/AxiosRequest';
import { toast } from 'react-toastify';
import { ViewIcon } from '../../../assets/icons';
import { Button, Modal } from 'react-bootstrap';

const ViewSubCategory = ({ id }) => {
  const [showSubCategory, setshowSubCategory] = useState(false);
  const [getSubCategory, setSubGetCategory] = useState(null);

  const getSubCategoryDetails = async (id) => {
    try {
      const response = await AxiosInstance.get(`subcategory/getsubcategorybyid?id=${id}`);
      if (response.status === 200) {
        setSubGetCategory(response?.data?.data);
      }
    } catch (error) {
      toast.error('An error occurred while fetching subcategory details');
    }
  };

  const handleShowSubCategory = (id) => {
    setshowSubCategory(true);
    getSubCategoryDetails(id);
  };

  const handleCloseSubCategory = () => {
    setshowSubCategory(false);
  };

  return (
    <>
    <span onClick={() => handleShowSubCategory(id)} style={{ cursor: 'pointer' }}>
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
            <h3>{getSubCategory?.subCategoryName}</h3>
            <div>
              {getSubCategory?.images &&
                getSubCategory?.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={getSubCategory?.subCategoryName}
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
