import React from 'react';
import { GetProp, Layout, Menu, MenuProps, theme } from 'antd';
import { AppstoreOutlined, HomeOutlined, ProductOutlined, UserOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const { Header, Content, Sider } = Layout;
type MenuItem = GetProp<MenuProps, 'items'>[number];

const items: MenuItem[] = [
  {
    key: '/admin',
    icon: <HomeOutlined />,
    label: 'DashBoard',
  },
  {
    key: '/admin/product',
    icon: <ProductOutlined />,
    label: 'Product',
  },
  {
    key: '/admin/category',
    icon: <AppstoreOutlined />,
    label: 'Category',
  },
  {
    key: '/admin/useraccount',
    icon: <UserOutlined />,
    label: 'UserAccount',
  }
];

const Admin: React.FC = () => {
  const navigate = useNavigate(); // chuyển trang tự động
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleClickItem: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  const logOut = () => {
    console.log('User logged out');
    navigate('/login'); // chuyển sang trang login
  };

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          onClick={handleClickItem}
          defaultSelectedKeys={['/admin']}
          theme={'dark'}
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 16 }}>
          <Button variant="primary" onClick={logOut}>Đăng xuất</Button>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 650,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin;
