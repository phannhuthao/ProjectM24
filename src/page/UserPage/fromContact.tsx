import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faHeart, faDoorClosed, faUser } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Link } from 'react-router-dom';

const FormContact = () => {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand>
            <Link to='/home' style={{ textDecoration: 'none', color: 'black' }}>EYYO</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0 d-flex justify-content-between w-100" navbarScroll>
              <div className="d-flex">
                <Nav.Link href="#" className="mx-2">
                  <Link to='/product' style={{ textDecoration: 'none', color: 'black' }}>Product</Link>
                </Nav.Link>
                <Nav.Link href="#action2" className="mx-2">
                  <Link to='/formContact' style={{ textDecoration: 'none', color: 'black' }}>Form Contact</Link>
                </Nav.Link>
                <NavDropdown title="Selection" id="navbarScrollingDropdown" className="mx-2">
                  <NavDropdown.Item href="#action3">Selection</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                </NavDropdown>
              </div>
              <Form className="d-flex mx-auto">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button className='btn-search' variant="outline-primary">Search</Button>
              </Form>

              <Nav.Link href="#" className="d-flex align-items-center ms-3">
                <Link to='/cart'>
                  <FontAwesomeIcon icon={faBagShopping} size="lg" />
                </Link>
              </Nav.Link>

              <Nav.Link href="#" className="d-flex align-items-center ms-3">
                <Link to='/heart'>
                  <FontAwesomeIcon icon={faHeart} size="lg" />
                </Link>
              </Nav.Link>

              <Nav.Link href="#" className="d-flex align-items-center ms-3">
                <Link to='/login'>
                  <FontAwesomeIcon icon={faDoorClosed} size="lg" />
                </Link>
              </Nav.Link>

              <Nav.Link href="#" className="d-flex align-items-center ms-3">
                <Link to='/profile'>
                  <FontAwesomeIcon icon={faUser} size="lg" />
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container my-4">
        <h1 style={{ textAlign: "center" }}>Liên Hệ với Chúng tôi:</h1>
        <div className="row">
          <div className="col-md-6">
            <div className="map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.129625293334!2d106.6990183152608!3d10.776889092313494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528c11455aa5b%3A0x577e8d36fb6a40e5!2sBitexco%20Financial%20Tower!5e0!3m2!1sen!2s!4v1615361635406!5m2!1sen!2s"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
          <div className="col-md-6">
            <div className="contact-form">
              <form action="submit_form.php" method="post">
                <p className="tittle">
                  <i className="fa fa-location-arrow" aria-hidden="true" /> 77 Lê Trung Nghĩa, Phường 12, đường An Bình, Quận Tân Bình, TP.HCM
                </p>
                <p className="tittle">
                  <i className="fa fa-phone" aria-hidden="true" /> 0962345892
                </p>
                <p className="tittle">
                  <i className="fa fa-envelope" aria-hidden="true" /> EYYO@gmail.com
                </p>
              </form>
              <form action="submit_form.php" method="post">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Họ và tên"
                  required
                  className="form-control mb-3"
                />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="form-control mb-3"
                />
                <textarea
                  id="message"
                  name="message"
                  placeholder="Nội dung tin nhắn"
                  required
                  className="form-control mb-3"
                />
                <Button type="submit" variant="primary">Gửi</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormContact;
