/** @format */

import React, { useState, useEffect } from 'react';
import './index.css';
import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineClockCircle,
} from 'react-icons/ai';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import {
  allSendRequestForVendors,
  vendorApprove,
  vendorReject,
  vendorDelete,
  forwardRequest,
  acceptRequest,
  returnRequest,
  getAllRejectRequestForAdmin,
} from '../../Api/adminApi';
import { allSendRequestForVendor } from '../../Api/vendorApi';
import { setFetching } from '../../redux/reducer/fetching';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import EditVendorsModal from '../../components/EditVendorsModal';
import jwtDecode from 'jwt-decode';
import Pagination from '../../components/Pagination';

const RejectedRequest = () => {
  const [showEditVendor, setShowEditVendor] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [routes, setRoutes] = useState(false);
  const [allSendRequests, setAllSendRequests] = useState([]);
  const [userId, setUserId] = useState(null);
  const itemsPerPage = 10;

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Rejected Request';
    fetchAllSendRequests(currentPage);
  }, [currentPage]);

  const fetchAllSendRequests = async (currentPage) => {
    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);
    const decodedToken = jwtDecode(token);
    const { userId } = decodedToken;
    setUserId(userId);
    console.warn(userId);
    dispatch(setFetching(true));
    try {
      if (role === '1') {
        const response = await getAllRejectRequestForAdmin(currentPage, token);
        if (response.status === 200) {
          console.warn(response);
          const data = response.data?.data;
          setAllSendRequests(data);
          setTotalPages(response.data.totalPages);
          setRoutes(true);
        } else {
          setAllSendRequests([]);
        }
      } else if (role === '2') {
        const response = await getAllRejectRequestForAdmin(currentPage, token);
        if (response.status === 200) {
          console.warn(response);
          const data = response.data?.data;
          setAllSendRequests(data);
          setTotalPages(response.data.totalPages);
          setRoutes(true);
        } else {
          setAllSendRequests([]);
        }
      }
    } catch (error) {
      setAllSendRequests([]);
    } finally {
      dispatch(setFetching(false));
    }
  };

  // Pagination
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentData = allSendRequests;

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleApprove = async (id) => {
    console.warn(id);
    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    dispatch(setFetching(true));
    try {
      if (role === '1') {
        const response = await acceptRequest(token, id);
        console.log(response);
        if (response.status === 200) {
          dispatch(setFetching(false));
          toast.success('Admin Successfully Approved!');
          fetchAllSendRequests();
        }
      }
      if (role === '2') {
        const response = await acceptRequest(token, id);
        console.log(response);
        if (response.status === 200) {
          dispatch(setFetching(false));
          toast.success('Admin Successfully Approved!');
          fetchAllSendRequests();
        }
      }
    } catch (error) {
      dispatch(setFetching(false));
      toast.error('Vendor not found!');
    }
    // Handle the approval logic here
  };

  const handleForward = async (id) => {
    console.warn(id);
    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    dispatch(setFetching(true));
    try {
      if (role === '1') {
        const response = await forwardRequest(token, id);
        console.log(response);
        if (response.status === 200) {
          dispatch(setFetching(false));
          toast.success('Admin Successfully Approved!');
          fetchAllSendRequests();
        }
      }
      if (role === '2') {
        const response = await forwardRequest(token, id);
        console.log(response);
        if (response.status === 200) {
          dispatch(setFetching(false));
          toast.success('Admin Successfully Approved!');
          fetchAllSendRequests();
        }
      }
    } catch (error) {
      dispatch(setFetching(false));
      toast.error('Vendor not found!');
    }
    // Handle the approval logic here
  };

  const handleReturn = async (id) => {
    console.warn(id);
    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    dispatch(setFetching(true));
    try {
      if (role === '1') {
        const response = await returnRequest(token, id);
        console.log(response);
        if (response.status === 200) {
          dispatch(setFetching(false));
          toast.success('Admin Successfully Approved!');
          fetchAllSendRequests();
        }
      }
      if (role === '2') {
        const response = await returnRequest(token, id);
        console.log(response);
        if (response.status === 200) {
          dispatch(setFetching(false));
          toast.success('Admin Successfully Approved!');
          fetchAllSendRequests();
        }
      }
    } catch (error) {
      dispatch(setFetching(false));
      toast.error('Vendor not found!');
    }
    // Handle the approval logic here
  };

  const handleReject = async (_id) => {
    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    dispatch(setFetching(true));

    try {
      if (role === '1') {
        const response = await vendorReject(_id, token);
        if (response.status === 200) {
          console.log(response);
          // const data = response.data.vendors;
          // setAllSendRequests(data);
          dispatch(setFetching(false));
          toast.success('Vendors Successfully updated!');
        }
      }
    } catch (error) {
      dispatch(setFetching(false));
      toast.error('Vendor not found!');
    }
    // Handle the approval logic here
  };

  const handleDropdown = (id) => {
    setAllSendRequests((prevVendors) =>
      prevVendors.map((user) => ({
        ...user,
        show: user._id === id ? !user.show : user.show,
      })),
    );
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );
  return (
    <div className="table-subContainer">
      <h5>Rejected Request</h5>
      <div className="table-main table-main-routes">
        <div className="table-container">
          <div className="table-wrapper px-4" style={{ height: '68vh' }}>
            <table className="tables">
              <thead
                className="table-head head-design"
                // style={{ background: "var(--color-white)", borderBottom: "1px solid #e1dede" }}
              >
                <tr className="head-tr" style={{ height: '4rem' }}>
                  <th>Sr. No.</th>
                  <th>Requested By</th>
                  {/* <th>Requested To</th> */}
                  <th>Coupon Used By (User)</th>
                  <th>Coupon Points</th>
                  <th>Coupon Code</th>
                  <th>Requested Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {allSendRequests?.length > 0 ? (
                  currentData?.map((user, index) => (
                    <tr className="body-tr" key={index}>
                      <td>{index + 1}</td>
                      <td>{user.sendor.vendorName}</td>
                      {/* <td>{user?.reciever?.vendorName}</td> */}
                      <td>{user.user.name}</td>
                      <td>{user.CouponValue.toString().slice(0, 5)} Points</td>
                      <td>{user.coupon.couponCode}</td>
                      <td>{user?.sendor?.Date.slice(0, 10)}</td>
                      <td>
                        {/* for   reciver  as vendor  */}
                        {user.receiver?.status == 'pending' &&
                          user.sendor?.status == 'requested' &&
                          user.superAdmin?.status == 'rejected' &&
                          user.receiver?.vendorId == user.superAdmin?.adminId &&
                          user.receiver?.vendorId !== user.sendor?.vendorId &&
                          user.superAdmin?.adminId !== user.sendor?.vendorId &&
                          user.receiver.vendorId === userId && (
                            <div className="dropdown">
                              <button
                                className="dropdown-toggle dropdown-pending"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                Pending
                              </button>
                              <ul
                                className={`${
                                  index >= 7
                                    ? 'dropdown-menu drop-up'
                                    : 'dropdown-menu drop-down'
                                }`}
                                aria-labelledby="dropdownMenuButton1"
                              >
                                <li>
                                  <span
                                    onClick={() => handleApprove(user._id)}
                                    className="dropdown-item dropdown-color-approve"
                                  >
                                    Approve
                                  </span>
                                </li>
                              </ul>
                            </div>
                          )}

                        {user.receiver?.status == 'pending' &&
                          user.sendor?.status == 'rejected' &&
                          user.superAdmin?.status == 'accepted' &&
                          user.receiver?.vendorId == user.superAdmin?.adminId &&
                          user.receiver?.vendorId !== user.sendor?.vendorId &&
                          user.superAdmin?.adminId !== user.sendor?.vendorId &&
                          user.sendor?.vendorId === userId && (
                            <div className="dropdown">
                              <button
                                className="dropdown-toggle dropdown-pending"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                Pending
                              </button>
                              <ul
                                className={`${
                                  index >= 7
                                    ? 'dropdown-menu drop-up'
                                    : 'dropdown-menu drop-down'
                                }`}
                                aria-labelledby="dropdownMenuButton1"
                              >
                                <li>
                                  <span
                                    onClick={() => handleApprove(user._id)}
                                    className="dropdown-item dropdown-color-approve"
                                  >
                                    Approve
                                  </span>
                                </li>
                              </ul>
                            </div>
                          )}

                        {user.receiver?.status == 'rejected' &&
                          user.sendor?.status == 'requested' &&
                          user.superAdmin?.status == 'pending' &&
                          user.sendor?.vendorId == user.superAdmin?.adminId &&
                          user.receiver?.vendorId !== user.sendor?.vendorId &&
                          user.superAdmin?.adminId !==
                            user.receiver?.vendorId &&
                          user.receiver?.vendorId === userId && (
                            <div className="dropdown">
                              <button
                                className="dropdown-toggle dropdown-pending"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                Pending
                              </button>
                              <ul
                                className={`${
                                  index >= 7
                                    ? 'dropdown-menu drop-up'
                                    : 'dropdown-menu drop-down'
                                }`}
                                aria-labelledby="dropdownMenuButton1"
                              >
                                <li>
                                  <span
                                    onClick={() => handleApprove(user._id)}
                                    className="dropdown-item dropdown-color-approve"
                                  >
                                    Approve
                                  </span>
                                </li>
                              </ul>
                            </div>
                          )}
                        {user.receiver?.status == 'accepted' &&
                          user.sendor?.status == 'rejected' &&
                          user.superAdmin?.status == 'pending' &&
                          user.sendor?.vendorId == user.superAdmin?.adminId &&
                          user.receiver?.vendorId !== user.sendor?.vendorId &&
                          user.superAdmin?.adminId !==
                            user.receiver?.vendorId &&
                          user.superAdmin?.adminId === userId && (
                            <div className="dropdown">
                              <button
                                className="dropdown-toggle dropdown-pending"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                Pending
                              </button>
                              <ul
                                className={`${
                                  index >= 7
                                    ? 'dropdown-menu drop-up'
                                    : 'dropdown-menu drop-down'
                                }`}
                                aria-labelledby="dropdownMenuButton1"
                              >
                                <li>
                                  <span
                                    onClick={() => handleApprove(user._id)}
                                    className="dropdown-item dropdown-color-approve"
                                  >
                                    Approve
                                  </span>
                                </li>
                              </ul>
                            </div>
                          )}

                        {user.receiver?.status == 'rejected' &&
                          user.sendor?.status == 'requested' &&
                          user.superAdmin?.status == 'forwarded' &&
                          user.sendor?.vendorId !== user.superAdmin?.adminId &&
                          user.receiver?.vendorId !== user.sendor?.vendorId &&
                          user.superAdmin?.adminId !==
                            user.receiver?.vendorId &&
                          user.receiver?.vendorId === userId && (
                            <div className="dropdown">
                              <button
                                className="dropdown-toggle dropdown-pending"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                Pending
                              </button>
                              <ul
                                className={`${
                                  index >= 7
                                    ? 'dropdown-menu drop-up'
                                    : 'dropdown-menu drop-down'
                                }`}
                                aria-labelledby="dropdownMenuButton1"
                              >
                                <li>
                                  <span
                                    onClick={() => handleApprove(user._id)}
                                    className="dropdown-item dropdown-color-approve"
                                  >
                                    Approve
                                  </span>
                                </li>
                              </ul>
                            </div>
                          )}

                        {user.receiver?.status == 'accepted' &&
                          user.sendor?.status == 'rejected' &&
                          user.superAdmin?.status == 'returning' &&
                          user.sendor?.vendorId !== user.superAdmin?.adminId &&
                          user.receiver?.vendorId !== user.sendor?.vendorId &&
                          user.superAdmin?.adminId !==
                            user.receiver?.vendorId &&
                          user.sendor?.vendorId === userId && (
                            <div className="dropdown">
                              <button
                                className="dropdown-toggle dropdown-pending"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                Pending
                              </button>
                              <ul
                                className={`${
                                  index >= 7
                                    ? 'dropdown-menu drop-up'
                                    : 'dropdown-menu drop-down'
                                }`}
                                aria-labelledby="dropdownMenuButton1"
                              >
                                <li>
                                  <span
                                    onClick={() => handleApprove(user._id)}
                                    className="dropdown-item dropdown-color-approve"
                                  >
                                    Approve
                                  </span>
                                </li>
                              </ul>
                            </div>
                          )}
                        {user.receiver?.status == 'pending' &&
                          user.sendor?.status == 'requested' &&
                          user.superAdmin?.status == 'rejected' &&
                          user.receiver?.vendorId == user.superAdmin?.adminId &&
                          user.receiver?.vendorId !== user.sendor?.vendorId &&
                          user.superAdmin?.adminId !== user.sendor?.vendorId &&
                          user.sendor?.vendorId == userId && (
                            <span
                              className="dropdown-item dropdown-color-reject"
                              style={{ width: '160px' }}
                            >
                              Rejected
                            </span>
                          )}

                        {user.receiver?.status == 'pending' &&
                          user.sendor?.status == 'rejected' &&
                          user.superAdmin?.status == 'accepted' &&
                          user.receiver?.vendorId == user.superAdmin?.adminId &&
                          user.receiver?.vendorId !== user.sendor?.vendorId &&
                          user.superAdmin?.adminId !== user.sendor?.vendorId &&
                          user.superAdmin?.adminId === userId && (
                            <span
                              className="dropdown-item dropdown-color-reject"
                              style={{ width: '160px' }}
                            >
                              Rejected
                            </span>
                          )}

                        {user.receiver?.status == 'rejected' &&
                          user.sendor?.status == 'requested' &&
                          user.superAdmin?.status == 'pending' &&
                          user.sendor?.vendorId == user.superAdmin?.adminId &&
                          user.receiver?.vendorId !== user.sendor?.vendorId &&
                          user.superAdmin?.adminId !==
                            user.receiver?.vendorId &&
                          user.sendor?.vendorId === userId && (
                            <span
                              className="dropdown-item dropdown-color-reject"
                              style={{ width: '160px' }}
                            >
                              Rejected
                            </span>
                          )}

                        {user.receiver?.status == 'accepted' &&
                          user.sendor?.status == 'rejected' &&
                          user.superAdmin?.status == 'pending' &&
                          user.sendor?.vendorId == user.superAdmin?.adminId &&
                          user.receiver?.vendorId !== user.sendor?.vendorId &&
                          user.superAdmin?.adminId !==
                            user.receiver?.vendorId &&
                          user.receiver?.vendorId === userId && (
                            <span
                              className="dropdown-item dropdown-color-reject"
                              style={{ width: '160px' }}
                            >
                              Rejected
                            </span>
                          )}

                        {user.receiver?.status == 'rejected' &&
                          user.sendor?.status == 'requested' &&
                          user.superAdmin?.status == 'forwarded' &&
                          user.sendor?.vendorId !== user.superAdmin?.adminId &&
                          user.receiver?.vendorId !== user.sendor?.vendorId &&
                          user.superAdmin?.adminId !==
                            user.receiver?.vendorId &&
                          user.superAdmin?.adminId === userId && (
                            <span
                              className="dropdown-item dropdown-color-reject"
                              style={{ width: '160px' }}
                            >
                              Rejected
                            </span>
                          )}

                        {user.receiver?.status == 'rejected' &&
                          user.sendor?.status == 'requested' &&
                          user.superAdmin?.status == 'forwarded' &&
                          user.sendor?.vendorId !== user.superAdmin?.adminId &&
                          user.receiver?.vendorId !== user.sendor?.vendorId &&
                          user.superAdmin?.adminId !==
                            user.receiver?.vendorId &&
                          user.sendor?.vendorId === userId && (
                            <span
                              className="dropdown-item dropdown-color-reject"
                              style={{ width: '160px' }}
                            >
                              Rejected
                            </span>
                          )}

                        {user.receiver?.status == 'accepted' &&
                          user.sendor?.status == 'rejected' &&
                          user.superAdmin?.status == 'returning' &&
                          user.sendor?.vendorId !== user.superAdmin?.adminId &&
                          user.receiver?.vendorId !== user.sendor?.vendorId &&
                          user.superAdmin?.adminId !==
                            user.receiver?.vendorId &&
                          user.superAdmin?.adminId === userId && (
                            <span
                              className="dropdown-item dropdown-color-reject"
                              style={{ width: '160px' }}
                            >
                              Rejected
                            </span>
                          )}

                        {user.receiver?.status == 'accepted' &&
                          user.sendor?.status == 'rejected' &&
                          user.superAdmin?.status == 'returning' &&
                          user.sendor?.vendorId !== user.superAdmin?.adminId &&
                          user.receiver?.vendorId !== user.sendor?.vendorId &&
                          user.superAdmin?.adminId !==
                            user.receiver?.vendorId &&
                          user.receiver?.vendorId === userId && (
                            <span
                              className="dropdown-item dropdown-color-reject"
                              style={{ width: '160px' }}
                            >
                              Rejected
                            </span>
                          )}
                        {/* for   reciver  as vendor  */}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="body-tr">
                    <td colSpan="9" className="no-data">
                      No Data Available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination
          routes={routes}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          handlePageClick={handlePageClick}
          pageNumbers={pageNumbers}
        />
      </div>
      {showEditVendor ? (
        <EditVendorsModal setShowEditVendor={setShowEditVendor} />
      ) : null}
    </div>
  );
};

export default RejectedRequest;
