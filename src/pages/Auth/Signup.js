import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Spinner,
} from "react-bootstrap";
import {NavLink,useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import AxiosInstance from "../../helpers/AxiosRequest";
import { toast } from "react-toastify";


const RegisterSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters").max(36, "Password must be at most 36 characters"),
  mobile: Yup.string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
});

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);

  const form = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      mobile:'',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { resetForm, setErrors, setSubmitting }) => {
      //  console.log("values",values)
      setLoading(true); 
      try {
        setValues(values);
        const response = await AxiosInstance.post(`/auth/signup`,values);
        if (response.status === 200) {
          toast.success("User registered successfully", {
            position: toast.POSITION.TOP_CENTER,
          });
          resetForm(); 
          navigate('/emailverify')
        } 
        // else {
        //   toast.error(response.data.error, {
        //     position: toast.POSITION.TOP_CENTER,
        //   });
        // }
      } catch (err) {
        console.error("Async error:", err);
        if (err.response && err.response.data && err.response.data.error) {
          toast.error(err.response.data.error, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.error("An unexpected error occurred.", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        setErrors(err.errors || {});
      } finally {
        setSubmitting(false);
        setLoading(false); 
      }
    },
  });


  return (
    <>
      <div className="userFormPage">
        <Container>
          <Row className="justify-content-center px-2" style={{minHeight:"100vh",alignItems:'center'}}>
            <Col xl={4} lg={6} sm={11} style={{background:"#e7e7e7",borderRadius:'10px'}}>
              <div className="Authbox mt-3">
                <h2 className="text-center header mb-3">Sign Up</h2>
              
                <Form onSubmit={form.handleSubmit}>
                  <Form.Group className="mb-3">
                    <label>Name</label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Please enter your name"
                      value={form.values.name}
                      className="inputCustom"
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                    />
                    {form.touched.name && form.errors.name && (
                      <Form.Text className="font16Red">
                        {form.errors.name}
                      </Form.Text>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <label>Email</label>
                    <Form.Control
                      type="email"
                      placeholder="Please enter your email address"
                      name="email"
                      value={form.values.email}
                      className="inputCustom"
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                    />
                    {form.touched.email && form.errors.email && (
                      <Form.Text className="font16Red">
                        {form.errors.email}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <label>Password</label>
                    <Form.Control
                      type="password"
                      placeholder="Pelase enter your password"
                      name="password"
                      value={form.values.password}
                      className="inputCustom"
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                    />
                    {form.touched.password && form.errors.password && (
                      <Form.Text className="font16Red">
                        {form.errors.password}
                      </Form.Text>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-5">
                    <label>MobileNumber</label>
                    <Form.Control
                      type="number"
                      placeholder="Pelase enter your Number"
                      name="mobile"
                      value={form.values.mobile}
                      className="inputCustom"
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                    />
                    {form.touched.mobile && form.errors.mobile && (
                      <Form.Text className="font16Red">
                        {form.errors.mobile}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3 text-center">
                  <Button
                      variant=""
                      className="btn btn-secondary w-100"
                      disabled={form.isSubmitting || !form.isValid || loading}
                      type="submit"
                    >
                      {loading ? <Spinner animation="border" size="sm" /> : "Register"}
                    </Button>
                  </Form.Group>
                  <Form.Group className="mb-3 text-center">
                    <span className="font16Blk">Already have an Account? </span>
                    <NavLink to={"/login"} className="linkCommon">
                      Login
                    </NavLink>
                  </Form.Group>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Register;
