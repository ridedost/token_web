/** @format */

import React, { useEffect, useState } from 'react';
import './index.css';
import Dot from '../../assets/dot.svg';
import { notificationRead } from '../../Api/adminApi';
import { userNotificationRead } from '../../Api/userApi';
import moment from 'moment';
import $ from 'jquery';
const Notification = ({ notifyNumber }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getNotificationRead();

    // Dynamically adjust blue line height when component mounts or content changes
    $('.notification-message').each(function () {
      var contentHeight = $(this).find('p').outerHeight();
      $(this)
        .find('.blue-line')
        .css('height', contentHeight + 'px');
    });
  }, [notifications]);

  const getNotificationRead = async () => {
    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    try {
      if (role === '1') {
        const response = await notificationRead(token);
        if (response.status === 200) {
          console.warn(response);
          setNotifications(response.data.updatedNotifications);
          // setSelectedImage(data.profileImage?.secure_url || "N/A");
        }
      } else if (role === '2') {
        const response = await notificationRead(token);
        if (response.status === 200) {
          setNotifications(response.data.updatedNotifications);
          // setSelectedImage(data.profileImage?.secure_url || "N/A");
        }
      } else if (role === '3') {
        const response = await userNotificationRead(token);
        if (response.status === 200) {
          console.warn(response);
          setNotifications(response.data.updatedNotifications);
          // setSelectedImage(data.profileImage?.secure_url || "N/A");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.warn(notifications);

  return (
    <div className="notification-main">
      <div className="noti-header">
        <div id="notification-text">
          <h6>Notification</h6>
          {notifyNumber ? (
            <span style={{ marginLeft: '6px' }}>{notifyNumber}</span>
          ) : null}
        </div>
        <div id="notification-mark">
          <p>Mark all as read</p>
          <span>
            <img src={Dot} style={{ width: '20px' }} />
          </span>
        </div>
      </div>
      <div className="overflow">
        {notifications.length > 0 ? (
          notifications.map((notifi, index) => (
            <div className="user-notification" key={index}>
              <h6>{notifi.sendor_name}</h6>
              <p className="notification-title">
                <span>{notifi.title}</span>
                {notifi.isRead === false && <span id="unread"></span>}
              </p>
              <div className="notification-message ">
                <div className="blue-line"></div>
                <p>{notifi.message}</p>
              </div>
              <p>
                {/* {moment(notifi.createdAt).format('MMMM Do YYYY, h:mm:ss a')} */}
                {moment(notifi.createdAt).startOf('hour').fromNow()}
              </p>
              <div className="line"></div>
            </div>
          ))
        ) : (
          <div className="no-product" style={{ width: '100%', height: '100%' }}>
            <h4 colSpan="9" className="no-data">
              No Notification
            </h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
