import React, { useState } from 'react';
import './AccountManagement.css';
import Navbar from "../../components/Navbar/navbar";
import Footer from '../../components/FooterComponent/footer';

const AccountManagement = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div id="profile-tab">
            {/* Avatar & user info */}
            <div className="profile-info">
              <div className="avatar">
                <i className="fas fa-user"></i>
              </div>
              <div className="user-details">
                <div className="username">Huy 089644505</div>
                <div className="user-id">ID: USR-20250710</div>
                <a href="#" className="change-link">
                  <i className="fas fa-camera"></i> Đổi ảnh đại diện
                </a>
              </div>
            </div>

            {/* Grid info */}
            <div className="info-grid">
              <div className="info-item">
                <div className="info-label">
                  <i className="fas fa-mobile-alt"></i> Số điện thoại
                </div>
                <div className="info-value">089644505</div>
                <a href="#" className="change-link" onClick={() => setActiveTab('phone')}>
                  <i className="fas fa-exchange-alt"></i> Đổi số điện thoại
                </a>
              </div>
              <div className="info-item">
                <div className="info-label">
                  <i className="fas fa-user-tag"></i> Tên hiển thị
                </div>
                <div className="info-value">Huy</div>
                <a href="#" className="change-link">
                  <i className="fas fa-edit"></i> Thay đổi
                </a>
              </div>
              <div className="info-item">
                <div className="info-label">
                  <i className="fas fa-envelope"></i> Email
                </div>
                <div className="info-value">huy@example.com</div>
                <a href="#" className="change-link">
                  <i className="fas fa-edit"></i> Cập nhật
                </a>
              </div>
              <div className="info-item">
                <div className="info-label">
                  <i className="fas fa-lock"></i> Mật khẩu
                </div>
                <div className="info-value">••••••••</div>
                <a href="#" className="change-link" onClick={() => setActiveTab('password')}>
                  <i className="fas fa-exchange-alt"></i> Đổi mật khẩu
                </a>
              </div>
            </div>

            {/* Divider + Invoice section */}
            <div className="divider"></div>
            <div className="invoice-section">
              <div className="invoice-title">
                <i className="fas fa-file-invoice"></i> Thông tin xuất hóa đơn cho giao dịch
              </div>
              <p className="invoice-text">
                Cung cấp thông tin để xuất hóa đơn điện tử cho các giao dịch của bạn. Hóa đơn sẽ được gửi qua email sau khi giao dịch hoàn tất.
              </p>
              <a href="#" className="change-link">
                <i className="fas fa-edit"></i> Cập nhật thông tin hóa đơn
              </a>
            </div>
          </div>
        );
      case 'phone':
        return (
          <div id="phone-tab">
            <div className="card">
              <div className="card-header">
                <div className="card-title">Thay đổi số điện thoại</div>
              </div>
              <div className="form-group">
                <label className="form-label">Số điện thoại cũ</label>
                <input type="text" className="form-input" value="089644505" disabled />
              </div>
              <div className="form-group">
                <label className="form-label">Số điện thoại mới</label>
                <input type="text" className="form-input" placeholder="Nhập số điện thoại mới" />
              </div>
              <div className="form-row">
                <div className="form-col">
                  <label className="form-label">Mã xác thực</label>
                  <input type="text" className="form-input" placeholder="Nhập mã xác thực" />
                </div>
                <div className="form-col">
                  <button className="update-btn">
                    <i className="fas fa-sms"></i> Gửi mã xác thực
                  </button>
                </div>
              </div>
              <div className="action-group">
                <button className="submit-btn" onClick={() => setActiveTab('profile')}>
                  <i className="fas fa-arrow-left"></i> Quay lại
                </button>
                <button className="submit-btn">
                  <i className="fas fa-save"></i> Cập nhật
                </button>
              </div>
            </div>
          </div>
        );
      case 'password':
        return (
          <div id="password-tab">
            <div className="card">
              <div className="card-header">
                <div className="card-title">Thay đổi mật khẩu</div>
              </div>
              <div className="form-group">
                <label className="form-label">Mật khẩu cũ</label>
                <input type="password" className="form-input" placeholder="Nhập mật khẩu hiện tại" />
                <a href="#" className="forgot-link">Bạn quên mật khẩu?</a>
              </div>
              <div className="form-group">
                <label className="form-label">Mật khẩu mới</label>
                <input type="password" className="form-input" placeholder="Nhập mật khẩu mới" />
              </div>
              <div className="form-group">
                <label className="form-label">Xác nhận mật khẩu mới</label>
                <input type="password" className="form-input" placeholder="Nhập lại mật khẩu mới" />
              </div>
              <div className="action-group">
                <button className="submit-btn" onClick={() => setActiveTab('profile')}>
                  <i className="fas fa-arrow-left"></i> Quay lại
                </button>
                <button className="submit-btn">
                  <i className="fas fa-save"></i> Cập nhật
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="main-layout">
        <Navbar />
        <div className="container">
        <div className="tabs">
            <div className={`tab ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>Thông tin cá nhân</div>
            <div className={`tab ${activeTab === 'phone' ? 'active' : ''}`} onClick={() => setActiveTab('phone')}>Đổi số điện thoại</div>
            <div className={`tab ${activeTab === 'password' ? 'active' : ''}`} onClick={() => setActiveTab('password')}>Đổi mật khẩu</div>
        </div>
        <div className="content">
            {renderTabContent()}
        </div>
           <Footer />
        </div>
    </div>
  );
};

export default AccountManagement;
