import React from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  BarChartOutlined,
  DollarOutlined,
  HomeOutlined
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import "./headerAdmin.css";

const { Sider } = Layout;

const HeaderAdmin: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Sider width={250}       
            collapsible
            breakpoint="lg"
            collapsedWidth="80"
            className="sidebarAdmin">
      <div className="logo" onClick={() => navigate("/")}>QL Phòng trọ</div>
      <Menu theme="dark" mode="inline">
        <Menu.Item key="1" icon={<HomeOutlined />} onClick={() => navigate("/")}>
          Trang chủ
        </Menu.Item>
        <Menu.Item key="2" icon={<FileTextOutlined />} onClick={() => navigate("/posts")}>
          Quản lý bài đăng
        </Menu.Item>
        <Menu.Item key="3" icon={<UserOutlined />} onClick={() => navigate("/accounts")}>
          Quản lý người dùng
        </Menu.Item>
        <Menu.Item key="4" icon={<BarChartOutlined />} onClick={() => navigate("/reports")}>
          Thống kê & Báo cáo
        </Menu.Item>
        <Menu.Item key="5" icon={<DollarOutlined />} onClick={() => navigate("/history")}>
          Lịch sử giao dịch
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default HeaderAdmin;
