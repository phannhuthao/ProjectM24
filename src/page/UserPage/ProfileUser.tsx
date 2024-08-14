import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, updateUser } from '../../store/slice/userSlice';
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faHeart, faDoorClosed, faUser, faHome, faHistory } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { RootState } from '../../store';

const ProfileUser = () => {
  const dispatch = useDispatch();
  const { userInfo, isLoading, error } = useSelector((state: RootState) => state.user);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    birthday: ''
  });

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (userInfo) {
      setFormData({
        fullName: userInfo.fullName || '',
        email: userInfo.email || '',
        password: '', // Keep password empty initially
        phone: userInfo.phone || '',
        birthday: userInfo.birthday || ''
      });
    }
  }, [userInfo]);

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUser(formData))
      .unwrap()
      .then((updatedUser: any) => {
        // Update localStorage after successful update
        localStorage.setItem('fullName', updatedUser.fullName);
        localStorage.setItem('email', updatedUser.email);
        localStorage.setItem('phone', updatedUser.phone);
        localStorage.setItem('birthday', updatedUser.birthday);

        // Optionally update the Redux state if needed
        dispatch(fetchUser());

        setEditMode(false);
      })
      .catch((err: any) => {
        console.error("Failed to update user: ", err);
      });
  };

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
          {editMode ? (
            <Form onSubmit={handleSubmit} className="border p-4 rounded bg-light">
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Birthday</Form.Label>
                <Form.Control
                  type="text"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">Save</Button>
              <Button variant="secondary" onClick={handleEditClick} className="ms-2">Cancel</Button>
            </Form>
          ) : (
            <div className="border p-4 rounded bg-light">
              <p>Name: {userInfo?.fullName}</p>
              <p>Email: {userInfo?.email}</p>
              <p>Password: {'********'}</p>
              <p>Phone: {userInfo?.phone}</p>
              <p>Birthday: {userInfo?.birthday}</p>
              <Button variant="primary" onClick={handleEditClick}>Edit</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
