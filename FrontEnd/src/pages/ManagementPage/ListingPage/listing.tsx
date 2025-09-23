import React, { useEffect, useRef, useState } from 'react';
import "./listing.css";
import { Select, Input } from 'antd';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import TextArea from 'antd/es/input/TextArea';
import { Checkbox, Col, Row } from 'antd';
import Image from "../../../assets/img/upload-image.png"
import Video from "../../../assets/img/upload-video.png"
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

import type { ICategory } from '../../../services/Interface';
import { GetCategory } from '../../../services/CategoryService';
import type { IProvince } from '../../../services/Interface';
import { GetProvince } from '../../../services/ProvinceService';
import type { IDistrict } from '../../../services/Interface';
import { GetDistrict } from '../../../services/DistrictService';
import type { IWard } from '../../../services/Interface';
import { GetWard } from '../../../services/WardService';
import type { IFeature } from '../../../services/Interface';
import { GetFeature } from '../../../services/FeatureService';
import type { IListing } from '../../../services/Interface';
import { PostListing } from '../../../services/ListingService';
import type { IListingFeatureDTO } from '../../../services/Interface';
import { PostListingFeature } from '../../../services/ListingFeatureService';
import { data } from 'react-router-dom';


interface UploadedImage {
    id: string;
    file: File;
    url: string;
}
interface IdataState {
    categories: ICategory[];
    provinces: IProvince[];
    districts: IDistrict[];
    wards: IWard[];
    features: IFeature[];
    listings: IListing[];
    listingFeatures: IListingFeatureDTO[];
}

const { Option } = Select;

