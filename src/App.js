import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import ChatPage from './pages/ChatPage';
import UploadPage from './pages/UploadPage';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['chat']}>
          <Menu.Item key="chat">
            <Link to="/">Chat</Link>
          </Menu.Item>
          <Menu.Item key="upload">
            <Link to="/upload">Upload PDF</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/upload" element={<UploadPage />} />
        </Routes>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Chat App ©2024</Footer>
    </Layout>
  );
}

export default App;
