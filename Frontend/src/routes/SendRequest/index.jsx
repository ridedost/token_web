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

import { getAllVendors, viewCoupons } from "../../Api/adminApi";
import { setFetching } from "../../redux/reducer/fetching";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import User from "../../assets/header/user.svg";
import SendRequestPoupop from "../../components/SendRequestPoupop";

const SendRequest = () => {
  const [showSendRequest, setShowSendRequest] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [vendors, setVendors] = useState([]);
  const [coupons, setCoupons] = useState([]);

  const itemsPerPage = 10;

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Send Request";
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    const maintoken = localStorage.getItem("auth_token");
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);
    dispatch(setFetching(true));
    try {
      if (role === "1") {
        const response = await getAllVendors(token);
        if (response.status === 200) {
          const data = response.data.vendors.map((user) => ({
            ...user,
            show: false,
          }));
          setVendors(data);
        } else {
          setVendors([]);
        }
      } else if (role === "2") {
        const response = await getAllVendors(token);
        if (response.status === 200) {
          const data = response.data.vendors.map((user) => ({
            ...user,
            show: false,
          }));
          setVendors(data);
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
  const currentData = vendors?.slice(firstIndex, lastIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleViewCoupons = async (id) => {
    // let dataIdValue = this.getAttribute("data-id");
    // console.log("data-id value:", dataIdValue);
    dispatch(setFetching(true));
    setShowSendRequest(true);
    const maintoken = localStorage.getItem("auth_token");
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);
    try {
      if (role === "1") {
        const response = await viewCoupons(id, token);
        if (response.status === 200) {
          console.log(response);
          const data = response.data.coupons;
          setCoupons(data);
          dispatch(setFetching(false));
          fetchVendors();
        } else {
          setVendors([]);
        }
      }
      if (role === "2") {
        const response = await viewCoupons(id, token);
        if (response.status === 200) {
          console.log(response);
          const data = response.data.coupons;
          setCoupons(data);
          dispatch(setFetching(false));
          fetchVendors();
        } else {
          setVendors([]);
        }
      }
    } catch (error) {
      setVendors([]);
      fetchVendors();
    } finally {
      dispatch(setFetching(false));
    }
  };

  return (
    <>
      <div className="table-subContainer">
        <h5>Send Request</h5>
        <div className="table-main">
          <div className="table-container">
            <div className="table-wrapper px-4">
              <table className="tables">
                <thead className="table-head head-design">
                  <tr className="head-tr" style={{ height: "4rem" }}>
                    <th>Sr. No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Company</th>
                    <th>Action</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {vendors?.length > 0 ? (
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
                        <td>
                          <div className="status-edit">
                            <span
                              onClick={() => handleViewCoupons(user._id)}
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
          </div>
          <div className="pagination">
            {vendors?.length > 0 && (
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
          </div>
        </div>
      </div>
      {showSendRequest ? (
        <SendRequestPoupop
          coupons={coupons}
          setCoupons={setCoupons}
          setShowSendRequest={setShowSendRequest}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default SendRequest;
