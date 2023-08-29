import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

//to check if admin is exists
export const checkIfAdminExists = async (number) => {
  console.warn(BASE_URL);
  try {
    const response = await axios.post(`${BASE_URL}/admin/login/${number}`);
    return response;
  } catch (error) {
    throw error;
  }
};

//admin register
export const addVendor = async (userData, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/add`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// get all vendors
export const getAllVendors = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/vendor`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    // console.warn(error);
    console.log(error);
    return { status: false };
    // throw error;
  }
};

// get all coupons
export const getAllCoupons = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/coupons`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to update admin
export const adminUpdate = async (id, token, userData) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/admin/update/${id}`,
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

//to approve vendors
export const vendorApprove = async (id, token) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/admin/approval/${id}`,
      null,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );
    console.warn(response);
    return response;
  } catch (error) {
    console.warn(error);
    throw error;
  }
};

//to reject vendors
export const vendorReject = async (id, token) => {
  try {
    const response = await axios.patch(`${BASE_URL}/admin/reject/${id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to delete vendors
export const vendorDelete = async (id, token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/admin/vendor/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// to update vendors
export const vendorUpdate = async (id, userData, token) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/admin/update/${id}`,
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

//to get all products
export const getAllProducts = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/product`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to  add products
export const addProducts = async (token, newProduct) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/product`, newProduct, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to delete products
export const deleteProducts = async (token, id) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/admin/product/delete/${id}`,
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

//to update products
export const editProducts = async (id, token, editProduct) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/admin/product/update/${id}`,
      editProduct,
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

//to view coupons
export const viewCoupons = async (id, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/settle/coupon/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to send request
export const sendRequest = async (couponCode, token) => {
  console.warn(couponCode);
  try {
    const response = await axios.post(
      `${BASE_URL}/admin/settle/send/${couponCode}`,
      null,
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

//to view coupons
export const allSendRequestForVendors = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/settle/recieved`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to view only admin all request

export const allSendRequestForAdmin = async (token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/admin/admin/recieved/request`,
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

//.....................................

export const updateAdminInfo = async (token, formData) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/admin/personalInfo/update`,
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

export const getAdminInfo = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/personalInfo`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//Checkout
export const checkoutPost = async (token, formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/checkout`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//Checkout
export const paymentSettlement = async (token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/paymentsettlement/payment-settlements`,
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

// forward
export const forwardRequest = async (token, _id) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/admin/forward/${_id}`,
      null,
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

export const acceptRequest = async (token, id) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/admin/vendor/recieved/request/accept/${id}`,
      null,
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

//......................

// For Return click

export const returnRequest = async (token, id) => {
  try {
    const response = await axios.patch(`${BASE_URL}/admin/return/${id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
