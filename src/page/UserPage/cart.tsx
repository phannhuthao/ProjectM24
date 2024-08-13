import React, { useEffect, useMemo, useState } from 'react';
import { Button, Container, Navbar, Nav, Form, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faHeart, faDoorClosed, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { fetchAllCart, deleteCartItem, deleteAllCartItems, updateProductCart } from '../../store/slice/cartSlice';
import { fetchAllProduct } from '../../store/slice/productSlice';

export const formatVND = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const Carts = () => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cart } = useSelector((state: RootState) => state.cart);
  const { products } = useSelector((state: RootState) => state.product);
  const { userLogin } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (userLogin) {
      dispatch(fetchAllCart(userLogin.id));
      dispatch(fetchAllProduct());
    } else {
      navigate('/login');
    }
  }, [userLogin, dispatch, navigate]);

  const listCart = useMemo(() => {
    return cart.map((c) => {
      return {
        product: products.find(p => p.id === c.productId),
        quantity: c.quantity
      };
    });
  }, [cart, products]);

  const handleDelete = (cartItemId: number) => {
    dispatch(deleteCartItem(cartItemId));
  };

  const handleDeleteAll = () => {
    if (userLogin) {
      dispatch(deleteAllCartItems(userLogin.id));
    }
  };

  const handleCheckboxChange = (productId: number) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const handleQuantityChange = (productId: number, change: number) => {
    const item = listCart.find(item => item.product?.id === productId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        dispatch(updateProductCart({ productId, quantity: newQuantity, userId: userLogin?.id! }));
      }
    }
  };

  const totalCurrent = listCart.reduce((total, item) => {
    const productId = item.product?.id;
    const productPrice = item.product?.price;
  
    if (productId !== undefined && productPrice !== undefined && selectedItems.includes(productId)) {
      return total + (Number(productPrice) * item.quantity);
    }
  
    return total;
  }, 0);

  const handleBuy = () => {
    if (selectedItems.length === 0) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
      // Handle the buy logic here
    }
  };

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
        <Button variant="outline-secondary" onClick={handleDeleteAll} style={{ marginRight: '10px' }}>Delete All</Button>
        <Button variant="outline-secondary" onClick={handleBuy} style={{ marginRight: '10px' }}>Buy</Button>
        {showAlert && <Alert variant="danger">Bạn chưa chọn sản phẩm để mua</Alert>}
        <h1>Giỏ hàng</h1>
        <div className="row">
          {listCart.map((item) => (
            <div key={item.product?.id} className="col-md-3 mb-4">
              <div className="card">
                <img 
                  src={item.product?.image} 
                  className="card-img-top" 
                  alt={item.product?.name} 
                  style={{ width: '100%', height: '400px', objectFit: 'cover' }} 
                />
                <div className="card-body">
                  <h5 className="card-title">{item.product?.name}</h5>
                  <p className="card-text">Price: {formatVND.format(Number(item.product?.price))}</p>
                  <div className="d-flex align-items-center justify-content-between">
                    <Button variant="outline-secondary" onClick={() => handleQuantityChange(item.product?.id!, -1)}disabled={item.quantity <= 1}>-</Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button variant="outline-secondary" style={{marginRight: '10px'}} onClick={() => handleQuantityChange(item.product?.id!, 1)}>+</Button>
                    <Button 
                      variant="outline-secondary" 
                      onClick={() => handleDelete(item.product?.id!)}
                    >
                      Delete
                    </Button>
                    <div style={{ display: "flex", justifyContent: "flex-end", flexGrow: 1 }}>
                      <input 
                        type="checkbox" 
                        style={{ transform: 'scale(2.5)' }} 
                        onChange={() => handleCheckboxChange(item.product?.id!)}
                      />
                    </div>
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
