import React, { useEffect, useState } from 'react';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Modal, Spinner, Image } from 'react-bootstrap';
import { EditIcon } from '../../../assets/icons';
import { toast } from 'react-toastify';
import AxiosInstance from '../../../helpers/AxiosRequest';
import TextEditor from '../../Common/TextEditor';

const EditProducts = ({ id, fetchData, products }) => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const handleClose = () => {
    setShow(false);
    setPreviewImage(null);
  }
  const handleShow = async () => {
    setShow(true);
  }

  const handleUpdateSubmit = async (values, { setErrors, setSubmitting, resetForm }) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('productName', values.productName);
    formData.append('price', values.price);
    formData.append('discountPrice', values.discountPrice);
    formData.append('quantity', values.quantity);
    formData.append('description', values.description);
    if (values.image) {
      formData.append('productImages', values.image);
    }

    try {
      const response = await AxiosInstance.post(`/product/updateproduct?id=${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success("Product updated successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        fetchData();
        resetForm();
        handleClose();
        setPreviewImage(null);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error, {
          position: toast.POSITION.TOP_CENTER,
        });
        setErrors(error.response.data.errors || {});
      } else {
        toast.error("An unexpected error occurred.", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } finally {
      setSubmitting(false);
      setIsLoading(false);
    }
  };

  const validationSchema = Yup.object().shape({
    productName: Yup.string()
      .required('Product name is required')
      .min(5, 'Product name must be at least 5 characters')
      .max(30, 'Product name must be at most 30 characters'),
    image: Yup.mixed()
    .nullable()
    .notRequired()
      .test(
        'fileSize',
        'File size must be less than 3 MB',
        (value) => {
          return !value || (value && value.size <= 3 * 1024 * 1024);
        }
      )
      .test(
        'fileFormat',
        'Only jpg, png, webp, jpeg formats are allowed',
        (value) => {
          return (
            !value ||
            (value &&
              ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(value.type))
          );
        }
      ),
  })

  return (
    <>
      <span onClick={() => handleShow()} style={{ cursor: "pointer" }}>
        <EditIcon />
      </span>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        centered
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              productName: products.productName || "",
              image: null,
              price: products.price || "",
              discountPrice: products.discountPrice || "",
              quantity: products.quantity || "",
              description: products.description || '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleUpdateSubmit}
            enableReinitialize
          >
            {({
              setFieldValue,
              handleChange,
              handleBlur,
              values,
              errors,
              touched,
            }) => (
              <FormikForm>
                <Form.Group className="mb-3" controlId="productName">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="productName"
                    value={values.productName}
                    placeholder="Enter Product name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.productName && errors.productName && (
                    <Form.Text className="font16Red">
                      {errors.productName}
                    </Form.Text>
                  )}
                </Form.Group>
                <div className='row'>
                  <Form.Group className="mb-3 col-lg-4" controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="text"
                      name="price"
                      value={values.price}
                      placeholder="Enter Price"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.price && errors.price && (
                      <Form.Text className="font16Red">
                        {errors.price}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3 col-lg-4" controlId="discountPrice">
                    <Form.Label>Discount Price</Form.Label>
                    <Form.Control
                      type="text"
                      name="discountPrice"
                      value={values.discountPrice}
                      placeholder="Enter Discount Price"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.discountPrice && errors.discountPrice && (
                      <Form.Text className="font16Red">
                        {errors.discountPrice}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3 col-lg-4" controlId="quantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                      type="text"
                      name="quantity"
                      value={values.quantity}
                      placeholder="Enter Quantity"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.quantity && errors.quantity && (
                      <Form.Text className="font16Red">
                        {errors.quantity}
                      </Form.Text>
                    )}
                  </Form.Group>
                </div>

                <Form.Group
                  className="mb-3 col-md-12 col-sm-12"
                  controlId="description"
                >
                  <Form.Label>Description</Form.Label>
                  <TextEditor
                    value={values.description}
                    onChange={(value) => setFieldValue("description", value)}
                  />
                  {touched.description && errors.description && (
                    <Form.Text className="font16Red">
                      {errors.description}
                    </Form.Text>
                  )}
                </Form.Group>

                <div className='row'>
                  <div className='col-lg-4'>
                    <Form.Group className="mb-3" controlId="image">
                      <Form.Label>Image Upload</Form.Label>
                      <Form.Control
                        type="file"
                        name="image"
                        onChange={(event) => {
                          const file = event?.currentTarget?.files[0];
                          if (file) {
                            setFieldValue("image", file);
                            setPreviewImage(URL.createObjectURL(file));
                          }
                        }}
                        onBlur={handleBlur}
                      />
                      {touched.image && errors.image && (
                        <Form.Text className="font16Red">{errors.image}</Form.Text>
                      )}
                    </Form.Group>
                  </div>
                  <div className='col-lg-4'>
                    {previewImage && (
                      <div className="mb-3">
                        <Form.Label>Preview Image</Form.Label>
                        <div>
                          <Image src={previewImage} alt="Preview" thumbnail width={100} />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='col-lg-4'>
                    {products.images &&
                      products.images.length > 0 && (
                        <div className="mb-3">
                          <Form.Label>Current Image</Form.Label>
                          <div>
                            {products?.images?.map((image, index) => (
                              <Image
                                key={index}
                                src={image}
                                alt="Current category"
                                thumbnail
                                width={100}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                </div>

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Spinner animation="border" size="sm me-2" /> Updating...
                    </>
                  ) : (
                    "Update Product"
                  )}
                </Button>
              </FormikForm>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditProducts;
