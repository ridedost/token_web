import React, { useState, useEffect } from "react";
import "./index.css";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import {
  MdOutlineThumbUpOffAlt,
  MdOutlineThumbDownOffAlt,
  MdDeleteOutline,
} from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { getAllVendors, vendorDelete } from "../../Api/adminApi";
import { vendorsList } from "../../Api/userApi";
import User from "../../assets/header/user.svg";
import { setFetching } from "../../redux/reducer/fetching";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const VendorList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState("");
  const [vendors, setVendors] = useState([]);
  const [vendorsLists, setVendorsLists] = useState([]);
  const itemsPerPage = 8;

  // Define 'role' here
  const maintoken = localStorage.getItem("auth_token");
  const role = maintoken.charAt(maintoken.length - 1);

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Vendors List";
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    // Remove 'const role = ...' from here
    const token = maintoken.slice(0, -1);
    dispatch(setFetching(true));

    try {
      if (role === "1") {
        const response = await getAllVendors(token);
        if (response.status === 200) {
          const data = response.data.vendors;
          setVendors(data);
          setVendorsLists([]); // Reset vendorsList in case it was previously set
        } else {
          console.error("Error fetching vendors:", response);
          setVendors([]);
        }
      } else if (role === "2") {
        const response = await vendorsList(token);
        if (response.status === 200) {
          const data = response.data.Admins;
          setVendorsLists(data);
          setVendors([]); // Reset vendors in case it was previously set
        } else {
          console.error("Error fetching vendors:", response);
          setVendorsLists([]);
        }
      } else if (role === "3") {
        const response = await vendorsList(token);
        if (response.status === 200) {
          const data = response.data.Admins;
          setVendorsLists(data);
          setVendors([]); // Reset vendors in case it was previously set
        } else {
          console.error("Error fetching vendors:", response);
          setVendorsLists([]);
        }
      } else {
        console.error("Invalid role:", role);
        setVendors([]);
        setVendorsLists([]);
      }
    } catch (error) {
      console.error("Error fetching vendors:", error);
      setVendors([]);
      setVendorsLists([]);
    } finally {
      dispatch(setFetching(false));
    }
  };
  // Pagination
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentData =
    role === "1"
      ? vendors?.slice(firstIndex, lastIndex)
      : vendorsLists?.slice(firstIndex, lastIndex) || [];

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleApprove = (id) => {
    console.log("Approve", id);
    // Handle the approval logic here
  };

  const handleReject = (id) => {
    console.log("Reject", id);
    // Handle the rejection logic here
  };

  const handleDelete = async (id) => {
    console.log("Delete", id);
    const maintoken = localStorage.getItem("auth_token");
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);
    try {
      const response = await vendorDelete(id, token);
      // console.warn(response);
      if (response.status === 200) {
        toast.success("Vendor Deleted Successfully");
        fetchVendors();
      }
    } catch (error) {}
  };

  const handleDropdown = (id) => {
    setVendors((prevVendors) =>
      prevVendors.map((user) => ({
        ...user,
        show: user._id === id ? !user.show : user.show,
      }))
    );
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="table-subContainer">
      <h5>Vendors List</h5>
      <div className="table-main">
        <div className="table-container">
          <div className="table-wrapper px-4">
            <table className="tables">
              <thead className="table-head head-design">
                {role === "1" && (
                  <tr className="head-tr" style={{ height: "4rem" }}>
                    <th>Sr. No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Company</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                )}
                {role === "2" && (
                  <tr className="head-tr" style={{ height: "4rem" }}>
                    <th>Sr. No.</th>
                    <th>Company Name</th>
                    <th>Owner Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                  </tr>
                )}
                {role === "3" && (
                  <tr className="head-tr" style={{ height: "4rem" }}>
                    <th>Sr. No.</th>
                    <th>Company Name</th>
                    <th>Owner Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                  </tr>
                )}
              </thead>
              <tbody className="table-body">
                {role === "1" && vendors.length > 0 ? (
                  currentData.map((user, index) => (
                    <tr className="body-tr" key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={User}
                          className="rounded-circle header-profile-user "
                        />
                        {user.name}
                      </td>
                      <td>{user.email}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.companyName}</td>
                      <td>{user.cash}</td>
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
                                ? "dropdown-menu drop-up"
                                : "dropdown-menu drop-down"
                            }`}
                            aria-labelledby="dropdownMenuButton1"
                          >
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
                        {/* <button
                        className="status-button-delete"
                        onClick={() => handleDelete(user._id)}
                      >
                        <MdDeleteOutline fontSize={18} />
                        &nbsp;Delete
                      </button> */}
                        {/* <div className="status-pending">
                        <span
                          className={`d-inline-block dropdown ${
                            user.show ? "show" : ""
                          }`}
                        >
                          <span
                            className="status-text-pending"
                            onClick={() => handleDropdown(user._id)}
                          >
                            Action &nbsp;
                            {user.show ? (
                              <IoIosArrowUp fontSize={15} />
                            ) : (
                              <IoIosArrowDown fontSize={15} />
                            )}
                          </span>
                          {user.show && (
                            <div
                              className="dropdown-menu-end dropdown-menu show"
                              style={{ padding: "13px" }}
                            >
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
                      </div> */}
                      </td>
                    </tr>
                  ))
                ) : role === "2" && vendorsLists.length > 0 ? (
                  currentData.map((user, index) => (
                    <tr className="body-tr" key={index}>
                      <td>{index + 1}</td>
                      <td>{user.companyName}</td>
                      <td>{user.companyOwner}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.email}</td>
                    </tr>
                  ))
                ) : role === "3" && vendorsLists.length > 0 ? (
                  currentData.map((user, index) => (
                    <tr className="body-tr" key={index}>
                      <td>{index + 1}</td>
                      <td>{user.companyName}</td>
                      <td>{user.companyOwner}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.email}</td>
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
        <div className="pagination">
          {role === "1" && vendors.length > 0 && (
            <ul className="pagination-list">
              <li
                className={`pagination-item ${
                  currentPage === 1 ? "disabled" : ""
                }`}
                onClick={() => currentPage !== 1 && paginate(currentPage - 1)}
              >
                <AiOutlineLeft />
              </li>
              {Array.from({
                length: Math.ceil(vendors?.length / itemsPerPage),
              }).map((_, index) => (
                <li
                  key={index}
                  className={`pagination-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </li>
              ))}
              <li
                className={`pagination-item ${
                  currentPage === Math.ceil(vendors?.length / itemsPerPage)
                    ? "disabled"
                    : ""
                }`}
                onClick={() =>
                  currentPage !== Math.ceil(vendors?.length / itemsPerPage) &&
                  paginate(currentPage + 1)
                }
              >
                <AiOutlineRight />
              </li>
            </ul>
          )}
          {role === "2" && vendorsLists.length > 0 && (
            <ul className="pagination-list">
              <li
                className={`pagination-item ${
                  currentPage === 1 ? "disabled" : ""
                }`}
                onClick={() => currentPage !== 1 && paginate(currentPage - 1)}
              >
                <AiOutlineLeft />
              </li>
              {Array.from({
                length: Math.ceil(vendorsLists?.length / itemsPerPage),
              }).map((_, index) => (
                <li
                  key={index}
                  className={`pagination-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </li>
              ))}
              <li
                className={`pagination-item ${
                  currentPage === Math.ceil(vendorsLists?.length / itemsPerPage)
                    ? "disabled"
                    : ""
                }`}
                onClick={() =>
                  currentPage !==
                    Math.ceil(vendorsLists?.length / itemsPerPage) &&
                  paginate(currentPage + 1)
                }
              >
                <AiOutlineRight />
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorList;
