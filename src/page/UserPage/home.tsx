import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form, Navbar, Nav, NavDropdown, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faHeart, faDoorClosed, faUser } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCart } from '../../store/slice/cartSlice';
import { instance } from '../../service';
import { updateWishlist } from '../../store/slice/wishlistSlice';

// Định dạng tiền tệ Việt Nam
export const formatVND = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
  quantity: number;
}

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);
  const { cart } = useSelector((state: RootState) => state.cart);
  const {wishlist} = useSelector((state: RootState) => state.wishlist); 
  const { userLogin } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

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
    if (userLogin) {
      dispatch(fetchAllCart(userLogin.id));
    }
  }, [userLogin, dispatch]);

  const addToCart = (productId: number) => {
    let index = cart.findIndex((item) => item.productId === productId);
    if (index === -1) {
        let cartItem = { productId: productId, quantity: 1 };
        instance.patch(`/users/${userLogin?.id}`, { carts: [...cart, cartItem] });
        alert('Sản phẩm đã được thêm vào giỏ hàng');
    } else {
        let newCart = cart.map((item, i) => {
            if (i === index) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        instance.patch(`/users/${userLogin?.id}`, { carts: [...newCart] });
        alert('Sản phẩm đã được thêm vào giỏ hàng');
    }
    dispatch(fetchAllCart(userLogin?.id));
};

const addToWishlist = (productId: number) => {
  let checkExist = wishlist.some(item => item === productId);
  if (checkExist) {
      alert('Sản phẩm đã có trong danh sách yêu thích');
  } else {
      let newWishList = [...wishlist, productId];
      dispatch(updateWishlist({ userId: userLogin?.id, wishlist: newWishList }));
      alert('Sản phẩm đã được thêm vào phần yêu thích');
  }
};

const logOut = () => {
  console.log('User logged out');
  navigate('/login'); 
};


  

  const ProductList = ({ products, title }: { products: Product[], title: string }) => (
    <>
      <h1 style={{ textAlign: 'center' }}>{title}</h1>
      <div className="renderInformationProduct container my-4">
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-md-3 mb-4">
              <div className="card" style={{ cursor: 'pointer' }}>
                <Link to={`/productDetail/${product.id}`}>
                  <img src={product.image} className="card-img-top" alt={product.name} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">Price: {formatVND.format(Number(product.price))}</p>
                  <Button variant="outline-secondary" style={{ marginRight: '10px' }} onClick={() => addToCart(product.id)}>Buy</Button>
                  <Button variant="outline-secondary" style={{ marginRight: '10px' }} onClick={() => addToCart(product.id)}>Add to Cart</Button>
                  <Button variant="outline-secondary" style={{ marginRight: '10px' }} onClick={()=> addToWishlist(product.id)}>
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
                <NavDropdown title="Form" id="navbarScrollingDropdown" className="mx-2">
                  <NavDropdown.Item href="#"> <Link to={'/formContact'} style={{ textDecoration: 'none', color: 'black' }}>Form Contact</Link></NavDropdown.Item>
                  <NavDropdown.Item href="#"> <Link to={'/customerSuveyForm'} style={{ textDecoration: 'none', color: 'black' }}>Customer Survey Form</Link></NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">Something selection here</NavDropdown.Item>
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

              <Nav.Link href="#"  className="d-flex align-items-center ms-3">
                <Link to={'/heart'}>
                  <FontAwesomeIcon icon={faHeart} size="lg" />
                </Link>
              </Nav.Link>

              <Nav.Link href="#"className="d-flex align-items-center ms-3">
                <FontAwesomeIcon icon={faDoorClosed} size="lg" onClick={()=> logOut}  />
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

      <main className="flex-grow-1 d-flex justify-content-center align-items-center mb-4">
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

      <div className="mb-4">
        <img src='https://cuahangsamsung.vn/filemanager/userfiles/hinh-san-pham/banner/samsung-banner-dien-thoai.png' style={{ width: "100%", height: "210px" }} alt="Samsung Banner" />
      </div>

      <ProductList products={products.filter(product => product.name.includes('Samsung')).slice(0, 4)} title="Samsung" />

      <div className="mb-4">
        <img src='https://file.hstatic.net/1000379731/file/anh_chup_man_hinh_2021-09-15_luc_13.47.01_9e87534e281b4aeebbb8e7e5dccfc632.png' style={{ width: "100%", height: "210px" }} alt="Iphone Banner" />
      </div>

      <ProductList products={products.filter(product => product.name.includes('Iphone')).slice(0, 4)} title="Iphone" />

      <div className="mb-4">
        <img src='https://cdn-media.sforum.vn/storage/app/media/wp-content/uploads/2019/05/OPPO-A9-face.png' style={{ width: "100%", height: "210px" }} alt="OPPO Banner" />
      </div>

      <ProductList products={products.filter(product => product.name.includes('OPPO')).slice(0, 4)} title="OPPO" />

      <div className="mb-4">
        <img src='https://cdn.tgdd.vn/hoi-dap/1355217/banner-tgdd-800x300.jpg' style={{ width: "100%", height: "210px" }} alt="OPPO Banner" />
      </div>

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
