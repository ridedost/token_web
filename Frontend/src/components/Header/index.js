import React, { useState, useEffect } from "react";
import "./index.css"; // Create a separate CSS file for header styles
import { RiMenu2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../redux/reducer/sidebar";
import Notification from "../../assets/header/Notifications.svg";
import User from "../../assets/header/user.svg";
import { NavLink } from "react-router-dom";
const Header = ({ onLogout, setShowSidebar }) => {
  const [show, setShow] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false); // New state to track scrolling

  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const role = useSelector((state) => state.role);
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

  // Add event listener for scrolling on component mount
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      // Clean up the event listener on component unmount
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // console.log(isScrolled);

  return (
    <header id={`${isOpen ? "page-topbar" : "page-topbar-hide"} `}>
      <div className="navbar-header">
        <div className="d-flex">
          <button onClick={handleToggleSidebar} className="header-item  btn">
            <RiMenu2Fill fontSize={32} />
          </button>
        </div>
        <div className="d-flex">
          <img src={Notification} className="notification" />
          <NavLink
            to={"profileinfo"}
            className={`${
              show
                ? "d-inline-block user-dropdown dropdown"
                : "d-inline-block user-dropdown dropdown show"
            }`}
          >
            <img src={User} className="rounded-circle header-profile-user " />
            <span className="username">
              {role.admin === true ? "Admin" : "User Name"}
            </span>
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
