import React, { useState } from 'react';
import { useParams, useLocation, Link} from 'react-router-dom';
import { Button, Card, InputNumber, Radio, Typography, Image } from 'antd';
import './TopUpPage.css';
import Footer from '../../components/FooterComponent/footer';
import Navbar from '../../components/Navbar/navbar';

import QR from "../../assets/img/QR.jpg";
import Qr_CaNhan from "../../assets/img/Qr_CaNhan.jpg";

const { Title, Text } = Typography;
const moneyOptions = [50000, 100000, 200000, 500000, 1000000, 2000000, 5000000];
 const tabList = [
    { label: 'QRCode', path: '/recharge/payoo' },
    { label: 'Ví MoMo', path: '/recharge/momo' },
    { label: 'Thẻ ATM nội địa', path: '/recharge/atm' },
    { label: 'Thẻ quốc tế', path: '/recharge/card' },
    { label: 'Chuyển khoản', path: '/recharge/bank' },
    { label: 'Điểm giao dịch', path: '/recharge/store' },
  ];

const TopUpPage = () => {
  const [amount, setAmount] = useState<number>(50000);
  const [showQRCode, setShowQRCode] = useState<boolean>(false);
  const { method } = useParams();

  const VAT_RATE = 0.1;
  const getBonus = (val: number) => {
    if (val >= 2000000) return 0.25;
    if (val >= 1000000) return 0.2;
    if (val >= 100000) return 0.1;
    return 0;
  };

  const vat = +(amount * VAT_RATE).toFixed(0);
  const afterTax = amount - vat;
  const bonus = +(amount * getBonus(amount)).toFixed(0);
  const totalReceive = afterTax + bonus;

  return (
    <div className="topup-layout">
      <div className="topup-sidebar">
        <Navbar />
      </div>

      <div className="topup-main">
        <h2 className="Title">Nạp tiền vào tài khoản</h2>
         <div className="topup-tabs">
            {tabList.map((tab) => (
                <Link
                key={tab.path}
                to={tab.path}
                className={location.pathname === tab.path ? 'active' : ''}
                >
                {tab.label}
                </Link>
          ))}
        </div>
        <div className="topup-container">

          {!showQRCode ? (
            <>
              <Card className="topup-card">
                <Title level={4}>Chọn số tiền cần nạp</Title>
                <Radio.Group
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="topup-radio-group"
                >
                  {moneyOptions.map((money) => (
                    <Radio.Button key={money} value={money}>
                      {money.toLocaleString()}đ
                    </Radio.Button>
                  ))}
                </Radio.Group>

                <div className="topup-input">
                  <Text>Hoặc nhập số tiền cần nạp:</Text>
                  <InputNumber
                    min={10000}
                    step={1000}
                    value={amount}
                    onChange={(val) => setAmount(val || 0)}
                    addonAfter="đ"
                    className="topup-input-number"
                  />
                </div>
              </Card>

              <Card className="topup-card" title="Thông tin nạp tiền">
                <div className="topup-info">
                  <div><Text>Số tiền nạp:</Text> <Text>{amount.toLocaleString()}đ</Text></div>
                  <div><Text>Thuế VAT (10%):</Text> <Text type="danger">-{vat.toLocaleString()}đ</Text></div>
                  <div><Text>Sau thuế:</Text> <Text>{afterTax.toLocaleString()}đ</Text></div>
                  <div><Text>Khuyến mãi:</Text> <Text type="success">+{bonus.toLocaleString()}đ</Text></div>
                  <div><strong>Thực nhận:</strong> <strong>{totalReceive.toLocaleString()}đ</strong></div>
                </div>
                <Button type="primary" block className="topup-submit-btn" onClick={() => setShowQRCode(true)}>
                  Tiếp tục →
                </Button>
              </Card>
            </>
          ) : (
            <>
              <Card className="topup-card" title="Bước 2: Thanh toán bằng cách scan mã QR bên dưới">
                <div style={{ textAlign: 'center' }}>
                  <Image
                    width={250}
                    src={Qr_CaNhan}
                    alt="QR Code"
                  />
                  <p><b>Payoo</b> - QR2QXXMU</p>
                  <Button danger size="small" style={{ marginTop: 10 }}>
                    Hủy (00:09:48)
                  </Button>
                </div>
              </Card>

              <Card className="topup-card" title="HƯỚNG DẪN THANH TOÁN BẰNG QR CODE">
                <Image
                  src={QR}
                  alt="Hướng dẫn thanh toán"
                />
              </Card>
            </>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default TopUpPage;
