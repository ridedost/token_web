/** @format */

import React, { useLayoutEffect, useEffect, useState } from "react";
import Cards from "../../components/Cards";
import { AiOutlineUser } from "react-icons/ai";
import { BsFillHeartFill } from "react-icons/bs";
import { FiCalendar } from "react-icons/fi";
import VendorsTable from "../../components/VendorsTable";
import CouponsTable from "../../components/CouponsTable";
import { getAllVendors, getAllCoupons } from "../../Api/adminApi";
import { vendorsList, getAllCouponsForUser } from "../../Api/userApi";
import { setFetching } from "../../redux/reducer/fetching";
import { useDispatch } from "react-redux";
import "./index.css";
import UserVendorsTable from "../../components/UserVendorsTable";
import UserCouponsTable from "../../components/UserCouponsTable";
import Bars_3 from "../../assets/bars/bars_3.svg";
import Bars_4 from "../../assets/bars/bars_4.svg";
import Bars_5 from "../../assets/bars/bars_5.svg";
import Bars_6 from "../../assets/bars/bars_6.svg";
import Bars_7 from "../../assets/bars/bars_7.svg";
import ProfileDashboard from "../../components/ProfileDashboard";
import ViewAllVendorsPoupop from "../../components/ViewAllVendorsPoupop";
import ViewAllCouponPoupop from "../../components/ViewAllCouponPoupop";
import Amcharts from "../../Charts/Amcharts";
import DonutChart from "../../Charts/DonutChart";

