import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './UpdatePassword.scss';

const UpdatePassword = () => {
  const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    oldPassword: Yup.string()
      .required('Old Password is required'),
    newPassword: Yup.string()
      .required('New Password is required')
      .min(8, 'New Password must be at least 8 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  });

  const onSubmit = (values) => {
    console.log('Form data', values);
    // Perform update password logic here
  };

  return (
    <div className="update-password-page mt-5">
      <h2>Update Password</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="update-password-form">
          <div className="form-group">
            <label htmlFor="oldPassword">Old Password</label>
            <Field type="password" id="oldPassword" name="oldPassword" />
            <ErrorMessage name="oldPassword" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <Field type="password" id="newPassword" name="newPassword" />
            <ErrorMessage name="newPassword" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Field type="password" id="confirmPassword" name="confirmPassword" />
            <ErrorMessage name="confirmPassword" component="div" className="error-message" />
          </div>

          <button type="submit" className="submit-button">Update Password</button>
        </Form>
      </Formik>
    </div>
  );
};

export default UpdatePassword;
