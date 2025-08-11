import React, { useState, useEffect } from "react";
import "./AccountManagement.css";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/FooterComponent/footer";

const AccountManagement = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const token = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjpbIlJPTEVfQWRtaW4iXSwiUGhvbmUgTnVtYmVyIjoiMDMyNTA0MzU5MCIsInN1YiI6IjAzMjUwNDM1OTAiLCJleHAiOjE3NTU1MjMxNzh9.srXVizg1FnJk5oDHMm-ADfj2dY3iwGCBzfRo7a2ofXc";

  const API_BASE_URL = "http://localhost:8081";

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/v1/user/1`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();
      console.log("User data:", data);
      setUserData(data);
      setAvatarPreview(data.avatarUrl || null);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [token]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      uploadAvatar(e.target.files[0]);
    }
  };

  const uploadAvatar = async (file: File) => {
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/user/avatar`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error(await res.text());
      console.log("Upload thành công");

      await fetchUserData(); // Refresh lại dữ liệu mới
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  if (loading) return <div>Đang tải...</div>;
  if (!userData) return <div>Không có dữ liệu user</div>;

  return (
    <div className="main-layout">
      <Navbar />
      <div className="container">
        {/* Tabs */}
        <div className="tabs">
          <div
            className={`tab ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            Thông tin cá nhân
          </div>
          <div
            className={`tab ${activeTab === "phone" ? "active" : ""}`}
            onClick={() => setActiveTab("phone")}
          >
            Đổi số điện thoại
          </div>
          <div
            className={`tab ${activeTab === "password" ? "active" : ""}`}
            onClick={() => setActiveTab("password")}
          >
            Đổi mật khẩu
          </div>
        </div>

        {/* Nội dung */}
        <div className="content">
          {activeTab === "profile" && (
            <div id="profile-tab">
              <div className="profile-info">
                <div className="avatar">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="avatar"
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <i className="fas fa-user"></i>
                  )}
                </div>
                <div className="user-details">
                  <div className="username">
                    {userData.full_name} 
                  </div>
                  <div className="user-id">ID: {userData.id}</div>
                  <label
                    className="change-link"
                    style={{ cursor: "pointer" }}
                  >
                    <i className="fas fa-camera"></i> Đổi ảnh đại diện
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleAvatarChange}
                    />
                  </label>
                </div>
              </div>

              <div className="info-grid">
                <div className="info-item">
                  <div className="info-label">
                    <i className="fas fa-mobile-alt"></i> Số điện thoại
                  </div>
                  <div className="info-value">{userData.phone_number}</div>
                  <span
                    className="change-link"
                    onClick={() => setActiveTab("phone")}
                  >
                    <i className="fas fa-exchange-alt"></i> Đổi số điện thoại
                  </span>
                </div>
                <div className="info-item">
                  <div className="info-label">
                    <i className="fas fa-user-tag"></i> Tên hiển thị
                  </div>
                  <div className="info-value">{userData.full_name}</div>
                  <span className="change-link">
                    <i className="fas fa-edit"></i> Thay đổi
                  </span>
                </div>
                <div className="info-item">
                  <div className="info-label">
                    <i className="fas fa-envelope"></i> Email
                  </div>
                  <div className="info-value">{userData.google_account}</div>
                  <span className="change-link">
                    <i className="fas fa-edit"></i> Cập nhật
                  </span>
                </div>
                <div className="info-item">
                  <div className="info-label">
                    <i className="fas fa-lock"></i> Mật khẩu
                  </div>
                  <div className="info-value">••••••••</div>
                  <span
                    className="change-link"
                    onClick={() => setActiveTab("password")}
                  >
                    <i className="fas fa-exchange-alt"></i> Đổi mật khẩu
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "phone" && (
            <div id="phone-tab">
              <div className="card">
                <div className="card-header">
                  <div className="card-title">Thay đổi số điện thoại</div>
                </div>
                <div className="form-group">
                  <label className="form-label">Số điện thoại cũ</label>
                  <input
                    type="text"
                    className="form-input"
                    value={userData.phone_number || ""}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Số điện thoại mới</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Nhập số điện thoại mới"
                  />
                </div>
                <div className="form-row">
                  <div className="form-col">
                    <label className="form-label">Mã xác thực</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Nhập mã xác thực"
                    />
                  </div>
                  <div className="form-col">
                    <button className="update-btn">
                      <i className="fas fa-sms"></i> Gửi mã xác thực
                    </button>
                  </div>
                </div>
                <div className="action-group">
                  <button
                    className="submit-btn"
                    onClick={() => setActiveTab("profile")}
                  >
                    <i className="fas fa-arrow-left"></i> Quay lại
                  </button>
                  <button className="submit-btn">
                    <i className="fas fa-save"></i> Cập nhật
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "password" && (
            <div id="password-tab">
              <div className="card">
                <div className="card-header">
                  <div className="card-title">Thay đổi mật khẩu</div>
                </div>
                <div className="form-group">
                  <label className="form-label">Mật khẩu cũ</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Nhập mật khẩu hiện tại"
                  />
                  <a href="#" className="forgot-link">
                    Bạn quên mật khẩu?
                  </a>
                </div>
                <div className="form-group">
                  <label className="form-label">Mật khẩu mới</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Nhập mật khẩu mới"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Xác nhận mật khẩu mới</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Nhập lại mật khẩu mới"
                  />
                </div>
                <div className="action-group">
                  <button
                    className="submit-btn"
                    onClick={() => setActiveTab("profile")}
                  >
                    <i className="fas fa-arrow-left"></i> Quay lại
                  </button>
                  <button className="submit-btn">
                    <i className="fas fa-save"></i> Cập nhật
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default AccountManagement;
