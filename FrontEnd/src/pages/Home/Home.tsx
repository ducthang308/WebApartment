import './Home.css'
import React, {useState} from 'react'
import img1 from "../../assets/img/img1.png"
import img2 from "../../assets/img/img2.png"

const Home = () => {
    const [activeTab, setActiveTab] = useState('new');
    const [activeDistrict, setActiveDistrict] = useState('all');

     const featuredPost = [
        {
        id: 1,
        images: [img1, img2, img1, img2, img1],
        title: "PHÒNG TRỌ CAO CẤP GẦN LOTTE, RMIT, PMH, BV 24/24, HẦM ĐỂ XE, THANG MÁY, FREE MÁY GIẶT, WIFI, 3.5TR-6TR",
        price: "3.5 triệu/tháng",
        area: "25 m²",
        location: "Quận 7, Hồ Chí Minh",
        description: "Phòng trọ cao cấp 83 đường 49, phường Tân Quy, Q7 (đường Nguyễn Thị Thập- Lâm Văn Bền, đường số 49 bên trái)- Gần chợ Tân Mỹ, Phú Mỹ Hưng, ĐH RMIT...",
        poster: "Sunny",
        time: "Hôm nay",
        phone: "0903628959",
        rating: "Độ 5"
         },
        {
        id: 2,
        images: [img1, img2, img1, img2, img1],
        title: "PHÒNG TRỌ CAO CẤP GẦN LOTTE, RMIT, PMH, BV 24/24, HẦM ĐỂ XE, THANG MÁY, FREE MÁY GIẶT, WIFI, 3.5TR-6TR",
        price: "3.5 triệu/tháng",
        area: "25 m²",
        location: "Quận 7, Hồ Chí Minh",
        description: "Phòng trọ cao cấp 83 đường 49, phường Tân Quy, Q7 (đường Nguyễn Thị Thập- Lâm Văn Bền, đường số 49 bên trái)- Gần chợ Tân Mỹ, Phú Mỹ Hưng, ĐH RMIT...",
        poster: "Sunny",
        time: "Hôm nay",
        phone: "0903628959",
        rating: "Độ 5"
         },
        {
        id: 3,
        images: [img1, img2, img1, img2, img1],
        title: "PHÒNG TRỌ CAO CẤP GẦN LOTTE, RMIT, PMH, BV 24/24, HẦM ĐỂ XE, THANG MÁY, FREE MÁY GIẶT, WIFI, 3.5TR-6TR",
        price: "3.5 triệu/tháng",
        area: "25 m²",
        location: "Quận 7, Hồ Chí Minh",
        description: "Phòng trọ cao cấp 83 đường 49, phường Tân Quy, Q7 (đường Nguyễn Thị Thập- Lâm Văn Bền, đường số 49 bên trái)- Gần chợ Tân Mỹ, Phú Mỹ Hưng, ĐH RMIT...",
        poster: "Sunny",
        time: "Hôm nay",
        phone: "0903628959",
        rating: "Độ 5"
         }
    ];

    const posts = [
        {
        id: 1,
        title: "Tin nữ ở ghép 1:1. Mình là nữ đang là sv năm 2",
        price: "3.3 triệu/tháng",
        time: "32 phút trước",
        img: img1
        },
        {
        id: 2,
        title: "CHO THUÊ CĂN HỘ STUDIO CỬA SỔ THOÁNG, FULL NỘI...",
        price: "5.5 triệu/tháng",
        time: "44 phút trước",
        img: img2
        },
        {
        id: 3,
        title: "Phòng mới 100%, có thang máy 1tr6 đến 2tr3",
        price: "1.6 triệu/tháng",
        time: "1 giờ trước",
        img: img1,
        },
        {
        id: 4,
        title: "CHO THUÊ PHÒNG TRỌ GIÁ SIÊU RẺ",
        price: "3 triệu/tháng",
        time: "10 giờ trước",
        img: img2
        },
        {
        id: 5,
        title: "Gần khu vực cầu Sài Gòn Quận 2 trống sẵn căn ban công full...",
        price: "4.2 triệu/tháng",
        time: "12 giờ trước",
        img: img1
        }
    ];
    const districts = [
        { id: 'son-tra', name: 'Sơn Trà' },
        { id: 'hai-chau', name: 'Hải Châu' },
        { id: 'thanh-khe', name: 'Thanh Khê' },
        { id: 'lien-chieu', name: 'Liên Chiểu' },
        { id: 'cam-le', name: 'Cẩm Lệ' },
        { id: 'ngu-hanh-son', name: 'Ngũ Hành Sơn' },
        { id: 'hoa-vang', name: 'Hòa Vang' },
        { id: 'all', name: 'Tất cả' },
    ];
return (
    <div className="app">
        <div className="header">
            <h1>Kênh thông tin Phòng Trọ số 1 Đà Nẵng</h1>
            <p>Có 73.513 tin đăng cho thuê</p>
        </div>

        <div className="section">
            <h2 className="section-title">CÁC QUẬN Ở ĐÀ NẴNG</h2>
            <div className="district-grid">
                {districts.map(district => (
                <div 
                    key={district.id}
                    className={`district-item ${activeDistrict === district.id ? 'active' : ''}`}
                    onClick={() => setActiveDistrict(district.id)}
                >
                    {district.name}
                </div>
                ))}
            </div>
        </div>
        <div className="main-container">
            <div className="left-column">
                <div className="suggestion-section">
                    <h2>Đề xuất</h2>
                    <div className="suggestion-tabs">
                        <div 
                            className={`tab ${activeTab === 'new' ? 'active' : ''}`}
                            onClick={() => setActiveTab('new')}
                        >
                            Đề xuất
                        </div>
                        <div 
                            className={`tab ${activeTab === 'new' ? 'active' : ''}`}
                            onClick={() => setActiveTab('new')}
                        >
                            Mới đăng
                        </div>    
                        <div 
                            className={`tab ${activeTab === 'video' ? 'active' : ''}`}
                            onClick={() => setActiveTab('video')}
                        >
                            Có video
                        </div>
                    </div>
                </div>

                {featuredPost.map(item => (
                    <div key={item.id} className="featured-post">
                        <div className="featured-gallery">
                            <div className="main-image">
                                <img src={item.images[0]} alt="main" />
                            </div>
                            <div className="sub-images">
                                {item.images.slice(1, 4).map((img, idx) => (
                                <img key={idx} src={img} alt={`sub-${idx}`} />
                                ))}
                            </div>
                        </div>
                        <h3>{item.title}</h3>
                        <div className="post-details">
                            <span className="price">{item.price}</span> - 
                            <span className="area">{item.area}</span> - 
                            <span className="location">{item.location}</span>
                        </div>
                        <p className="description">{item.description}</p>
                        <div className="poster-info">
                            <div className="poster-name">{item.poster}</div>
                            <div className="poster-time">{item.time}</div>
                        </div>
                        <div className="phone">{item.phone}</div>
                    </div>
                ))}
            </div>

            <div className="main-content">
                <div className="filter-column">
                    <div className="filter-group">
                    <h3 className="filter-title">Xem theo khoảng giá</h3>
                    <ul className="filter-list">
                        <li className="filter-item">Dưới 1 triệu</li>
                        <li className="filter-item">Từ 1 - 2 triệu</li>
                        <li className="filter-item">Từ 2 - 3 triệu</li>
                        <li className="filter-item">Từ 3 - 5 triệu</li>
                        <li className="filter-item">Từ 5 - 7 triệu</li>
                        <li className="filter-item">Từ 7 - 10 triệu</li>
                        <li className="filter-item">Từ 10 - 15 triệu</li>
                        <li className="filter-item">Trên 15 triệu</li>
                    </ul>
                    </div>

                    <div className="filter-group">
                        <h3 className="filter-title">Xem theo diện tích</h3>
                        <ul className="filter-list">
                            <li className="filter-item">Dưới 20 m²</li>
                            <li className="filter-item">Từ 20 - 30m²</li>
                            <li className="filter-item">Từ 30 - 50m²</li>
                            <li className="filter-item">Từ 50 - 70m²</li>
                            <li className="filter-item">Từ 70 - 90m²</li>
                            <li className="filter-item">Trên 90m²</li>
                        </ul>
                    </div>
                </div>

                <div className="new-posts-section">
                    <h3>Tin mới đăng</h3>
                    <div className="new-posts">
                        {posts.map(post => (
                            <div key={post.id} className="new-post">
                                <img src={post.img} alt={post.img} className="post-image" />
                                <div className="post-info">
                                    <div className="post-title">{post.title}</div>
                                    <div className="post-price">{post.price}</div>
                                    <div className="post-time">{post.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        <div className="pagination">
            <button className="page-btn">« Trang trước</button>
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <button className="page-btn">4</button>
            <button className="page-btn">...</button>
            <button className="page-btn">»»</button>
            <button className="page-btn">Trang sau »</button>
            </div>
    </div>
  )
}
export default Home;