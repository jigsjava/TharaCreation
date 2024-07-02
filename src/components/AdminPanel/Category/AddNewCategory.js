import React, { useState } from 'react';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Spinner, Image } from 'react-bootstrap';
import AxiosInstance from '../../../helpers/AxiosRequest';
import { toast } from 'react-toastify';

const AddNewCategory = ({ fetchData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const initialValues = {
    categoryName: '',
    image: null,
  };

  const validationSchema = Yup.object().shape({
    categoryName: Yup.string().required('Category name is required')
    .min(5, 'Category name must be at least 5 characters')
    .max(30, 'Category name must be at most 30 characters'),
    image: Yup.mixed().required('Image is required').
    test('fileSize', 'File size must be less than 3 MB', (value) => {
      return value && value.size <= 3 * 1024 * 1024; // 3 MB in bytes
    })
    .test('fileFormat', 'only jpg,png,webp,jpeg upload', (value) => {
      return value && ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(value.type);
    }),
  });

  const handleSubmit = async(values, { resetForm, setErrors, setSubmitting }) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('categoryName', values.categoryName);
    formData.append('categoryImages', values.image);

    try {
      const response = await AxiosInstance.post("/category/addcategory", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success("Category added successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        fetchData();
        resetForm();
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

  return (
    <div style={{ background: "#FFF5DC", padding: "20px", borderRadius: "6px" }}>
      <h1 className="text-start mb-4">Add New Category</h1>
      <div className="row d-flex justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-12">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
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
                      setFieldValue("image", event.currentTarget.files[0]);
                      setPreviewImage(URL.createObjectURL(event.currentTarget.files[0]));
                    }}
                    onBlur={handleBlur}
                  />
                  {touched.image && errors.image && (
                    <Form.Text className="font16Red">
                      {errors.image}
                    </Form.Text>
                  )}
                </Form.Group>

                {previewImage && (
                  <div className="mb-3">
                    <Image src={previewImage} alt="Preview" thumbnail width={100}/>
                  </div>
                )}

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Spinner animation="border" size="sm me-2" />
                      Adding ...
                    </>
                  ) : (
                    "Add New Category"
                  )}
                </Button>
              </FormikForm>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddNewCategory;
