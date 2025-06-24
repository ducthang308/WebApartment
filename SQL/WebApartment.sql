CREATE DATABASE qlPhongTro;
GO

USE qlPhongTro;
GO

-- Bảng Role
CREATE TABLE Role (
    id INT PRIMARY KEY IDENTITY(1,1),
    role_name NVARCHAR(100) NOT NULL
);

-- Bảng Users
CREATE TABLE Users (
    id INT PRIMARY KEY IDENTITY(1,1),
    full_name NVARCHAR(100),
    address NVARCHAR(255),
    phone_number NVARCHAR(20) UNIQUE,
    status BIT,
    password NVARCHAR(255),
    facebook_account VARCHAR(255),
    google_account VARCHAR(255),
    profile_image NVARCHAR(255),
    role_id INT FOREIGN KEY REFERENCES Role(id)
);

-- Bảng Province
CREATE TABLE Province (
    id INT PRIMARY KEY IDENTITY(1,1),
    province_name NVARCHAR(100)
);

-- Bảng District
CREATE TABLE District (
    id INT PRIMARY KEY IDENTITY(1,1),
    province_id INT FOREIGN KEY REFERENCES Province(id),
    district_name NVARCHAR(100)
);

-- Bảng Ward
CREATE TABLE Ward (
    id INT PRIMARY KEY IDENTITY(1,1),
    district_id INT FOREIGN KEY REFERENCES District(id),
    ward_name NVARCHAR(100)
);

-- Bảng Street
CREATE TABLE Street (
    id INT PRIMARY KEY IDENTITY(1,1),
    ward_id INT FOREIGN KEY REFERENCES Ward(id),
    street_name NVARCHAR(100)
);

-- Bảng Category
CREATE TABLE Category (
    id INT PRIMARY KEY IDENTITY(1,1),
    category_name NVARCHAR(100)
);

-- Bảng Listing (Bài đăng)
CREATE TABLE Listing (
    id INT PRIMARY KEY IDENTITY(1,1),
    users_id INT FOREIGN KEY REFERENCES Users(id),
    street_id INT FOREIGN KEY REFERENCES Street(id),
    category_id INT FOREIGN KEY REFERENCES Category(id),
    full_address NVARCHAR(255),
    price DECIMAL(18,2),
    area_m2 FLOAT,
    title NVARCHAR(255),
    description NVARCHAR(MAX),
    posted_date DATETIME,
    status NVARCHAR(100), -- VD: "hết hạn", "đang hiển thị"
    contact NVARCHAR(100),
    form_of_payment NVARCHAR(100)
);

-- Bảng Favorite_Listings
CREATE TABLE Favorite_Listings (
    users_id INT,
    listing_id INT,
    created_at DATETIME DEFAULT GETDATE(),
    PRIMARY KEY (users_id, listing_id),
    FOREIGN KEY (users_id) REFERENCES Users(id),
    FOREIGN KEY (listing_id) REFERENCES Listing(id)
);

-- Bảng Feature (tiện ích)
CREATE TABLE Feature (
    id INT PRIMARY KEY IDENTITY(1,1),
    feature_name NVARCHAR(100)
);

-- Bảng Listing_Feature (liên kết nhiều-nhiều giữa Listing và Feature)
CREATE TABLE Listing_Feature (
    listing_id INT,
    feature_id INT,
    PRIMARY KEY (listing_id, feature_id),
    FOREIGN KEY (listing_id) REFERENCES Listing(id),
    FOREIGN KEY (feature_id) REFERENCES Feature(id)
);

-- Bảng Listing_Media (hình ảnh/video bài đăng)
CREATE TABLE Listing_Media (
    id INT PRIMARY KEY IDENTITY(1,1),
    listing_id INT FOREIGN KEY REFERENCES Listing(id),
    type NVARCHAR(50), -- video hoặc image
    url NVARCHAR(255),
    thumbnail_url NVARCHAR(255),
    order_index INT
);

-- Bảng Payment_Method
CREATE TABLE Payment_Method (
    id INT PRIMARY KEY IDENTITY(1,1),
    name_method NVARCHAR(100),
    payment_description NVARCHAR(255)
);

-- Bảng Subscription (Thanh toán định kỳ)
CREATE TABLE Subscription (
    id INT PRIMARY KEY IDENTITY(1,1),
    users_id INT FOREIGN KEY REFERENCES Users(id),
    payment_id INT FOREIGN KEY REFERENCES Payment_Method(id),
    start_date DATE,
    end_date DATE,
    amount DECIMAL(18,2),
    status NVARCHAR(100), -- VD: "hết hạn", "đang hoạt động"
    created_at DATETIME DEFAULT GETDATE()
);

-- Bảng Statistic
CREATE TABLE Statistic (
    id INT PRIMARY KEY IDENTITY(1,1),
    total_users INT,
    total_listing INT,
    monthly_visits INT
);


INSERT INTO Role (role_name) VALUES
(N'Người dùng'),
(N'Chủ trọ'),
(N'Admin');

