import React from "react";
import "./index.css";
import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineClockCircle,
  AiFillCloseCircle,
} from "react-icons/ai";
import {
  MdOutlineThumbUpOffAlt,
  MdOutlineThumbDownOffAlt,
  MdDeleteOutline,
} from "react-icons/md";
import { BsHourglassSplit, BsDot } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { setFetching } from "../../redux/reducer/fetching";
import { sendRequest } from "../../Api/adminApi";
import { useDispatch } from "react-redux";

const SendRequestPoupop = ({
  coupons,
  setCoupons,
  setShowSendRequest,
  fetchVendors,
}) => {
  const handleDropdown = (id) => {
    setCoupons((prevCoupons) =>
      prevCoupons.map((user) => ({
        ...user,
        show: user._id === id ? !user.show : user.show,
      }))
    );
  };

  const dispatch = useDispatch();

  const handleSendRequest = async (couponCode) => {
    console.warn(couponCode);
    dispatch(setFetching(true));
    const maintoken = localStorage.getItem("auth_token");
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);
    try {
      if (role === "1") {
        const response = await sendRequest(couponCode, token);
        if (response.status === 200) {
          console.warn(response);
          const data = response.data.coupons;
          setCoupons(data);
          dispatch(setFetching(false));
          fetchVendors();
        }
      }
      if (role === "2") {
        const response = await sendRequest(couponCode, token);
        if (response.status === 200) {
          console.warn(response);
          const data = response.data.coupons;
          setCoupons(data);
          dispatch(setFetching(false));
          fetchVendors();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setFetching(false));
    }
  };

  console.log(coupons);
  return (
    <div className="modal">
      <div className="modal-content-table ">
        <span
          className="cancle-modal"
          onClick={() => setShowSendRequest(false)}
        >
          <AiFillCloseCircle fontSize={40} />
        </span>
        <div
          className="table-main"
          style={{
            boxShadow: "0px 0px 0px 0px",
            marginTop: "0px",
            height: "100%",
          }}
        >
          <div className="margin-inline card-align" style={{ top: "0px" }}>
            <div className="table-wrapper px-4" style={{ maxHeight: "454px" }}>
              <table className="tables">
                <thead className="table-head head-design">
                  <tr className="head-tr" style={{ height: "4rem" }}>
                    <th>Sr. No.</th>
                    <th>Name</th>
                    <th>Coupon Code</th>
                    <th>Coupon Value</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>User Id</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {coupons?.length > 0 ? (
                    coupons?.map((copon, index) => (
                      <tr className="body-tr" key={index}>
                        <td>{index + 1}</td>
                        <td>{copon.user.name}</td>
                        <td>{copon?.coupon?.couponCode}</td>
                        <td>{copon.CouponValue} Points</td>
                        <td>₹ {copon?.amount}</td>
                        <td>
                          {/* {copon?.coupon?.Date.slice(0, 10)} */}
                          {/* {new Date(copon?.coupon?.Date).toLocaleDateString() ||
                          "NA"} */}
                        </td>

                        <td>{copon?.user?.userId}</td>
                        <td>
                          {copon?.sendor.status === "pending" && (
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
                                className={`${
                                  index >= 7
                                    ? "dropdown-menu drop-up"
                                    : "dropdown-menu drop-down"
                                }`}
                                aria-labelledby="dropdownMenuButton1"
                              >
                                <li>
                                  <span
                                    onClick={() =>
                                      handleSendRequest(copon.coupon.couponCode)
                                    }
                                    className="dropdown-item dropdown-color-edit"
                                  >
                                    Send Request
                                  </span>
                                </li>
                              </ul>
                            </div>
                          )}
                          {copon?.sendor.status === "requested" && (
                            <div
                              className="status-edit"
                              onClick={() => handleDropdown(copon._id)}
                            >
                              <span
                                className={`d-inline-block dropdown ${
                                  copon.show ? "show" : ""
                                }`}
                              >
                                <span className="status-text-edit">
                                  Requested
                                </span>
                              </span>
                            </div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendRequestPoupop;
