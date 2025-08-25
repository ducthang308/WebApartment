import axiosClient from "./AxiosClient";

import type { subscription } from './Interface';

export const getDepositHistory = async (
  token: string,
  userId: number
): Promise<subscription[]> => {
  try {
    const res = await axiosClient.get(`/api/v1/subscription/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Lỗi khi lấy lịch sử nạp tiền");
  }
};
