import React, { useEffect, useState } from 'react';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Modal, Spinner, Image } from 'react-bootstrap';
import { EditIcon } from '../../../assets/icons';
import { toast } from 'react-toastify';
import AxiosInstance from '../../../helpers/AxiosRequest';

const EditCateogry = ({id,fetchData,category}) => {
    const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const handleClose = () => {
    setShow(false);
    setPreviewImage(null);
  }
  const handleShow = async(id) => {
    setShow(true);
  }

  const handleUpdateSubmit = async (values, { setErrors, setSubmitting,resetForm }) => {
 
    setIsLoading(true);
    const formData = new FormData();
    formData.append('categoryName', values.categoryName);
    if (values.image) {
      formData.append('categoryImages', values.image);
    }

    try {
      const response = await AxiosInstance.post(`/category/updatecategory?id=${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success("Category updated successfully", {
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
    categoryName: Yup.string()
      .required('Category name is required')
      .min(5, 'Category name must be at least 5 characters')
      .max(30, 'Category name must be at most 30 characters'),
    image: Yup.mixed()
      .test(
        'fileSize',
        'File size must be less than 3 MB',
        (value) => {
          // Only validate if a file is selected
          return !value || (value && value.size <= 3 * 1024 * 1024);
        }
      )
      .test(
        'fileFormat',
        'Only jpg, png, webp, jpeg formats are allowed',
        (value) => {
          // Only validate if a file is selected
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
      <span onClick={() => handleShow(id)} style={{ cursor: "pointer" }}>
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
          <Modal.Title>Update Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              categoryName: category.categoryName || "",
              image: null,
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
                <Form.Group className="mb-3" controlId="categoryName">
                  <Form.Label>Category Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="categoryName"
                    value={values.categoryName}
                    placeholder="Enter category name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.categoryName && errors.categoryName && (
                    <Form.Text className="font16Red">
                      {errors.categoryName}
                    </Form.Text>
                  )}
                </Form.Group>
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
                {previewImage && (
                  <div className="mb-3">
                     <Form.Label>Preview Image</Form.Label>
                     <div>
                    <Image src={previewImage} alt="Preview" thumbnail width={100}/>
                     </div>
                  </div>
                )}
                {category.images &&
                  category.images.length > 0 && (
                    <div className="mb-3">
                      <Form.Label>Current Image</Form.Label>
                      <div>
                        {category.images.map((image, index) => (
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

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Spinner animation="border" size="sm me-2" /> Updating...
                    </>
                  ) : (
                    "Update Category"
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

export default EditCateogry