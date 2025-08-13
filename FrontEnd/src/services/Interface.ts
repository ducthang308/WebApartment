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