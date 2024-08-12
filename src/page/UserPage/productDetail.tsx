import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faHeart, faDoorClosed, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

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
  description: string;
  quantity: number;
}

interface Comment {
  id: string;
  content: string;
  timestamp: number;
  username: string; // Ensure username is stored here
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState<Comment | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy chi tiết sản phẩm:', error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchComments = () => {
      let storedComments = JSON.parse(localStorage.getItem('comments') || '[]');
      setComments(storedComments);
    };
    fetchComments();
  }, [id]);

  const addToCart = (product: Product) => {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingProductIndex = cart.findIndex((item: Product) => item.id === product.id);
    if (existingProductIndex >= 0) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Sản phẩm đã được thêm vào giỏ hàng');
  };

  const addToWishlist = (product: Product) => {
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const existingProductIndex = wishlist.findIndex((item: Product) => item.id === product.id);
  
    if (existingProductIndex === -1) {
      wishlist.push(product);
    }
  
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    alert('Sản phẩm đã được thêm vào phần yêu thích');
  };


  const handleAddComment = () => {
    if (!newComment) return;
  
    const usersData = localStorage.getItem('users');
    const users = usersData ? JSON.parse(usersData) : {};
    const fullName = users.fullName || "Unknow User";
  
    const newCommentObj: Comment = {
      id: Date.now().toString(),
      content: newComment,
      timestamp: Date.now(),
      username: fullName, 
    };
  
    let storedComments = JSON.parse(localStorage.getItem('comments') || '[]');
    storedComments.push(newCommentObj);
    localStorage.setItem('comments', JSON.stringify(storedComments));
    setComments(storedComments);
    setNewComment('');
  };
  
  

  const handleEditComment = (comment: Comment) => {
    setEditingComment(comment);
    setNewComment(comment.content);
  };

  const handleSaveEditComment = () => {
    if (!editingComment || !newComment) return;

    let storedComments = JSON.parse(localStorage.getItem('comments') || '[]');
    const updatedComments = storedComments.map((comment: Comment) =>
      comment.id === editingComment.id
        ? { ...comment, content: newComment, timestamp: Date.now() }
        : comment
    );
    localStorage.setItem('comments', JSON.stringify(updatedComments));
    setComments(updatedComments);
    setEditingComment(null);
    setNewComment('');
  };

  const handleDeleteComment = (id: string) => {
    let storedComments = JSON.parse(localStorage.getItem('comments') || '[]');
    const filteredComments = storedComments.filter((comment: Comment) => comment.id !== id);
    localStorage.setItem('comments', JSON.stringify(filteredComments));
    setComments(filteredComments);
  };

  if (!product) {
    return <p>Loading...</p>;
  }

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

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto' }} />
          </div>
          <div className="col-md-6">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: {formatVND.format(Number(product.price))}</p>
            <p>Quantity: {product.quantity}</p>
            <Button variant="outline-secondary" style={{ marginRight: '10px' }}>Buy</Button>
            <Button variant="outline-secondary" style={{ marginRight: '10px' }} onClick={() => addToCart(product)}>Add to Cart</Button>
            <Button variant="outline-secondary" style={{ marginRight: '10px' }} onClick={() => addToWishlist(product)}>
              <FontAwesomeIcon icon={faHeart} size="lg" />
            </Button>
          </div>
        </div>

        <div className="mt-5">
          <h3>Comments</h3>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment"
            />
            {editingComment ? (
              <Button variant="primary" onClick={handleSaveEditComment} className="mt-2">Save</Button>
            ) : (
              <Button variant="primary" onClick={handleAddComment} className="mt-2">Add Comment</Button>
            )}
          </Form.Group>
          <ul className="list-unstyled">
            {comments.map(comment => (
              <li key={comment.id} className="mb-3">
                <p><strong>{comment.username}</strong>: {comment.content}</p> {/* Hiển thị tên người dùng */}
                <small>Posted on: {new Date(comment.timestamp).toLocaleString()}</small>
                <div className="mt-2">
                  <Button variant="warning" onClick={() => handleEditComment(comment)} className="me-2">Edit</Button>
                  <Button variant="danger" onClick={() => handleDeleteComment(comment.id)}>Delete</Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

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
    </>
  );
};

export default ProductDetail;
