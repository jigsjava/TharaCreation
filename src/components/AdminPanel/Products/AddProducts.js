import React, { useEffect, useState } from "react";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import { Form, Button, Spinner, Image } from "react-bootstrap";
import AxiosInstance from "../../../helpers/AxiosRequest";
import { toast } from "react-toastify";

const AddProducts = ({ fetchData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

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

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (selectedCategory) {
        try {
          const response = await AxiosInstance.get(`/subcategory/getsubcategory?categoryId=${selectedCategory}`);
          setSubCategories(response?.data?.data);
        } catch (error) {
          toast.error("Failed to load subcategories", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } else {
        setSubCategories([]);
      }
    };
    fetchSubCategories();
  }, [selectedCategory]);

  const initialValues = {
    productName: "",
    category: "",
    subcategory:'',
    image: null,
    price:'',
    discountprice:'',
    quantity:'',
  };

  const validationSchema = Yup.object().shape({
    productName: Yup.string()
      .required("Product name is required")
      .min(5, "Product name must be at least 5 characters")
      .max(30, "Product name must be at most 30 characters"),
    category: Yup.string().required("Category is required"),
    subcategory:Yup.string().required("SubCategory is required"),
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
    formData.append("productName", values.productName);
    formData.append("categoryId", values.category);
    formData.append("subCategoryId", values.subcategory);
    formData.append("productImages", values.image);
    formData.append("price", values.price);
    formData.append("discountPrice", values.discountprice);
    formData.append("quantity", values.quantity);

    
    try {
      const response = await AxiosInstance.post(
        "/product/addproduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Product added successfully", {
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
    <div
      style={{ background: "#FFF5DC", padding: "20px", borderRadius: "6px" }}
    >
      <h1 className="text-center mb-4">Add New Product</h1>
      <div className="row d-flex justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-12">
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
                  <FormikForm>
                    <Form.Group className="mb-3" controlId="category">
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        as="select"
                        name="category"
                        value={values.category}
                        onChange={(e) => {
                          handleChange(e);
                          setSelectedCategory(e.target.value); // Update the selected category
                        }}
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

                    <Form.Group className="mb-3" controlId="subcategory">
                      <Form.Label>SubCategory</Form.Label>
                      <Form.Control
                        as="select"
                        name="subcategory"
                        value={values.subcategory}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={!selectedCategory}
                      >
                        <option value="">Select a SubCategory</option>
                        {subCategories?.map((subcategory) => (
                          <option key={subcategory._id} value={subcategory._id}>
                            {subcategory?.subCategoryName}
                          </option>
                        ))}
                      </Form.Control>
                      {touched.category && errors.category && (
                        <Form.Text className="font16Red">
                          {errors.category}
                        </Form.Text>
                      )}
                    </Form.Group>

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

                    <Form.Group className="mb-3" controlId="image">
                      <Form.Label>Image Upload</Form.Label>
                      <Form.Control
                        type="file"
                        name="image"
                        onChange={(event) => {
                          setFieldValue("image", event.currentTarget.files[0]);
                          setPreviewImage(
                            URL.createObjectURL(event.currentTarget.files[0])
                          );
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

                    <Form.Group className="mb-3" controlId="price">
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

                    <Form.Group className="mb-3" controlId="discountprice">
                      <Form.Label>Discount Price</Form.Label>
                      <Form.Control
                        type="text"
                        name="discountprice"
                        value={values.discountprice}
                        placeholder="Enter Discount Price"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.discountprice && errors.discountprice && (
                        <Form.Text className="font16Red">
                          {errors.discountprice}
                        </Form.Text>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="quantity">
                      <Form.Label>Quanttity</Form.Label>
                      <Form.Control
                        type="text"
                        name="quantity"
                        value={values.quantity}
                        placeholder="Enter Quantity"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.quanttity && errors.quanttity && (
                        <Form.Text className="font16Red">
                          {errors.quanttity}
                        </Form.Text>
                      )}
                    </Form.Group>
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
                  </FormikForm>
                );
              }
            }
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
