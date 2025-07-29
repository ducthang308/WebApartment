import React from 'react'
import Logo from "../../../assets/img/logo.png"
import "./header.css"
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Phòng trọ',
    },
    {
        key: '2',
        label: 'Căn hộ cao cấp',
    },
    {
        key: '3',
        label: 'Căn hộ chung cư',
    },
    {
        key: '4',
        label: 'Nhà nguyên căn',
    },
    {
        key: '5',
        label: 'Căn hộ ở ghép',
    },
    {
        key: '6',
        label: 'Căn hộ mini',
    },
    {
        key: '7',
        label: 'Mặt bằng cho thuê',
    },
    {
        key: '8',
        label: 'Blog về chúng tôi',
    },
    {
        key: '9',
        label: 'Bảng giá dịch vụ',
    },
];


const header = () => {
    return (
        <div className="header">
            <div className="navbar-top">
                <div className="top-left">
                    <div className="logo">
                        <a className="logo-link" href='#'>
                            <img className="logo-link-img" src={Logo} />
                        </a>
                    </div>
                    <div className="navbar-filter">
                        <div className="search-wrapper">
                            <i className="fa-solid fa-location-dot search-icon"></i>
                            <input type="text" className="search-input" placeholder="Tìm theo khu vực" />
                        </div>

                        <div className="filter-wrapper">
                            <i className="fa-solid fa-filter"></i>
                            <span className="filter-text">Bộ lọc</span>
                        </div>
                    </div>
                </div>

                <div className="top-right">
                    <ul className="list-user-actions">
                        <li className="list-user-item">
                            <i className="fa-solid fa-heart"></i>
                            <p className="list-user-item-text">Tin đã thích</p>
                        </li>
                        <li className="list-user-item">
                            <i className="fa-solid fa-user-plus"></i>
                            <p className="list-user-item-text">Đăng ký</p>
                        </li>
                        <li className="list-user-item">
                            <i className="fa-solid fa-right-to-bracket"></i>
                            <p className="list-user-item-text">Đăng nhập</p>
                        </li>
                        <li className="list-user-item list-user-item-button">
                            <i className="fa-solid fa-pen-to-square"></i>
                            <p className="list-user-item-text">Đăng tin</p>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="navbar-bot">
                {/* <ul className="list-category">
                    <li className="list-category-item">
                        <a href="" className="link-category">Phòng trọ</a>
                    </li>
                    <li className="list-category-item">
                        <a href="" className="link-category">Căn hộ cao cấp</a>
                    </li>
                    <li className="list-category-item">
                        <a href="" className="link-category">Căn hộ chung cư</a>
                    </li>
                    <li className="list-category-item">
                        <a href="" className="link-category">Nhà nguyên căn</a>
                    </li>
                    <li className="list-category-item">
                        <a href="" className="link-category">Căn hộ ở ghép</a>
                    </li>
                    <li className="list-category-item">
                        <a href="" className="link-category">Căn hộ mini</a>
                    </li>
                    <li className="list-category-item">
                        <a href="" className="link-category">Mặt bằng cho thuê</a>
                    </li>
                    <li className="list-category-item">
                        <a href="" className="link-category">Blog về chúng tôi</a>
                    </li>
                    <li className="list-category-item">
                        <a href="" className="link-category">Bảng giá dịch vụ</a>
                    </li>
                </ul> */}

                <Tabs className='list-category' defaultActiveKey="1" items={items} />
            </div>
        </div>
    )
}

export default header