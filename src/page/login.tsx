import React, { useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; 
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/slice/userSlice";
import { RootState } from "../store";

const Login = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state: RootState)=> state.user.userLogin)
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Không được để trống")
                         .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Email không đúng định dạng"),
      password: Yup.string().required("Không được để trống")
    }),
    onSubmit: (values)=> {
      console.log(values);
      // call API

       dispatch(loginUser(values));
    }
  })

  const navigate = useNavigate();
 
  const onSumbitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit();
  }
  // useEffect(()=> {
  //   // nếu quyền người dùng là admin thì điều hướng sang trang admin
  //   // nếu là user thì điều hướng sang trang user
  //   if(userLogin) {
  //     //  true thì điều hướng sang trang admin
  //     navigate("/admin")
  //   }else {
  //     // false thì điều hướng sang trang user
  //     navigate("/")
  //   }
  // }, [userLogin])
  return (
    <Container className="login-container my-5">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Form onSubmit={onSumbitForm} className="login-form p-4 rounded">
            <h2 className="text-center mb-4">Login</h2>
            <Form.Group controlId="formUsername">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" placeholder="Enter Email" name="email" value={formik.values.email} onChange={formik.handleChange} />
              {
                formik.errors.email && <Form.Text className="text-danger">
                  {formik.errors.email}
                </Form.Text>
              }
            </Form.Group>

            <Form.Group controlId="formPassword" className="mt-3">
                
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter Password" name="password" value={formik.values.password} onChange={formik.handleChange} />
              {
                formik.errors.password && <Form.Text className="text-danger">
                  {formik.errors.password}
                </Form.Text>
              }
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-4">
              Login
            </Button>
            <p>Bạn đã có tài khoản chưa ?<Link to={"/register"}>Đăng kí</Link></p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;


