import axios, { isAxiosError } from 'axios';
import type { IProvince } from './Interface';
import axiosClient from './AxiosClient';

export const GetProvince = async (): Promise<IProvince[]> => {
    try {
        const response = await axiosClient.get<IProvince[]>("/api/v1/province");
        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Không thể lấy thông tin Province');
        }
        throw new Error('Không thể lấy thông tin Province');
    }
}
