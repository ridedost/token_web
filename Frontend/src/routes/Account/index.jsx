import React, { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/SideBar";
import "./index.css";
import { useSelector } from "react-redux";
import UserSidebar from "../../components/UserSideBar";
import VendorSidebar from "../../components/VendorSidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Account = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const navigate = useNavigate();

  const maintoken = localStorage.getItem("auth_token");
  const role = maintoken?.charAt(maintoken.length - 1);
  const token = maintoken?.slice(0, -1);

  // console.log(maintoken);
  // console.warn(role);
  // console.log(token);

  const [loginToastShown, setLoginToastShown] = useState(false);

  const initialRenderRef = useRef(true);

  useEffect(() => {
    if (initialRenderRef.current) {
      initialRenderRef.current = false;
    } else {
      !maintoken && navigate("/login", { replace: true });
      if (maintoken && !loginToastShown) {
        setLoginToastShown(true);
      }
    }
  }, [maintoken, navigate, loginToastShown]);

  const handleLogout = () => {
    // toast.success("Logout Successfully!");
    localStorage.removeItem("auth_token");
    navigate("/login");
  };

  return maintoken ? (
    <div className="screen">
      <ToastContainer />
      {role === "1" ? (
        <Sidebar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          onLogout={handleLogout}
        />
      ) : (
        ""
      )}
      {role === "2" ? (
        <VendorSidebar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          onLogout={handleLogout}
        />
      ) : (
        ""
      )}
      {role === "3" ? (
        <UserSidebar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          onLogout={handleLogout}
        />
      ) : (
        ""
      )}
      <div
        className={`${isOpen ? "main-content" : "main-content-hide"} ${
          showSidebar ? "small-main-content" : "small-main-content-hide"
        }
        
        `}
      >
        <Header setShowSidebar={setShowSidebar} isOpen={isOpen} />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    navigate("/login")
  );
};

export default Account;
