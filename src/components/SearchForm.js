import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { SearchIcon } from '../assets/icons';

const SearchForm = () => {
  const initialValues = {
    searchQuery: '',
  };

  const validationSchema = Yup.object({
    searchQuery: Yup.string().required('Required'),
  });

  const onSubmit = (values) => {
    console.log('Search Query:', values.searchQuery);
    // Handle search logic here
  };

  return (
    <div className="search-form col-6">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <div className="form-group position-relative">
            <Field
              type="text"
              name="searchQuery"
              placeholder="Search..."
              className="form-control"
            />
            <SearchIcon />
            <ErrorMessage name="searchQuery" component="div" className="error-message" />
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchForm;
