import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import AxiosInstance from "../../helpers/AxiosRequest";
import { toast } from "react-toastify";

const PasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password must be at least 4 characters")
    .max(10, "Password must be at most 10 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  otp: Yup.string()
    .required("OTP is required")
    .min(6, "OTP must be at least 6 characters")
    .max(36, "OTP must be at most 36 characters"),
});
  

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useFormik({
    initialValues: {
        email: "",  
        otp: "", 
        password: "",
        confirmPassword: ""
    },
    validationSchema: PasswordSchema,
    onSubmit: async (values, { resetForm, setErrors, setSubmitting }) => {
      setIsLoading(true); // Start loading
      try {
        const response = await AxiosInstance.post("/auth/updatepassword", {
            email: values.email,
            otp: values.otp,
            newPassword: values.password
        });

        if (response.status === 200) {
            toast.success("Password updated successfully", {
              position: toast.POSITION.TOP_CENTER,
            });
            resetForm();
            navigate("/login");
          }
         
      } catch (err) {
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
        setIsLoading(false); 
      }
    },
  });

  return (
    <>
      <div className="userFormPage">
        <Container>
          <Row className="justify-content-center h-100 px-2" style={{ minHeight: "100vh", alignItems: "center" }}>
            <Col lg={4} md={6} sm={11} style={{ background: "#e7e7e7", borderRadius: "10px" }}>
              <div className="Authbox mt-3">
                <h2 className="text-center mb-3">Update Password</h2>
                <Form onSubmit={form.handleSubmit}>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={form.values.email}
                      placeholder="Enter your email"
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      isInvalid={form.touched.email && form.errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {form.errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="otp">
                    <Form.Label>OTP</Form.Label>
                    <Form.Control
                      type="text"
                      name="otp"
                      value={form.values.otp}
                      placeholder="Enter OTP"
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      isInvalid={form.touched.otp && form.errors.otp}
                    />
                    <Form.Control.Feedback type="invalid">
                      {form.errors.otp}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={form.values.password}
                      placeholder="Enter your new password"
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      isInvalid={form.touched.password && form.errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {form.errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={form.values.confirmPassword}
                      placeholder="Confirm your new password"
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      isInvalid={form.touched.confirmPassword && form.errors.confirmPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                      {form.errors.confirmPassword}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3 text-center">
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={form.isSubmitting || !form.isValid || isLoading}
                    >
                      {isLoading ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        "Update Password"
                      )}
                    </Button>
                  </Form.Group>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UpdatePassword;
