import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './scss/CategoryManager.scss';
import { DeleteIcon, EditIcon, ViewIcon } from '../../assets/icons';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import SearchForm from '../../components/SearchForm';
import { Dropdown, DropdownButton, Table } from 'react-bootstrap';

const AdminAddProduct = () => {
    const [categories, setCategories] = useState([]);
    const [show, setShow] = useState(false);
    const [previewImages, setPreviewImages] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  const initialValues = {
    name: '',
    description: '',
    price: '',
    quantity: '',
    discountPrice: '',
    images: [],
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Product name is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required').positive('Price must be positive'),
    quantity: Yup.number().required('Quantity is required').min(1, 'Quantity must be at least 1'),
    discountPrice: Yup.number().positive('Discount Price must be positive').nullable(),
    images: Yup.array().min(1, 'At least one image is required').of(
      Yup.mixed().required('A file is required')
        .test('fileType', 'Unsupported File Format', value => value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type))
    ),
  });

  const onSubmit = (values, { resetForm }) => {
    const newCategory = {
      name: values.name,
      description: values.description,
      price: values.price,
      quantity: values.quantity,
      discountPrice: values.discountPrice,
      images: previewImages,
    };
    setCategories([...categories, newCategory]);
    setPreviewImages([]); // Clear the preview images after submitting
    resetForm();
    handleClose();
  };

  const handleImageChange = (event, setFieldValue) => {
    const files = Array.from(event.target.files);
    setFieldValue('images', files);

    const readers = files.map(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImages(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
      return reader;
    });
  };


  return (
    <div className="category-manager">
      <div className="row justify-content-center p-5" style={{borderRadius:'6px',background:'#E0F0FE'}}>
        <div className="col-lg-6 col-md-8 col-sm-12">
          <h1 className='mb-4'>Inventory Menager</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="category-form">
                <div className="form-group">
                  <label htmlFor="name">Product Name</label>
                  <Field type="text" id="name" name="name" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <Field type="text" id="description" name="description" />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <Field type="number" id="price" name="price" />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="quantity">Quantity</label>
                  <Field type="number" id="quantity" name="quantity" />
                  <ErrorMessage
                    name="quantity"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="discountPrice">Discount Price</label>
                  <Field
                    type="number"
                    id="discountPrice"
                    name="discountPrice"
                  />
                  <ErrorMessage
                    name="discountPrice"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="images">SubCategory Images</label>
                  <input
                    id="images"
                    name="images"
                    type="file"
                    multiple
                    onChange={(event) =>
                      handleImageChange(event, setFieldValue)
                    }
                  />
                  <ErrorMessage
                    name="images"
                    component="div"
                    className="error-message"
                  />
                </div>

                {previewImages.length > 0 && (
                  <div className="image-preview">
                    {previewImages.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Preview ${index}`}
                        className="preview-image"
                        height={100}
                        width={100}
                      />
                    ))}
                  </div>
                )}

                <button type="submit" className="submit-button">
                  Add Product
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <div className="category-list">
        <h3>Product List</h3>
        <div className="d-flex justify-content-end">
          {/* <SearchForm /> */}
        </div>
        <div className="table-responsive">
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Product name</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">DiscountPrice</th>
                <th scope="col">Images</th>
                <th scope="col">status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Attaa</td>
                <td>White and good</td>
                <td>$10</td>
                <td>1</td>
                <td>$8</td>
                <td>image</td>
                <td>
                  <span className="badge bg-success">Approved</span>
                </td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <ViewIcon />
                  <span onClick={handleShow}>
                    <EditIcon />
                  </span>
                  <DeleteIcon />
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
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
                  <label htmlFor="name">Product Name</label>
                  <Field type="text" id="name" name="name" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="description">Description</label>
                  <Field type="text" id="description" name="description" />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="price">Price</label>
                  <Field type="number" id="price" name="price" />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="quantity">Quantity</label>
                  <Field type="number" id="quantity" name="quantity" />
                  <ErrorMessage
                    name="quantity"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="discountPrice">Discount Price</label>
                  <Field
                    type="number"
                    id="discountPrice"
                    name="discountPrice"
                  />
                  <ErrorMessage
                    name="discountPrice"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="images">SubCategory Images</label>
                  <input
                    id="images"
                    name="images"
                    type="file"
                    multiple
                    onChange={(event) =>
                      handleImageChange(event, setFieldValue)
                    }
                  />
                  <ErrorMessage
                    name="images"
                    component="div"
                    className="error-message"
                  />
                </div>

                {previewImages.length > 0 && (
                  <div className="image-preview">
                    {previewImages.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Preview ${index}`}
                        className="preview-image"
                        height={50}
                        width={50}
                      />
                    ))}
                  </div>
                )}

                <button type="submit" className="btn btn-primary mt-3">
                  Add Product
                </button>
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

export default AdminAddProduct;
