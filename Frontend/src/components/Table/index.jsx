/** @format */

import React, { useState, useEffect, useReducer } from 'react';
import './index.css';
import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineClockCircle,
} from 'react-icons/ai';
import { HiOutlineSearch } from 'react-icons/hi';
import { VscArrowRight } from 'react-icons/vsc';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import {
  getAllVendors,
  vendorUpdate,
  vendorApprove,
  vendorReject,
  vendorDelete,
  adminUpdate,
  searchName,
  suspendVendor,
} from '../../Api/adminApi';
import { setFetching } from '../../redux/reducer/fetching';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import User from '../../assets/header/user.svg';
import EditVendorsModal from '../EditVendorsModal';
import Pagination from '../Pagination';
import { IndexFunction } from '../../utils/IndexFunction';

const Table = () => {
  const [showEditVendor, setShowEditVendor] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [vendor, setVendor] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [editVendors, setEditVendors] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: '',
      companyName: '',
    },
  );
  const [routes, setRoutes] = useState(false);
  const [editVendorsId, setEditVendorsId] = useState('');
  const [vendors, setVendors] = useState([]);
  const itemsPerPage = 8;

  const dispatch = useDispatch();

  useEffect(() => {
    fetchVendors(currentPage);
  }, [currentPage]);

  const fetchVendors = async (currentPage) => {
    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);
    dispatch(setFetching(true));
    try {
      const response = await getAllVendors(currentPage, token);
      if (response.status === 200) {
        console.log(response);
        const data = response.data.vendorsList;
        setVendors(data);
        setTotalPages(response.data.totalPages);
        setRoutes(true);
      } else {
        setVendors([]);
      }
    } catch (error) {
      setVendors([]);
    } finally {
      dispatch(setFetching(false));
    }
  };

  // Pagination
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentData = vendors?.slice(firstIndex, lastIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleApprove = async (id) => {
    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);
    dispatch(setFetching(true));
    try {
      if (role === '1') {
        const response = await vendorApprove(id, token);
        console.log(response);
        if (response.status === 200) {
          dispatch(setFetching(false));
          toast.success('Vendors Successfully Approved!');
          fetchVendors();
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
        console.log(response);
        if (response.status === 200) {
          dispatch(setFetching(false));
          toast.success('Vendors Successfully updated!');
          fetchVendors();
        }
      }
    } catch (error) {
      dispatch(setFetching(false));
      toast.error('vendor not found!');
    }
  };

  const handleDelete = async (_id) => {
    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    dispatch(setFetching(true));
    try {
      if (role === '1') {
        const response = await vendorDelete(_id, token);
        console.log(response);
        if (response.status === 200) {
          dispatch(setFetching(false));
          toast.success('Vendors Successfully Deleted!');
          fetchVendors();
        }
      }
    } catch (error) {
      dispatch(setFetching(false));
      toast.error('vendor not found!');
    }
  };

  const handleSuespend = async (id) => {
    console.log('Delete', id);
    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);
    try {
      const response = await suspendVendor(id, token);
      // console.warn(response);
      if (response.status === 200) {
        toast.success('Vendor Deleted Successfully');
        fetchVendors();
      }
    } catch (error) {}
  };

  const handleEditVendors = async (id) => {
    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    dispatch(setFetching(true));

    try {
      if (role === '1') {
        // console.log("admin");
        const response = await adminUpdate(id, token, editVendors);
        if (response.status === 200) {
          setShowEditVendor(false);
          toast.success('Vendor edited successfully!');
          setShowEditVendor(false);
          fetchVendors();
        } else {
          toast.error('Error editing Vendors. Please try again later!');
        }
      }
      if (role === '2') {
        // console.log("vendor");
        const response = await vendorUpdate(id, token, editVendors);
        if (response.status === 200) {
          setShowEditVendor(false);
          toast.success('Vendor edited successfully!');
          setShowEditVendor(false);
          fetchVendors();
        } else {
          toast.error('Error editing Vendors. Please try again later!');
        }
      }
    } catch (error) {
      toast.error('Error editing Vendors. Please try again later!');
      setShowEditVendor(false);
    } finally {
      dispatch(setFetching(false));
      setEditVendorsId('');
      setEditVendors({
        name: '',
        companyName: '',
      });
      setShowEditVendor(false);
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

  const handleEditButtonClick = (user, id) => {
    setVendor(user);
    setEditVendors({
      name: user.name,
      companyName: user.companyName,
    });
    setEditVendorsId(id);
    setShowEditVendor(true);
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

  useEffect(() => {
    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);
    // Function to fetch data based on the search term and current page
    const handleSearch = async () => {
      try {
        const response = await searchName(searchTerm, currentPage, token);
        const { vendorsList, totalPages, message } = response.data;
        if (message === 'Data not found') {
          setVendors([]);
        } else {
          setVendors(vendorsList);
          setTotalPages(totalPages);
        }
      } catch (error) {
        console.error('Error fetching vendor data:', error);
      }
    };

    handleSearch(); // Call the fetchData function when the component mounts or when searchTerm/currentPage changes.
  }, [searchTerm, currentPage]);

  return (
    <>
      <div className="justifyBetween">
        <h5>Manage Team</h5>
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search in manage team"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <span id="search">
            <HiOutlineSearch />
          </span>
          {/* <span id="arrow">
            <VscArrowRight />
          </span> */}
        </div>
      </div>
      <div className="table-main table-main-routes margin_top">
        <div className="table-container">
          <div className="table-wrapper px-4" style={{ height: '68vh' }}>
            <table className="tables">
              <thead className="table-head head-design">
                <tr className="head-tr" style={{ height: '4rem' }}>
                  <th>Sr. No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Company</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="table-body">
                {vendors?.length > 0 ? (
                  vendors.map((user, index) => (
                    <tr className="body-tr" key={index}>
                      <td>
                        {IndexFunction(
                          (currentPage - 1) * itemsPerPage + index + 1,
                        )}
                      </td>
                      <td>
                        <img
                          src={user?.profileImage || User}
                          className="rounded-circle header-profile-user "
                        />
                        {user.name}
                      </td>
                      <td>{user.email}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.companyName}</td>
                      <td>
                        {user.status === 'completed' && (
                          <>
                            <div className="dropdown">
                              <button
                                className="dropdown-toggle dropdown-approve"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                Approved &nbsp;
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
                                    onClick={() => handleSuespend(user._id)}
                                    className="dropdown-item dropdown-color-pending"
                                  >
                                    Suspend
                                  </span>
                                </li>
                                <div className="dropdown-divider"></div>
                                <li>
                                  <span
                                    onClick={() => handleDelete(user._id)}
                                    className="dropdown-item dropdown-color-reject"
                                  >
                                    Delete
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </>
                        )}

                        {user.status === 'pending' && (
                          <>
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
                                className="dropdown-menu drop-down"
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
                                <div className="dropdown-divider"></div>
                                <li>
                                  <span
                                    onClick={() => handleReject(user._id)}
                                    className="dropdown-item dropdown-color-reject"
                                  >
                                    Reject
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </>
                        )}

                        {user.status === 'Reject' && (
                          <div className="status-reject">
                            <span
                              className={`d-inline-block dropdown ${
                                user.show ? 'show' : ''
                              }`}
                            >
                              <span
                                className="status-text-reject"
                                onClick={() => handleDropdown(user._id)}
                              >
                                Reject &nbsp;
                                {user.show ? (
                                  <IoIosArrowUp fontSize={15} />
                                ) : (
                                  <IoIosArrowDown fontSize={15} />
                                )}
                              </span>
                              {user.show && (
                                <div
                                  className="dropdown-menu-end dropdown-menu show"
                                  style={{ padding: '13px' }}
                                >
                                  <div className="dropdown-divider"></div>
                                  <div className="status-reject">
                                    <span
                                      onClick={() => handleDelete(user._id)}
                                      className="status-text-reject"
                                    >
                                      Delete
                                    </span>
                                  </div>
                                </div>
                              )}
                            </span>
                          </div>
                        )}
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
      {showEditVendor ? (
        <EditVendorsModal
          vendor={vendor}
          editVendorsId={editVendorsId}
          editVendors={editVendors}
          setEditVendors={setEditVendors}
          handleEditVendors={handleEditVendors}
          setShowEditVendor={setShowEditVendor}
        />
      ) : null}
    </>
  );
};

export default Table;
