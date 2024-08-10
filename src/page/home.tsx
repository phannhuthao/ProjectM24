import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faHeart, faDoorClosed, faUser } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
  price: string;
}

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:9999/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Lỗi', error);
      }
    };
    fetchProducts();
  }, []);

  const ProductList = ({ products, title }: { products: Product[], title: string }) => (
    <>
      <h1 style={{ textAlign: 'center' }}>{title}</h1>
      <div className="renderInformationProduct container my-4">
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-md-3 mb-4">
              <div className="card" style={{ cursor: 'pointer' }}>
                <img src={product.image} className="card-img-top" alt={product.name} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">Price: {formatVND.format(Number(product.price))}</p>
                  <Button variant="outline-secondary" style={{ marginRight: '10px'}}>Buy</Button>
                  <Button variant="outline-secondary" style={{ marginRight: '10px'}} onClick={() => addToCart(product)}>Add to Cart</Button>
                  <Button variant="outline-secondary" style={{ marginRight: '10px' }} onClick={() => addToWishlist(product)}>
                      <FontAwesomeIcon icon={faHeart} size="lg" />
                 </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const addToCart = (product: Product) => {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingProductIndex = cart.findIndex((item: Product) => item.id === product.id);
    if (existingProductIndex >= 0) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const addToWishlist = (product: Product) => {
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const existingProductIndex = wishlist.findIndex((item: Product) => item.id === product.id);
  
    if (existingProductIndex === -1) {
      wishlist.push(product); 
    }
  
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  };
  

  const contentStyle: React.CSSProperties = {
    height: '380px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    width: '100%',
    objectFit: 'cover',
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
                  <Link to={'/formContact'} style={{ textDecoration: 'none', color: 'black' }}>From Contact</Link>
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

      <main className="flex-grow-1 d-flex justify-content-center align-items-center">
        <div className="w-75">
          <Carousel autoplay>
            <div>
              <img src="https://mtsmart.vn/uploads/blog/nhung-ung-dung-thay-doi-hinh-nen-tu-dong-tren-dien-thoai-android-tot-nhat-ban-nen-thu-240108023951.jpg" alt="Image 1" style={contentStyle} />
            </div>
            <div>
              <img src="https://cdn.tgdd.vn/Files/2022/08/17/1456871/cach-tao-slideshow-tren-iphone-thumb.jpg" alt="Image 2" style={contentStyle} />
            </div>
            <div>
              <img src="https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/162630/Originals/Animoto.jpg" alt="Image 3" style={contentStyle} />
            </div>
            <div>
              <img src="https://cdn.tgdd.vn/Files/2019/03/29/1157561/f11-pro-black-carousel-1_800x450.jpg" alt="Image 4" style={contentStyle} />
            </div>
          </Carousel>
        </div>
      </main>

      <ProductList products={products.filter(product => product.name.includes('Samsung')).slice(0, 4)} title="Samsung" />
      <ProductList products={products.filter(product => product.name.includes('Iphone')).slice(0, 4)} title="Iphone" />
      <ProductList products={products.filter(product => product.name.includes('OPPO')).slice(0, 4)} title="OPPO" />
      <ProductList products={products.slice(0, 4)} title="Sản phẩm bán chạy" />

      <footer className="page-footer bg-dark text-white font-small blue pt-4 mt-auto">
        <div className="container-fluid text-center text-md-left">
          <div className="row">
            <div className="col-md-4 mt-md-0 mt-3">
              <h5 className="text-uppercase">EYYO Shop</h5>
              <p>Specializing in selling cheap watches.</p>
              <p>Good quality products, top reputation.</p>
            </div>

            <div className="col-md-2 mb-md-0 mb-3">
              <h5 className="text-uppercase">Sản phẩm nổi bật</h5>
              <ul className="list-unstyled">
                <li><p>Samsung</p></li>
                <li><p>Iphone</p></li>
                <li><p>Oppo</p></li>
              </ul>
            </div>

            <div className="col-md-2 mb-md-0 mb-3">
              <h5 className="text-uppercase">Dịch vụ khách hàng</h5>
              <ul className="list-unstyled">
                <li><p>Chế độ bảo hành</p></li>
                <li><p>Dịch vụ sửa chữa</p></li>
                <li><p>Dịch vụ đổi mới</p></li>
              </ul>
            </div>

            <div className="col-md-2 mb-md-0 mb-3">
              <h5 className="text-uppercase">Liên Hệ</h5>
              <ul className="list-unstyled">
                <li><p>0862536828</p></li>
                <li><p>EYYO@gmail.com</p></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};



export default HomePage;
