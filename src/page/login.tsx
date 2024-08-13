import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/slice/userSlice";
import { RootState } from "../store";

interface AccountAdmin {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userLogin, isLoading, error } = useSelector((state: RootState) => state.user);
  const [localError, setLocalError] = useState<string | null>(null);

  const adminCredentials: AccountAdmin = {
    email: "admin@gmail.com",
    password: "123456"
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Không được để trống")
        .email("Email không đúng định dạng"),
      password: Yup.string()
        .required("Không được để trống")
    }),
    onSubmit: async (values) => {
      setLocalError(null);

      if (values.email === adminCredentials.email && values.password === adminCredentials.password) {
        localStorage.setItem('role', "ADMIN");
        navigate("/admin");
      } else {
        dispatch(loginUser(values))
          .unwrap()
          .then(() => {
            navigate("/home");
          })
          .catch((err: any) => {
            setLocalError(err.message);
          });
      }
    }
  });

  useEffect(() => {
    if (userLogin) {
      navigate("/home");
    }
  }, [userLogin, navigate]);

  return (
    <Container className="login-container my-5">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Form onSubmit={formik.handleSubmit} className="login-form p-4 rounded">
            <h2 className="text-center mb-4">Login</h2>
            
            {localError && (
              <div className="alert alert-danger" role="alert">
                {localError}
              </div>
            )}
  
            <Form.Group controlId="formUsername">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                isInvalid={!!formik.errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            </Form.Group>
  
            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                isInvalid={!!formik.errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </Form.Group>
  
            <Button variant="primary" type="submit" className="w-100 mt-4" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            <p>Bạn đã có tài khoản chưa ? <Link to={"/register"}>Đăng kí</Link></p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
