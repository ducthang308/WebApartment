import axios, { isAxiosError } from 'axios';
import type { IDistrict } from './Interface';
import axiosClient from './AxiosClient';

export const GetDistrict = async (): Promise<IDistrict[]> => {
    try {
        const response = await axiosClient.get<IDistrict[]>("/api/v1/district");
        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Không thể lấy thông tin District');
        }
        throw new Error('Không thể lấy thông tin District');
    }
}
