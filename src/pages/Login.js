import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import AxiosInstance from "../helpers/AxiosRequest";
import { toast } from "react-toastify";


const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required").min(8).max(36),
});

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { resetForm, setErrors, setSubmitting }) => {

      try {
       
        const response = await AxiosInstance.post("/auth/login", {
          email: values.email,
          password: values.password,
        });
       
        if (response.status === 200) {
          // console.log("responsetytty",response)
          localStorage.setItem("accessToken", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data));
          setIsLoading(false);
         
          navigate("/");
      
        } else {
          setIsLoading(false);
          toast.error(response.data.message);
        }
      } catch (err) {
        setErrors(err.errors || {});
        // notify(err.message, 'error');
      } finally {
        setSubmitting(false);
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
                <h2 className="text-center header mb-3">Login</h2>
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
                  <Form.Group className="mb-4" controlId="">
                    <lable>Password</lable>
                    <Form.Control
                      type="password"
                      name="password"
                      value={form.values.password}
                      placeholder="Please enter your password"
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
                  <Form.Group className="mb-3 text-center">
                    {/* <Button
                    className="btn btn-secondary w-100"
                      disabled={form.isSubmitting || !form.isValid}
                      type="submit"
                    >
                      {form.isSubmitting ? <Spinner /> : "Login"}
                    </Button> */}

                    <Button className="btn btn-secondary w-100" onClick={() => {navigate("/")}}>Login</Button>
                  </Form.Group>
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

export default Login;
