import React from 'react'
import "./headerListing.css"
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Khu vực',
    },
    {
        key: '2',
        label: 'Thông tin mô tả',
    },
    {
        key: '3',
        label: 'Hình ảnh',
    },
    {
        key: '4',
        label: 'Video',
    },
    {
        key: '5',
        label: 'Thông tin liên hệ',
    },
];


const headerListing = () => {
    return (
        <div className="header-listing">
            <div className="title">Đăng tin cho thuê</div>
            <Tabs className="custom-tabs" defaultActiveKey="1" items={items} />
        </div>
    )
}

export default headerListing