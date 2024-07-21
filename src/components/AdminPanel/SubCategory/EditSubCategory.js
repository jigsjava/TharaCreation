import React, { useEffect, useState } from 'react';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Modal, Spinner, Image } from 'react-bootstrap';
import { EditIcon } from '../../../assets/icons';
import { toast } from 'react-toastify';
import AxiosInstance from '../../../helpers/AxiosRequest';

const EditSubCateogry = ({id,fetchData,subCategory}) => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
 
  const handleClose = () => {
    setShow(false);
    setPreviewImage(null);
  }
  const handleShow = async() => {
    setShow(true);
  }

  const handleUpdateSubmit = async (values, { setErrors, setSubmitting,resetForm }) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('subCategoryName', values.subCategoryName);
    if (values.image) {
      formData.append('subCategoryImages', values.image);
    }

    try {
      const response = await AxiosInstance.post(`/subcategory/updatesubcategory?id=${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success("SubCategory updated successfully", {
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
    subCategoryName: Yup.string()
      .required('SubCategory name is required')
      .min(5, 'SubCategory name must be at least 5 characters')
      .max(30, 'SubCategory name must be at most 30 characters'),
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
          <Modal.Title>Update SubCategory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              subCategoryName: subCategory.subCategoryName || "",
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
                <Form.Group className="mb-3" controlId="subCategoryName">
                  <Form.Label>SubCategory Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="subCategoryName"
                    value={values.subCategoryName}
                    placeholder="Enter SubCategory name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.subCategoryName && errors.subCategoryName && (
                    <Form.Text className="font16Red">
                      {errors.subCategoryName}
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
                {subCategory.images &&
                  subCategory.images.length > 0 && (
                    <div className="mb-3">
                      <Form.Label>Current Image</Form.Label>
                      <div>
                        {subCategory.images.map((image, index) => (
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
                    "Update SubCategory"
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

export default EditSubCateogry