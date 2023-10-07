/** @format */

import React, { useEffect, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import Pagination from '../Pagination';
import { IndexFunction } from '../../utils/IndexFunction';
import { setFetching } from '../../redux/reducer/fetching';
import { useDispatch } from 'react-redux';
import { getAllCoupons, getAllCouponsForVendor } from '../../Api/adminApi';
import { getAllCouponsForUser } from '../../Api/userApi';
import { IsCurrentDate } from '../../utils/IsCurrentDate';

const ViewAllCouponPoupop = ({ setShowAllCoupons }) => {
  const [coupons, setCoupons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [adminVendors, setAdminVendors] = useState([]);
  const itemsPerPage = 8;
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAllCouponsList(currentPage);
  }, [currentPage]);

  const fetchAllCouponsList = async (currentPage) => {
    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    dispatch(setFetching(true));
    setShowAllCoupons(true);
    try {
      if (role === '1') {
        const response = await getAllCoupons(currentPage, token);
        if (response.status === 200) {
          setCoupons(response?.data.couponlist);
          setTotalPages(response.data.totalPages);
        } else {
          setCoupons([]);
        }
      } else if (role === '2') {
        const response = await getAllCouponsForVendor(currentPage, token);
        if (response.status === 200) {
          setCoupons(response?.data.couponlist);
          setTotalPages(response.data.totalPages);
        } else {
          setCoupons([]);
        }
      } else if (role === '3') {
        const response = await getAllCouponsForUser(currentPage, token);
        if (response.status === 200) {
          setCoupons(response?.data.couponlist);
          setTotalPages(response.data.totalPages);
        } else {
          setCoupons([]);
        }
      }
    } catch (error) {
      setAdminVendors([]);
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

  return (
    <div className="modal">
      <div className="modal-content-table ">
        <span className="cancle-modal" onClick={() => setShowAllCoupons(false)}>
          <AiFillCloseCircle fontSize={40} />
        </span>
        <div
          className="table-main"
          style={{
            boxShadow: '0px 0px 0px 0px',
            marginTop: '0px',
            height: '100%',
          }}
        >
          <div
            className=" margin-inline card-align"
            style={{ top: '0px', height: '100%' }}
          >
            <div className="table-wrapper px-4" style={{ maxHeight: '52vh' }}>
              {role === '1' ? (
                <table className="tables">
                  <thead className="table-head head-design">
                    <tr className="head-tr" style={{ height: '4rem' }}>
                      <th>Sr. No.</th>
                      <th>User</th>
                      <th>Coupon Code</th>
                      <th>Coupon Points</th>
                      <th>Generated On</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {coupons?.length > 0 ? (
                      coupons?.map((coupon, index) => (
                        <tr className="body-tr" key={index}>
                          <td>
                            {IndexFunction(
                              (currentPage - 1) * itemsPerPage + index + 1,
                            )}
                          </td>
                          <td>{coupon.userName}</td>
                          <td>{coupon.couponCode}</td>
                          <td>{coupon.point.toString().slice(0, 4)} Points</td>
                          <td>{coupon.generate.generateDate}</td>
                          <td>
                            {coupon?.status == 'valid' && (
                              <div className="status-edit">
                                <span className="status-text-edit">valid</span>
                              </div>
                            )}
                            {coupon?.status == 'redeem' && (
                              <span className="dropdown-item dropdown-color-approve">
                                Redeem
                              </span>
                            )}
                            {IsCurrentDate(coupon?.expirationDate.toString())}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="body-tr">
                        <td colSpan="9" className="no-data">
                          No Coupons Available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              ) : null}
              {role === '2' ? (
                <table className="tables">
                  <thead className="table-head head-design">
                    <tr className="head-tr" style={{ height: '4rem' }}>
                      <th>Sr. No.</th>
                      <th>User</th>
                      <th>Coupon Code</th>
                      <th>Coupon Points</th>
                      <th>Generated On</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {coupons?.length > 0 ? (
                      coupons?.map((coupon, index) => (
                        <tr className="body-tr" key={index}>
                          <td>
                            {IndexFunction(
                              (currentPage - 1) * itemsPerPage + index + 1,
                            )}
                          </td>
                          <td>{coupon.userName}</td>
                          <td>{coupon.couponCode}</td>
                          <td>{coupon.point.toString().slice(0, 4)} Points</td>
                          <td>{coupon.generate.generateDate}</td>
                          <td>
                            {coupon?.status == 'valid' && (
                              <div class="status-edit">
                                <span class="status-text-edit">valid</span>
                              </div>
                            )}
                            {coupon?.status == 'redeem' && (
                              <span className="dropdown-item dropdown-color-approve">
                                Redeem
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="body-tr">
                        <td colSpan="9" className="no-data">
                          No Coupons Available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              ) : null}
              {role === '3' ? (
                <table className="tables">
                  <thead className="table-head head-design">
                    <tr className="head-tr" style={{ height: '4rem' }}>
                      <th>Sr. No.</th>
                      <th>User</th>
                      <th>Coupon Code</th>
                      <th>Coupon Points</th>
                      <th>Generated On</th> <th>Status</th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {coupons?.length > 0 ? (
                      coupons?.map((coupon, index) => (
                        <tr className="body-tr" key={index}>
                          <td>
                            {IndexFunction(
                              (currentPage - 1) * itemsPerPage + index + 1,
                            )}
                          </td>
                          <td>{coupon.userName}</td>
                          <td>{coupon.couponCode}</td>
                          <td>{coupon.point.toString().slice(0, 4)} Points</td>
                          <td>{coupon.generate.generateDate}</td>
                          <td>
                            {coupon?.status == 'valid' && (
                              <div class="status-edit">
                                <span class="status-text-edit">valid</span>
                              </div>
                            )}
                            {coupon?.status == 'redeem' && (
                              <span className="dropdown-item dropdown-color-approve">
                                Redeem
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="body-tr">
                        <td colSpan="9" className="no-data">
                          No Coupons Available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              ) : null}
            </div>
          </div>
        </div>
        <Pagination
          className="pagination-for-poupop"
          currentPage={currentPage}
          totalPages={totalPages}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          handlePageClick={handlePageClick}
          pageNumbers={pageNumbers}
        />
      </div>
    </div>
  );
};

export default ViewAllCouponPoupop;
