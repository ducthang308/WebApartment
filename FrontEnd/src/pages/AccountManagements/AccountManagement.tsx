import React, { useState, useEffect } from "react";
import "./AccountManagement.css";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/FooterComponent/footer";
import { getUserById,  uploadUserAvatar } from "../../services/UserService";
import { updatePassword } from "../../services/UserService";
import { updateUserInformation } from "../../services/UserService";

const AccountManagement = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [activeTab, setActiveTab] = useState("profile");

  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState("");

  const [newPhone, setNewPhone] = useState("");

  const [newEmail, setEditingEmail] = useState();

  const token = localStorage.getItem("token") || "";
  const userId = Number(localStorage.getItem("id") || 0); 
  console.log("UserId:", userId);
  console.log("UserId:", token);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const data = await getUserById(userId, token);
      setUserData(data);
      setAvatarPreview(data.avatarUrl || null);
      } catch(error) {
        console.error("Fetch user error: ", error);
      } finally{
        setLoading(false);
      }
  };

  useEffect(() => {
    if (token) fetchUserData();
  }, [token]);

// cập nhật avatar
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const file = e.target.files?.[0];
    if(file){
      const preview = URL.createObjectURL(file);
      setAvatarPreview(preview);

      const formData = { profile_image: preview };
      handleUpdate(formData);
    }
  }
// Call api updateUserInformation
 const handleUpdate = async (payload: any) => {
    try {
      setLoading(true);
      const res = await updateUserInformation(token, userId, payload);
      console.log("Cập nhật thành công:", res);

      // Cập nhật lại state để hiển thị ngay
      setUserData((prev: any) => ({ ...prev, ...payload }));

      alert("Cập nhật thông tin thành công!");
    } catch (err: any) {
      alert(`${err.message}`);
    } finally {
      setLoading(false);
    }
  };

// Cập nhật tên
  const handleNameUpdate = () => {
    if (!newName.trim()) {
      alert("Tên không được để trống!");
      return;
    }
    handleUpdate({ full_name: newName });
    setEditingName(false);
  };
// Cập nhật sdt 
 const handleUpdatePhone = async () => {
    if (!newPhone.trim()) {
      alert("Vui lòng nhập số điện thoại mới!");
      return;
    }
   const payload = { phone_number: newPhone };
   handleUpdate(payload);
   setActiveTab("profile");
  };

// Call api UpdatePassword
  const handleUpdatePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Mật khẩu mới và xác nhận mật khẩu không trùng khớp!");
      return;
    }

    try {
      setLoading(true);
      
      await updatePassword(7, oldPassword, newPassword, confirmPassword, token);

      alert("Cập nhật mật khẩu thành công!");
      setActiveTab("profile");

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
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
                  <div className="username">{userData.full_name}</div>
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
                    {editingName ? (
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        style={{ padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
                      />
                    ) : (
                      <div className="info-value">{userData.full_name}</div>
                    )}

                    {editingName ? (
                      <span className="change-link" onClick={handleNameUpdate}>
                        <i className="fas fa-check"></i> Lưu
                      </span>
                    ) : (
                      <span className="change-link" onClick={() => setEditingName(true)}>
                        <i className="fas fa-edit"></i> Thay đổi
                      </span>
                    )}
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
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
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
                  <button className="submit-btn"
                          onClick={handleUpdatePhone}
                          disabled={loading}
                  >
                    <i className="">{loading ? "Đang cập nhật..." : "Cập nhật"}</i>
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
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
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
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Xác nhận mật khẩu mới</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Nhập lại mật khẩu mới"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="action-group">
                  <button
                    className="submit-btn"
                    onClick={() => setActiveTab("profile")}
                  >
                    <i className="fas fa-arrow-left"></i> Quay lại
                  </button>
                  <button className="submit-btn"
                          onClick={handleUpdatePassword}
                          disabled={loading}
                          >
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
