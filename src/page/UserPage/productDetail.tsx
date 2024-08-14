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
  fullName: string;
}

const StarRating: React.FC<{ productId: string }> = ({ productId }) => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);

  useEffect(() => {
    const storedRating = JSON.parse(localStorage.getItem(`rating-${productId}`) || '0');
    setRating(storedRating);
  }, [productId]);

  const handleRating = (rate: number) => {
    setRating(rate);
    localStorage.setItem(`rating-${productId}`, JSON.stringify(rate));
  };

  return (
    <div>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <Button
            key={index}
            className="btn btn-link"
            style={{ color: index <= (hover || rating) ? "#ffc107" : "#e4e5e9" }}
            onClick={() => handleRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            &#9733;
          </Button>
        );
      })}
      <p>Bạn đánh giá: {rating} out of 5</p>
    </div>
  );
};

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
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/comments?productId=${id}`);
        setComments(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy bình luận:', error);
      }
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

  const handleAddComment = async () => {
    if (!newComment) return;

    const usersData = localStorage.getItem('users');
    const users = usersData ? JSON.parse(usersData) : {};
    const fullName = users.fullName || "Unknown User";

    const newCommentObj: Comment = {
      id: Date.now().toString(),
      content: newComment,
      timestamp: Date.now(),
      fullName: fullName,
    };

    try {
      const response = await axios.post('http://localhost:9999/comments', {
        ...newCommentObj,
        productId: id,
      });
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Lỗi khi thêm bình luận:', error);
    }
  };

  const handleEditComment = (comment: Comment) => {
    setEditingComment(comment);
    setNewComment(comment.content);
  };

  const handleSaveEditComment = async () => {
    if (!editingComment || !newComment) return;

    try {
      const response = await axios.put(`http://localhost:9999/comments/${editingComment.id}`, {
        ...editingComment,
        content: newComment,
        timestamp: Date.now(),
      });
      setComments(comments.map((comment) => comment.id === editingComment.id ? response.data : comment));
      setEditingComment(null);
      setNewComment('');
    } catch (error) {
      console.error('Lỗi khi chỉnh sửa bình luận:', error);
    }
  };

  const handleDeleteComment = async (id: string) => {
    try {
      await axios.delete(`http://localhost:9999/comments/${id}`);
      setComments(comments.filter((comment) => comment.id !== id));
    } catch (error) {
      console.error('Lỗi khi xóa bình luận:', error);
    }
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

              <Nav.Link href="#" style={{ color: "gray" }} className="d-flex align-items-center ms-3">
                <Link to={'/heart'}>
                  <FontAwesomeIcon icon={faHeart} size="lg" />
                </Link>
              </Nav.Link>

              <Nav.Link href="#" style={{ color: "gray" }} className="d-flex align-items-center ms-3">
                <Link to={'/login'}><FontAwesomeIcon icon={faDoorClosed} size="lg" /></Link>
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
      {/* Navbar and other elements remain unchanged */}

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
            
            {/* Star Rating Component */}
            <div className="mt-3">
              <h4>Đánh giá sản phẩm:</h4>
              <StarRating productId={product.id} />
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-4">
          <h4>Bình luận:</h4>
          <Form>
            <Form.Group controlId="newComment">
              <Form.Label>Viết bình luận của bạn</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </Form.Group>
            {editingComment ? (
              <Button onClick={handleSaveEditComment}>Lưu chỉnh sửa</Button>
            ) : (
              <Button onClick={handleAddComment}>Thêm bình luận</Button>
            )}
          </Form>
          <ul className="list-group mt-3">
            {comments.map((comment) => (
              <li key={comment.id} className="list-group-item">
                <p>{comment.content}</p>
                <small>Đăng bởi: {comment.fullName} lúc {new Date(comment.timestamp).toLocaleString()}</small>
                <div>
                  <Button variant="link" onClick={() => handleEditComment(comment)}>Chỉnh sửa</Button>
                  <Button variant="link" onClick={() => handleDeleteComment(comment.id)}>Xóa</Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer remains unchanged */}
    </>
  );
};

export default ProductDetail;
