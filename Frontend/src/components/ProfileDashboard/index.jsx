/** @format */

import React from 'react';
import './index.css';
import ProfileImg from '../../assets/profile-img.svg';
import LocationImg from '../../assets/location.svg';

const ProfileDashboard = ({
  vendorInfo,
  totalCoupons,
  totalVendors,
  validCouponsLength,
  redeemCouponsLength,
}) => {
  return (
    <div className="profile-dashboard">
      <div className="profile-dashboard-container">
        <div className="profile-img">
          <div className="img-ellipse">
            <img src={vendorInfo[0]?.profileImage || ProfileImg} />
          </div>
        </div>
        <div className="admin-name">
          <h2 style={{ marginTop: '30px' }}>{vendorInfo[0]?.name}</h2>
        </div>
        <div className="admin-location">
          <img src={LocationImg} style={{ width: '20px', height: '25px' }} />
          &nbsp;
          <h5>{vendorInfo[0]?.address}</h5>
        </div>
        <div className="profile-frame">
          <div className="profile-frame-data">
            <h5>Vendors</h5>
            <h1>{totalVendors || 0}</h1>
          </div>
          <div className="profile-frame-data">
            <h5>Genrate</h5>
            <h1>{validCouponsLength || 0}</h1>
          </div>
          <div className="profile-frame-data">
            <h5>Redeem</h5>
            <h1>{redeemCouponsLength || 0}</h1>
          </div>
        </div>
        {/* user  for */}
        {/* <div className="profile-frame">
          <div className="profile-frame-data">
            <h5>Total Coupons </h5>
            <h1>{totalVendors}</h1>
          </div>
          <div className="profile-frame-data">
            <h5>Ge. Coupons</h5>
            <h1>{totalCoupons}</h1>
          </div>
          <div className="profile-frame-data">
            <h5>Rd. Coupons</h5>
            <h1>76</h1>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProfileDashboard;
