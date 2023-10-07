/** @format */

import React, { useState, useEffect } from 'react';
import {
  getAllVendorsSuspendedList,
  suspendVendor,
  searchName,
  vendorApprove,
} from '../../Api/adminApi';
import { HiOutlineSearch } from 'react-icons/hi';
import {
  vendorsList,
  getAllProductForPerticularVendor,
} from '../../Api/userApi';
import User from '../../assets/header/user.svg';
import { setFetching } from '../../redux/reducer/fetching';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Pagination from '../../components/Pagination';
import { IndexFunction } from '../../utils/IndexFunction';
import jwtDecode from 'jwt-decode';
import ViewAllProductsPoupop from '../../components/ViewAllProductsPoupop';

const Suspended = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOption, setSelectedOption] = useState('');
  const [vendors, setVendors] = useState([]);
  const [vendorsLists, setVendorsLists] = useState([]);
  const [routes, setRoutes] = useState(false);
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState('');
  const [showProdusts, setShowProdusts] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 8;

  // Define 'role' here
  const maintoken = localStorage.getItem('auth_token');
  const role = maintoken.charAt(maintoken.length - 1);

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Suspended List';

    fetchVendors(currentPage);
  }, [currentPage]);

  const fetchVendors = async (currentPage) => {
    const token = maintoken.slice(0, -1);
    dispatch(setFetching(true));

    try {
      if (role === '1') {
        const response = await getAllVendorsSuspendedList(currentPage, token);
        if (response.status === 200) {
          console.warn(response.data);
          setVendors(response.data.vendorsList);
          setTotalPages(response.data.totalPages);
          setRoutes(true);
          setVendorsLists([]); // Reset vendorsList in case it was previously set
        } else {
          console.error('Error fetching vendors:', response);
          setVendors([]);
        }
      } else if (role === '2') {
        const response = await getAllVendorsSuspendedList(currentPage, token);
        if (response.status === 200) {
          setVendorsLists(response.data.vendorsList);
          setTotalPages(response.data.totalPages);
          setRoutes(true);
          setVendors([]); // Reset vendors in case it was previously set
        } else {
          console.error('Error fetching vendors:', response);
          setVendorsLists([]);
        }
      } else if (role === '3') {
        const response = await vendorsList(currentPage, token);
        if (response.status === 200) {
          setVendorsLists(response.data.Admins);
          setTotalPages(response.data.totalPages);
          setRoutes(true);
          setVendors([]); // Reset vendors in case it was previously set
        } else {
          console.error('Error fetching vendors:', response);
          setVendorsLists([]);
        }
      } else {
        console.error('Invalid role:', role);
        setVendors([]);
        setVendorsLists([]);
      }
    } catch (error) {
      console.error('Error fetching vendors:', error);
      setVendors([]);
      setVendorsLists([]);
    } finally {
      dispatch(setFetching(false));
    }
  };
  // Pagination

  const handleViewProducts = async (id, currentPage) => {
    // let dataIdValue = this.getAttribute("data-id");
    // console.log("data-id value:", dataIdValue);
    // setUserId(id);
    dispatch(setFetching(true));
    setShowProdusts(true);
    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);
    setUserId(id);
    try {
      if (role === '3') {
        const response = await getAllProductForPerticularVendor(
          id,
          currentPage,
          token,
        );
        if (response.status === 200) {
          console.warn(response);
          setProducts(response.data.product);
          setTotalPages(response.data.totalPages);
          dispatch(setFetching(false));
          // fetchVendors();
        } else if (response.status === 204) {
          setProducts([]);
          fetchVendors();
          setTotalPages(0);
        }
      }
    } catch (error) {
      setProducts([]);
      fetchVendors();
    } finally {
      dispatch(setFetching(false));
    }
  };

  const handleApprove = async (id) => {
    console.warn(id);
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
          toast.success('Approve Request send !');
          fetchVendors();
        }
      }
      if (role === '2') {
        const response = await vendorApprove(id, token);
        console.log(response);
        if (response.status === 200) {
          dispatch(setFetching(false));
          toast.success('Approve Request send !');
          fetchVendors();
        }
      }
    } catch (error) {
      dispatch(setFetching(false));
      toast.error('Approve Request Not Send !');
    }
    // Handle the approval logic here
  };

  const handleDelete = async (id) => {
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

  const handleDropdown = (id) => {
    setVendors((prevVendors) =>
      prevVendors.map((user) => ({
        ...user,
        show: user._id === id ? !user.show : user.show,
      })),
    );
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
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
  console.log(products);

  useEffect(() => {
    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);
    // Function to fetch data based on the search term and current page
    const handleSearch = async () => {
      // try {
      // const response = await searchName(searchTerm, currentPage, token);
      // const { vendorsList, totalPages, message } = response.data;
      //   if (message === 'Data not found') {
      //     setVendors([]);
      //   } else {
      //     setVendors(vendorsList);
      //     setTotalPages(totalPages);
      //   }
      // } catch (error) {
      //   console.error('Error fetching vendor data:', error);
      // }
    };

    handleSearch(); // Call the fetchData function when the component mounts or when searchTerm/currentPage changes.
  }, [searchTerm, currentPage]);

  return (
    <div className="table-subContainer">
      <div className="justifyBetween">
        <h5>Suspended List</h5>
        {/* <div className="searchBar">
          <input
            type="text"
            placeholder="Search in vendor list"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <span id="search">
            <HiOutlineSearch />
          </span>
         
        </div> */}
      </div>
      <div className="table-main table-main-routes margin_top">
        <div className="table-container">
          <div className="table-wrapper px-4" style={{ height: '68vh' }}>
            <table className="tables">
              <thead className="table-head head-design">
                {role === '1' && (
                  <tr className="head-tr" style={{ height: '4rem' }}>
                    <th>Sr. No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Company</th>
                    <th>Action</th>
                  </tr>
                )}
                {role === '2' && (
                  <tr className="head-tr" style={{ height: '4rem' }}>
                    <th>Sr. No.</th>
                    <th>Company Name</th>
                    <th>Owner Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                  </tr>
                )}
                {role === '3' && (
                  <tr className="head-tr" style={{ height: '4rem' }}>
                    <th>Sr. No.</th>
                    <th>Company Name</th>
                    <th>Owner Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Status</th>
                  </tr>
                )}
              </thead>
              <tbody className="table-body">
                {role === '1' || vendors?.length > 0 ? (
                  vendors?.map((user, index) => (
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
                      <td>{user.email}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.companyName}</td>
                      <td>
                        <div className="dropdown">
                          <button
                            className="dropdown-toggle dropdown-pending"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Action
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
                      </td>
                    </tr>
                  ))
                ) : role === '2' && vendorsLists.length > 0 ? (
                  vendorsLists.map((user, vendorIndex) => (
                    <tr className="body-tr" key={vendorIndex}>
                      <td>{vendorIndex + 1}</td>
                      <td>{user.companyName}</td>
                      <td>{user.companyOwner}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.email}</td>
                    </tr>
                  ))
                ) : role === '3' && vendorsLists.length > 0 ? (
                  vendorsLists.map((user, userIndex) => (
                    <tr className="body-tr" key={userIndex}>
                      <td>{userIndex + 1}</td>
                      <td>{user.companyName}</td>
                      <td>{user.companyOwner}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.email}</td>
                      <td>
                        <div className="status-edit">
                          <span
                            onClick={() => {
                              handleViewProducts(user._id, currentPage);
                            }}
                            className="status-text-edit"
                          >
                            View Product
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
      {showProdusts ? (
        <ViewAllProductsPoupop
          setShowProdusts={setShowProdusts}
          products={products}
          setProducts={setProducts}
          userId={userId}
        />
      ) : null}
    </div>
  );
};

export default Suspended;
