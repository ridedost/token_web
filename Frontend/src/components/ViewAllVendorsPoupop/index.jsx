import React from "react";
import "./index.css";
import { AiFillCloseCircle } from "react-icons/ai";

const ViewAllVendorsPoupop = ({ adminVendors, setShowAllVendors }) => {
  return (
    <div className="modal">
      <div className="modal-content-table ">
        <span className="cancle-modal" onClick={() => setShowAllVendors(false)}>
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
          <div className=" margin-inline card-align" style={{ top: "0px" }}>
            <div className="table-wrapper px-4" style={{ maxHeight: "454px" }}>
              <table className="tables">
                <thead className="table-head head-design">
                  <tr className="head-tr" style={{ height: "4rem" }}>
                    <th>Sr. No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Compony</th>
                    <th>Owner</th>
                    <th>Phone Number</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {adminVendors?.length > 0 ? (
                    adminVendors?.map((vendor, index) => (
                      <tr className="body-tr" key={index}>
                        <td>{index + 1}</td>
                        <td>{vendor.name}</td>
                        <td>{vendor.email}</td>
                        <td>{vendor.companyName}</td>
                        <td>{vendor.companyOwner}</td>
                        <td>{vendor.phoneNumber}</td>
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

export default ViewAllVendorsPoupop;
