import React, { useState } from 'react';
import { Table, Tag, Select, DatePicker, Input, Row, Col, Button } from 'antd';
import dayjs from 'dayjs';
import './Index.css';

const { RangePicker } = DatePicker;

interface Transaction {
  id: string;
  user: string;
  type: string;
  amount: number;
  status: string;
  date: string;
  note?: string;
}

const transactionTypes = ["Nạp tiền", "Trừ tiền", "Chi phí đăng bài", "Hoàn tiền"];
const statuses = ["Thành công", "Chờ xử lý", "Thất bại"];

const Transactions: React.FC = () => {
  const [transactions] = useState<Transaction[]>([
    { id: "GD001", user: "Nguyễn Văn A - 0909123456", type: "Nạp tiền", amount: 500000, status: "Thành công", date: "2025-07-20", note: "Nạp qua MoMo" },
    { id: "GD002", user: "Trần Thị B - 0912345678", type: "Chi phí đăng bài", amount: -20000, status: "Thành công", date: "2025-07-22", note: "Đăng tin VIP" },
    { id: "GD003", user: "Lê Văn C - 0987654321", type: "Hoàn tiền", amount: 50000, status: "Chờ xử lý", date: "2025-07-23" },
  ]);

  const columns = [
    { title: "Mã GD", dataIndex: "id", key: "id" },
    { title: "Người thực hiện", dataIndex: "user", key: "user" },
    { title: "Loại giao dịch", dataIndex: "type", key: "type" },
    { title: "Số tiền", dataIndex: "amount", key: "amount", render: (v: number) => <b style={{ color: v > 0 ? "#52c41a" : "#ff4d4f" }}>{v.toLocaleString()} đ</b> },
    { title: "Trạng thái", dataIndex: "status", key: "status", render: (status: string) => {
        let color = status === "Thành công" ? "green" : status === "Chờ xử lý" ? "orange" : "red";
        return <Tag color={color}>{status}</Tag>;
    }},
    { title: "Ngày thực hiện", dataIndex: "date", key: "date" },
    { title: "Ghi chú", dataIndex: "note", key: "note" },
  ];

  return (
    <div className="transactions">
      <h2>Quản lý giao dịch</h2>
      <div className="filters">
        <Row gutter={16}>
          <Col span={6}>
            <Input placeholder="Tìm theo mã GD hoặc SĐT" />
          </Col>
          <Col span={4}>
            <Select placeholder="Loại giao dịch" style={{ width: "100%" }} options={transactionTypes.map(t => ({ label: t, value: t }))} />
          </Col>
          <Col span={4}>
            <Select placeholder="Trạng thái" style={{ width: "100%" }} options={statuses.map(s => ({ label: s, value: s }))} />
          </Col>
          <Col span={6}>
            <RangePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
          </Col>
          <Col span={4}>
            <Button type="primary" block>Tìm kiếm</Button>
          </Col>
        </Row>
      </div>

      <Table columns={columns} dataSource={transactions} rowKey="id" style={{ marginTop: 20 }} pagination={{ pageSize: 5 }} />
    </div>
  );
};

export default Transactions;
