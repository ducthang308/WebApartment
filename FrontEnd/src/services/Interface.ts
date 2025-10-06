export interface LoginResponse {
    token: string;
    id: number;
    phone_number: string;
    roles_id: number;
    address: string;
    full_name: string;
    status: boolean;
}

export interface IRegisterRequest {
    full_name: string;
    phone_number: string;
    password: string;
    retype_pass: string;
    roles_id: number;
}


export interface IRole {
    id: number;
    roleName: string;
}

export interface IUser {
    id: number;
    fullName: string;
    phone_number: string;
    password: string;
    address: string;
    status: boolean;
    phoneNumber: string;
    roles_id: number;
}

export interface ICategory {
    id: number;
    category_name: string;
}

export interface IProvince {
    id: number;
    provinceName: string;
}

export interface IDistrict {
    id: number;
    districtName: string;
    province: IProvince;
}

export interface IWard {
    id: number;
    wardName: string;
    district: IDistrict;
}

export interface IFeature {
    id: number;
    feature_name: string;
}

export interface IListing {
    id: number;
    user: IUser;
    category: ICategory;
    full_address: string;
    price: number;
    area_m2: number;
    title: string;
    description: string;
    posted_date: string;
    status: string;
    contact: string;
    form_of_payment: string;
}


export interface IListingRequest {
    id: number;
    users_id: number;
    category_id: number;
    full_address: string;
    price: number;
    area_m2: number;
    title: string;
    description: string;
    posted_date: string;
    status: string;
    contact: string;
    form_of_payment: string;
}

export interface IListingResponse {
    id: number;
    users_id: number;
    category_id: number;
    full_address: string;
    price: number;
    area_m2: number;
    title: string;
    description: string;
    posted_date: string;
    status: string;
    contact: string;
    form_of_payment: string;
}


export interface IListingFeatureDTO {
    listing_id: number;
    feature_id: number;
}

export interface IListingMediaDTO {
    listing_id: number;
    type: string;
    url: string;
    thumbnail_url: string;
    order_index: string;
}

export interface UploadedImage {
    id: string;
    url: string;
    type: "image" | "video";
    file: File;
}