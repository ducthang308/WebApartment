import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Popconfirm, Space, Select } from "antd";
import "./Index.css";
interface User {
  key: string;
  name: string;
  password: string;
  email: string;
  role: string;
}

const AccountManagements: React.FC = () => {
  const [data, setData] = useState<User[]>([
    { key: "1", name: "Nguyễn Văn A", password: "******", email: "a@gmail.com", role: "Người dùng" },
    { key: "2", name: "Trần Văn B", password: "******", email: "b@gmail.com", role: "Admin" },
    { key: "3", name: "Nguyễn Văn A", password: "******", email: "a@gmail.com", role: "Người dùng" }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<string | null>(null);

  const handleAddOrEdit = () => {
    form.validateFields().then((values) => {
      if (editingKey) {
        setData(data.map(user => user.key === editingKey ? { ...user, ...values } : user));
      } else {
        setData([...data, { key: (data.length + 1).toString(), ...values }]);
      }
      setIsModalOpen(false);
      setEditingKey(null);
      form.resetFields();
    });
  };

  const handleEdit = (record: User) => {
    form.setFieldsValue(record);
    setEditingKey(record.key);
    setIsModalOpen(true);
  };

  const handleDelete = (key: string) => {
    setData(data.filter(user => user.key !== key));
  };

  const columns = [
    { title: "Họ tên", dataIndex: "name" },
    { title: "Mạt khẩu", dataIndex: "password" },
    { title: "Email", dataIndex: "email" },
    { title: "Vai trò", dataIndex: "role" },
    {
      title: "Hành động",
      render: (_: any, record: User) => (
        <Space>
          <Button onClick={() => handleEdit(record)}>Sửa</Button>
          <Popconfirm title="Xóa người dùng này?" onConfirm={() => handleDelete(record.key)}>
            <Button danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

    return (
    <div className="account-management-container">
        <div className="account-management-title">Quản lý người dùng</div>
        <Button type="primary" onClick={() => setIsModalOpen(true)} className="add-user-btn">
            Thêm người dùng
        </Button>
        <Table columns={columns} dataSource={data} />
        <Modal
            title={editingKey ? "Sửa người dùng" : "Thêm người dùng"}
            open={isModalOpen}
            onCancel={() => { setIsModalOpen(false); setEditingKey(null); form.resetFields(); }}
            onOk={handleAddOrEdit}
        >
        <Form form={form} layout="vertical">
            <Form.Item name="name" label="Họ tên" rules={[{ required: true }]}>
            <Input />
            </Form.Item>
            <Form.Item name="password" label="Mật khẩu" rules={[{ required: true }]}>
            <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
            <Input />
            </Form.Item>
            <Form.Item name="role" label="Vai trò" rules={[{ required: true }]}>
            <Select>
                <Select.Option value="Người dùng">Người dùng</Select.Option>
                <Select.Option value="Admin">Admin</Select.Option>
            </Select>
            </Form.Item>
        </Form>
        </Modal>
    </div>
    );

};

export default AccountManagements;
