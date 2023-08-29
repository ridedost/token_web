import React, { useState, useEffect } from "react";
import "./index.css"; // Create a separate CSS file for header styles
import { RiMenu2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../redux/reducer/sidebar";
import Notifi from "../../assets/header/Notifications.svg";
import User from "../../assets/header/user.svg";
import Alert from "../../assets/header/alert.svg";
import { NavLink } from "react-router-dom";
import { getAdminInfo } from "../../Api/adminApi";
import Notification from "../Notification";

const Header = ({ onLogout, setShowSidebar }) => {
  const [show, setShow] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false); // New state to track scrolling
  const [vendorInfo, setVendorInfo] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  const [showNotification, setShowNotification] = useState(false);

  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const role = useSelector((state) => state.role);
  const profileImage = useSelector(
    (state) => state?.profileImage?.profileImage
  );
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
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getPersonalInfo = async () => {
    const maintoken = localStorage.getItem("auth_token");
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    try {
      const response = await getAdminInfo(token);

      if (response.status === 200) {
        const data = response.data.vendorInfo;
        setVendorInfo(data);
        setSelectedImage(data.profileImage?.url || "N/A");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.warn(profileImage);

  return (
    <header id={`${isOpen ? "page-topbar" : "page-topbar-hide"} `}>
      <div className="navbar-header">
        <div className="d-flex">
          <button onClick={handleToggleSidebar} className="header-item  btn">
            <RiMenu2Fill fontSize={32} />
          </button>
        </div>
        <div className="d-flex header-right">
          <span onClick={() => setShowNotification(!showNotification)}>
            <img src={Notifi} className="notification" />
          </span>
          <img className="alert-icon" src={Alert} />
          {showNotification ? <Notification /> : null}
          <NavLink
            to={"profileinfo"}
            className={`${
              show
                ? "d-inline-block user-dropdown dropdown"
                : "d-inline-block user-dropdown dropdown show"
            }`}
          >
            <img
              src={profileImage || vendorInfo[0]?.profileImage?.url || User}
              className="rounded-circle header-profile-user "
            />
            <span className="username">{vendorInfo[0]?.name}</span>
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
