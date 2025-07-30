import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Select, Upload, message, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import './Index.css';

interface Post {
  id: number;
  title: string;
  price: number;
  area: number;
  location: string;
  district: string;
  ward: string;
  category: string;
  phone: string;
  description: string;
  images: string[];
  status: string;
  createdAt: string;
}

const categories = ["Phòng trọ", "Căn hộ", "Nhà nguyên căn"];
const statuses = ["Hiển thị", "Chờ duyệt", "Ẩn"];
const districts = ["Quận 1", "Quận 3", "Quận 10", "Bình Thạnh"];
const wards = ["Phường 1", "Phường 2", "Phường 3"];

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: "Phòng trọ gần ĐH Bách Khoa",
      price: 2500000,
      area: 20,
      location: "123 Lý Thường Kiệt",
      district: "Quận 10",
      ward: "Phường 15",
      category: "Phòng trọ",
      phone: "0909123456",
      description: "Phòng sạch sẽ, gần trường, có nội thất cơ bản.",
      images: [],
      status: "Hiển thị",
      createdAt: "2025-07-24",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [form] = Form.useForm();

  const openModal = (record?: Post) => {
    setEditingPost(record || null);
    form.setFieldsValue(
      record || {
        title: "",
        price: 0,
        area: 0,
        location: "",
        district: "",
        ward: "",
        category: "",
        phone: "",
        description: "",
        images: [],
        status: "Chờ duyệt",
      }
    );
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      if (editingPost) {
        setPosts(prev => prev.map(p => p.id === editingPost.id ? { ...p, ...values } : p));
        message.success("Cập nhật thành công");
      } else {
        const newPost: Post = {
          id: posts.length + 1,
          ...values,
          createdAt: dayjs().format("YYYY-MM-DD"),
        };
        setPosts(prev => [...prev, newPost]);
        message.success("Thêm bài đăng thành công");
      }
      setIsModalOpen(false);
    } catch {
      message.error("Lỗi khi lưu");
    }
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Xóa bài đăng?",
      onOk: () => {
        setPosts(prev => prev.filter(p => p.id !== id));
        message.success("Đã xóa");
      }
    });
  };

  const columns = [
    { title: "Tiêu đề", dataIndex: "title", key: "title" },
    { title: "Giá", dataIndex: "price", key: "price", render: (v: number) => v.toLocaleString() + " đ" },
    { title: "Diện tích", dataIndex: "area", key: "area", render: (v: number) => v + " m²" },
    { title: "Danh mục", dataIndex: "category", key: "category" },
    { title: "Quận", dataIndex: "district", key: "district" },
    { title: "Trạng thái", dataIndex: "status", key: "status" },
    { title: "Ngày đăng", dataIndex: "createdAt", key: "createdAt" },
    {
      title: "Hành động",
      render: (_: any, record: Post) => (
        <Space>
          <Button type="link" onClick={() => openModal(record)}>Sửa</Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>Xóa</Button>
        </Space>
      )
    }
  ];

  return (
    <div>
      <h2>Quản lý bài đăng</h2>
      <Button type="primary" style={{ marginBottom: 15 }} onClick={() => openModal()}>
        + Thêm bài đăng
      </Button>
      <Table columns={columns} dataSource={posts} rowKey="id" />

      <Modal title={editingPost ? "Chỉnh sửa bài đăng" : "Thêm bài đăng"} open={isModalOpen} onOk={handleSave} onCancel={() => setIsModalOpen(false)} width={700}>
        <Form layout="vertical" form={form}>
          <Form.Item name="title" label="Tiêu đề" rules={[{ required: true, message: "Nhập tiêu đề" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Giá (VNĐ)" rules={[{ required: true, message: "Nhập giá" }]}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="area" label="Diện tích (m²)" rules={[{ required: true, message: "Nhập diện tích" }]}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="location" label="Địa chỉ chi tiết" rules={[{ required: true, message: "Nhập địa chỉ" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="district" label="Quận" rules={[{ required: true, message: "Chọn quận" }]}>
            <Select options={districts.map(d => ({ label: d, value: d }))} />
          </Form.Item>
          <Form.Item name="ward" label="Phường" rules={[{ required: true, message: "Chọn phường" }]}>
            <Select options={wards.map(w => ({ label: w, value: w }))} />
          </Form.Item>
          <Form.Item name="category" label="Danh mục" rules={[{ required: true, message: "Chọn danh mục" }]}>
            <Select options={categories.map(c => ({ label: c, value: c }))} />
          </Form.Item>
          <Form.Item name="phone" label="Số điện thoại liên hệ" rules={[{ required: true, message: "Nhập số điện thoại" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Mô tả chi tiết">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item name="images" label="Hình ảnh">
            <Upload multiple listType="picture">
              <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="status" label="Trạng thái">
            <Select options={statuses.map(s => ({ label: s, value: s }))} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Posts;
