import React, { useState, useEffect } from "react";
import "./index.css";
import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineClockCircle,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {
  allSendRequestForAdmin,
  allSendRequestForVendors,
  vendorApprove,
  vendorReject,
  vendorDelete,
  forwardRequest,
  acceptRequest,
  returnRequest,
} from "../../Api/adminApi";
import { allSendRequestForVendor } from "../../Api/vendorApi";
import { setFetching } from "../../redux/reducer/fetching";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import EditVendorsModal from "../../components/EditVendorsModal";

const RejectedRequest = () => {
  const [showEditVendor, setShowEditVendor] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [allSendRequests, setAllSendRequests] = useState([]);
  const itemsPerPage = 10;

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Approval Request";
    fetchAllSendRequests();
  }, []);

  const fetchAllSendRequests = async () => {
    const maintoken = localStorage.getItem("auth_token");
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    dispatch(setFetching(true));
    try {
      if (role === "1") {
        const response = await allSendRequestForAdmin(token);
        if (response.status === 200) {
          console.warn(response);
          const data = response.data.allRequest;
          setAllSendRequests(data);
        } else {
          setAllSendRequests([]);
        }
      } else if (role === "2") {
        const response = await allSendRequestForVendor(token);
        if (response.status === 200) {
          console.warn(response);
          const data = response.data?.allRequest
            ? response.data?.allRequest
            : response.data?.allReq;
          setAllSendRequests(data);
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
    const maintoken = localStorage.getItem("auth_token");
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    dispatch(setFetching(true));
    try {
      if (role === "1") {
        const response = await acceptRequest(token, id);
        console.log(response);
        if (response.status === 200) {
          dispatch(setFetching(false));
          toast.success("Admin Successfully Approved!");
          fetchAllSendRequests();
        }
      }
      if (role === "2") {
        const response = await acceptRequest(token, id);
        console.log(response);
        if (response.status === 200) {
          dispatch(setFetching(false));
          toast.success("Admin Successfully Approved!");
          fetchAllSendRequests();
        }
      }
    } catch (error) {
      dispatch(setFetching(false));
      toast.error("Vendor not found!");
    }
    // Handle the approval logic here
  };

  const handleForward = async (id) => {
    console.warn(id);
    const maintoken = localStorage.getItem("auth_token");
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    dispatch(setFetching(true));
    try {
      if (role === "1") {
        const response = await forwardRequest(token, id);
        console.log(response);
        if (response.status === 200) {
          dispatch(setFetching(false));
          toast.success("Admin Successfully Approved!");
          fetchAllSendRequests();
        }
      }
      if (role === "2") {
        const response = await forwardRequest(token, id);
        console.log(response);
        if (response.status === 200) {
          dispatch(setFetching(false));
          toast.success("Admin Successfully Approved!");
          fetchAllSendRequests();
        }
      }
    } catch (error) {
      dispatch(setFetching(false));
      toast.error("Vendor not found!");
    }
    // Handle the approval logic here
  };

  const handleReturn = async (id) => {
    console.warn(id);
    const maintoken = localStorage.getItem("auth_token");
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    dispatch(setFetching(true));
    try {
      if (role === "1") {
        const response = await returnRequest(token, id);
        console.log(response);
        if (response.status === 200) {
          dispatch(setFetching(false));
          toast.success("Admin Successfully Approved!");
          fetchAllSendRequests();
        }
      }
      if (role === "2") {
        const response = await returnRequest(token, id);
        console.log(response);
        if (response.status === 200) {
          dispatch(setFetching(false));
          toast.success("Admin Successfully Approved!");
          fetchAllSendRequests();
        }
      }
    } catch (error) {
      dispatch(setFetching(false));
      toast.error("Vendor not found!");
    }
    // Handle the approval logic here
  };

  const handleReject = async (_id) => {
    const maintoken = localStorage.getItem("auth_token");
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    dispatch(setFetching(true));

    try {
      if (role === "1") {
        const response = await vendorReject(_id, token);
        if (response.status === 200) {
          console.log(response);
          // const data = response.data.vendors;
          // setAllSendRequests(data);
          dispatch(setFetching(false));
          toast.success("Vendors Successfully updated!");
        }
      }
    } catch (error) {
      dispatch(setFetching(false));
      toast.error("Vendor not found!");
    }
    // Handle the approval logic here
  };

  const handleDropdown = (id) => {
    setAllSendRequests((prevVendors) =>
      prevVendors.map((user) => ({
        ...user,
        show: user._id === id ? !user.show : user.show,
      }))
    );
  };

  return (
    <div className="table-subContainer">
      <h5>Approval Request</h5>
      <div className="table-main">
        <div className="table-container">
          <div className="table-wrapper px-4">
            <table className="tables">
              <thead
                className="table-head head-design"
                // style={{ background: "var(--color-white)", borderBottom: "1px solid #e1dede" }}
              >
                <tr className="head-tr" style={{ height: "4rem" }}>
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
                      <td>{user.CouponValue} Points</td>
                      <td>{user.coupon.couponCode}</td>
                      <td>{user?.sendor?.Date.slice(0, 10)}</td>
                      <td>
                        {/* for   reciver  as vendor  */}
                        {user.receiver.vendorId === user.superAdmin.adminId &&
                          user.receiver?.status != "accepted" &&
                          user.sender?.status != "accepted" && (
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
                          )}
                        {user.receiver.vendorId != user.superAdmin.adminId &&
                          user.receiver?.status != "accepted" &&
                          user.sender?.status != "accepted" &&
                          user.superAdmin?.status != "forwarded" && (
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
                                    onClick={() => handleForward(user._id)}
                                    className="dropdown-item dropdown-color-approve"
                                  >
                                    Forward
                                  </span>
                                </li>
                              </ul>
                            </div>
                          )}
                        {user.receiver.vendorId != user.superAdmin.adminId &&
                          user.receiver?.status != "accepted" &&
                          user.sender?.status != "accepted" &&
                          user.superAdmin?.status === "forwarded" && (
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
                          )}
                        {user.receiver.vendorId != user.superAdmin.adminId &&
                          user.receiver?.status === "accepted" &&
                          user.sendor?.status === "requested" &&
                          user.superAdmin?.status === "requestedback" && (
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
                                    onClick={() => handleReturn(user._id)}
                                    className="dropdown-item dropdown-color-approve"
                                  >
                                    Return
                                  </span>
                                </li>
                              </ul>
                            </div>
                          )}
                        {user.receiver.vendorId != user.superAdmin.adminId &&
                          user.receiver?.status === "accepted" &&
                          user.sendor?.status === "pending" &&
                          user.superAdmin?.status === "returning" && (
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
        <div className="pagination">
          {allSendRequests?.length > 0 && (
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
                length: Math.ceil(allSendRequests?.length / itemsPerPage),
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
                  currentPage ===
                  Math.ceil(allSendRequests?.length / itemsPerPage)
                    ? "disabled"
                    : ""
                }`}
                onClick={() =>
                  currentPage !==
                    Math.ceil(allSendRequests?.length / itemsPerPage) &&
                  paginate(currentPage + 1)
                }
              >
                <AiOutlineRight />
              </li>
            </ul>
          )}
        </div>
      </div>
      {showEditVendor ? (
        <EditVendorsModal setShowEditVendor={setShowEditVendor} />
      ) : null}
    </div>
  );
};

export default RejectedRequest;
