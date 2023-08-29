import React, { useEffect, useState } from "react";
import { getAllVendors } from "../../Api/adminApi";
import { vendorsList } from "../../Api/userApi";

import "./index.css";
import { setFetching } from "../../redux/reducer/fetching";
import { useDispatch } from "react-redux";
import User from "../../assets/header/user.svg";
import RightArrow from "../../assets/right-arrow-vector.svg";
import ProfileImg from "../../assets/header/user.svg";
import Phone from "../../assets/phone.svg";
import { AiOutlineMail } from "react-icons/ai";
import ViewAllVendorsPoupop from "../ViewAllVendorsPoupop";

const VendorsTable = ({ adminVendors, fetchAllVendorsList }) => {
  return (
    <React.Fragment>
      <div className="list-heading">
        <h3>Vendors List</h3>
        <div onClick={fetchAllVendorsList} className="view-all-list">
          <h6>View All</h6>
          <img src={RightArrow} />
        </div>
      </div>
      <section className="vendors-list-data">
        {adminVendors?.length > 0
          ? adminVendors?.slice(0, 3).map((vendor, index) => (
              <div className="vendors-all-list" key={index}>
                <div className="vendors-details">
                  <img src={vendor?.profileImage?.url || ProfileImg} />
                  <div className="vendors-list">
                    <h4>{vendor.name}</h4>
                    <div className="contact">
                      <img src={Phone} width={15} />
                      &nbsp;
                      <span>{vendor.phoneNumber}</span> &nbsp;<span>|</span>
                      &nbsp;
                      {/* <span id="contact-email">
                        <AiOutlineMail fontSize={19} />
                        &nbsp;{vendor.email}{" "}
                        <span className="tooltiptext">{vendor.email}</span>
                      </span> */}
                      <span
                        id="contact-email"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title={vendor.email}
                      >
                        <AiOutlineMail fontSize={19} />
                        &nbsp;{vendor.email}
                        {/* <span className="tooltiptext">{vendor.email}</span> */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : ""}
      </section>
    </React.Fragment>
  );
};

export default VendorsTable;
