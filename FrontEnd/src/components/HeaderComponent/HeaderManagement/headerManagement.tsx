import React from 'react'
import Logo from "../../../assets/img/logo.png"
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import "./index.css";

type MenuItem = Required<MenuProps>['items'][number];

const headerManagement = () => {
    const items: MenuItem[] = [
        {
            key: 'apartment',
            label: 'Căn hộ',
            children: [
                { key: '1', label: 'Căn hộ cao cấp' },
                { key: '2', label: 'Căn hộ chung cư' },
                { key: '3', label: 'Căn hộ mini' },
                { key: '4', label: 'Căn hộ ở ghép' },
            ],
        },
    ];

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
    };

    return (
        <div className="header">
            <div className="navbar-top">
                <div className="top-left">
                    <div className="logo">
                        <a className="logo-link" href='#'>
                            <img className="logo-link-img" src={Logo} />
                        </a>
                    </div>
                    <div className="navbar-bot">
                        <ul className="list-category">
                            <li className="list-category-item">
                                <a href="" className="link-category">Phòng trọ</a>
                            </li>
                            <li className="list-category-item">
                                <a href="" className="link-category">Nhà nguyên căn</a>
                            </li>
                            <li className="list-category-item">
                                <Menu
                                    onClick={onClick} style={{ width: 256 }} defaultSelectedKeys={['1']} defaultOpenKeys={['apartment']} mode="inline" items={items}
                                />
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
                        </ul>
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
        </div>
    )
}
export default headerManagement