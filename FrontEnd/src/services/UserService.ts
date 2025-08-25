import axios, { isAxiosError } from 'axios';
import type { LoginResponse } from './Interface';
import axiosClient from './AxiosClient';
import type { IRegisterRequest } from './Interface';

export const login = async (phone_number: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await axiosClient.post<LoginResponse>('/api/v1/user/login', {
            phone_number,
            password
        });
        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Đăng nhập thất bại');
        }
        throw new Error('Đăng nhập thất bại');
    }
};

export const register = async (userData: IRegisterRequest): Promise<IRegisterRequest> => {
    try {
        const response = await axiosClient.post<IRegisterRequest>('/api/v1/user/register', userData);
        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Đăng ký thất bại');
        }
        throw new Error('Đăng ký thất bại');
    }
};

export const getUserById = async (id: number, token: string) => {
  try {
    const res = await axiosClient.get(`/api/v1/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("API Error:", error.response.data);
      throw new Error(error.response.data?.message || "Lỗi khi lấy thông tin người dùng");
    } else {
      console.error("Unexpected Error:", error);
      throw new Error("Có lỗi không xác định xảy ra");
    }
  }
};

export const uploadUserAvatar = async (file: File, token: string) => {
  try {
    const formData = new FormData();
    formData.append("avatar", file);

    const res = await axiosClient.post(`/api/v1/user/avatar`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("API Error:", error.response.data);
      throw new Error(error.response.data?.message || "Lỗi khi tải ảnh đại diện");
    } else {
      console.error("Unexpected Error:", error);
      throw new Error("Có lỗi không xác định xảy ra");
    }
  }
};

export const updatePassword = async (
  userId: number,
  oldPassword: string,
  newPassword: string,
  retypePassword: string,
  token: string
) => {
  try {
    const payload = {
      password: oldPassword,
      new_pass: newPassword,
      retype_pass: retypePassword
    };
    const res = await axiosClient.put(`/api/v1/user/password/${userId}`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (error: any) {
    console.error("API Error:", error);
    throw new Error(error.response?.data?.message || "Cập nhật mật khẩu thất bại");
  }
};

export const updateUserInformation = async (token: string, id: number, data: any) => {
  try {
    const res = await axiosClient.put(`/api/v1/user/${id}`, data, {
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    console.log("Cập nhật thành công:", res.data);
    return res.data;
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    throw error;
  }
};