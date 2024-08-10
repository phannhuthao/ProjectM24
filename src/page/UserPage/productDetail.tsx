import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faHeart, faDoorClosed, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


interface Product {
    id: string;
    name: string;
    image: string;
    price: string;
    description: string,
    quantity: number
  }
const ProductDetail = () => {
    const renderInformationProductDetail = ({ products, title }: { products: Product[], title: string }) => {
        {products.map((product) => {
            <div className='body'>
                <h5>{product.name}</h5>
                <h1>{product.image}</h1>
                <p>{product.price}</p>
                <p>{product.quantity}</p>
                <p>{product.description}</p>
            </div>
        }

        )}


    }
  return (
    <div>
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand> <Link to={'/home'} style={{ textDecoration: 'none', color: 'black' }}>EYYO</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0 d-flex justify-content-between w-100" navbarScroll>
              <div className="d-flex">
                <Nav.Link href="#" className="mx-2"><Link to={'/product'} style={{ textDecoration: 'none', color: 'black' }}>Product</Link></Nav.Link>
                <Nav.Link href="#action2" className="mx-2"><Link to={'/formContact'} style={{ textDecoration: 'none', color: 'black' }}>From Contact</Link></Nav.Link>
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
                <Button className='btn-sreach' variant="outline-primary">Search</Button>
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


      <h1 style={{textAlign: "center"}}>Thông tin chi tiết sản phẩm</h1>


    </div>
  )
}

export default ProductDetail
