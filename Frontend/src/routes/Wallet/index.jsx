import React, { useState, useEffect } from "react";
import "./index.css";
import { getAllUserCoupons } from "../../Api/userApi";
import CouponsTable from "../../components/CouponsTable";
import { useDispatch } from "react-redux";
import { setFetching } from "../../redux/reducer/fetching";
import { getAllCoupons, getAllVendors } from "../../Api/adminApi";
import { vendorsList } from "../../Api/userApi";
import Amcharts from "../../Charts/Amcharts";
import Control from "../../components/Control";
import Refresh from "../../assets/refresh-icon.svg";
import VendorsTable from "../../components/VendorsTable";
const Wallet = () => {
  const [vendors, setVendors] = useState([]);
  const [adminVendors, setAdminVendors] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [userCoupons, setUserCoupons] = useState([]);
  const [showAllCoupons, setShowAllCoupons] = useState(false);
  const [showAllVendors, setShowAllVendors] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    fetchAllVendors();
    fetchAllCouponsAsUser();
  }, []);
  const fetchAllVendorsList = async () => {
    const maintoken = localStorage.getItem("auth_token");
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    dispatch(setFetching(true));
    setShowAllVendors(true);
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
      setAdminVendors([]);
    } finally {
      dispatch(setFetching(false));
    }
  };

  const fetchAllCouponsAsUser = async () => {
    const maintoken = localStorage.getItem("auth_token");
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    try {
      if (role === "3") {
        const response = await getAllUserCoupons(token);
        if (response.status === 200) {
          const data = response.data.newCoupons;
          setUserCoupons(data);
        } else {
          setUserCoupons([]);
        }
      }
    } catch (error) {
      console.error("Error fetching user coupons:", error);
      setUserCoupons([]);
    }
  };

  const fetchAllVendors = async () => {
    const maintoken = localStorage.getItem("auth_token");
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);
    dispatch(setFetching(true));

    try {
      if (role === "3") {
        const response = await vendorsList(token);
        if (response.status === 200) {
          const data = response.data.Admins;
          setVendors(data);
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

  const fetchAllAdminVendors = async () => {
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

  const fetchAllCouponsList = async () => {
    const maintoken = localStorage.getItem("auth_token");
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    dispatch(setFetching(true));
    setShowAllCoupons(true);
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
      setAdminVendors([]);
    } finally {
      dispatch(setFetching(false));
    }
  };

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
  console.warn(adminVendors);
  return (
    <div className="">
      <h3 className="" style={{ textAlign: "left" }}>
        Wallet
      </h3>

      <div className="wallet-container">
        <div className="wallet-graph">
          <div className="cards_1" style={{ marginBottom: "15px" }}>
            <Amcharts data={datas} maxObject={maxObject} sum={sum} />
          </div>
          <div className="wallet-coupon">
            <div className="cards_2">
              <CouponsTable
                userCoupons={userCoupons}
                fetchAllCouponsList={fetchAllCouponsList}
              />
            </div>
            <div className="cards_2">
              <Control />
            </div>
          </div>
        </div>
        <div className="wallet-point">
          <div className="cards_2 cards-padding" style={{ minHeight: "100%" }}>
            <div className="cards-sales" style={{ marginTop: "15px" }}>
              <div class="points-flex">
                <div class="cards-para-div">
                  <span class="sales-para">Points Balance</span>
                  <div class="cards-numbers">
                    <span class="cards-value">RD 2,458</span>
                  </div>
                  <div class="graph-zigzag-sales">
                    <img src={Refresh} />
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="list-heading" style={{ marginTop: "20px" }}>
              <h5 style={{ marginBottom: "0px" }}>Recent Transactions</h5>
              <div class="view-all-list">
                <h6>View All</h6>
                <img src="/static/media/right-arrow-vector.baf26921268068022476644ef26a163c.svg" />
              </div>
            </div> */}
            {/* <VendorsTable
              adminVendors={vendors}
              fetchAllVendorsList={fetchAllVendorsList}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
// view coupons   7693015061
