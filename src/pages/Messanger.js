import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import AxiosInstance from "../helpers/AxiosRequest";

const LoginSchema = Yup.object({
  message: Yup.string().required("Message is required"),
});

const Messanger = () => {
  const { id } = useParams();
  const [conversation, setConversation] = useState();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const User = JSON.parse(localStorage.getItem("user"));
    setUser(User);
    getChatHistory();
  }, []);

  const getChatHistory = async () => {
    try {
      const response = await AxiosInstance.get(
        `messanger/chathistory?receiverId=${id}`
      );
      setConversation(response?.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const form = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { resetForm, setErrors, setSubmitting }) => {
      const payload = {
        message: values.message,
        receiverId: id,
      };
      try {
        const response = await AxiosInstance.post(`/messanger/send`, payload);
        if(response){
          resetForm();
          getChatHistory(); 
        }
        // Refresh chat history after sending a message
      } catch (err) {
        console.error("Error sending message:", err);
        setErrors(err.errors || {});
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <div className="userFormPage ">
        <Container>
          <Row className="justify-content-center">
            <Col lg={6}>
              <div className="Authbox mt-5">
                <Form onSubmit={form.handleSubmit}>
                  <Form.Group className="mb-3" controlId="">
                    <p>
                      Sender or Login User:<b>{user?.user?.name}</b>
                    </p>
                    <lable>Send Message:</lable>
                    <Form.Control
                      type="text"
                      value={form.values.message}
                      name="message"
                      placeholder="Please enter message"
                      className="inputCustom"
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                    />
                    {form.touched.message && form.errors.message && (
                      <Form.Text className="font16Red">
                        {form.errors.message}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Button
                    className="btn btn-secondary w-100"
                    disabled={form.isSubmitting || !form.isValid}
                    type="submit"
                  >
                    submit
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
          <div>
            <h2 className="text-center mt-5">Chat History</h2>
            <ul>
              {conversation?.map((messageItem) => {
                return (
                  <li
                    key={messageItem.id}
                    style={{
                      width: "100%",
                      marginBottom: "10px",
                      display: "flex",
                      justifyContent: messageItem?.sender === id ? "start" : "end",
                    }}
                  >
                    <div
                      style={{
                        width: "fit-content", // Adjust width according to content
                        padding: "10px", // Add padding for spacing
                        border: "1px solid #ccc", // Add border
                        borderRadius: "5px",
                        background:
                          messageItem?.id === id ? "#f0f0f0" : "#e0f7fa",
                      }}
                    >
                      <strong>Message:</strong> {messageItem?.message}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Messanger;
