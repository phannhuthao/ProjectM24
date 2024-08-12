import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Navbar, Nav, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faHeart, faDoorClosed, faUser } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  image: string;
  price: string;
  quantity: number;
}

export const formatVND = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const Carts = () => {
  const [cart, setCart] = React.useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = React.useState<string[]>([]);
  const [totalCurrent, setTotalCurrent] = React.useState<number>(0);
  const navigate = useNavigate();

  React.useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  const handleQuantityChange = (id: string, delta: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((product) => 
        product.id === id ? { ...product, quantity: Math.max(1, product.quantity + delta) } : product
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleDeleteOneProduct = (id: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((product) => product.id !== id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
    setSelectedProducts((prevSelected) => prevSelected.filter((productId) => productId !== id));
  };

  const handleDeleteAll = () => {
    setCart([]);
    localStorage.removeItem('cart');
    setSelectedProducts([]);
  };

  const handleSelectionProduct = (id: string) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((productId) => productId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const handleBuyProduct = () => {
    if (selectedProducts.length === 0) {
      alert("Bạn chưa chọn sản phẩm bạn muốn mua trong giỏ hàng");
      return;
    }

    const productsToBuy = cart.filter(product => selectedProducts.includes(product.id));
    localStorage.setItem('productsToBuy', JSON.stringify(productsToBuy));
    navigate('/buy');
  };

  React.useEffect(() => {
    const total = cart
      .filter((product) => selectedProducts.includes(product.id))
      .reduce((acc, product) => acc + Number(product.price) * product.quantity, 0);
    setTotalCurrent(total);
  }, [selectedProducts, cart]);

  return (
    <div className="d-flex flex-column min-vh-100">
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

              <Nav.Link href="#" className="d-flex align-items-center ms-3">
                <Link to={'/cart'}> <FontAwesomeIcon icon={faBagShopping} size="lg" /></Link>
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

      <Container className="my-4">
        <Button variant="outline-secondary" onClick={handleDeleteAll}  style={{marginRight: '10px'}}>Delete All</Button>
        <Button variant="outline-secondary" onClick={handleBuyProduct} style={{marginRight: '10px'}}>Buy</Button>
        <h1>Giỏ hàng</h1>
        <div className="row">
          {cart.map((item) => (
            <div key={item.id} className="col-md-3 mb-4">
              <div className="card">
                <img src={item.image} className="card-img-top" alt={item.name} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">Price: {formatVND.format(Number(item.price))}</p>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <Button variant="outline-secondary" onClick={() => handleQuantityChange(item.id, -1)}>-</Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button variant="outline-secondary" style={{ marginRight: '10px' }} onClick={() => handleQuantityChange(item.id, 1)}>+</Button>
                      <Button variant="outline-secondary" style={{ marginRight: '30px' }} onClick={() => handleDeleteOneProduct(item.id)}>Delete</Button>
                    </div>
                    <input
                      type='checkbox'
                      style={{ transform: 'scale(1.5)', marginLeft: 'auto' }}
                      onChange={() => handleSelectionProduct(item.id)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <p>Total current: {formatVND.format(totalCurrent)}</p>
        </div>
      </Container>
    </div>
  );
};

export default Carts;
