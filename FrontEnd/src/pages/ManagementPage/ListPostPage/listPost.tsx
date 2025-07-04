import { Button, Input, Tag } from "antd";
import { SearchOutlined, CameraOutlined } from "@ant-design/icons";
import "./listPost.css";

const posts = [
    {
        id: 1,
        title: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        price: "1.001 đồng/tháng",
        area: "11 m²",
        location: "Cho thuê căn hộ Quận Hải Châu, Đà Nẵng",
        postId: "685701",
        thumbnail: "https://via.placeholder.com/120x100.png?text=Ảnh+Tin",
        imageCount: 2,
        status: "CHỜ THANH TOÁN",
        type: "CĂN HỘ"
    },
    {
        id: 2,
        title: "Chính chủ cho thuê phòng trọ mới xây 100%",
        price: "2.500.000 đồng/tháng",
        area: "18 m²",
        location: "Quận Sơn Trà, Đà Nẵng",
        postId: "685702",
        thumbnail: "https://via.placeholder.com/120x100.png?text=Ảnh+Tin",
        imageCount: 3,
        status: "CHỜ THANH TOÁN",
        type: "PHÒNG TRỌ"
    },
    {
        id: 3,
        title: "Cho thuê mặt bằng tầng trệt trung tâm thành phố",
        price: "10.000.000 đồng/tháng",
        area: "50 m²",
        location: "Quận Thanh Khê, Đà Nẵng",
        postId: "685703",
        thumbnail: "https://via.placeholder.com/120x100.png?text=Ảnh+Tin",
        imageCount: 4,
        status: "CHỜ THANH TOÁN",
        type: "MẶT BẰNG"
    },
    {
        id: 4,
        title: "Cho thuê căn hộ studio đầy đủ nội thất",
        price: "5.000.000 đồng/tháng",
        area: "25 m²",
        location: "Quận Ngũ Hành Sơn, Đà Nẵng",
        postId: "685704",
        thumbnail: "https://via.placeholder.com/120x100.png?text=Ảnh+Tin",
        imageCount: 1,
        status: "CHỜ THANH TOÁN",
        type: "CĂN HỘ"
    },
    {
        id: 5,
        title: "Phòng trọ mới xây gần trường đại học",
        price: "1.800.000 đồng/tháng",
        area: "16 m²",
        location: "Quận Liên Chiểu, Đà Nẵng",
        postId: "685705",
        thumbnail: "https://via.placeholder.com/120x100.png?text=Ảnh+Tin",
        imageCount: 2,
        status: "CHỜ THANH TOÁN",
        type: "PHÒNG TRỌ"
    }
];


const ListPost = () => {
    return (
        <div className="post-container">
            {/* Input tìm kiếm */}
            <Input
                className="search-input-post"
                placeholder="Tìm theo mã tin hoặc tiêu đề"
                prefix={<SearchOutlined />}
            />

            {/* Danh sách bài đăng */}
            <div className="list-container">
                {posts.map(post => (
                    <div key={post.id} className="post-card">
                        <div className="post-thumbnail">
                            <img src={post.thumbnail} alt="thumbnail" />
                            <div className="post-overlay">
                                <Tag color="yellow">{post.status}</Tag>
                            </div>
                            <div className="post-camera-icon">
                                <CameraOutlined />
                                <span>{post.imageCount}</span>
                            </div>
                        </div>

                        <div className="post-info">
                            <div className="post-badge">
                                <Tag color="blue">{post.type}</Tag>
                            </div>
                            <div className="post-title">{post.title}</div>
                            <div className="post-meta">
                                <span className="post-price">{post.price}</span> •{" "}
                                <span className="post-size">{post.area}</span> •{" "}
                                <span>{post.location}</span>
                            </div>
                            <div className="post-details">
                                <span>Mã tin <strong>{post.postId}</strong></span> &nbsp;&nbsp; | &nbsp;&nbsp;
                                <span>Ngày bắt đầu: -</span> &nbsp;&nbsp; | &nbsp;&nbsp;
                                <span>Ngày kết thúc: -</span>
                            </div>
                        </div>

                        <div className="post-actions">
                            <div className="post-status">Chờ thanh toán</div>
                            <Button type="primary" danger>Thanh toán tin</Button>
                            <Button style={{ marginTop: 8 }}>Sửa tin</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListPost;
