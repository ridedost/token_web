import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

const ViewAllCouponPoupop = ({ coupons, setShowAllCoupons }) => {
  return (
    <div className="modal">
      <div className="modal-content-table ">
        <span className="cancle-modal" onClick={() => setShowAllCoupons(false)}>
          <AiFillCloseCircle fontSize={40} />
        </span>
        <div
          className="table-main"
          style={{ boxShadow: "0px 0px 0px 0px", marginTop: "0px" }}
        >
          <div className=" margin-inline card-align" style={{ top: "0px" }}>
            <div className="table-wrapper px-4" style={{ maxHeight: "510px" }}>
              <table className="tables">
                <thead className="table-head head-design">
                  <tr className="head-tr" style={{ height: "4rem" }}>
                    <th>Sr. No.</th>
                    <th>User</th>
                    <th>Coupon Code</th>
                    <th>Coupon Points</th>
                    <th>Generated On</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {coupons?.length > 0 ? (
                    coupons?.map((vendor, index) => (
                      <tr className="body-tr" key={index}>
                        <td>{index + 1}</td>
                        <td>{vendor.userName}</td>
                        <td>{vendor.couponCode}</td>
                        <td>{vendor.point} Points</td>
                        <td>{vendor.expirationDate}</td>
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

export default ViewAllCouponPoupop;
