import axios from "axios";
// import io from 'socket.io-client';

const BASE_URL = process.env.REACT_APP_SERVER_URL;

// socketIO.js
// Initialize socketIO once when your application loads
// export const socketIO = io(`${BASE_URL}/`, {
//   cors: {
//     origin: '*'
//   }
// });



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

//add vendor 
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

// get all pending vendors
export const getAllVendors = async (page,token) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/vendor/pending?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return { status: false };
    // throw error;
  }
};

// get all valid vendors
export const getAllVendorsValid = async (page,token) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/vendor/valid?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return { status: false };
    // throw error;
  }
};

// get all suspended vendors
export const getAllVendorsSuspendedList = async (page,token) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/admin/vendor/suspendedlist?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return { status: false };
    // throw error;
  }
};

// get all coupons admin
export const getAllCoupons = async (page,token) => {
  console.warn(page,token)
  try {
    const response = await axios.get(`${BASE_URL}/admin/coupons/admincoupon?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// get all coupons for vendor
export const getAllCouponsForVendor = async (page,token) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/coupons/vendorcoupon?page=${page}`, {
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
export const vendorReject = async (id,reject_region, token) => {
  try {
    const response = await axios.patch(`${BASE_URL}/admin/vendor/recieved/request/rejected/${id}`, reject_region, {
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

//to suspend vendor
export const suspendVendor = async (id, token) => {
  console.warn(token)
  try {
    const response = await axios.patch(`${BASE_URL}/admin/vendor/suspended/${id}`, null,{
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
export const getAllProducts = async (id,page,token) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/product/${id}?page=${page}`, {
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
export const viewCoupons = async (id, page,token) => {
  console.warn(id, page,token)
  try {
    const response = await axios.get(`${BASE_URL}/admin/settle/coupon/${id}?page=${page}`, {
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

//to view only admin all send request 

export const allSendRequestForAdmin = async (page,token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/admin/admin/recieved/request?page=${page}`,
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

//to get all reject request 

export const getAllRejectRequestForAdmin = async (page,token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/admin/vendor/rejected/request?page=${page}`,
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

// to update  admin and vendor info
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

// to get  admin and vendor info
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

//to post Checkout
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

//for admin get  payment settlement 
export const paymentSettlement = async (page,token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/paymentsettlement/payment-settlements?page=${page}`,
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

//for vendor get  payment settlement 
export const paymentSettlementForVendor = async (page,token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/paymentsettlement/payment-settlements/vendor?page=${page}`,
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

// forward request
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

// to accept  request
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

// For Return request
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

//to get daily reports
export const getDailyReports = async (page,token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/admin/dailyreport/generate-csvfile?page=${page}`,
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

//to get admin wallet
export const getWalletPoint = async (token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/admin/wallet`,
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

//dashboard points
export const getDashboardPoint = async (token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/admin/vendor/point/dashboard`,
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

//dashboard graph data for admin
export const getDashboardGraph = async (token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/admin/payment/month-data/amount`,
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

//dashboard graph data for vendor
export const getDashboardGraphVendor = async (token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/admin/payment/coupon/month-data`,
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

//search pending vendor Name
export const searchName = async (name,page,token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/admin/vendor/pending/user/${name}?page=${page}`,
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

//search valid vendor Name
export const searchValidVendor = async (name,page,token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/admin/vendor/valid/${name}?page=${page}`,
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
export const searchProductVendor = async (name,page,token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/admin/product/admin/product/${name}?page=${page}`,
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
export const notificationCount = async (token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/notification/unread-count`,
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
export const notificationRead = async (token) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/notification/mark-as-read`,null,
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