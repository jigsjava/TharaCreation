import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './CategoryManager.scss';
import { DeleteIcon, EditIcon, ViewIcon } from '../../assets/icons';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SearchForm from '../../components/SearchForm';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const AdminSubCategory = () => {
  const [categories, setCategories] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const initialValues = {
    name: '',
    image: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Category name is required'),
    image: Yup.mixed().required('Category image is required')
      .test('fileType', 'Unsupported File Format', value => value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type)),
  });

  const onSubmit = (values, { resetForm }) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const newCategory = {
        name: values.name,
        imageUrl: reader.result,
        active: values.active,
      };
      setCategories([...categories, newCategory]);
      resetForm();
    };
    reader.readAsDataURL(values.image);
  };

  return (
    <div className="category-manager">
      <h2>SubCategory</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="category-form">
            <div className="form-group">
              <label htmlFor="name">SubCategory Name</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="image">SubCategory Image</label>
              <input
                id="image"
                name="image"
                type="file"
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  setFieldValue("image", file);

                  // Set preview image
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setPreviewImage(reader.result);
                  };
                  reader.readAsDataURL(file);
                }}
              />
              <ErrorMessage name="image" component="div" className="error-message" />
            </div>

            {previewImage && (
              <div className="image-preview">
                <img src={previewImage} alt="Preview" height={100} width={100}/>
              </div>
            )}

            <button type="submit" className="submit-button">Add SubCategory</button>
          </Form>
        )}
      </Formik>
   
      <div className="category-list">
        <h3>SubCategory List</h3>
        <div className='d-flex justify-content-between'>
        <SearchForm />
        <DropdownButton id="dropdown-item-button" title="Select Category">
      <Dropdown.Item as="button">Category 1</Dropdown.Item>
      <Dropdown.Item as="button">Category 2</Dropdown.Item>
      <Dropdown.Item as="button">Category 3</Dropdown.Item>
    </DropdownButton>
        </div>
     
        <table className="table">
     <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">SubCategory name</th>
      <th scope="col">SubCategory Image</th>
      <th scope="col">status</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Attaa</td>
      <td>image</td>
      <td><span className="badge bg-success">Approved</span></td>
      <td>
        <ViewIcon/>
        
        <span onClick={handleShow}>
        <EditIcon /> 
      </span>
      <DeleteIcon />
      </td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Attaa</td>
      <td><img src={previewImage} alt={previewImage} className="category-image"height={50} width={50} /></td>
      <td><span className="badge bg-danger">Rejected</span></td>
      <td>
        <ViewIcon />
        <span onClick={handleShow}>
        <EditIcon /> 
      </span>
      <DeleteIcon />
      </td>
    </tr>
    <tr>
      <th scope="row">1</th>
      <td>Attaa</td>
      <td>image</td>
      <td><span className="badge bg-secondary">Pending</span></td>
      <td>
        <ViewIcon />
        <span onClick={handleShow}>
        <EditIcon /> 
      </span>
      <DeleteIcon />
      </td>
    </tr>
  </tbody>
</table>
      </div>
      <Modal show={show} onHide={handleClose} animation={false} centered size="md">
        <Modal.Header closeButton>
          <Modal.Title>Add New SubCategory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="category-form">
                <div className="form-group mb-3">
                  <label htmlFor="name">SubCategory Name</label>
                  <Field type="text" id="name" name="name" />
                  <ErrorMessage name="name" component="div" className="error-message" />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="image">SubCategory Image</label>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      setFieldValue("image", file);

                      // Set preview image
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setPreviewImage(reader.result);
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                  <ErrorMessage name="image" component="div" className="error-message" />
                </div>

                {previewImage && (
                  <div className="image-preview">
                    <img src={previewImage} alt="Preview" className="preview-image" height={100} width={100} />
                  </div>
                )}

                <button type="submit" className="btn btn-primary">Add SubCategory</button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminSubCategory;
