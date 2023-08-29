import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

// to login user
export const checkIfUserExists = async (number) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/login/${number}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// to register user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/register`, userData);
    return response;
  } catch (error) {
    throw error;
  }
};

// to vendors list
export const vendorsList = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/vendor/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//profile update
export const userUpdate = async (id, userData, token) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/user/profile/update`,
      userData,
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

// to get wallet details
export const userWalletDetails = async (id, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/wallet`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// to get All the Coupons
export const getAllUserCoupons = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/coupon`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateUserInfo = async (token, formData) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/user/personalInfo/update`,
      formData,
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

export const getUserInfo = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/personalInfo`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
