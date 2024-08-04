import React, { useEffect, useState } from "react";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import { Form, Button, Spinner, Image } from "react-bootstrap";
import AxiosInstance from "../../../helpers/AxiosRequest";
import { toast } from "react-toastify";

const AddNewSubCategory = ({ fetchData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await AxiosInstance.get("/category/getcategory");
        setCategories(response?.data?.data);
      } catch (error) {
        toast.error("Failed to load categories", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };
    fetchCategories();
  }, []);

  const initialValues = {
    subCategoryName: "",
    category: "",
    image: null,
  };

  const validationSchema = Yup.object().shape({
    subCategoryName: Yup.string()
      .required("SubCategory name is required")
      .min(5, "SubCategory name must be at least 5 characters")
      .max(30, "SubCategory name must be at most 30 characters"),
    category: Yup.string().required("Category is required"),
    image: Yup.mixed()
      .required("Image is required")
      .test("fileSize", "File size must be less than 3 MB", (value) => {
        return value && value.size <= 3 * 1024 * 1024; // 3 MB in bytes
      })
      .test("fileFormat", "only jpg,png,webp,jpeg upload", (value) => {
        return (
          value &&
          ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
            value.type
          )
        );
      }),
  });

  const handleSubmit = async (
    values,
    { resetForm, setErrors, setSubmitting }
  ) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("subCategoryName", values.subCategoryName);
    formData.append("categoryId", values.category);
    formData.append("subCategoryImages", values.image);

    try {
      const response = await AxiosInstance.post(
        "/subcategory/addsubcategory",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        toast.success("SubCategory added successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        fetchData();
        resetForm();
        setPreviewImage(null);
        document.getElementById("image").value = "";
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
    <div
      style={{ background: "#FFF5DC", padding: "30px 50px", borderRadius: "6px" }}
    >
      <h1 className="text-center mb-4">Add New subCategory</h1>
      <div className="">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {
              ({
                setFieldValue,
                handleChange,
                handleBlur,
                values,
                errors,
                touched,
              }) => {
                return (
                  <FormikForm className="row">
                    <Form.Group
                      className="mb-3 col-md-6 col-sm-12"
                      controlId="category"
                    >
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        as="select"
                        name="category"
                        value={values.category}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="">Select a category</option>
                        {categories?.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category?.categoryName}
                          </option>
                        ))}
                      </Form.Control>
                      {touched.category && errors.category && (
                        <Form.Text className="font16Red">
                          {errors.category}
                        </Form.Text>
                      )}
                    </Form.Group>

                    <Form.Group
                      className="mb-3 col-md-6 col-sm-12"
                      controlId="subCategoryName"
                    >
                      <Form.Label>SubCategory Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="subCategoryName"
                        value={values.subCategoryName}
                        placeholder="Enter subCategory name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.subCategoryName && errors.subCategoryName && (
                        <Form.Text className="font16Red">
                          {errors.subCategoryName}
                        </Form.Text>
                      )}
                    </Form.Group>

                    <Form.Group
                      className="mb-3 col-md-6 col-sm-12"
                      controlId="image"
                    >
                      <Form.Label>Image Upload</Form.Label>
                      <Form.Control
                        type="file"
                        name="image"
                        id="image"
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
                        <Form.Text className="font16Red">
                          {errors.image}
                        </Form.Text>
                      )}
                    </Form.Group>

                    {previewImage && (
                      <div className="mb-3">
                        <Image
                          src={previewImage}
                          alt="Preview"
                          thumbnail
                          width={100}
                        />
                      </div>
                    )}

                    <div className="d-flex justify-content-center mt-3">
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Spinner animation="border" size="sm me-2" />
                            Adding ...
                          </>
                        ) : (
                          "Add New SubCategory"
                        )}
                      </Button>
                    </div>
                  </FormikForm>
                );
              }
            }
          </Formik>
      </div>
    </div>
  );
};

export default AddNewSubCategory;
