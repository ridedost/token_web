import React, { useEffect, useState } from "react";
import { vendorsList } from "../../Api/userApi";

import { setFetching } from "../../redux/reducer/fetching";
import { useDispatch } from "react-redux";
import User from "../../assets/header/user.svg";

const UserVendorsTable = ({ vendors }) => {
  return (
    <div className="table-container" style={{ overflowX: "clip" }}>
      <div style={{ height: "60px" }}>
        <h5 style={{ padding: "20px" }}>Vendors List</h5>
      </div>
      <div className="table-wrapper px-4">
        <table className="tables">
          <thead className="table-head" style={{ background: "#f4f7fe" }}>
            <tr className="head-tr">
              <th>Sr. No.</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {vendors?.length > 0 ? (
              vendors?.map((vendor, index) => {
                return (
                  <tr className="body-tr" key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={User}
                        className="rounded-circle header-profile-user "
                      />
                      {vendor.companyName}
                    </td>
                    <td>{vendor.phoneNumber}</td>
                    <td>{vendor.email}</td>
                  </tr>
                );
              })
            ) : (
              <tr className="body-tr">
                <td colSpan="4" className="no-data">
                  No Vendors Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserVendorsTable;
