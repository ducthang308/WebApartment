import axios, { isAxiosError } from 'axios';
import type { IListingMediaDTO } from './Interface';
import axiosClient from './AxiosClient';


export const UploadListingMedia = async (listingId: number, files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
        formData.append("files", file); // backend nhận @RequestParam("files")
    });

    const response = await axiosClient.post(
        `/api/v1/listing/uploads/${listingId}`,
        formData,
        {
            headers: { "Content-Type": "multipart/form-data" },
        }
    );

    return response.data; // backend trả về List<ListingMediaDTO>
};

