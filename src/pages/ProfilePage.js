import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './ProfilePage.scss';
import AxiosInstance from '../helpers/AxiosRequest';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const UserData = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const {id,email,mobile,name,address = ''} =UserData
 
  const initialValues = {
    name: name || '',
    mobile: mobile || '',
    address: address || '',
    email: email || '', // This will be displayed but not editable
  };
  
  
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    mobile: Yup.string()
      .matches(/^[0-9]+$/, 'Mobile must be a number')
      .min(10, 'Mobile must be at least 10 digits')
      .max(15, 'Mobile must be at most 15 digits'),
    address: Yup.string().required('Address is required'),
  });

  const onSubmit = async(values) => {
    try {
      const response = await AxiosInstance.put(`/auth/updateprofile/${id}`, values);
      if (response.status === 200) {
        toast.success('Profile updated successfully', {
          position: toast.POSITION.TOP_CENTER,
        });
        navigate("/");
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'An error occurred. Please try again.',
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
    } finally {
      // setSubmitting(false);
    }
  };

  return (
    <div className="profile-page mt-5">
      <h2>Update Profile</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
       {({ isSubmitting }) => (
          <Form className="profile-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="mobile">Mobile</label>
              <Field type="text" id="mobile" name="mobile" />
              <ErrorMessage name="mobile" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <Field type="text" id="address" name="address" />
              <ErrorMessage name="address" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field type="text" id="email" name="email" disabled />
            </div>

            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProfilePage;
