import React from 'react'
import "./headerListing.css"
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Tất cả',
    },
];


const headerListing = () => {
    return (
        <div className="header-listing">
            <div className="title">Danh sách đăng tin</div>
            <Tabs className="custom-tabs" defaultActiveKey="1" items={items} />
        </div>
    )
}

export default headerListing