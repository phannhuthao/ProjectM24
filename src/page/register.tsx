import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { registerUser } from "../store/slice/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


const initStateForm = {
  email: "",
  password: "",
  passwordConfirm: "",
  fullName: "",
  phone: "",
  birthday: "",
}

const initErrorForm = {
  email: "",
  password: "",
  passwordConfirm: "",
  fullName: "",
  phone: "",
  birthday: ""
}

const Register = () => {
  const [registerForm, setRegisterForm] = useState(initStateForm);
  const [error, setError] = useState(initErrorForm);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target
    setRegisterForm({ ...registerForm, [name]: value })
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmitForm = (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate email
    if (!registerForm.email.trim()) {
      setError(pre => ({ ...pre, email: 'Email không được để trống' }));
      return;
    }
    if (!registerForm.email.toLowerCase().match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
      setError(pre => ({ ...pre, email: 'Email không đúng định dạng, mời bạn nhập lại' }));
      return;
    }
    setError(pre => ({ ...pre, email: '' }));

    // Validate password
    if (!registerForm.password.trim()) {
      setError(pre => ({ ...pre, password: 'Password không được để trống' }));
      return;
    }
    if (registerForm.password.length < 6) {
      setError(pre => ({ ...pre, password: 'Password phải có ít nhất 6 kí tự' }));
      return;
    }
    setError(pre => ({ ...pre, password: '' }));

    // Validate password confirmation
    if (registerForm.password !== registerForm.passwordConfirm) {
      setError(pre => ({ ...pre, passwordConfirm: 'Password xác nhận không khớp' }));
      return;
    }
    setError(pre => ({ ...pre, passwordConfirm: '' }));

    // Validate full name
    if (!registerForm.fullName.trim()) {
      setError(pre => ({ ...pre, fullName: 'Tên không được để trống' }));
      return;
    }
    setError(pre => ({ ...pre, fullName: '' }));

    // Validate phone
    if (!registerForm.phone.trim()) {
      setError(pre => ({ ...pre, phone: 'Số điện thoại không được để trống' }));
      return;
    }
    if (!/^\d{10,11}$/.test(registerForm.phone)) {
      setError(pre => ({ ...pre, phone: 'Số điện thoại không hợp lệ, phải có 10-11 chữ số' }));
      return;
    }
    setError(pre => ({ ...pre, phone: '' }));

    // Validate birthday
    if (!registerForm.birthday.trim()) {
      setError(pre => ({ ...pre, birthday: 'Ngày sinh không được để trống' }));
      return;
    }
    setError(pre => ({ ...pre, birthday: '' }));

    // Call API
    dispatch(registerUser(registerForm));
    navigate("/login");
  };
  return (
    <Container className="login-container my-5">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Form className="login-form p-4 rounded" onSubmit={handleSubmitForm}>
            <h2 className="text-center mb-4">Register Form</h2>
            <Form.Group controlId="formUsername">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" placeholder="Enter email" value={registerForm.email} name="email" onChange={handleInput} />
              {
                error.email && <Form.Text className="text-danger">
                  {error.email}
                </Form.Text>
              }
            </Form.Group>

            <Form.Group controlId="formPasswordConfirm" className="mt-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm password" value={registerForm.passwordConfirm} name="passwordConfirm" onChange={handleInput} />
              {
                error.passwordConfirm && <Form.Text className="text-danger">
                  {error.passwordConfirm}
                </Form.Text>
              }
            </Form.Group>

            <Form.Group controlId="formFullName" className="mt-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter full name" value={registerForm.fullName} name="fullName" onChange={handleInput} />
              {
                error.fullName && <Form.Text className="text-danger">
                  {error.fullName}
                </Form.Text>
              }
            </Form.Group>

            <Form.Group controlId="formPhone" className="mt-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" placeholder="Enter phone" value={registerForm.phone} name="phone" onChange={handleInput} />
              {
                error.phone && <Form.Text className="text-danger">
                  {error.phone}
                </Form.Text>
              }
            </Form.Group>

            <Form.Group controlId="formBirthday" className="mt-3">
              <Form.Label>Birthday</Form.Label>
              <Form.Control type="date" placeholder="Enter birthday" value={registerForm.birthday} name="birthday" onChange={handleInput} />
              {
                error.birthday && <Form.Text className="text-danger">
                  {error.birthday}
                </Form.Text>
              }
            </Form.Group>


            <Button variant="primary" type="submit" className="w-100 mt-4">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;


