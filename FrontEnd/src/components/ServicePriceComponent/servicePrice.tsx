import React from 'react'
import { Table } from 'antd';
import "./index.css"

const columns = [
    {
        title: 'Thông tin',
        dataIndex: 'key',
        key: 'key',
        width: 200,
    },
    {
        title: 'Tin VIP Nổi Bật',
        dataIndex: 'vip1',
        key: 'vip1',
        render: (text) => <div dangerouslySetInnerHTML={{ __html: text }} />,
    },
    {
        title: 'Tin VIP 1',
        dataIndex: 'vip2',
        key: 'vip2',
        render: (text) => <div dangerouslySetInnerHTML={{ __html: text }} />,
    },
    {
        title: 'Tin VIP 2',
        dataIndex: 'vip3',
        key: 'vip3',
        render: (text) => <div dangerouslySetInnerHTML={{ __html: text }} />,
    },
    {
        title: 'Tin VIP 3',
        dataIndex: 'vip4',
        key: 'vip4',
        render: (text) => <div dangerouslySetInnerHTML={{ __html: text }} />,
    },
    {
        title: 'Tin Thường',
        dataIndex: 'normal',
        key: 'normal',
        render: (text) => <div dangerouslySetInnerHTML={{ __html: text }} />,
    },
];

const data = [
    {
        key: 'Giá ngày',
        vip1: '50.000₫<br/><span style="font-size:12px;">(Tối thiểu 3 ngày)</span>',
        vip2: '30.000₫<br/><span style="font-size:12px;">(Tối thiểu 3 ngày)</span>',
        vip3: '20.000₫<br/><span style="font-size:12px;">(Tối thiểu 3 ngày)</span>',
        vip4: '10.000₫<br/><span style="font-size:12px;">(Tối thiểu 3 ngày)</span>',
        normal: '2.000₫<br/><span style="font-size:12px;">(Tối thiểu 5 ngày)</span>',
    },
    {
        key: 'Giá tuần (7 ngày)',
        vip1: '315.000₫',
        vip2: '190.000₫',
        vip3: '133.000₫',
        vip4: '63.000₫',
        normal: '12.000₫',
    },
    {
        key: 'Giá tháng (30 ngày)',
        vip1: '<del>1.500.000₫</del><br/>Giảm 20%<br/><strong>1.200.000₫</strong>',
        vip2: '<del>900.000₫</del><br/>Giảm 11%<br/><strong>800.000₫</strong>',
        vip3: '<del>600.000₫</del><br/>Giảm 10%<br/><strong>540.000₫</strong>',
        vip4: '<del>300.000₫</del><br/>Giảm 20%<br/><strong>240.000₫</strong>',
        normal: '<del>60.000₫</del><br/>Giảm 20%<br/><strong>48.000₫</strong>',
    },
    {
        key: 'Giá đẩy tin',
        vip1: '5.000₫',
        vip2: '3.000₫',
        vip3: '2.000₫',
        vip4: '2.000₫',
        normal: '2.000₫',
    },
    {
        key: 'Màu sắc tiêu đề',
        vip1: '<span style="color: red; font-weight: bold;">MÀU ĐỎ, IN HOA</span>',
        vip2: '<span style="color: deeppink; font-weight: bold;">MÀU HỒNG, IN HOA</span>',
        vip3: '<span style="color: orange; font-weight: bold;">MÀU CAM, IN HOA</span>',
        vip4: '<span style="color: blue; font-weight: bold;">MÀU XANH, IN HOA</span>',
        normal: 'Màu mặc định, viết thường',
    },
    {
        key: 'Kích thước tin',
        vip1: 'Rất lớn',
        vip2: 'Lớn',
        vip3: 'Trung bình',
        vip4: 'Trung bình',
        normal: 'Nhỏ',
    },
    {
        key: 'Tự động duyệt (*)',
        vip1: '✔️',
        vip2: '✔️',
        vip3: '✔️',
        vip4: '✔️',
        normal: '❌',
    },
    {
        key: 'Hiển thị nút gọi điện',
        vip1: '✔️',
        vip2: '✔️',
        vip3: '❌',
        vip4: '❌',
        normal: '❌',
    },
];

const servicePrice = () => {
    return (
        <div className="container-service-price">
            <div className="service-price">
                <div className="service-price-title">Bảng giá tin đăng</div>
                <div className="service-price-date">Áp dụng từ 01/07/2025</div>
            </div>
            <Table
                className='title-color center-text padding-table'
                columns={columns}
                dataSource={data}
                pagination={false}
                bordered
            />
        </div>
    )
}

export default servicePrice