import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../store/slice/userSlice';
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faHeart, faDoorClosed, faUser, faHome, faHistory } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { RootState } from '../../store';

interface User {
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
}

const ProfileUser = () => {
  const dispatch = useDispatch();
  const { userLogin, isLoading, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const user = userLogin && typeof userLogin === 'object' && 'name' in userLogin ? (userLogin as User) : null;

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand><Link to={'/home'} style={{ textDecoration: 'none', color:'black' }}>Ohayo</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0 d-flex justify-content-between w-100" navbarScroll>
              <div className="d-flex">
                <Nav.Link href="#" className="mx-2">Product</Nav.Link>
                <Nav.Link href="#action2" className="mx-2">From Contact</Nav.Link>
                <NavDropdown title="Selection" id="navbarScrollingDropdown" className="mx-2">
                  <NavDropdown.Item href="">Action</NavDropdown.Item>
                  <NavDropdown.Item href="">Another action</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="">Something else here</NavDropdown.Item>
                </NavDropdown>
              </div>
              <Form className="d-flex mx-auto">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-primary">Search</Button>
              </Form>
              <Nav.Link href="#" className="d-flex align-items-center ms-3">
                <Link to={'/cart'}><FontAwesomeIcon icon={faBagShopping} size="lg" /></Link>
              </Nav.Link>
              <Nav.Link href="#" className="d-flex align-items-center ms-3">
                <Link to={'/heart'}><FontAwesomeIcon icon={faHeart} size="lg" /></Link>
              </Nav.Link>
              <Nav.Link href="#" className="d-flex align-items-center ms-3">
                <Link to={'/login'}><FontAwesomeIcon icon={faDoorClosed} size="lg" /></Link>
              </Nav.Link>
              <Nav.Link href="#" className="d-flex align-items-center ms-3">
                <Link to={'/profile'}><FontAwesomeIcon icon={faUser} size="lg" /></Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Sidebar */}
      <div className="d-flex flex-grow-1">
        <div className="sidebar bg-dark text-white d-flex flex-column p-3" style={{ width: '250px' }}>
          <h4 className="mb-4">Menu</h4>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <Link to="/" className="nav-link text-white">
                <FontAwesomeIcon icon={faHome} /> About
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/about" className="nav-link text-white">
                <FontAwesomeIcon icon={faHistory} /> History
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex-grow-1 d-flex flex-column p-4">
          <h2>User Profile</h2>
          {isLoading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {user ? (
            <div>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Password: {user.password}</p>
              <p>Phone: {user.phone}</p>
              <p>Birthday: {user.birthday}</p>
            </div>
          ) : (
            <p>No user information found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
