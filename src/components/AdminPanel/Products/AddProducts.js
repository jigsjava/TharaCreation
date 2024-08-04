import React, { useEffect, useState } from "react";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Form, Button, Spinner, Image } from "react-bootstrap";
import AxiosInstance from "../../../helpers/AxiosRequest";
import { toast } from "react-toastify";
import TextEditor from "../../Common/TextEditor";

const AddProducts = ({ fetchData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

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
          const response = await AxiosInstance.get(
            `/subcategory/getsubcategory?categoryId=${selectedCategory}`
          );
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
    subcategory: "",
    image: [],
    price: "",
    discountprice: "",
    quantity: "",
    description: "",
  };

  const validationSchema = Yup.object().shape({
    productName: Yup.string()
      .required("Product name is required")
      .min(5, "Product name must be at least 5 characters")
      .max(30, "Product name must be at most 30 characters"),
    category: Yup.string().required("Category is required"),
    subcategory: Yup.string().required("SubCategory is required"),
    description: Yup.string()
      .required("Description is required")
      .min(5, "Description must be at least 5 characters")
      .max(200, "Description must be at most 200 characters"),
    price: Yup.number().required("Price is required"),
    discountprice: Yup.number()
      .required("Discount Price is required")
      .lessThan(Yup.ref("price"), "Discount Price must be less than Price"),
    quantity: Yup.number().required("Quantity is required"),
    images: Yup.array().of(Yup.mixed()
        .required("Image is required")
        .test("fileSize", "File size must be less than 3 MB", (value) => {
          return value && value.size <= 3 * 1024 * 1024; // 3 MB in bytes
        })
        .test("fileFormat", "Only jpg, png, webp, jpeg formats are allowed", (value) => {
          return value && ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(value.type);
        })
    )
    .required("Images are required"),
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
    values.images.forEach((image) => {
      formData.append("productImages", image);
    });
    formData.append("price", values.price);
    formData.append("discountPrice", values.discountprice);
    formData.append("quantity", values.quantity);
    formData.append("description", values.description);

    try {
      const response = await AxiosInstance.post(
        "/product/addproduct",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        toast.success("Product added successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        fetchData();
        resetForm();
        setPreviewImage([]);
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
      style={{
        background: "#FFF5DC",
        padding: "30px 50px",
        borderRadius: "6px",
      }}
    >
      <div className="d-flex justify-content-center">
        <h1
          className="text-center mb-4"
          style={{ borderBottom: "2px solid #000000" }}
        >
          Add New Product
        </h1>
      </div>

      <div className="">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, handleChange, values, errors, touched }) => (
            <FormikForm className="row g-3">
              <Form.Group
                className="mb-3 col-md-6 col-sm-12"
                controlId="category"
              >
                <Form.Label>Category</Form.Label>
                <Field
                  as="select"
                  name="category"
                  className="form-control"
                  onChange={(e) => {
                    handleChange(e);
                    setSelectedCategory(e.target.value);
                  }}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.categoryName}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="category"
                  component="div"
                  className="font16Red"
                />
              </Form.Group>

              <Form.Group
                className="mb-3 col-md-6 col-sm-12"
                controlId="subcategory"
              >
                <Form.Label>SubCategory</Form.Label>
                <Field
                  as="select"
                  name="subcategory"
                  className="form-control"
                  disabled={!selectedCategory}
                >
                  <option value="">Select a SubCategory</option>
                  {subCategories.map((subcategory) => (
                    <option key={subcategory._id} value={subcategory._id}>
                      {subcategory.subCategoryName}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="subcategory"
                  component="div"
                  className="font16Red"
                />
              </Form.Group>

              <Form.Group
                className="mb-3 col-md-6 col-sm-12"
                controlId="productName"
              >
                <Form.Label>Product Name</Form.Label>
                <Field
                  type="text"
                  name="productName"
                  className="form-control"
                  placeholder="Enter Product name"
                />
                <ErrorMessage
                  name="productName"
                  component="div"
                  className="font16Red"
                />
              </Form.Group>

              <Form.Group className="mb-3 col-md-6 col-sm-12" controlId="image">
                <Form.Label>Image Upload</Form.Label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="form-control"
                  multiple
                  onChange={(event) => {
                    const files = Array.from(event.currentTarget.files);
                    if (files) {
                      setFieldValue("images", files);
                      setPreviewImage(
                        files.map((file) => URL.createObjectURL(file))
                      );
                    }
                  }}
                />
                {touched.images && errors.images && (
                  <div className="font16Red">{errors.images}</div>
                )}
              </Form.Group>

              {previewImage &&
                previewImage.map((image, index) => (
                  <div key={index} className="mb-3">
                    <Image
                      src={image}
                      alt={`Preview ${index}`}
                      thumbnail
                      width={100}
                    />
                  </div>
                ))}

              <Form.Group className="mb-3 col-md-4 col-sm-6" controlId="price">
                <Form.Label>Price</Form.Label>
                <Field
                  type="number"
                  name="price"
                  className="form-control"
                  placeholder="Enter Price"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="font16Red"
                />
              </Form.Group>

              <Form.Group
                className="mb-3 col-md-4 col-sm-6"
                controlId="discountprice"
              >
                <Form.Label>Discount Price</Form.Label>
                <Field
                  type="number"
                  name="discountprice"
                  className="form-control"
                  placeholder="Enter Discount Price"
                />
                <ErrorMessage
                  name="discountprice"
                  component="div"
                  className="font16Red"
                />
              </Form.Group>

              <Form.Group
                className="mb-3 col-md-4 col-sm-6"
                controlId="quantity"
              >
                <Form.Label>Quantity</Form.Label>
                <Field
                  type="number"
                  name="quantity"
                  className="form-control"
                  placeholder="Enter Quantity"
                />
                <ErrorMessage
                  name="quantity"
                  component="div"
                  className="font16Red"
                />
              </Form.Group>

              <Form.Group
                className="mb-3 col-md-12 col-sm-12"
                controlId="description"
              >
                <Form.Label>Description</Form.Label>
                <TextEditor
                  value={values?.description}
                  onChange={(value) => setFieldValue("description", value)}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="font16Red"
                />
              </Form.Group>

              <div className="d-flex justify-content-center mt-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Adding ...
                    </>
                  ) : (
                    "Add New Product"
                  )}
                </Button>
              </div>
            </FormikForm>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddProducts;