INSERT INTO Users (full_name, address, phone_number, status, password, facebook_account, google_account, profile_image, role_id)
VALUES
(N'Nguyễn Văn A', N'Hà Nội', '0900000001', 1, 'passA', 'fb.com/a', 'gg.com/a', 'img1.jpg', 1),
(N'Trần Thị B', N'Hồ Chí Minh', '0900000002', 1, 'passB', 'fb.com/b', 'gg.com/b', 'img2.jpg', 2),
(N'Lê Văn C', N'Đà Nẵng', '0900000003', 1, 'passC', NULL, 'gg.com/c', NULL, 2),
(N'Phạm Thị D', N'Huế', '0900000004', 0, 'passD', 'fb.com/d', NULL, 'img4.jpg', 3),
(N'Ngô Văn E', N'Bình Dương', '0900000005', 1, 'passE', NULL, NULL, NULL, 3);

-- Province
INSERT INTO Province (province_name) VALUES
(N'Hà Nội'), (N'Hồ Chí Minh'), (N'Đà Nẵng'), (N'Bình Dương'), (N'Hải Phòng');

-- District
INSERT INTO District (province_id, district_name) VALUES
(1, N'Ba Đình'), (1, N'Cầu Giấy'), (2, N'Quận 1'), (3, N'Hải Châu'), (4, N'Thủ Dầu Một');

-- Ward
INSERT INTO Ward (district_id, ward_name) VALUES
(1, N'Phúc Xá'), (2, N'Dịch Vọng'), (3, N'Bến Nghé'), (4, N'Hòa Thuận'), (5, N'Hiệp Thành');

-- Street
INSERT INTO Street (ward_id, street_name) VALUES
(1, N'Đội Cấn'), (2, N'Xuân Thủy'), (3, N'Nguyễn Huệ'), (4, N'2/9'), (5, N'Phú Lợi');

INSERT INTO Category (category_name) VALUES
(N'Phòng trọ'),
(N'Chung cư mini'),
(N'Căn hộ dịch vụ'),
(N'Nhà nguyên căn'),
(N'Ký túc xá');

INSERT INTO Listing (users_id, street_id, category_id, full_address, price, area_m2, title, description, posted_date, status, contact, form_of_payment)
VALUES
(1, 1, 1, N'123 Đội Cấn, Hà Nội', 2500000, 20, N'Phòng đẹp giá rẻ', N'Phòng gần trung tâm', GETDATE(), N'Đang hiển thị', '0900000001', N'Tiền mặt'),
(2, 2, 2, N'234 Xuân Thủy, Hà Nội', 3500000, 25, N'Chung cư mini', N'Tiện nghi đầy đủ', GETDATE(), N'Đang hiển thị', '0900000002', N'Chuyển khoản'),
(3, 3, 3, N'89 Nguyễn Huệ, TP HCM', 5000000, 35, N'Căn hộ tiện nghi', N'Ngay trung tâm Q1', GETDATE(), N'Đã ẩn', '0900000003', N'Tiền mặt'),
(4, 4, 4, N'456 Đường 2/9, Đà Nẵng', 2200000, 18, N'Phòng rẻ ĐN', N'Gần trường ĐH BK', GETDATE(), N'Đang hiển thị', '0900000004', N'Tiền mặt'),
(5, 5, 5, N'12 Phú Lợi, Bình Dương', 1800000, 15, N'Phòng giá rẻ BD', N'Trong KTX', GETDATE(), N'Đang hiển thị', '0900000005', N'Chuyển khoản');

INSERT INTO Favorite_Listings (users_id, listing_id)
VALUES
(1, 2),
(1, 3),
(2, 1),
(3, 4),
(4, 5);

-- Feature
INSERT INTO Feature (feature_name) VALUES
(N'Máy lạnh'), (N'Máy giặt'), (N'Thang máy'), (N'Ban công'), (N'Chỗ để xe');

-- Listing_Feature
INSERT INTO Listing_Feature (listing_id, feature_id) VALUES
(1, 1), (1, 3),
(2, 2), (2, 4),
(3, 1), (3, 5),
(4, 3), (5, 2);

INSERT INTO Listing_Media (listing_id, type, url, thumbnail_url, order_index)
VALUES
(1, 'image', 'img1.jpg', NULL, 1),
(1, 'video', 'video1.mp4', 'thumb1.jpg', 2),
(2, 'image', 'img2.jpg', NULL, 1),
(3, 'image', 'img3.jpg', NULL, 1),
(4, 'image', 'img4.jpg', NULL, 1);

-- Payment_Method
INSERT INTO Payment_Method (name_method, payment_description) VALUES
(N'Tiền mặt', N'Thanh toán trực tiếp'),
(N'Chuyển khoản', N'Thanh toán ngân hàng'),
(N'Momo', N'Ví điện tử'),
(N'ZaloPay', N'Ví điện tử'),
(N'Paypal', N'Thanh toán quốc tế');

-- Subscription
INSERT INTO Subscription (users_id, payment_id, start_date, end_date, amount, status)
VALUES
(1, 1, '2025-01-01', '2025-12-31', 500000, N'Còn hạn'),
(2, 2, '2025-02-01', '2025-11-30', 400000, N'Còn hạn'),
(3, 3, '2025-01-15', '2025-06-30', 300000, N'Hết hạn'),
(4, 1, '2025-03-01', '2025-12-01', 450000, N'Còn hạn'),
(5, 4, '2025-05-01', '2025-10-31', 350000, N'Còn hạn');

select * from users
select * from Favorite_Listings
select * from Listing