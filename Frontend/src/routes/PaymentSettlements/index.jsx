/** @format */

import React, { useState, useEffect } from 'react';
import './index.css';
import {
  paymentSettlement,
  paymentSettlementForVendor,
} from '../../Api/adminApi';
import { setFetching } from '../../redux/reducer/fetching';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import User from '../../assets/header/user.svg';
import EditVendorsModal from '../../components/EditVendorsModal';
import Pagination from '../../components/Pagination';
import { IndexFunction } from '../../utils/IndexFunction';

const PaymentSettlements = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [vendors, setVendors] = useState([]);
  const [routes, setRoutes] = useState(false);
  const itemsPerPage = 8;

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Payment Settlements';
    fetchVendors(currentPage);
  }, [currentPage]);

  const fetchVendors = async (currentPage) => {
    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    dispatch(setFetching(true));
    try {
      if (role === '1') {
        const response = await paymentSettlement(currentPage, token);
        if (response.status === 200) {
          console.warn(response);
          setVendors(response?.data.settlements);
          setTotalPages(response.data.totalPages);
          setRoutes(true);
        } else {
          setVendors([]);
        }
      }
      if (role === '2') {
        const response = await paymentSettlementForVendor(currentPage, token);
        if (response.status === 200) {
          console.warn(response);
          setVendors(response?.data.settlements);
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

  const handleDropdown = (id) => {
    setVendors((prevVendors) =>
      prevVendors.map((user) => ({
        ...user,
        show: user._id === id ? !user.show : user.show,
      })),
    );
  };

  // Pagination
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
      <h5>Payment Settlements</h5>
      <div className="table-main table-main-routes">
        <div className="table-container">
          <div className="table-wrapper px-4" style={{ height: '67vh' }}>
            <table className="tables">
              <thead className="table-head head-design">
                <tr className="head-tr" style={{ height: '4rem' }}>
                  <th>Sr. No.</th>
                  <th>User</th>
                  <th>Requested By</th>
                  <th>Requested To</th>
                  <th>Coupon Code</th>
                  <th>Coupon Points</th>
                  <th>Status</th>
                  {/* <th></th> */}
                </tr>
              </thead>
              <tbody className="table-body">
                {vendors.length > 0 ? (
                  vendors.map((vendor, index) => (
                    <tr className="body-tr" key={index}>
                      <td>
                        {IndexFunction(
                          (currentPage - 1) * itemsPerPage + index + 1,
                        )}
                      </td>
                      <td>{vendor.user.name}</td>
                      <td>{vendor.requestedBy.vendorName}</td>
                      <td>{vendor.requestedTo.vendorName}</td>
                      <td>{vendor.coupon.couponCode}</td>
                      <td>{vendor.amount.toString().slice(0, 5)}</td>
                      <td>
                        <div class="status-edit">
                          <span class="status-text-edit">Completed</span>
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
      </div>
    </div>
  );
};

export default PaymentSettlements;
