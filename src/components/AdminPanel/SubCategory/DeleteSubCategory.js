import React, { useState } from 'react';
import { DeleteIcon } from '../../../assets/icons';
import AxiosInstance from '../../../helpers/AxiosRequest';
import { toast } from 'react-toastify';
import {Button,Modal }from 'react-bootstrap';

const DeleteSubCategory = ({ id, fetchData}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = async () => {
    try {
      const response = await AxiosInstance.delete(`subcategory/deletesubcategory?id=${id}`);
      if (response.status === 200) {
        toast.success('SubCategory deleted successfully!');
        fetchData();
        handleClose();
      }
    } catch (error) {
      toast.error('An error occurred during deletion');
    }
  };

  return (
    <>
    <span style={{ cursor: 'pointer' }} onClick={handleShow}>
      <DeleteIcon />
    </span>
       <Modal show={show} onHide={handleClose} animation={false} centered>
       <Modal.Header closeButton>
         <Modal.Title>Are You sure want to Delete SubCategory??</Modal.Title>
       </Modal.Header>
       <Modal.Footer>
         <Button variant="secondary" onClick={handleClose}>
           Close
         </Button>
         <Button variant="danger" onClick={handleDelete}>
          Delete
         </Button>
       </Modal.Footer>
     </Modal>
     </>
  );
};

export default DeleteSubCategory;
