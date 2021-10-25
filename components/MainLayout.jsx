import React, { useState } from 'react';
import Link from 'next/link';
import { Layout, Menu, Breadcrumb, Card, Typography } from 'antd';
import {
  DesktopOutlined,
  PoweroffOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { Title } = Typography;

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <Title level={2} type='success'>Likebook</Title>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="users" icon={<TeamOutlined />}>
            <Link href='/users'>
              <a>
                Users
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key="my-profile" icon={<UserOutlined />}>
          <Link href='/users/me'>
              <a>
                My Profile
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key="truc" icon={<FileOutlined />}>
          <Link href='/posts'>
              <a>
                Timeline
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key="logout" icon={<PoweroffOutlined />}>
          <Link href='/users/me'>
              <a>
                Logout
              </a>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} >
          {/* <PoweroffOutlined style={{ color: 'red', float: 'right' }}/> */}
        </Header>
        <Content style={{ margin: '0 16px' }}>
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
}

export default MainLayout
