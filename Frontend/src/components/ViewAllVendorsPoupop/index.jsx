/** @format */

import React, { useEffect, useState } from 'react';
import './index.css';
import { AiFillCloseCircle } from 'react-icons/ai';
import Pagination from '../Pagination';
import { IndexFunction } from '../../utils/IndexFunction';
import { setFetching } from '../../redux/reducer/fetching';
import { useDispatch } from 'react-redux';
import { getAllCoupons, getAllVendorsValid } from '../../Api/adminApi';
import { vendorsList } from '../../Api/userApi';

const ViewAllVendorsPoupop = ({ setShowAllVendors }) => {
  const [adminVendors, setAdminVendors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 8;

  const dispatch = useDispatch();

  useEffect(() => {
    fetchAllVendorsList(currentPage);
  }, [currentPage]);

  const fetchAllVendorsList = async (currentPage) => {
    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    dispatch(setFetching(true));
    setShowAllVendors(true);
    try {
      if (role === '1') {
        const response = await getAllVendorsValid(currentPage, token);
        if (response.status === 200) {
          setAdminVendors(response?.data.vendorsList);
          setTotalPages(response.data.totalPages);
        } else {
          setAdminVendors([]);
        }
      } else if (role === '2') {
        const response = await getAllVendorsValid(currentPage, token);
        if (response.status === 200) {
          setAdminVendors(response?.data.vendorsList);
          setTotalPages(response.data.totalPages);
        } else {
          setAdminVendors([]);
        }
      } else if (role === '3') {
        const response = await vendorsList(currentPage, token);
        if (response.status === 200) {
          setAdminVendors(response?.data.Admins);
          setTotalPages(response.data.totalPages);
        } else {
          setAdminVendors([]);
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

  return (
    <div className="modal">
      <div className="modal-content-table ">
        <span className="cancle-modal" onClick={() => setShowAllVendors(false)}>
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
              <table className="tables">
                <thead className="table-head head-design">
                  <tr className="head-tr" style={{ height: '4rem' }}>
                    <th>Sr. No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Compony</th>
                    <th>Owner</th>
                    <th>Phone Number</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {adminVendors?.length > 0 ? (
                    adminVendors?.map((vendor, index) => (
                      <tr className="body-tr" key={index}>
                        <td>
                          {IndexFunction(
                            (currentPage - 1) * itemsPerPage + index + 1,
                          )}
                        </td>
                        <td>{vendor.name}</td>
                        <td>{vendor.email}</td>
                        <td>{vendor.companyName}</td>
                        <td>{vendor.companyOwner}</td>
                        <td>{vendor.phoneNumber}</td>
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
            </div>
          </div>
        </div>
        <Pagination
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

export default ViewAllVendorsPoupop;