const Listing = () => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [images, setImages] = useState<UploadedImage[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    const videoInputRef = useRef<HTMLInputElement | null>(null);
    const [video, setVideo] = useState<{ file: File; url: string } | null>(null);
    const [isUploadingVideo, setIsUploadingVideo] = useState(false);

    const [selectedFeatures, setSelectedFeatures] = useState<number[]>([]);

    const [dataState, setDataState] = useState<IdataState>({
        categories: [],
        provinces: [],
        districts: [],
        wards: [],
        features: [],
        listings: [],
        listingFeatures: [],
    });

    const [form, setForm] = useState({
        categoryId: null as number | null,
        fullAddress: "",
        title: "",
        description: "",
        area: 0,
        price: 0,
        paymentMethod: "",
        status: "",
        features: [] as number[]
    });



    const fetchCategories = async () => {
        try {
            const data = await GetCategory();
            console.log("Categories API:", data);
            setDataState(prev => ({ ...prev, categories: data }));
        } catch (err) {
            console.error("Lỗi khi load category:", err);
        }
    };

    const fetchProvinces = async () => {
        try {
            const data = await GetProvince();
            console.log("Provinces API:", data);
            setDataState(prev => ({ ...prev, provinces: data }));
        } catch (err) {
            console.error("Lỗi khi load Province:", err);
        }
    };

    const fetchDistricts = async () => {
        try {
            const data = await GetDistrict();
            console.log("Districts API:", data);
            setDataState(prev => ({ ...prev, districts: data }));
        } catch (err) {
            console.error("Lỗi khi load Districts:", err);
        }
    };

    const fetchWards = async () => {
        try {
            const data = await GetWard();
            console.log("Wards API:", data);
            setDataState(prev => ({ ...prev, wards: data }));
        } catch (err) {
            console.error("Lỗi khi load Wards:", err);
        }
    };

    const fetchFeatures = async () => {
        try {
            const data = await GetFeature();
            console.log("Features API:", data);
            setDataState(prev => ({ ...prev, features: data }));
        } catch (err) {
            console.error("Lỗi khi load Features:", err);
        }
    };

    const handleSubmit = async () => {
        try {
            const userId = Number(localStorage.getItem("userId"));
            const contact = localStorage.getItem("phone") || "";

            if (!userId || !contact) {
                alert("Không tìm thấy thông tin người dùng, vui lòng đăng nhập lại!");
                return;
            }

            const newListing = await PostListing({
                users_id: userId,
                category_id: form.categoryId ?? 0,
                full_address: form.fullAddress,
                price: form.price,
                area_m2: form.area,
                title: form.title,
                description: form.description,
                posted_date: new Date().toISOString(),
                status: form.status,
                contact: contact,
                form_of_payment: form.paymentMethod,
            });

            console.log("📌 Listing sau khi insert:", newListing);

            if (form.features && form.features.length > 0) {
                for (const featureId of form.features) {
                    await PostListingFeature({
                        listing_id: newListing.id,
                        feature_id: featureId,
                    });
                }
            }

            alert("✅ Đăng tin thành công!");
        } catch (err) {
            console.error("❌ Lỗi khi đăng tin:", err);
            alert("Có lỗi khi đăng tin, vui lòng thử lại");
        }
    };




    useEffect(() => {
        fetchCategories();
        fetchProvinces();
        fetchDistricts();
        fetchWards();
        fetchFeatures();
    }, []);


    const handleSelectVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Giới hạn dung lượng nếu cần
        if (file.size > 50 * 1024 * 1024) { // 50MB
            alert("Video quá lớn. Vui lòng chọn video dưới 50MB.");
            return;
        }

        const url = URL.createObjectURL(file);
        setVideo({ file, url });
        setIsUploadingVideo(false);
    };



    const handleSelectImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const fileURLs: UploadedImage[] = files.map((file) => ({
            id: Math.random().toString(36).substr(2, 9),
            file,
            url: URL.createObjectURL(file),
        }));

        // ✅ Giới hạn 20 ảnh
        if (images.length + fileURLs.length > 20) {
            alert("Bạn chỉ được tải tối đa 20 ảnh!");
            return;
        }

        setImages((prev) => [...prev, ...fileURLs]);
        setIsUploading(false);
    };

    const handleRemove = (id: string) => {
        setImages((prev) => prev.filter((img) => img.id !== id));
    };

    useEffect(() => {
        if (!mapRef.current || mapInstanceRef.current) return;

        // 🎯 Tọa độ Đà Nẵng
        const danangLatLng: [number, number] = [16.047079, 108.206230];

        const map = L.map(mapRef.current).setView(danangLatLng, 13);
        mapInstanceRef.current = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
        }).addTo(map);

        const marker = L.marker(danangLatLng).addTo(map);

        map.on('click', function (e) {
            const { lat, lng } = e.latlng;
            marker.setLatLng([lat, lng]);
            console.log("Tọa độ được chọn:", lat, lng);
        });
    }, []);


    return (
        <div className="container-listing">
            <div className="category-listing">
                <div className="title-listing">Loại chuyên mục</div>
                <div className="form-group-listing">
                    <label className="label" htmlFor="category">
                        Loại chuyên mục <span className="required">(*)</span>
                    </label>
                    <Select
                        placeholder="-- Chọn loại chuyên mục --"
                        style={{ width: '50%' }}
                        size="large"
                        allowClear
                        options={dataState.categories.map(c => ({
                            value: c.id,
                            label: c.category_name
                        }))}
                        value={form.categoryId || undefined}
                        onChange={(value) =>
                            setForm((prev) => ({ ...prev, categoryId: value }))
                        }
                    />
                </div>
            </div>

            <div className="area-listing">
                <div className="title-listing">Khu vực</div>

                <div className="area-select">
                    <div className="area-left">
                        <div className="form-group-listing">
                            <label className="label" htmlFor="category">
                                Tỉnh/Thành phố <span className="required">(*)</span>
                            </label>
                            <Select
                                className="select-listing"
                                placeholder="-- Chọn tỉnh/thành phố --"
                                size="large"
                                allowClear
                                options={dataState.provinces.map(p => ({
                                    value: p.id,
                                    label: p.provinceName
                                }))}
                            />
                        </div>

                        <div className="form-group-listing">
                            <label className="label" htmlFor="category">
                                Phường/Xã
                            </label>
                            <Select
                                className="select-listing"
                                placeholder="-- Chọn phường/xã --"
                                size="large"
                                allowClear
                                options={dataState.wards?.map(w => ({
                                    value: w.id,
                                    label: w.wardName
                                })) || []}
                            />
                        </div>
                    </div>

                    <div className="area-right">
                        <div className="form-group-listing">
                            <label className="label" htmlFor="category">
                                Quận/Huyện <span className="required">(*)</span>
                            </label>
                            <Select
                                className="select-listing"
                                placeholder="-- Chọn loại chuyên mục --"
                                size="large"
                                allowClear
                                options={dataState.districts?.map(d => ({
                                    value: d.id,
                                    label: d.districtName
                                })) || []}
                            />
                        </div>

                        <div className="form-group-listing">
                            <label className="label" htmlFor="category">
                                Địa chỉ cụ thể
                            </label>
                            <Input
                                type="text"
                                className="input-height"
                                id="address"
                                name="address"
                                placeholder="Nhập địa chỉ"
                                required
                                value={form.fullAddress}
                                onChange={(e) =>
                                    setForm((prev) => ({ ...prev, fullAddress: e.target.value }))
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="map-listing">
                <div className="title-listing">Bản đồ</div>
                <div ref={mapRef} id="map" style={{ height: "400px", width: "100%" }}></div>
            </div>

            <div className="detail-listing">
                <div className="title-listing">Thông tin mô tả</div>
                <div className="form-group-listing">
                    <label className="label" htmlFor="title">
                        Tiêu đề <span className="required">(*)</span>
                    </label>
                    <TextArea
                        id="title"
                        rows={2}
                        value={form.title}
                        onChange={(e) =>
                            setForm((prev) => ({ ...prev, title: e.target.value }))
                        }
                    />
                </div>
                <div className="form-group-listing gap">
                    <label className="label" htmlFor="description">
                        Nội dung mô tả <span className="required">(*)</span>
                    </label>
                    <TextArea
                        id="description"
                        rows={10}
                        value={form.description}
                        onChange={(e) =>
                            setForm((prev) => ({ ...prev, description: e.target.value }))
                        }
                    />
                </div>
                <div className="form-group-listing gap">
                    <label className="label" htmlFor="price">
                        Giá cho thuê <span className="required">(*)</span>
                    </label>
                    <Input
                        id="price"
                        className="input-height input-width"
                        placeholder="Nhập giá thuê"
                        type="number"
                        value={form.price || ""}
                        onChange={(e) =>
                            setForm((prev) => ({ ...prev, price: Number(e.target.value) }))
                        }
                    />
                    <span className="listing-span">
                        Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000
                    </span>
                </div>

                <div className="form-group-listing gap">
                    <label className="label" htmlFor="paymentMethod">
                        Phương thức thanh toán <span className="required">(*)</span>
                    </label>
                    <Input
                        id="paymentMethod"
                        className="input-height input-width"
                        placeholder="Nhập phương thức thanh toán"
                        value={form.paymentMethod}
                        onChange={(e) =>
                            setForm((prev) => ({ ...prev, paymentMethod: e.target.value }))
                        }
                    />
                </div>

                <div className="form-group-listing gap">
                    <label className="label" htmlFor="area">
                        Diện tích <span className="required">(*)</span>
                    </label>
                    <Input
                        id="area"
                        className="input-height input-width"
                        placeholder="Nhập diện tích"
                        type="number"
                        value={form.area || ""}
                        onChange={(e) =>
                            setForm((prev) => ({ ...prev, area: Number(e.target.value) }))
                        }
                    />
                    <span className="listing-span">
                        Đơn vị tính: m<sup>2</sup>
                    </span>
                </div>
                <div className="form-group-listing gap">
                    <label className="label" htmlFor="area">
                        Trạng thái <span className="required">(*)</span>
                    </label>
                    <Input
                        id="area"
                        className="input-height input-width"
                        placeholder="Nhập tình trạng phòng"
                        type="text"
                        value={form.status || ""}
                        onChange={(e) =>
                            setForm((prev) => ({ ...prev, status: e.target.value }))
                        }
                    />
                    <span className="listing-span">
                        Trống sẵn hoặc ngày trống
                    </span>
                </div>
            </div>

            <div className="features-listing">
                <div className="title-listing">Điểm nổi bật</div>
                <Checkbox.Group
                    style={{ width: '100%' }}
                    value={selectedFeatures}
                    onChange={(values) => setSelectedFeatures(values as number[])} >

                    <Row gutter={[16, 16]}> {dataState.features.map((f) =>
                    (<Col span={8} key={f.id}>
                        <Checkbox value={f.id}>{f.feature_name}</Checkbox>
                    </Col>))}
                    </Row>
                </Checkbox.Group>
            </div>

            <div className="img-listing">
                <div className="title-listing">Hình ảnh</div>

                {/* Khu vực upload ảnh */}
                <div className="browse_photos" onClick={() => fileInputRef.current?.click()}>
                    <div className="upload-image">
                        <img className="icon-upload-image" src={Image} alt="upload icon" />
                        <span className="upload-text">{isUploading ? 'Đang đăng hình...' : 'Tải ảnh từ thiết bị'}</span>
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleSelectImages}
                        multiple
                        accept="image/*"
                        style={{ display: 'none' }}
                    />
                </div>

                {/* Ghi chú upload */}
                <div className="note-span">
                    <span className="listing-span">• Tải lên tối đa 20 ảnh trong một bài đăng</span>
                    <span className="listing-span">• Dung lượng ảnh tối đa 10MB</span>
                    <span className="listing-span">• Hình ảnh phải liên quan đến phòng trọ, nhà cho thuê</span>
                    <span className="listing-span">• Không chèn văn bản, số điện thoại lên ảnh</span>
                </div>

                {/* Danh sách ảnh đã chọn */}
                <div className="image-grid">
                    {images.map((img) => (
                        <div key={img.id} className="image-card">
                            <img src={img.url} alt="preview" />
                            <button onClick={() => handleRemove(img.id)} className="delete-btn">🗑️ Xóa</button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="video-listing">
                <div className="title-listing">Video</div>

                <div className="browse_photos" onClick={() => videoInputRef.current?.click()}>
                    <div className="upload-image">
                        <img className="icon-upload-image" src={Video} alt="upload icon" />
                        <span className="upload-text">
                            {isUploadingVideo ? "Đang đăng video..." : video ? "Thay đổi video" : "Tải video từ thiết bị"}
                        </span>
                    </div>
                    <input
                        type="file"
                        ref={videoInputRef}
                        onChange={handleSelectVideo}
                        accept="video/*"
                        style={{ display: "none" }}
                    />
                </div>

                {video && (
                    <div className="video-preview">
                        <video controls width="100%" src={video.url} />
                        <button onClick={() => setVideo(null)} className="delete-btn">🗑️ Xóa video</button>
                    </div>
                )}
            </div>

            <div className="contact-listing">
                <div className="title-listing">Thông tin liên hệ</div>
                <div className="contact-flex">
                    <div className="form-group-listing">
                        <label className="label" htmlFor="category">
                            Họ Tên
                        </label>
                        <Input
                            className='input-height'
                            placeholder="Nguyễn Đức Thắng"
                            value="Nguyễn Đức Thắng"
                            readOnly
                            onChange={() => { }}
                        />
                    </div>
                    <div className="form-group-listing">
                        <label className="label" htmlFor="category">
                            Số điện thoại
                        </label>
                        <Input
                            className="input-height"
                            placeholder="0325043590"
                            value="0325043590"
                            readOnly
                            onChange={() => { }}
                        />
                    </div>
                </div>
            </div>

            <div className="button-listing">
                <Button
                    type="primary"
                    className="continue-btn"
                    icon={<ArrowRightOutlined />}
                    iconPosition="end"
                    block
                    onClick={handleSubmit}
                >
                    Tiếp tục
                </Button>
            </div>
        </div>
    )
}

export default Listing