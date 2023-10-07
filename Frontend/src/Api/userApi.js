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

// to get vendors list
export const vendorsList = async (page,token) => {
  console.warn(page,token)
  try {
    const response = await axios.get(`${BASE_URL}/user/vendor/list?page=${page}`, {
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
export const userUpdate = async (token, userData) => {
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
export const userWalletDetails = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/user/wallet`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//dashboard points
export const getDashboardUserPoint = async (token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/user/points`,
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

//dashboard graph for user
export const getDashboardGraphUser = async (token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/admin/payment/coupon/user/month-data`,
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

// to update user info
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

// to get user info
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

// get all coupons for user
export const getAllCouponsForUser = async (page,token) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/coupons/usercoupon?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to get all products user
export const getAllProductForUser = async (page,token) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/product/get/user?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to get all products for perticular vendor
export const getAllProductForPerticularVendor = async (id,page,token) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/product/user/${id}?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};


//search product Name
export const searchProduct = async (name,page,token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/admin/product/product/${name}?page=${page}`,
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

//search vendor Name
export const searchPersonalVendorProduct = async (id,name,page,token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/admin/product/product/${id}/${name}?page=${page}`,
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

//notification Count
export const userNotificationCount = async (token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/notification/unread-count/user`,
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

//notification read
export const userNotificationRead = async (token) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/notification/mark-as-read/user`,null,
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