const UserDashboard = () => {
  useLayoutEffect(() => {
    document.title = "Dashboard";
  }, []);

  const data = [
    {
      title: "Card 1",
      icon: <AiOutlineUser />,
      value: "123",
    },
    {
      title: "Card 2",
      icon: <BsFillHeartFill />,
      value: "456",
    },
    {
      title: "Card 3",
      icon: <FiCalendar />,
      value: "789",
    },
    {
      title: "Card 4",
      icon: <FiCalendar />,
      value: "789",
    },
  ];
  const [vendorInfo, setVendorInfo] = useState({});
  const [vendors, setVendors] = useState([]);
  const [adminVendors, setAdminVendors] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [userCoupons, setUserCoupons] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [showAllVendors, setShowAllVendors] = useState(false);
  const [showAllCoupons, setShowAllCoupons] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAllVendors(currentPage);
    fetchAllAdminVendors(currentPage);
    fetchAllCoupons(currentPage);
    fetchAllCouponsAsUser(currentPage);
  }, []);

  const fetchAllAdminVendors = async (currentPage) => {
    const maintoken = localStorage.getItem("auth_token");
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    dispatch(setFetching(true));
    try {
      if (role === "1") {
        const response = await getAllVendors(token);
        if (response.status === 200) {
          const data = response.data.vendors;
          setAdminVendors(data);
        } else {
          setAdminVendors([]);
        }
      } else if (role === "2") {
        const response = await getAllVendors(token);
        if (response.status === 200) {
          const data = response.data.vendors;
          setAdminVendors(data);
        } else {
          setAdminVendors([]);
        }
      }
    } catch (error) {
      console.warn(error);
      setAdminVendors([]);
    } finally {
      setLoading(false);
      dispatch(setFetching(false));
    }
  };

  const fetchAllVendorsList = async (currentPage) => {
    const maintoken = localStorage.getItem("auth_token");
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    dispatch(setFetching(true));
    setShowAllVendors(true);
    try {
      if (role === "3") {
        const response = await vendorsList(currentPage, token);
        if (response.status === 200) {
          // console.warn(response)
          setVendors(response.data.Admins);
          setTotalPages(response.data.totalPages);
        } else {
          setVendors([]);
        }
      }
    } catch (error) {
      setAdminVendors([]);
    } finally {
      dispatch(setFetching(false));
    }
  };

  const fetchAllCouponsList = async (currentPage) => {
    const maintoken = localStorage.getItem("auth_token");
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    dispatch(setFetching(true));
    setShowAllCoupons(true);
    try {
      // if (role === "1") {
      //   const response = await getAllCoupons(token);
      //   if (response.status === 200) {
      //     const data = response.data.newCoupons;
      //     setCoupons(data);
      //   } else {
      //     setCoupons([]);
      //   }
      // } else if (role === "2") {
      //   const response = await getAllCoupons(token);
      //   if (response.status === 200) {
      //     const data = response.data.newCoupons;
      //     setCoupons(data);
      //   } else {
      //     setCoupons([]);
      //   }
      // }
      if (role === "3") {
        const response = await getAllCouponsForUser(currentPage, token);
        if (response.status === 200) {
          console.warn(response);
          setCoupons(response?.data.couponlist);
          setTotalPages(response.data.totalPages);
        } else {
          setCoupons([]);
        }
      }
    } catch (error) {
      setAdminVendors([]);
    } finally {
      dispatch(setFetching(false));
    }
  };

  const fetchAllVendors = async (currentPage) => {
    const maintoken = localStorage.getItem("auth_token");
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);
    dispatch(setFetching(true));

    try {
      if (role === "3") {
        const response = await vendorsList(currentPage, token);
        if (response.status === 200) {
          // console.warn(response)
          setVendors(response.data.Admins);
          setTotalPages(response.data.totalPages);
        } else {
          setVendors([]);
        }
      }
    } catch (error) {
      setVendors([]);
    } finally {
      setLoading(false);
      dispatch(setFetching(false));
    }
  };

  const fetchAllCouponsAsUser = async (currentPage) => {
    const maintoken = localStorage.getItem("auth_token");
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    try {
      if (role === "3") {
        const response = await getAllCouponsForUser(currentPage, token);
        if (response.status === 200) {
          console.warn(response);
          setUserCoupons(response.data.couponlist);
          setTotalPages(response.data.totalPages);
        } else {
          setUserCoupons([]);
        }
      }
    } catch (error) {
      console.error("Error fetching user coupons:", error);
      setUserCoupons([]);
    }
  };

  const fetchAllCoupons = async () => {
    const maintoken = localStorage.getItem("auth_token");
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    try {
      if (role === "1") {
        const response = await getAllCoupons(token);
        if (response.status === 200) {
          const data = response.data.newCoupons;
          setCoupons(data);
        } else {
          setCoupons([]);
        }
      } else if (role === "2") {
        const response = await getAllCoupons(token);
        if (response.status === 200) {
          const data = response.data.newCoupons;
          setCoupons(data);
        } else {
          setCoupons([]);
        }
      }
    } catch (error) {
      console.error("Error fetching all coupons:", error);
      setCoupons([]);
    } finally {
      setLoading(false);
      dispatch(setFetching(false));
    }
  };

  // Conditionally render the charts based on some condition (e.g., a state value)
  const [showPieChart, setShowPieChart] = useState(true);
  const [showLineChart, setShowLineChart] = useState(true);

  const maintoken = localStorage.getItem("auth_token");
  const role = maintoken.charAt(maintoken.length - 1);

  const datas = [
    { label: "Jan", value: 85 },
    { label: "Feb", value: 10 },
    { label: "Mar", value: 60 },
    { label: "Apr", value: 80 },
    { label: "May", value: 40 },
    { label: "Jun", value: 35 },
    { label: "Jul", value: 25 },
    { label: "Aug", value: 28 },
    { label: "Sep", value: 70 },
    { label: "Oct", value: 10 },
    { label: "Nov", value: 70 },
    { label: "Dec", value: 60 },
  ];
  let maxObject = datas[0]; // Initialize with the first object
  for (const data of datas) {
    if (data.value > maxObject.value) {
      maxObject = data; // Update maxObject if a larger value is found
    }
  }

  const sum = datas.reduce((acc, item) => acc + item.value, 0);
  const totalPoints = 100;
  const creditedPoints = 60;
  const debitedPoints = 30;

  console.warn(coupons);

  return (
    <div className="">
      <h5 className="hello-text">Hi Andrei,</h5>
      <h3 className="" style={{ textAlign: "left" }}>
        Welcome to Ride Dost!
      </h3>

      <div className="grid-container">
        <Cards data={data} />
        <div id="div1" className="grid-col">
          <div className="cards_1">
            <Amcharts data={datas} maxObject={maxObject} sum={sum} />
          </div>
        </div>
        <div id="div2" className="grid-col">
          <div className="cards_2 cards-padding">
            <ProfileDashboard vendorInfo={vendorInfo} />
          </div>
        </div>
        <div id="div3" className="grid-col">
          <div className="cards_2">
            <DonutChart
              TotalPoints={totalPoints}
              CreditadePoints={creditedPoints}
              DebitadePoints={debitedPoints}
            />
          </div>
        </div>
        <div id="div4" className="grid-col">
          <div className="cards_2">
            <VendorsTable
              adminVendors={vendors}
              fetchAllVendorsList={fetchAllVendorsList}
            />
          </div>
        </div>
        <div id="div5" className="grid-col">
          <div className="cards_2">
            <CouponsTable
              coupons={userCoupons}
              fetchAllCouponsList={fetchAllCouponsList}
            />
          </div>
        </div>
      </div>
      {/* <DashboardForm /> */}
      {/* <div className="form-container"> */}
      {/* <MultiStepForm /> */}

      {/* <div className="grid-container">
        <div className="item-1">
          <div className="cards_1"></div>
        </div>
        <div className="item-2">
          <div className="cards_2"></div>
        </div>
      </div> */}
      {/* <div className="item-1">
          <div className="cards">
            {showPieChart && <PieCharts />}
          </div>
        </div>
        <div className="item-2">
          <div className="cards">{showLineChart && <LineCharts />}</div>
        </div> */}
      {/* <div className="row-table">
        <div className="col-table">
          {role === "2" ? <UserVendorsTable vendors={vendors} /> : ""}
          {role === "1" ? <VendorsTable adminVendors={adminVendors} /> : ""}
        </div>
        <div className="col-table">
          {role === "2" ? <UserCouponsTable userCoupons={userCoupons} /> : ""}
          {role === "1" ? <CouponsTable coupons={coupons} /> : ""}
        </div>
      </div> */}
      {showAllVendors ? (
        <ViewAllVendorsPoupop
          adminVendors={adminVendors}
          setShowAllVendors={setShowAllVendors}
        />
      ) : (
        ""
      )}
      {showAllCoupons ? (
        <ViewAllCouponPoupop setShowAllCoupons={setShowAllCoupons} />
      ) : (
        ""
      )}
    </div>
  );
};

export default UserDashboard;
