import axios, { isAxiosError } from 'axios';
import type { IWard } from './Interface';
import axiosClient from './AxiosClient';

export const GetWard = async (): Promise<IWard[]> => {
    try {
        const response = await axiosClient.get<IWard[]>("/api/v1/ward");
        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Không thể lấy thông tin Ward');
        }
        throw new Error('Không thể lấy thông tin Ward');
    }
}