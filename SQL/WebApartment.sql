CREATE DATABASE WebApartment;
GO

USE WebApartment;
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

-- Bảng Category
CREATE TABLE Category (
    id INT PRIMARY KEY IDENTITY(1,1),
    category_name NVARCHAR(100)
);

-- Bảng Listing (Bài đăng)
CREATE TABLE Listing (
    id INT PRIMARY KEY IDENTITY(1,1),
    users_id INT FOREIGN KEY REFERENCES Users(id),
    ward_id INT FOREIGN KEY REFERENCES Ward(id),
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
(N'Sales'),
(N'Owner'),
(N'Admin');

INSERT INTO Province (province_name)
VALUES 
(N'Đà Nẵng');

INSERT INTO District (province_id, district_name)
VALUES 
(1, N'Hải Châu'),
(1, N'Thanh Khê'),
(1, N'Sơn Trà'),
(1, N'Ngũ Hành Sơn'),
(1, N'Liên Chiểu'),
(1, N'Cẩm Lệ');

INSERT INTO Ward (district_id, ward_name)
VALUES 
(1, N'Hải Châu 1'),
(1, N'Hải Châu 2'),
(1, N'Thạch Thang'),
(1, N'Thanh Bình'),
(1, N'Thuận Phước'),
(1, N'Hòa Thuận Đông'),
(1, N'Hòa Thuận Tây'),
(1, N'Nam Dương'),
(1, N'Phước Ninh'),
(1, N'Bình Thuận'),
(1, N'Bình Hiên'),
(1, N'Hòa Cường Bắc'),
(1, N'Hòa Cường Nam'),
(2, N'An Khê'),
(2, N'Chính Gián'),
(2, N'Thạc Gián'),
(2, N'Thanh Khê Đông'),
(2, N'Thanh Khê Tây'),
(2, N'Xuân Hà'),
(2, N'Thanh Khê 1'),
(2, N'Thanh Khê 2'),
(2, N'An Khê'),
(3, N'An Hải Bắc'),
(3, N'An Hải Đông'),
(3, N'An Hải Tây'),
(3, N'Mân Thái'),
(3, N'Nại Hiên Đông'),
(3, N'Phước Mỹ'),
(3, N'Thọ Quang'),
(4, N'Mỹ An'),
(4, N'Khuê Mỹ'),
(4, N'Hòa Hải'),
(4, N'Hòa Quý'),
(5, N'Hòa Khánh Nam'),
(5, N'Hòa Khánh Bắc'),
(5, N'Hòa Hiệp Bắc'),
(5, N'Hòa Hiệp Nam'),
(6, N'Khuê Trung'),
(6, N'Hòa Thọ Đông'),
(6, N'Hòa Thọ Tây'),
(6, N'Hòa An'),
(6, N'Hòa Phát'),
(6, N'Hòa Xuân');
