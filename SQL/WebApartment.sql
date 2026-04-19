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

-- Bảng Category
CREATE TABLE Category (
    id INT PRIMARY KEY IDENTITY(1,1),
    category_name NVARCHAR(100)
);

-- Bảng Listing (Bài đăng)
CREATE TABLE Listing (
    id INT PRIMARY KEY IDENTITY(1,1),
    users_id INT FOREIGN KEY REFERENCES Users(id),
    category_id INT FOREIGN KEY REFERENCES Category(id),
    content NVARCHAR(MAX),
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