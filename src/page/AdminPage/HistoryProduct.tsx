import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { formatVND } from '../../confirg';

const HistoryProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderDetails = location.state as {
    selectedItems: number[];
    cart: Array<{ product: { id: number; name: string; image: string; price: number } | undefined; quantity: number }>;
    totalAmount: number;
    voucher: string;
    paymentMethod: string;
    address: string;
  };

  const handleApprove = () => {
    alert('Sản phẩm đã được duyệt');
    // Redirect to Home
    navigate('/home');
  };

  const handleReject = () => {
    alert('Sản phẩm không được bán');
    // Redirect to Home
    navigate('/home');
  };

  return (
    <div>
      <h1>Trang quản lí lịch sử mua hàng</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Address</th>
            <th>Voucher</th>
            <th>Hình Thức Thanh Toán</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.cart.map((item, index) => (
            <tr key={item.product?.id}>
              <td>{index + 1}</td>
              <td>{item.product?.name}</td>
              <td><img src={item.product?.image} alt={item.product?.name} style={{ width: '100px', height: 'auto' }} /></td>
              <td>{formatVND.format(Number(item.product?.price))}</td>
              <td>{item.quantity}</td>
              <td>{orderDetails.address}</td>
              <td>{orderDetails.voucher}</td>
              <td>{orderDetails.paymentMethod}</td>
              <td>
                <Button variant="success" onClick={handleApprove}>Approve</Button>
              </td>
              <td>
                <Button variant="danger" onClick={handleReject}>Reject</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h4>Total Amount: {formatVND.format(orderDetails.totalAmount)}</h4>
    </div>
  );
};

export default HistoryProduct;
