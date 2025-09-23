import axios, { isAxiosError } from 'axios';
import type { IFeature } from './Interface';
import axiosClient from './AxiosClient';

export const GetFeature = async (): Promise<IFeature[]> => {
    try {
        const response = await axiosClient.get<IFeature[]>("/api/v1/feature");
        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Không thể lấy thông tin Feature');
        }
        throw new Error('Không thể lấy thông tin Feature');
    }
}