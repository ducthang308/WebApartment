import axios from "axios";
import axiosClient from "./AxiosClient";
import type { IListingRequest, IListingResponse } from "./Interface";

export const PostListing = async (
    userData: IListingRequest
): Promise<IListingResponse> => {
    try {
        const response = await axiosClient.post('/api/v1/listing', userData);

        let parsedData: any;

        if (typeof response.data === "string") {
            try {
                parsedData = JSON.parse(response.data); // parse JSON string
            } catch (e) {
                console.error("❌ JSON.parse error:", e);
                throw new Error("Phản hồi từ server không hợp lệ");
            }
        } else {
            parsedData = response.data; // nếu đã là object
        }
        return parsedData as IListingResponse;
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Không thể tạo listing');
        }
        throw new Error('Không thể tạo listing');
    }
};




