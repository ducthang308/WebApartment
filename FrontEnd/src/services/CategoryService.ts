import axios, { isAxiosError } from 'axios';
import type { ICategory } from './Interface';
import axiosClient from './AxiosClient';

export const GetCategory = async (): Promise<ICategory[]> => {
    try {
        const response = await axiosClient.get<ICategory[]>("/api/v1/category");
        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Không thể lấy thông tin Category');
        }
        throw new Error('Không thể lấy thông tin Category');
    }
}
