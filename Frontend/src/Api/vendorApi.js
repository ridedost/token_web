import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

export const allSendRequestForVendor = async (token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/admin/vendor/recieved/request`,
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
