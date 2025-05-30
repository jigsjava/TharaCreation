import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import AxiosInstance from "../../helpers/AxiosRequest";
import { toast } from "react-toastify";


const ForgotPasswordSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const ForgotPassWord = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: async (values, { resetForm, setErrors, setSubmitting }) => {
      setIsLoading(true);
      try {
        const response = await AxiosInstance.post("/auth/forgotpass", {
          email: values.email,
        });
       
        if (response.status === 200) {
          toast.success("Password reset link sent successfully", {
            position: toast.POSITION.TOP_CENTER,
          });
          resetForm();
          navigate("/updatepassword");
        } 
      } 
      catch (err) {
        console.log("errr",err)
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
      <div className="userFormPage ">
        <Container>
          <Row
            className="justify-content-center h-100 px-2"
            style={{ minHeight: "100vh", alignItems: "center" }}
          >
            <Col
              lg={4}
              md={6}
              sm={11}
              style={{ background: "#e7e7e7", borderRadius: "10px" }}
            >
              <div className="Authbox mt-3">
                <h2 className="text-center header mb-3">Forgot PassWord</h2>
                <Form onSubmit={form.handleSubmit}>
                  <Form.Group className="mb-3" controlId="">
                    <lable>Email</lable>
                    <Form.Control
                      type="email"
                      value={form.values.email}
                      name="email"
                      placeholder="Please enter your email address"
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
                  <Button
                      variant=""
                      className="btn btn-secondary w-100"
                      disabled={form.isSubmitting || !form.isValid}
                      type="submit"
                    >
                      {form.isSubmitting ? <Spinner animation="border" size="sm" />: "Continue"}
                    </Button>
                  <Form.Group className="mb-3 text-center">
                    <span className="font16Blk">Don't have an account? </span>
                    <NavLink to={"/signup"} className="linkCommon">
                      Sign Up
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
};

export default ForgotPassWord;
