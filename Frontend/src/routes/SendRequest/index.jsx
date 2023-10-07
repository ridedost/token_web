/** @format */

import React, { useState, useEffect } from 'react';
import './index.css';
import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineClockCircle,
} from 'react-icons/ai';
import { getAllVendorsValid, viewCoupons } from '../../Api/adminApi';
import { setFetching } from '../../redux/reducer/fetching';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import User from '../../assets/header/user.svg';
import SendRequestPoupop from '../../components/SendRequestPoupop';
import Pagination from '../../components/Pagination';
import { IndexFunction } from '../../utils/IndexFunction';

const SendRequest = () => {
  const [showSendRequest, setShowSendRequest] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [vendors, setVendors] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [routes, setRoutes] = useState(false);
  const [conflict, setConflict] = useState(false);
  const [adminId, setAdminId] = useState('');

  const itemsPerPage = 8;

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Send Request';
    fetchVendors(currentPage);
  }, [currentPage]);

  const fetchVendors = async (currentPage) => {
    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    try {
      if (role === '1') {
        dispatch(setFetching(true));
        const response = await getAllVendorsValid(currentPage, token);
        if (response.status === 200) {
          const data = response.data.vendorsList.map((user) => ({
            ...user,
            show: false,
          }));
          setVendors(data);
          setTotalPages(response.data.totalPages);
          setRoutes(true);
        } else {
          setVendors([]);
        }
      } else if (role === '2') {
        dispatch(setFetching(true));
        const response = await getAllVendorsValid(currentPage, token);
        if (response.status === 200) {
          const data = response.data.vendorsList.map((user) => ({
            ...user,
            show: false,
          }));
          setVendors(data);
          setTotalPages(response.data.totalPages);
          setRoutes(true);
        } else {
          setVendors([]);
        }
      }
    } catch (error) {
      setVendors([]);
    } finally {
      dispatch(setFetching(false));
    }
  };

  const handleViewCoupons = async (id, currentPage) => {
    // let dataIdValue = this.getAttribute("data-id");
    // console.log("data-id value:", dataIdValue);
    setAdminId(id);
    dispatch(setFetching(true));
    setShowSendRequest(true);
    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    try {
      if (role === '1') {
        const response = await viewCoupons(id, currentPage, token);
        if (response.status === 200) {
          console.warn(response);
          setCoupons(response.data.request);
          setTotalPages(response.data.totalPages);
          dispatch(setFetching(false));
          // fetchVendors();
        } else if (response.status === 204) {
          setCoupons([]);
          fetchVendors();
          setTotalPages(0);
        }
      }
      if (role === '2') {
        const response = await viewCoupons(id, currentPage, token);
        if (response.status === 200) {
          console.warn(response);
          setCoupons(response.data.request);
          setTotalPages(response.data.totalPages);
          dispatch(setFetching(false));
          // fetchVendors();
        } else if (response.status === 204) {
          setCoupons([]);
          fetchVendors();
          setTotalPages(0);
        }
      }
    } catch (error) {
      setCoupons([]);
      fetchVendors();
    } finally {
      dispatch(setFetching(false));
    }
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
  const maintoken = localStorage.getItem('auth_token');
  const role = maintoken.charAt(maintoken.length - 1);
  const token = maintoken.slice(0, -1);
  // console.warn(totalPages);
  return (
    <>
      <div className="table-subContainer">
        <h5>Send Request</h5>
        <div className="table-main table-main-routes">
          <div className="table-container">
            <div className="table-wrapper px-4" style={{ height: '68vh' }}>
              <table className="tables">
                <thead className="table-head head-design">
                  <tr className="head-tr" style={{ height: '4rem' }}>
                    <th>Sr. No.</th>
                    <th>Name</th>
                    {role === '1' ? <th>Email</th> : null}
                    {role === '1' ? <th>Phone Number</th> : null}
                    <th>Company</th>
                    <th>Action</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {vendors.length > 0 ? (
                    vendors.map((user, index) => (
                      <tr className="body-tr" key={index}>
                        <td>
                          {IndexFunction(
                            (currentPage - 1) * itemsPerPage + index + 1,
                          )}
                        </td>
                        <td>
                          <img
                            src={user?.profileImage?.url || User}
                            className="rounded-circle header-profile-user "
                          />
                          {user.name}
                        </td>
                        {role === '1' ? <td>{user.email}</td> : null}
                        {role === '1' ? <td>{user.phoneNumber}</td> : null}
                        <td>{user.companyName}</td>
                        <td>
                          <div className="status-edit">
                            <span
                              onClick={() => {
                                handleViewCoupons(user._id);
                              }}
                              className="status-text-edit"
                            >
                              View Coupons
                            </span>
                          </div>
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
            {showSendRequest ? null : (
              <Pagination
                routes={routes}
                currentPage={currentPage}
                totalPages={totalPages}
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
                handlePageClick={handlePageClick}
                pageNumbers={pageNumbers}
              />
            )}
          </div>
        </div>
      </div>
      {showSendRequest ? (
        <SendRequestPoupop
          coupons={coupons}
          setCoupons={setCoupons}
          setShowSendRequest={setShowSendRequest}
          fetchVendors={fetchVendors}
          adminId={adminId}
          setAdminId={setAdminId}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default SendRequest;
