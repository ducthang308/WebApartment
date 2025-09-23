import axios, { isAxiosError } from 'axios';
import type { IListingFeatureDTO } from './Interface';
import axiosClient from './AxiosClient';


export const PostListingFeature = async (userData: IListingFeatureDTO): Promise<IListingFeatureDTO> => {
    try {
        const response = await axiosClient.post<IListingFeatureDTO>('/api/v1/listingFeature', userData);
        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Không thể thêm');
        }
        throw new Error('Không thể thêm');
    }
};
