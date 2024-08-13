import React from 'react';
import { Container, Row, Col, Card, ProgressBar } from 'react-bootstrap';
import { FaUsers, FaBox, FaTags, FaDollarSign } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const DashBoard = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Samsung',
        data: [35, 45, 60, 70, 50, 65, 80],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'iPhone',
        data: [40, 55, 75, 85, 60, 70, 90],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Oppo',
        data: [25, 35, 45, 55, 40, 50, 60],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const cardTitleStyle = {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    transition: 'transform 0.3s ease',
  };

  const cardTextStyle = {
    color: '#343a40',
    fontSize: '1.2rem',
    transition: 'color 0.3s ease',
  };

  const cardHoverStyle = {
    transform: 'scale(1.05)',
  };

  const handleMouseEnter = (e: any) => {
    e.currentTarget.style.transform = cardHoverStyle.transform;
  };

  const handleMouseLeave = (e: any) => {
    e.currentTarget.style.transform = 'scale(1)';
  };

  return (
    <Container fluid>
      <h1 className="my-4 text-center">Trang thống kê</h1>

      <Row className="mb-4">
        <Col sm={3}>
          <Card
            className="text-center shadow-sm"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Card.Body>
              <FaUsers size={40} color="#007bff" />
              <Card.Title style={cardTitleStyle}>Users</Card.Title>
              <Card.Text style={cardTextStyle}>1 Million</Card.Text>
              <ProgressBar now={70} label={`${70}%`} variant="info" />
            </Card.Body>
          </Card>
        </Col>
        <Col sm={3}>
          <Card
            className="text-center shadow-sm"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Card.Body>
              <FaBox size={40} color="#28a745" />
              <Card.Title style={cardTitleStyle}>Product</Card.Title>
              <Card.Text style={cardTextStyle}>3</Card.Text>
              <ProgressBar now={50} label={`${50}%`} variant="success" />
            </Card.Body>
          </Card>
        </Col>
        <Col sm={3}>
          <Card
            className="text-center shadow-sm"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Card.Body>
              <FaTags size={40} color="#ffc107" />
              <Card.Title style={cardTitleStyle}>Quantity</Card.Title>
              <Card.Text style={cardTextStyle}>600,000</Card.Text>
              <ProgressBar now={80} label={`${80}%`} variant="warning" />
            </Card.Body>
          </Card>
        </Col>
        <Col sm={3}>
          <Card
            className="text-center shadow-sm"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Card.Body>
              <FaDollarSign size={40} color="#dc3545" />
              <Card.Title style={cardTitleStyle}>Total Revenue</Card.Title>
              <Card.Text style={cardTextStyle}>30%</Card.Text>
              <ProgressBar now={30} label={`${30}%`} variant="danger" />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col sm={4}>
          <Card
            className="text-center shadow-sm"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Card.Body>
            <Card.Text style={cardTextStyle}>Loại sản phẩm</Card.Text>
              <Card.Text style={cardTextStyle}>Samsung</Card.Text>
              <Card.Text style={cardTextStyle}>iPhone</Card.Text>
              <Card.Text style={cardTextStyle}>Oppo</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4}>
          <Card
            className="text-center shadow-sm"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Card.Body>
              <Card.Text style={cardTextStyle}>Sản phẩm bán chạy</Card.Text>
              <Card.Text style={cardTextStyle}>iPhone 15 Pro</Card.Text>
              <Card.Text style={cardTextStyle}>Samsung Galaxy S24 Ultra</Card.Text>
              <Card.Text style={cardTextStyle}>Oppo A58</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4}>
          <Card
            className="text-center shadow-sm"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Card.Body>
              <Card.Text style={cardTextStyle}>Doanh thu đã bán</Card.Text>
              <Card.Text style={cardTextStyle}>Text</Card.Text>
              <Card.Text style={cardTextStyle}>Text</Card.Text>
              <Card.Text style={cardTextStyle}>Text</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col sm={8}>
          <Card
            className="text-center shadow-sm"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Card.Body>
              <Card.Text style={cardTextStyle}>Text</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4}>
          <Card
            className="text-center shadow-sm"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Card.Body>
              <Card.Text style={cardTextStyle}>Text</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h1 style={{ marginRight: '100px' }}>Sơ đồ thống kê</h1>
      <Row>
        <Col sm={12}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              {/* Render the bar chart */}
              <Bar data={data} options={options} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashBoard;
