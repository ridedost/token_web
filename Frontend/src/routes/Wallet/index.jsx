/** @format */

import React, { useState, useEffect } from 'react';
import './index.css';
import { getAllCouponsForUser } from '../../Api/userApi';
import CouponsTable from '../../components/CouponsTable';
import { useDispatch } from 'react-redux';
import { setFetching } from '../../redux/reducer/fetching';
import {
  getAllCoupons,
  getAllCouponsForVendor,
  getAllVendors,
  getWalletPoint,
  getDashboardGraph,
  getDashboardGraphVendor,
} from '../../Api/adminApi';
import {
  vendorsList,
  userWalletDetails,
  getDashboardGraphUser,
} from '../../Api/userApi';
import Amcharts from '../../Charts/Amcharts';
import Control from '../../components/Control';
import Refresh from '../../assets/refresh-icon.svg';
import VendorsTable from '../../components/VendorsTable';
import ViewAllCouponPoupop from '../../components/ViewAllCouponPoupop';
const Wallet = () => {
  const [adminVendors, setAdminVendors] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [userCoupons, setUserCoupons] = useState([]);
  const [graph, setGraph] = useState([]);
  const [showAllCoupons, setShowAllCoupons] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [max, setMax] = useState('');
  const [sales, setSales] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = 'Wallet';
    fetchAllCouponsAsUser(currentPage);
    fetchWalletPoints();
    fetchBarGraph();
  }, []);

  const fetchAllCouponsAsUser = async (currentPage) => {
    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    try {
      if (role === '1') {
        const response = await getAllCoupons(currentPage, token);
        if (response.status === 200) {
          setUserCoupons(response.data.couponlist);
          setTotalPages(response.data.totalPages);
        } else {
          setUserCoupons([]);
        }
      } else if (role === '2') {
        const response = await getAllCouponsForVendor(currentPage, token);
        if (response.status === 200) {
          setUserCoupons(response.data.couponlist);
          setTotalPages(response.data.totalPages);
        } else {
          setUserCoupons([]);
        }
      } else if (role === '3') {
        const response = await getAllCouponsForUser(currentPage, token);
        if (response.status === 200) {
          setUserCoupons(response.data.couponlist);
          setTotalPages(response.data.totalPages);
        } else {
          setUserCoupons([]);
        }
      }
    } catch (error) {
      console.error('Error fetching user coupons:', error);
      setUserCoupons([]);
    }
  };

  const fetchAllCouponsList = async () => {
    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);
    dispatch(setFetching(true));
    setShowAllCoupons(true);
    try {
      if (role === '3') {
        const response = await getAllCouponsForUser(token);
        if (response.status === 200) {
          const data = response?.data?.max;
          setMax(data);
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

  const fetchWalletPoints = async () => {
    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);
    dispatch(setFetching(true));
    try {
      if (role === '1') {
        const response = await getWalletPoint(token);
        if (response.status === 200) {
          setMax(response?.data.max);
        } else {
          setMax('');
        }
      } else if (role === '2') {
        const response = await getWalletPoint(token);
        if (response.status === 200) {
          setMax(response?.data.max);
        } else {
          setMax('');
        }
      } else if (role === '3') {
        const response = await userWalletDetails(token);
        if (response.status === 200) {
          setMax(response?.data.max);
        } else {
          setMax('');
        }
      }
    } catch (error) {
      // setAdminVendors([]);
    } finally {
      dispatch(setFetching(false));
    }
  };

  const fetchBarGraph = async () => {
    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);
    dispatch(setFetching(true));
    try {
      if (role === '1') {
        const response = await getDashboardGraph(token);
        if (response.status === 200) {
          console.warn(response.data);
          setGraph(response?.data);
        } else {
          setGraph([]);
        }
      } else if (role === '2') {
        const response = await getDashboardGraphVendor(token);
        if (response.status === 200) {
          console.warn(response);
          setGraph(response?.data);
        } else {
          setGraph([]);
        }
      } else if (role === '3') {
        const response = await getDashboardGraphUser(token);
        if (response.status === 200) {
          console.warn(response);
          setGraph(response?.data);
        } else {
          setGraph([]);
        }
      }
    } catch (error) {
    } finally {
      dispatch(setFetching(false));
    }
  };

  let maxObject = graph[0]; // Initialize with the first object
  for (const data of graph) {
    if (data.amount > maxObject.amount) {
      maxObject = data; // Update maxObject if a larger amount is found
    }
  }

  const sum = graph.reduce((acc, item) => acc + item.amount, 0);

  console.warn(userCoupons);
  return (
    <div className="">
      <h5 className="" style={{ textAlign: 'left' }}>
        Wallet
      </h5>

      <div className="wallet-container">
        <div className="wallet-graph">
          <div className="cards_1" style={{ marginBottom: '15px' }}>
            <Amcharts
              data={graph}
              maxObject={maxObject}
              sum={sum}
              setSales={setSales}
            />
          </div>
          <div className="wallet-coupon">
            <div className="cards_2">
              <CouponsTable
                coupons={userCoupons}
                fetchAllCouponsList={fetchAllCouponsList}
              />
            </div>
            <div className="cards_2">
              <Control />
            </div>
          </div>
        </div>
        <div className="wallet-point">
          <div className="cards_2 cards-padding" style={{ minHeight: '100%' }}>
            <div className="cards-sales" style={{ marginTop: '15px' }}>
              <div class="points-flex">
                <div class="cards-para-div">
                  <span class="sales-para">Points Balance</span>
                  <div class="cards-numbers">
                    <span class="cards-value">
                      RD {max.toString().slice(0, 7)}
                    </span>
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
      {showAllCoupons ? (
        <ViewAllCouponPoupop
          coupons={coupons}
          setShowAllCoupons={setShowAllCoupons}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default Wallet;
