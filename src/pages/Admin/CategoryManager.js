import React, { useEffect, useState } from 'react';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import './CategoryManager.scss';
import { DeleteIcon, EditIcon, ViewIcon } from '../../assets/icons';
import SearchForm from '../../components/SearchForm';
import { Form, Button,Modal } from 'react-bootstrap';
import AxiosInstance from '../../helpers/AxiosRequest';
import { toast } from 'react-toastify';

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchData = async() => {
    try {
      const response = await AxiosInstance.get('/category/getcategory');
      setCategories(response?.data?.category);
      toast.success('Data fetched successfully!');
    } catch (error) {
      toast.error('Error fetching data');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    console.log("id",id)
    try {
      const response = await AxiosInstance.delete(`category/deletecategory?id=${id}`);
      if (response.status === 200) {
        // toast.success('Category deleted successfully!');
        fetchData();
      }
    } catch (error) {
      toast.error('An error occurred during deletion');
    }
  };

  const initialValues = {
    categoryName: '',
    image: null,
  };
  const validationSchema = Yup.object().shape({
    categoryName: Yup.string().required('Category name is required'),
    image: Yup.mixed().required('Image is required'),
  });

  const handleSubmit = async(values, { resetForm, setErrors, setSubmitting }) => {
    setIsLoading(true);
    const formData = new FormData();
   
    formData.append('name', values.categoryName);
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
    <div className="category-manager">
      <div
        style={{ background: "#FFF5DC", padding: "20px", borderRadius: "6px" }}
      >
        <h1 className="text-start mb-4">Category Manager</h1>
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
                      }}
                      onBlur={handleBlur}
                    />
                    {touched.image && errors.image && (
                      <Form.Text className="font16Red">
                        {errors.image}
                      </Form.Text>
                    )}
                  </Form.Group>

                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Submitting..." : "Submit"}
                  </Button>
                </FormikForm>
              )}
            </Formik>
          </div>
        </div>
      </div>

      <div className="category-list">
        <h3>Category List</h3>
        <div className="w-100 d-flex justify-content-end">
          <SearchForm />
        </div>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Category name</th>
              <th scope="col">Category Image</th>
              <th scope="col">status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories.map((category, index) => {
                const { name, images,id} = category;
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{name}</td>
                    <td>
                      {images &&
                        images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={category.name}
                            style={{ width: "50px", height: "auto",padding:'5px' }}
                          />
                        ))}
                    </td>
                    <td>
                      <span className="badge bg-success">Approved</span>
                    </td>
                    <td>
                      <ViewIcon />
                      <span onClick={handleShow}>
                        <EditIcon />
                      </span>
                      <span style={{cursor:'pointer'}} onClick={() => handleDelete(id)}><DeleteIcon/></span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        centered
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
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

export default CategoryManager;


{/* <tr>
<th scope="row">2</th>
<td>Attaa</td>
<td>
  <img
    src={previewImage}
    alt={previewImage}
    className="category-image"
    height={50}
    width={50}
  />
</td>
<td>
<span className="badge bg-success">Approved</span>  <span className="badge bg-danger">Rejected</span> <span className="badge bg-secondary">Pending</span>
</td>
<td>
  <ViewIcon />
  <span onClick={handleShow}>
    <EditIcon />
  </span>
  <DeleteIcon />
</td>
</tr> */}
 {/* <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="category-form">
                <div className="form-group mb-3">
                  <label htmlFor="name">Category Name</label>
                  <Field type="text" id="name" name="name" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="image">Category Image</label>
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
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="error-message"
                  />
                </div>

                {previewImage && (
                  <div className="image-preview">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="preview-image"
                      height={100}
                      width={100}
                    />
                  </div>
                )}

                <button type="submit" className="btn btn-primary">
                  Add Category
                </button>
              </Form>
            )}
          </Formik> */}