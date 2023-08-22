import React from "react";
import "./index.css";
import ProfileImg from "../../assets/profile-img.svg";
import LocationImg from "../../assets/location.svg";

const ProfileDashboard = () => {
  return (
    <div className="profile-dashboard">
      <div className="profile-dashboard-container">
        <div className="profile-img">
          <div className="img-ellipse">
            <img src={ProfileImg} />
          </div>
        </div>
        <div className="admin-name">
          <h2 style={{ marginTop: "30px" }}>Admin Name</h2>
        </div>
        <div className="admin-location">
          <img src={LocationImg} style={{ width: "20px", height: "25px" }} />
          &nbsp;
          <h5>New York, USA</h5>
        </div>
        <div className="profile-frame">
          <div className="profile-frame-data">
            <h5>Vendors</h5>
            <h1>28</h1>
          </div>
          <div className="profile-frame-data">
            <h5>Coupons</h5>
            <h1>643</h1>
          </div>
          <div className="profile-frame-data">
            <h5>Rewards</h5>
            <h1>76</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
