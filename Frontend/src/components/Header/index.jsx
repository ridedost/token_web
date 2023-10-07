/** @format */

import React, { useState, useEffect } from 'react';
import './index.css'; // Create a separate CSS file for header styles
import { RiMenu2Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../redux/reducer/sidebar';
import Notifi from '../../assets/header/Notifications.svg';
import User from '../../assets/header/user.svg';
import Alert from '../../assets/header/alert.svg';
import { NavLink } from 'react-router-dom';
import { getAdminInfo, notificationCount } from '../../Api/adminApi';
import { getUserInfo, userNotificationCount } from '../../Api/userApi';
import Notification from '../Notification';
// import { socketFun } from '../../utils/socketFun';
// import { sendEvent } from '../../utils/sendEvent';

const Header = ({ onLogout, setShowSidebar }) => {
  const [show, setShow] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false); // New state to track scrolling
  const [vendorInfo, setVendorInfo] = useState({});
  const [count, setCount] = useState('');

  // const [selectedImage, setSelectedImage] = useState(null);

  const [showNotification, setShowNotification] = useState(false);

  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const role = useSelector((state) => state.role);
  const profileImage = useSelector(
    (state) => state?.profileImage?.profileImage,
  );
  const name = useSelector((state) => state?.name?.name);
  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
    setShowSidebar(true);
  };

  // Function to handle scrolling
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    getPersonalInfo();
    getNotificationCount();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [profileImage]);

  const getPersonalInfo = async () => {
    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    try {
      if (role === '1') {
        const response = await getAdminInfo(token);
        if (response.status === 200) {
          setVendorInfo(response.data.vendorInfo);
          // setSelectedImage(data.profileImage?.secure_url || "N/A");
        }
      } else if (role === '2') {
        const response = await getAdminInfo(token);
        if (response.status === 200) {
          setVendorInfo(response.data.vendorInfo);
          // setSelectedImage(data.profileImage?.secure_url || "N/A");
        }
      } else if (role === '3') {
        const response = await getUserInfo(token);
        if (response.status === 200) {
          console.warn(response);
          // const data = response.data.vendorInfo;
          setVendorInfo(response.data.vendorInfo);
          // setSelectedImage(data.profileImage?.secure_url || "N/A");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getNotificationCount = async () => {
    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    try {
      if (role === '1') {
        const response = await notificationCount(token);
        if (response.status === 200) {
          console.warn(response);
          setCount(response.data.count);
          // setSelectedImage(data.profileImage?.secure_url || "N/A");
        }
      } else if (role === '2') {
        const response = await notificationCount(token);
        if (response.status === 200) {
          setCount(response.data.count);
          // setSelectedImage(data.profileImage?.secure_url || "N/A");
        }
      } else if (role === '3') {
        const response = await userNotificationCount(token);
        if (response.status === 200) {
          console.warn(response);
          setCount(response.data.count);
          // setSelectedImage(data.profileImage?.secure_url || "N/A");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.warn(vendorInfo[0]?.profileImage);

  // const sendEvent = (id, type, msg) => {
  //   setShowNotification(!showNotification);
  //   socketIO.emit('sendEvent', {
  //     msg: msg,
  //     type: type,
  //     userid: id,
  //   });
  // };
  // sendEvent('7987432368', 'success', 'your coupon used ')
  const maintoken1 = localStorage.getItem('auth_token');
  const role1 = maintoken1.charAt(maintoken1.length - 1);
  const token1 = maintoken1.slice(0, -1);
  let notifyNumber = 1;
  return (
    <header id={`${isOpen ? 'page-topbar' : 'page-topbar-hide'} `}>
      <div className="navbar-header">
        <div className="d-flex">
          <button onClick={handleToggleSidebar} className="header-item  btn">
            <RiMenu2Fill fontSize={32} />
          </button>
        </div>
        <div className="d-flex header-right">
          <span
            onClick={
              () => setShowNotification(!showNotification)
              // sendEvent('7987432368', 'success', 'your coupon used ')
            }
          >
            <img src={Notifi} className="notification" />
          </span>
          {/* <img className="alert-icon" src={Alert} /> */}

          {count ? (
            <span className="alert-icon" id="notification-text">
              <span>{count}</span>
            </span>
          ) : (
            ''
          )}
          {showNotification ? <Notification notifyNumber={count} /> : null}
          <NavLink
            to={'profileinfo'}
            className={`${
              show
                ? 'd-inline-block user-dropdown dropdown'
                : 'd-inline-block user-dropdown dropdown show'
            }`}
          >
            <img
              // src={profileImage || vendorInfo[0]?.profileImage || User}
              src={
                vendorInfo[0]?.profileImage
                  ? vendorInfo[0]?.profileImage
                  : User || profileImage
                  ? profileImage
                  : User
              }
              className="rounded-circle header-profile-user "
            />
            <span className="username">
              {/* {name || vendorInfo[0]?.name.split(' ')[0]} */}
              {vendorInfo[0]?.name.split(' ')[0]
                ? vendorInfo[0]?.name.split(' ')[0]
                : name}
            </span>
            {/* {role1 === '3'
              ? socketFun(vendorInfo[0]?.mobile)
              : socketFun(vendorInfo[0]?.phoneNumber)} */}
            {/* {  console.log(first)} */}
            {/* {socketOne('1234')} */}
            {/* <script>
              var socketIO = io("http://localhost:4000/")
              socketIO.emit("connected", "Hello123")
            </script> */}
            {/* const nameParts = fullName.split(' '); const firstName =
            nameParts[0]; */}
            {/* <div
              className={`${
                show
                  ? "dropdown-menu-end dropdown-menu"
                  : "dropdown-menu-end dropdown-menu show"
              }`}
            >
              <Link className="dropdown-item">
                <RiWallet3Line className="align-middle me-2" fontSize={16} />
                My Wallet
              </Link>
              <div className="dropdown-divider"></div>
              <span
                onClick={handleLogout}
                className="text-danger  dropdown-item"
              >
                <RiShutDownLine
                  className="align-middle me-2 text-danger "
                  fontSize={16}
                />
                Logout
              </span>
            </div> */}
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
