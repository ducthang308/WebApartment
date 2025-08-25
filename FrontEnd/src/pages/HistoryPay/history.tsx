import React, { useState, useEffect } from "react";
import "./history.css";
import { data, Link } from "react-router-dom";
import Footer from '../../components/FooterComponent/footer.tsx';
import Navbar from "../../components/Navbar/navbar";
import payooIcon from "../../assets/img/img1.png";
import momoIcon from "../../assets/img/img1.png";
import atmIcon from "../../assets/img/img1.png";
import bankIcon from "../../assets/img/img1.png";
import visaIcon from "../../assets/img/img1.png";
import storeIcon from "../../assets/img/img1.png";
import { getDepositHistory } from "../../services/historyService.ts";

const History = () => {
  const [activeTab, setActiveTab] = useState("recharge");
  const [depositHistoryData, setDepositHistoryData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDepositHistory = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token") || "";
      const userId = Number(localStorage.getItem("id") || 0); 
      const history = await getDepositHistory(token, userId);
      console.log("Lịch sử nạp tiền:", history);
      history.forEach(item => {
        console.log(item);
      });
      setDepositHistoryData(history);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepositHistory();
  }, []);

  const paymentHistoryData = [
    {
      id: 1,
      time: "10/07/2025 10:30",
      fee: 10000,
      tax: 1000,
      startBalance: 1000000,
      endBalance: 989000,
      activityType: "Đăng tin",
      postId: "TIN123",
      postType: "Tin thường"
    },
    {
      id: 2,
      time: "09/07/2025 15:45",
      fee: 50000,
      tax: 5000,
      startBalance: 2500000,
      endBalance: 2445000,
      activityType: "Nổi bật tin",
      postId: "TIN456",
      postType: "Tin VIP"
    },
    {
      id: 3,
      time: "08/07/2025 09:15",
      fee: 20000,
      tax: 2000,
      startBalance: 1200000,
      endBalance: 1178000,
      activityType: "Đẩy tin",
      postId: "TIN789",
      postType: "Tin thường"
    }
  ];

  return (
    <>
      <div className="main-layout">
        <Navbar />
        <div className="content-area">
          <main className="history-content">
            <h1>Quản lý giao dịch</h1>
            <nav className="history-tabs">
              <button
                className={`tab-btn ${activeTab === "recharge" ? "active" : ""}`}
                onClick={() => setActiveTab("recharge")}
              >
                Nạp tiền vào tài khoản
              </button>
              <button
                className={`tab-btn ${activeTab === "depositHistory" ? "active" : ""}`}
                onClick={() => setActiveTab("depositHistory")}
              >
                Lịch sử nạp tiền
              </button>
              <button
                className={`tab-btn ${activeTab === "paymentHistory" ? "active" : ""}`}
                onClick={() => setActiveTab("paymentHistory")}
              >
                Lịch sử thanh toán
              </button>
            </nav>

            <div className="container">
              <div className="history-wrapper">
                {/* Tab Nạp tiền */}
                {activeTab === "recharge" && (
                  <>
                    <section className="history-promotions">
                      <div className="history-note">
                        <strong>Đối với tài khoản mới đăng ký</strong>
                        <p>
                          Tặng thêm <span style={{ color: "red" }}>+50%</span> cho lần nạp
                          đầu tiên tối thiểu 100.000đ trong 5 ngày sau khi đăng ký tài khoản
                        </p>
                      </div>
                      <div className="history-benefit">
                        <ul>
                          <li>Nạp từ 100.000 đến dưới 1.000.000 tặng 10%</li>
                          <li>Nạp từ 1.000.000 đến dưới 2.000.000 tặng 20%</li>
                          <li>Nạp từ 2.000.000 trở lên tặng 25%</li>
                        </ul>
                      </div>
                    </section>

                    <section className="history-methods">
                      <h2>Chọn phương thức nạp tiền</h2>
                      <ul className="method-list">
                        <li><Link to="/recharge/payoo" className="method-item"><span>Quét mã QRCode (PAYOO)</span><img src={payooIcon} alt="payoo" /></Link></li>
                        <li><Link to="/recharge/momo" className="method-item"><span>Ví điện tử MOMO</span><img src={momoIcon} alt="momo" /></Link></li>
                        <li><Link to="/recharge/atm" className="method-item"><span>Thẻ ATM nội địa</span><img src={atmIcon} alt="atm" /></Link></li>
                        <li><Link to="/recharge/bank" className="method-item"><span>Chuyển khoản</span><img src={bankIcon} alt="bank" /></Link></li>
                        <li><Link to="/recharge/card" className="method-item"><span>Thẻ quốc tế (VISA, MasterCard, JCB, AMEX)</span><img src={visaIcon} alt="visa" /></Link></li>
                        <li><Link to="/recharge/store" className="method-item"><span>Điểm giao dịch, cửa hàng tiện lợi</span><img src={storeIcon} alt="store" /></Link></li>
                      </ul>
                    </section>
                  </>
                )}

                {/* Tab Lịch sử nạp tiền */}
                {activeTab === "depositHistory" && (
                  <div className="history-table-container">
                    <h2>Lịch sử nạp tiền</h2>
                    {loading ? (
                      <p>Đang tải dữ liệu...</p>
                    ) : (
                      <div className="table-responsive">
                        <table className="history-table">
                          <thead>
                            <tr>
                              <th>TRẠNG THÁI</th>
                              <th>NGÀY NẠP</th>
                              <th>SỐ TIỀN NẠP</th>
                              <th>PHƯƠNG THỨC</th>
                              <th>NGÀY BẮT ĐẦU</th>
                              <th>NGÀY KẾT THÚC</th>
                            </tr>
                          </thead>
                          <tbody>
                            {depositHistoryData.map((item: any) => (
                              <tr key={item.id || item.Mat}>
                                <td className={item.status === "1" ? "success" : "processing"}>
                                  {item.status === "1" ? "Thành công" : "Đang xử lý"}
                                </td>
                                <td>{item.created_at}</td>
                                <td>{item.amount.toLocaleString()} VNĐ</td>
                                <td>{item.payment_name}</td>
                                <td>{item.start_date}</td>
                                <td>{item.end_date}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab Lịch sử thanh toán */}
                {activeTab === "paymentHistory" && (
                  <div className="history-table-container">
                    <h2>Lịch sử thanh toán</h2>
                    <div className="table-responsive">
                      <table className="history-table">
                        <thead>
                          <tr>
                            <th>THỜI GIAN</th>
                            <th>PHÍ THANH TOÁN</th>
                            <th>THUẾ</th>
                            <th>SỐ DƯ ĐẦU</th>
                            <th>SỐ DƯ CUỐI</th>
                            <th>LOẠI HOẠT ĐỘNG</th>
                            <th>MÃ TIN</th>
                            <th>LOẠI TIN</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paymentHistoryData.map(item => (
                            <tr key={item.id}>
                              <td>{item.time}</td>
                              <td>{item.fee.toLocaleString()} VNĐ</td>
                              <td>{item.tax.toLocaleString()} VNĐ</td>
                              <td>{item.startBalance.toLocaleString()} VNĐ</td>
                              <td>{item.endBalance.toLocaleString()} VNĐ</td>
                              <td>{item.activityType}</td>
                              <td>{item.postId}</td>
                              <td>{item.postType}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <Footer />
          </main>
        </div>
      </div>
    </>
  );
};

export default History;
