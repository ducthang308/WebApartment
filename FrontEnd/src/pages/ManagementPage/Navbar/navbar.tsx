import React from 'react'
import AVT from "../../../assets/img/default-user.svg"
import { Button, Flex } from 'antd';
import "./navbar.css";

import {
    EditOutlined,
    FolderOpenOutlined,
    CreditCardOutlined,
    ClockCircleOutlined,
    FileTextOutlined,
    DollarOutlined,
    UserOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';

const items: MenuProps['items'] = [
    {
        key: '1',
        icon: <EditOutlined />,
        label: 'Đăng tin mới',
    },
    {
        key: '2',
        icon: <FolderOpenOutlined />,
        label: 'Danh sách tin đăng',
    },
    {
        key: '3',
        icon: <CreditCardOutlined />,
        label: 'Nạp tiền vào tài khoản',
    },
    {
        key: '4',
        icon: <ClockCircleOutlined />,
        label: 'Lịch sử nạp tiền',
    },
    {
        key: '5',
        icon: <FileTextOutlined />,
        label: 'Lịch sử thanh toán',
    },
    {
        key: '6',
        icon: <DollarOutlined />,
        label: 'Bảng giá dịch vụ',
    },
    {
        key: '7',
        icon: <UserOutlined />,
        label: 'Quản lý tài khoản',
    },
    {
        key: '8',
        icon: <LogoutOutlined />,
        label: 'Đăng xuất',
    },
];

const navbar = () => {
    return (
        <div className="navbar-management">
            <div className="nav-header">
                <div className="avatar-nav">
                    <img src={AVT} alt="" className="avatar" />
                </div>
                <div className="info-nav">
                    <div className="fullname">Nguyễn Đức Thắng</div>
                    <div className="phone">0325043590</div>
                </div>
            </div>

            <div className="nav-payment">
                <div className="balance">
                    <div className="balance-title">Số dư của bạn</div>
                    <div className="balance-number">0</div>
                </div>
                <div className="btn-payment">
                    <Button type="primary"><i className="fa-regular fa-credit-card"></i> Nạp tiền</Button>
                </div>
            </div>

            <div className="nav-tabs">
                <Menu
                    mode="vertical"
                    className="custom-ant-menu"
                    items={items}
                    style={{ width: 250, fontSize: 16, border: 'none' }}
                />
            </div>

            <div className="sticky-bottom">
                <span>Đức Thắng - HUTH - 0325043590</span>
            </div>
        </div>
    )
}

export default navbar