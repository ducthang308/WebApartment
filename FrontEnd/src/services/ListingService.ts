import axios from "axios";
import axiosClient from "./AxiosClient";
import type { IListing, IListingRequest } from "./Interface";

// Gửi data tạo Listing mới
export const PostListing = async (
    listingData: IListingRequest
): Promise<IListing> => {
    try {
        const response = await axiosClient.post<IListing>(
            "/api/v1/listing",
            listingData
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Không thể thêm bài đăng này");
    }
};
