import React, { useState, useEffect } from "react";
import "./index.css";
import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineClockCircle,
} from "react-icons/ai";
import {
  MdOutlineThumbUpOffAlt,
  MdOutlineThumbDownOffAlt,
  MdDeleteOutline,
} from "react-icons/md";
import { BsHourglassSplit, BsDot } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import { paymentSettlement } from "../../Api/adminApi";
import { setFetching } from "../../redux/reducer/fetching";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import User from "../../assets/header/user.svg";
import EditVendorsModal from "../../components/EditVendorsModal";

const PaymentSettlements = () => {
  const [showEditVendor, setShowEditVendor] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [vendors, setVendors] = useState([]);
  const itemsPerPage = 10;

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Payment Settlements";
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    const maintoken = localStorage.getItem("auth_token");
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    dispatch(setFetching(true));
    try {
      if (role === "1") {
        const response = await paymentSettlement(token);
        if (response.status === 200) {
          console.warn(response);
          setVendors(response?.data);
        } else {
          setVendors([]);
        }
      }
      if (role === "2") {
        const response = await paymentSettlement(token);
        if (response.status === 200) {
          console.warn(response);
          setVendors(response?.data);
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

  // Pagination
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentData = vendors.slice(firstIndex, lastIndex);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // const handleApprove = async (id) => {
  //   const maintoken = localStorage.getItem("auth_token");
  //   const role = maintoken.charAt(maintoken.length - 1);
  //   const token = maintoken.slice(0, -1);

  //   dispatch(setFetching(true));
  //   try {
  //     if (role === "1") {
  //       const response = await vendorApprove(id, token);
  //       console.log(response);
  //       if (response.status === 200) {
  //         dispatch(setFetching(false));
  //         toast.success("Vendors Successfully Approved!");
  //         fetchVendors();
  //       }
  //     }
  //   } catch (error) {
  //     dispatch(setFetching(false));
  //     toast.error("Vendor not found!");
  //   }
  //   // Handle the approval logic here
  // };

  // const handleReject = async (_id) => {
  //   const maintoken = localStorage.getItem("auth_token");
  //   const role = maintoken.charAt(maintoken.length - 1);
  //   const token = maintoken.slice(0, -1);

  //   dispatch(setFetching(true));

  //   try {
  //     if (role === "1") {
  //       const response = await vendorReject(_id, token);
  //       if (response.status === 200) {
  //         console.log(response);
  //         // const data = response.data.vendors;
  //         // setVendors(data);
  //         dispatch(setFetching(false));
  //         toast.success("Vendors Successfully updated!");
  //       }
  //     }
  //   } catch (error) {
  //     dispatch(setFetching(false));
  //     toast.error("Vendor not found!");
  //   }
  //   // Handle the approval logic here
  // };

  // const handleDelete = async (_id) => {
  //   const maintoken = localStorage.getItem("auth_token");
  //   const role = maintoken.charAt(maintoken.length - 1);
  //   const token = maintoken.slice(0, -1);

  //   dispatch(setFetching(true));
  //   try {
  //     if (role === "1") {
  //       const response = await vendorDelete(_id, token);
  //       console.log(response);
  //       if (response.status === 200) {
  //         dispatch(setFetching(false));
  //         toast.success("Vendors Successfully Deleted!");
  //         fetchVendors();
  //       }
  //     }
  //   } catch (error) {
  //     dispatch(setFetching(false));
  //     toast.error("Vendor not found!");
  //   }
  //   // Handle the delete logic here
  // };

  const handleDropdown = (id) => {
    setVendors((prevVendors) =>
      prevVendors.map((user) => ({
        ...user,
        show: user._id === id ? !user.show : user.show,
      }))
    );
  };

  console.warn(vendors);

  return (
    <div className="table-main">
      <div className="table-container">
        <div className="table-wrapper px-4">
          <table className="tables">
            <thead className="table-head head-design">
              <tr className="head-tr" style={{ height: "4rem" }}>
                <th>Sr. No.</th>
                <th>User</th>
                <th>Requested By</th>
                <th>Requested To</th>
                <th>Coupon Code</th>
                <th>Coupon Points</th>
                {/* <th>Status</th> */}
                {/* <th></th> */}
              </tr>
            </thead>
            <tbody className="table-body">
              {vendors.length > 0 ? (
                currentData.map((vendor, index) => (
                  <tr className="body-tr" key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {/* <img
                        src={User}
                        className="rounded-circle header-profile-user "
                      /> */}
                      {vendor.user.name}
                    </td>
                    <td>{vendor.requestedBy.vendorName}</td>
                    <td>{vendor.requestedTo.vendorName}</td>
                    <td>{vendor.coupon.couponCode}</td>
                    <td>{vendor.amount}</td>
                    <td>
                      {vendor.status === "completed" && (
                        <div className="status-approve">
                          <span
                            className={`d-inline-block dropdown ${
                              vendor.show ? "show" : ""
                            }`}
                          >
                            <span
                              className="status-text-approved"
                              onClick={() => handleDropdown(vendor._id)}
                            >
                              Approved &nbsp;
                              {vendor.show ? (
                                <IoIosArrowUp fontSize={15} />
                              ) : (
                                <IoIosArrowDown fontSize={15} />
                              )}
                            </span>
                            {vendor.show && (
                              <div
                                className="dropdown-menu-end dropdown-menu show"
                                style={{ padding: "13px" }}
                              >
                                <div className="status-edit">
                                  <span
                                    onClick={() => setShowEditVendor(true)}
                                    className="status-text-edit"
                                  >
                                    Edit
                                  </span>
                                </div>
                                <div className="dropdown-divider"></div>
                                <div className="status-reject">
                                  <span
                                    // onClick={() => handleDelete(vendor._id)}
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

                      {vendor.status === "pending" && (
                        <div className="status-pending">
                          <span
                            className={`d-inline-block dropdown ${
                              vendor.show ? "show" : ""
                            }`}
                          >
                            <span
                              className="status-text-pending"
                              // onClick={() => handleDropdown(vendor._id)}
                            >
                              Pending &nbsp;
                              {vendor.show ? (
                                <IoIosArrowUp fontSize={15} />
                              ) : (
                                <IoIosArrowDown fontSize={15} />
                              )}
                            </span>
                            {vendor.show && (
                              <div
                                className="dropdown-menu-end dropdown-menu show"
                                style={{ padding: "13px" }}
                              >
                                <div className="status-approve">
                                  <span
                                    // onClick={() => handleApprove(vendor._id)}
                                    className="status-text-approved"
                                  >
                                    Approve
                                  </span>
                                </div>
                                <div className="dropdown-divider"></div>
                                <div className="status-reject">
                                  <span
                                    // onClick={() => handleReject(vendor._id)}
                                    className="status-text-reject"
                                  >
                                    &nbsp;Reject
                                  </span>
                                </div>
                              </div>
                            )}
                          </span>
                        </div>
                      )}

                      {vendor.status === "Reject" && (
                        <div className="status-reject">
                          <span
                            className={`d-inline-block dropdown ${
                              vendor.show ? "show" : ""
                            }`}
                          >
                            <span
                              className="status-text-reject"
                              // onClick={() => handleDropdown(vendor._id)}
                            >
                              Reject &nbsp;
                              {vendor.show ? (
                                <IoIosArrowUp fontSize={15} />
                              ) : (
                                <IoIosArrowDown fontSize={15} />
                              )}
                            </span>
                            {vendor.show && (
                              <div
                                className="dropdown-menu-end dropdown-menu show"
                                style={{ padding: "13px" }}
                              >
                                <div className="dropdown-divider"></div>
                                <div className="status-reject">
                                  <span
                                    // onClick={() => handleDelete(vendor._id)}
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
      </div>
      <div className="pagination">
        {vendors.length > 0 && (
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
              length: Math.ceil(vendors.length / itemsPerPage),
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
                currentPage === Math.ceil(vendors.length / itemsPerPage)
                  ? "disabled"
                  : ""
              }`}
              onClick={() =>
                currentPage !== Math.ceil(vendors.length / itemsPerPage) &&
                paginate(currentPage + 1)
              }
            >
              <AiOutlineRight />
            </li>
          </ul>
        )}
        {showEditVendor ? (
          <EditVendorsModal setShowEditVendor={setShowEditVendor} />
        ) : null}
      </div>
    </div>
  );
};

export default PaymentSettlements;
