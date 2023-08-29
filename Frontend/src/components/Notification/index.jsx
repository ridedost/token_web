import React from "react";
import "./index.css";
import Dot from "../../assets/dot.svg";
const Notification = () => {
  return (
    <div className="notification-main">
      <div className="noti-header">
        <div id="notification-text">
          <h6>Notification</h6>
          <span>2</span>
        </div>
        <div id="notification-mark">
          <p>Mark all as read</p>
          <span>
            <img src={Dot} style={{ width: "20px" }} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Notification;
