import React from 'react';
import { DeleteIcon } from '../../../assets/icons';
import AxiosInstance from '../../../helpers/AxiosRequest';
import { toast } from 'react-toastify';

const DeleteCategory = ({ id, fetchData}) => {
  const handleDelete = async () => {
    try {
      const response = await AxiosInstance.delete(`category/deletecategory?id=${id}`);
      if (response.status === 200) {
        toast.success('Category deleted successfully!');
        fetchData();
      }
    } catch (error) {
      toast.error('An error occurred during deletion');
    }
  };

  return (
    <span style={{ cursor: 'pointer' }} onClick={handleDelete}>
      <DeleteIcon />
    </span>
  );
};

export default DeleteCategory;
