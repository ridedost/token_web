import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

export const allSendRequestForVendor = async (page,token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/admin/vendor/recieved/request?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
