import React, { useState } from "react";
import "./index.css";
import { MdOutlineDashboard, MdOutlineThumbDown } from "react-icons/md";
import {
  AiOutlineShoppingCart,
  AiOutlineUsergroupAdd,
  AiOutlineProfile,
  AiOutlineTeam,
  AiOutlineSend,
  AiFillCloseCircle,AiOutlinePauseCircle
} from "react-icons/ai";
import { PiUsersThreeBold } from "react-icons/pi";
import { GrSend, GrClose } from "react-icons/gr";
import { FaUsers, FaRegHandshake } from "react-icons/fa";
import {
  MdOutlineThumbUp,
  MdOutlineThumbDownOffAlt,
  MdOutlineShoppingCartCheckout,MdOutlineAccountBalanceWallet
} from "react-icons/md";
import { RiFileDownloadLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import NavLinks from "../NavLinks";
import LogoDark from "../../assets/header/rd 1 (1).png";
import Logout from "../../assets/header/logout-icon.svg";
import LogoNazoxLight from "../../assets/header/Ride-Dost-Dark.png";
import { useNavigate } from "react-router-dom";
import Cancel from "../../assets/cancle-btn.svg";
import NavLinkSmall from "../NavLinkSmall";
import { toast } from "react-toastify";

const Sidebar = ({ onLogout, showSidebar, setShowSidebar }) => {
  const [active, setActive] = useState("");

  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const navigate = useNavigate();

  const handleClick = (menuItem) => {
    setActive(menuItem);
    setShowSidebar(false);
  };

  const handleLogout = () => {
    logout();
  };

  const logout = () => {
    toast.success("Logout Successfully!");
    localStorage.removeItem("auth_token");
    onLogout();
    navigate("/login");
  };

  const navData = [
    {
      title: "Dashboard",
      route: "dashboard",
      Icon: MdOutlineDashboard,
    },
    {
      title: "Manage Vendor",
      route: "managevendor",
      Icon: AiOutlineTeam,
    },
    {
      title: "Add Vendor",
      route: "addvendor",
      Icon: AiOutlineUsergroupAdd,
    },
    {
      title: "Vendor List",
      route: "vendorslist",
      Icon: PiUsersThreeBold,
    },
    {
      title: "Suspended List",
      route: "suspended",
      Icon: AiOutlinePauseCircle,
    },
    {
      title: "Product List",
      route: "productlist",
      Icon: AiOutlineShoppingCart,
    },
    {
      title: "Send Request",
      route: "sendrequest",
      Icon: AiOutlineSend,
    },
    {
      title: " Approval Req.",
      route: "approvalrequest",
      Icon: MdOutlineThumbUp,
    },
    {
      title: "Rejected Req.",
      route: "rejectedrequest",
      Icon: MdOutlineThumbDownOffAlt,
    },
    {
      title: "Payment Settle",
      route: "paymentsettlements",
      Icon: FaRegHandshake,
    },
    {
      title: "Checkout",
      route: "checkout",
      Icon: MdOutlineShoppingCartCheckout,
    },
    {
      title: "Daily Reports",
      route: "dailyreports",
      Icon: RiFileDownloadLine,
    },
     {
      title: "Wallet",
      route: "wallet",
      Icon: MdOutlineAccountBalanceWallet,
    },
  ];

  return (
    <>
      <div className={`${isOpen ? "vertical-menu" : "vertical-menu-hide"}`}>
        <div className="sidebar-height">
          <div
            className={`${
              isOpen ? "navbar-brand-box" : "navbar-brand-box-hide"
            }`}
          >
            <a className="logo logo-dark">
              {isOpen ? (
                <span className="logo-lg">
                  <img src={LogoNazoxLight} alt="" style={{ width: "225px" }} />
                </span>
              ) : (
                <span className="logo-sm">
                  <img
                    src={LogoDark}
                    alt=""
                    style={{ width: "55px", height: "37px" }}
                  />
                </span>
              )}
            </a>
          </div>
          <div className="mm-active">
            <ul
              className={`${
                isOpen
                  ? "metismenu list-unstyled mm-show"
                  : "metismenu-hide list-unstyled mm-show"
              }`}
            >
              <NavLinks
                handleClick={handleClick}
                active={active}
                isOpen={isOpen}
                navbar={navData}
              />
            </ul>
          </div>
          <div
            className={`${isOpen ? "logout-section" : "logout-section-hide"}`}
          >
            <div
              className={`${
                isOpen ? "logout-alignment" : "logout-alignment-hide"
              }`}
            >
              <span
                className="d-flex"
                style={{ cursor: "pointer" }}
                onClick={handleLogout}
              >
                <span className={`${isOpen ? "logout-text" : "display-none"}`}>
                  Logout
                </span>
                <img src={Logout} alt="Logout" />
              </span>
            </div>
          </div>
        </div>
      </div>
      {showSidebar ? (
        <div className="small-device-sidebar sidebar-height">
          <div className="mm-active">
            <div className="hide-content">
              <img src={LogoNazoxLight} alt="" style={{ width: "225px" }} />
              <span
                className="cancle-sidebar"
                onClick={() => setShowSidebar(false)}
              >
                <AiFillCloseCircle fontSize={45} />
              </span>
            </div>
            <div className="small-mm-active">
              <ul
                className={`${"small-metismenu  list-unstyled mm-show mm-active"}`}
                style={{ width: "290px" }}
              >
                <NavLinkSmall
                  handleClick={handleClick}
                  active={active}
                  isOpen={isOpen}
                  navbar={navData}
                />
              </ul>
            </div>
            <div className="small-logout-section">
              <div className="logout-alignment">
                <span
                  className="d-flex"
                  style={{ cursor: "pointer" }}
                  onClick={handleLogout}
                >
                  <span className="logout-text">Logout</span>
                  <img src={Logout} alt="Logout" />
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Sidebar;
