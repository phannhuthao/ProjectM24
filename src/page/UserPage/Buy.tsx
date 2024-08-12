import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faHeart, faDoorClosed, faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Định dạng tiền tệ Việt Nam
export const formatVND = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  totalPrice: number; 
}

const Buy = () => {
  const [productsToBuy, setProductsToBuy] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('productsToBuy') || '[]') as Product[];
    setProductsToBuy(storedProducts);

    const total = storedProducts.reduce((acc: number, product: Product) => {
      return acc + product.totalPrice;
    }, 0);

    setTotalPrice(total);
  }, []);

  const handleConfirmPurchase = () => {
    localStorage.removeItem('cart');
    localStorage.removeItem('productsToBuy');
    navigate('/home'); 
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand>
            <Link to={'/home'} style={{ textDecoration: 'none', color: 'black' }}>EYYO</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0 d-flex justify-content-between w-100" navbarScroll>
              <div className="d-flex">
                <Nav.Link href="#" className="mx-2">
                  <Link to={'/product'} style={{ textDecoration: 'none', color: 'black' }}>Product</Link>
                </Nav.Link>
                <Nav.Link href="#action2" className="mx-2">
                  <Link to={'/formContact'} style={{ textDecoration: 'none', color: 'black' }}>Form Contact</Link>
                </Nav.Link>
                <NavDropdown title="Selection" id="navbarScrollingDropdown" className="mx-2">
                  <NavDropdown.Item href="#action3">Selection</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">Action</NavDropdown.Item>
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
                <Button className='btn-sreach' variant="outline-secondary">Search</Button>
              </Form>

              <Nav.Link href="#" style={{ color: "gray" }} className="d-flex align-items-center ms-3">
                <Link to={'/cart'}>
                  <FontAwesomeIcon icon={faBagShopping} size="lg" />
                </Link>
              </Nav.Link>

              <Nav.Link href="#" style={{ color: "gray" }} className="d-flex align-items-center ms-3">
                <Link to={'/heart'}>
                  <FontAwesomeIcon icon={faHeart} size="lg" />
                </Link>
              </Nav.Link>

              <Nav.Link href="#" style={{ color: "gray" }} className="d-flex align-items-center ms-3" >
                <FontAwesomeIcon icon={faDoorClosed} size="lg" />
              </Nav.Link>

              <Nav.Link href="#" style={{ color: "gray" }} className="d-flex align-items-center ms-3">
                <Link to={'/profile'}>
                  <FontAwesomeIcon icon={faUser} size="lg" />
                </Link>
              </Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="my-4">
        <h2 className="text-center mb-4">Thông tin sản phẩm mua</h2>
        {productsToBuy.map((product) => (
          <div key={product.id} className="row mb-4">
            <div className="col-md-6">
              <img src={product.image} alt={product.name} style={{ width: '100%', height: '680px', objectFit: 'cover' }} />
            </div>
            <div className="col-md-6">
              <h3>{product.name}</h3>
              <p>Price: {formatVND.format(product.price)}</p>
              <p>Quantity: {product.quantity}</p>
              <p>Total Price: {formatVND.format(product.totalPrice)}</p>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Phương thức thanh toán</Form.Label>
                  <Form.Control type="text" placeholder="Nhập phương thức thanh toán" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Voucher</Form.Label>
                  <Form.Control type="text" placeholder="Nhập mã voucher" />
                </Form.Group>
                <Button variant="primary" onClick={handleConfirmPurchase}>Thanh toán</Button>
              </Form>
            </div>
          </div>
        ))}
      </Container>
    </>
  );
};

export default Buy;
