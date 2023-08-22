import React from "react";

const UserCouponsTable = ({ userCoupons }) => {
  return (
    <div className="table-container" style={{ overflowX: "clip" }}>
      <div style={{ height: "60px" }}>
        <h5 style={{ padding: "20px" }}>Coupons List</h5>
      </div>
      <div className="table-wrapper px-4">
        <table className="tables">
          <thead className="table-head" style={{ background: "#f4f7fe" }}>
            <tr className="head-tr">
              <th>Sr. No.</th>
              <th>Coupon</th>
              <th>Point</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {userCoupons.length > 0 ? (
              userCoupons?.map((coupon, index) => {
                return (
                  <tr className="body-tr" key={index}>
                    <td>{index + 1}</td>
                    <td>{coupon.couponCode}</td>
                    <td>{coupon.point}</td>
                    <td>{coupon?.userName}</td>
                  </tr>
                );
              })
            ) : (
              <tr className="body-tr">
                <td colSpan="4" className="no-data">
                  No Coupons Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserCouponsTable;
