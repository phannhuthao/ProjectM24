import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import { formatVND } from '../../confirg';
import { ProductType } from '../../confirg/interface';

const Buy = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedItems, cart } = location.state as { selectedItems: number[], cart: Array<{ product: ProductType | undefined, quantity: number }> };

  const [voucher, setVoucher] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [address, setAddress] = useState('');

  const selectedCartItems = cart.filter(item => selectedItems.includes(item.product?.id!));

  const totalAmount = selectedCartItems.reduce((total, item) => total + (Number(item.product?.price) * item.quantity), 0);

  const handleOrder = () => {
    const orderDetails = {
      selectedItems,
      cart: selectedCartItems,
      totalAmount,
      voucher,
      paymentMethod,
      address
    };

    // Navigate to HistoryProduct
    navigate('/home', { state: orderDetails });

  //   // Redirect to Home after some delay
  //   setTimeout(() => {
  //     navigate('/home');
  //   }, 2000); // Adjust the delay as needed
  };

  return (
    <Container className="my-4">
      <h1>Order Summary</h1>
      <Row>
        <Col md={6}>
          <h4>Product Images</h4>
          <Row>
            {selectedCartItems.map(item => (
              <Col md={4} key={item.product?.id} className="mb-4">
                <div className="card">
                  <img
                    src={item.product?.image}
                    className="card-img-top"
                    alt={item.product?.name}
                    style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={6}>
          <h4>Order Details</h4>
          {selectedCartItems.map(item => (
            <div key={item.product?.id} className="mb-2">
              <h5>{item.product?.name}</h5>
              <p>Price: {formatVND.format(Number(item.product?.price))}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Voucher</Form.Label>
              <Form.Control
                type="text"
                value={voucher}
                onChange={(e) => setVoucher(e.target.value)}
                placeholder="Enter voucher code"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Payment Method</Form.Label>
              <Form.Control
                as="select"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="">Select Payment Method</option>
                <option value="credit-card">Chuyển Khoản</option>
                <option value="cash">Thanh Toán Khi Nhận Hàng</option>  
              </Form.Control>
            </Form.Group>
          </Form>
          <h5>Total Amount: {formatVND.format(totalAmount)}</h5>
          <Button variant="primary" onClick={handleOrder}>Place Order</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Buy;
