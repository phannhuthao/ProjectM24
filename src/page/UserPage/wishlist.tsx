import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Navbar, Nav, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faHeart, faDoorClosed, faUser } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ProductType } from '../../confirg/interface';
import { fetchAllWishList } from '../../store/slice/wishlistSlice';
import { fetchAllProduct } from '../../store/slice/productSlice';



interface Product {
  id: string;
  name: string;
  image: string;
  price: string;
}

// hàm định dạng tiền tệ VNĐ
export const formatVND = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const Wishlist = () => {
  const {wishlist} = useSelector((state: RootState) => state.wishlist); 
  const {products} = useSelector((state: RootState) => state.product); 
  const {userLogin} = useSelector((state: RootState) => state.user); 

  const dispatch = useDispatch();
console.log(wishlist);

  const list  = useMemo(()=>{
    return wishlist.map(item=>products.find(p=>p.id==item)) 
  },[wishlist,products])
console.log(list);


  const handleDeleteOneProduct = (id: number) => {
   
  };

  const handleDeleteAll = () => {
   
  };
  useEffect(()=>{
    dispatch(fetchAllWishList(userLogin?.id))
    dispatch(fetchAllProduct())
  },[])

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
                  <Link to={'/formContact'} style={{ textDecoration: 'none', color: 'black' }}>From Contact</Link>
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
        <Button variant="outline-secondary" onClick={handleDeleteAll}>Delete All</Button>
        <h1>Yêu thích</h1>
        <div className="row">
          {wishlist.length === 0 ? (
            <p>No items in wishlist</p>
          ) : (
            list.map((item) => ( item &&
              <div key={item.id} className="col-md-3 mb-4">
                <div className="card">
                  <img src={item.image} className="card-img-top" alt={item.name} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">Price:{formatVND.format(Number(item.price))}</p>
                    <div className="d-flex align-items-center">
                      <Button variant="outline-secondary" style={{ marginRight: '30px' }} onClick={() => handleDeleteOneProduct(item.id)}>Delete</Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Container>
    </div>
  );
};

export default Wishlist;
