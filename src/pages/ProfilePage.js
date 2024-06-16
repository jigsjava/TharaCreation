import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './ProfilePage.scss';

const ProfilePage = () => {
  const initialValues = {
    name: '',
    mobile: '',
    address: '',
    email: 'user@example.com', // This will be displayed but not editable
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    mobile: Yup.string()
      .required('Mobile is required')
      .matches(/^[0-9]+$/, 'Mobile must be a number')
      .min(10, 'Mobile must be at least 10 digits')
      .max(15, 'Mobile must be at most 15 digits'),
    address: Yup.string().required('Address is required'),
  });

  const onSubmit = (values) => {
    console.log('Form data', values);
    // Perform update logic here
  };

  return (
    <div className="profile-page mt-5">
      <h2>Update Profile</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
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

          <button type="submit" className="submit-button">Update</button>
        </Form>
      </Formik>
    </div>

    
  );
};

export default ProfilePage;
