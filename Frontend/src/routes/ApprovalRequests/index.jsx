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
} from "../../Api/adminApi";
import { setFetching } from "../../redux/reducer/fetching";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import EditVendorsModal from "../../components/EditVendorsModal";

const ApprovalRequest = () => {
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
          const data = response.data.allRequest;
          setAllSendRequests(data);
        } else {
          setAllSendRequests([]);
        }
      } else if (role === "2") {
        const response = await allSendRequestForVendors(token);
        if (response.status === 200) {
          const data = response.data.allRequest;
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
    const maintoken = localStorage.getItem("auth_token");
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    dispatch(setFetching(true));
    try {
      if (role === "1") {
        const response = await vendorApprove(id, token);
        console.log(response);
        if (response.status === 200) {
          dispatch(setFetching(false));
          toast.success("Vendors Successfully Approved!");
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

  const handleDelete = async (_id) => {
    const maintoken = localStorage.getItem("auth_token");
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    dispatch(setFetching(true));
    try {
      if (role === "1") {
        const response = await vendorDelete(_id, token);
        if (response.status === 200) {
          dispatch(setFetching(false));
          toast.success("Vendors Successfully Deleted!");
          fetchAllSendRequests();
        }
      }
    } catch (error) {
      dispatch(setFetching(false));
      toast.error("Vendor not found!");
    }
    // Handle the delete logic here
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
                  <th>Requested To</th>
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
                      <td>{user.reciever.vendorName}</td>
                      <td>{user.user.name}</td>
                      <td>{user.CouponValue} Points</td>
                      <td>{user.coupon.couponCode}</td>
                      <td>{user?.sendor?.Date.slice(0, 10)}</td>
                      <td>
                        {user.superAdmin.status === "pending" && (
                          <div className="status-pending">
                            <span
                              className={`d-inline-block dropdown ${
                                user.show ? "show" : ""
                              }`}
                            >
                              <span
                                className="status-text-pending"
                                onClick={() => handleDropdown(user._id)}
                              >
                                Pending &nbsp;
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
                                  <div className="status-edit">
                                    <span
                                      onClick={() => handleApprove(user._id)}
                                      className="status-text-edit"
                                    >
                                      Forword
                                    </span>
                                  </div>
                                </div>
                              )}
                            </span>
                          </div>
                        )}
                      </td>
                      {/* <td>{user.superAdmin.status}</td> */}
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

export default ApprovalRequest;
