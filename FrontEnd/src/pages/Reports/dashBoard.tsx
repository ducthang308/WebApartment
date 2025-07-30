import React from "react";
import { Card, Row, Col } from "antd";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import "./dashboard.css";

// Fake dữ liệu
const monthlyPosts = [
  { month: "T1", posts: 40 },
  { month: "T2", posts: 55 },
  { month: "T3", posts: 60 },
  { month: "T4", posts: 80 },
  { month: "T5", posts: 75 },
  { month: "T6", posts: 95 },
];

const transactionTypes = [
  { name: "Nạp tiền", value: 320 },
  { name: "Chi phí đăng bài", value: 150 },
  { name: "Khác", value: 50 },
];

const COLORS = ["#1890ff", "#ff4d4f", "#52c41a"];

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <h2>Báo cáo & Thống kê</h2>
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={8}>
          <Card title="Tổng bài đăng" bordered={false}>
            <h1>1,245</h1>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Tổng giao dịch" bordered={false}>
            <h1>520</h1>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Người dùng" bordered={false}>
            <h1>350</h1>
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={14}>
          <Card title="Báo cáo bài đăng hàng tháng">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyPosts}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="posts" fill="#1890ff" name="Số bài đăng" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={10}>
          <Card title="Thống kê loại giao dịch">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={transactionTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => 
                        percent !== undefined ? `${name} ${(percent * 100).toFixed(0)}%` : `${name} 0%`
                        }
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {transactionTypes.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
