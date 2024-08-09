import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faHeart, faDoorClosed, faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Pagination } from 'antd';

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

// Render product list
const ProductList = ({ products, title }: { products: Product[], title: string }) => (
    <>
      <h1 style={{ textAlign: 'center' }}>{title}</h1>
      <div className="renderInformationProduct container my-4">
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-md-3 mb-4">
              <Link to={'/productdetail'} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card" style={{ cursor: 'pointer' }}>
                  <img src={product.image} className="card-img-top" alt={product.name} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">Price: {formatVND.format(Number(product.price))}</p>
                    <div className="d-flex">
                      <Button variant="outline-secondary" style={{ marginRight: '10px' }}>Mua</Button>
                      <Button variant="outline-secondary" style={{ marginRight: '10px' }}>
                        <FontAwesomeIcon icon={faBagShopping} size="lg" />
                      </Button>
                      <Button variant="outline-secondary">
                        <FontAwesomeIcon icon={faHeart} size="lg" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
  

const Product = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:9999/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

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

            <ProductList products={currentProducts} title="All Products" />

            <Container className="d-flex justify-content-center my-4">
                <Pagination
                    current={currentPage}
                    onChange={handlePageChange}
                    total={products.length}
                    pageSize={itemsPerPage}
                    showSizeChanger={false}
                />
            </Container>
        </>
    );
};

export default Product;
