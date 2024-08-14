import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ProgressBar } from 'react-bootstrap';
import { FaUsers, FaBox, FaTags, FaDollarSign } from 'react-icons/fa';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const DashBoard = () => {
  const [colors, setColors] = useState(['text-primary', 'text-success', 'text-warning']);

  useEffect(() => {
    // Cycle through colors on load
    const interval = setInterval(() => {
      setColors(prevColors => [
        prevColors[2],
        prevColors[0],
        prevColors[1]
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const barData = {
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

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const pieDataLogin = {
    labels: ['User A', 'User B', 'User C'],
    datasets: [
      {
        data: [300, 500, 200],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const pieDataSales = {
    labels: ['Samsung', 'iPhone', 'Oppo'],
    datasets: [
      {
        data: [45, 55, 30],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
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
              <Card.Text className={colors[0]}>Samsung</Card.Text>
              <Card.Text className={colors[1]}>iPhone</Card.Text>
              <Card.Text className={colors[2]}>Oppo</Card.Text>
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
              <Card.Text className={colors[0]}>iPhone 15 Pro</Card.Text>
              <Card.Text className={colors[1]}>Samsung Galaxy S24 Ultra</Card.Text>
              <Card.Text className={colors[2]}>Oppo A58</Card.Text>
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
              <Card.Text className={colors[0]}>Samsung <p>5</p></Card.Text>
              <Card.Text className={colors[1]}>iPhone <p>10</p></Card.Text>
              <Card.Text className={colors[2]}>Oppo <p>15</p></Card.Text>
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
              <Card.Text style={cardTextStyle}>Biểu đồ hình tròn số lượng người đăng nhập trong ngày</Card.Text>
              <div style={{ width: '250px', height: '250px', margin: 'auto' }}>
                <Pie data={pieDataLogin} />
              </div>
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
              <Card.Text style={cardTextStyle}>Biểu đồ hình tròn số lượng sản phẩm bán trong ngày</Card.Text>
              <Pie data={pieDataSales} />
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
              <Bar data={barData} options={barOptions} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashBoard;
