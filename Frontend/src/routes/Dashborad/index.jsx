/** @format */

import React, { useLayoutEffect, useEffect, useState } from 'react';
import Cards from '../../components/Cards';
import { AiOutlineUser } from 'react-icons/ai';
import { BsFillHeartFill } from 'react-icons/bs';
import { FiCalendar } from 'react-icons/fi';
import VendorsTable from '../../components/VendorsTable';
import CouponsTable from '../../components/CouponsTable';
import {
  getAllVendorsValid,
  getAllCoupons,
  getAdminInfo,
  getAllCouponsForVendor,
  getWalletPoint,
  getDashboardPoint,
  getDashboardGraph,
  getDashboardGraphVendor,
} from '../../Api/adminApi';
import {
  vendorsList,
  getAllCouponsForUser,
  getUserInfo,
  userWalletDetails,
  getDashboardUserPoint,
  getDashboardGraphUser,
} from '../../Api/userApi';
import { setFetching } from '../../redux/reducer/fetching';
import { useDispatch } from 'react-redux';
import './index.css';
import ProfileDashboard from '../../components/ProfileDashboard';
import ViewAllVendorsPoupop from '../../components/ViewAllVendorsPoupop';
import ViewAllCouponPoupop from '../../components/ViewAllCouponPoupop';
import Amcharts from '../../Charts/Amcharts';
import DonutChart from '../../Charts/DonutChart';

const Dashboard = () => {
  useLayoutEffect(() => {
    document.title = 'Dashboard';
  }, []);

  const data = [
    {
      title: 'Card 1',
      icon: <AiOutlineUser />,
      value: '123',
    },
    {
      title: 'Card 2',
      icon: <BsFillHeartFill />,
      value: '456',
    },
    {
      title: 'Card 3',
      icon: <FiCalendar />,
      value: '789',
    },
    {
      title: 'Card 4',
      icon: <FiCalendar />,
      value: '789',
    },
  ];
  const [vendorInfo, setVendorInfo] = useState({});
  const [points, setPoints] = useState({});
  const [vendors, setVendors] = useState([]);
  const [adminVendors, setAdminVendors] = useState([]);
  const [graph, setGraph] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [userCoupons, setUserCoupons] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [showAllVendors, setShowAllVendors] = useState(false);
  const [showAllCoupons, setShowAllCoupons] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [max, setMax] = useState('');
  const [sales, setSales] = useState('');

  const [redeem, setRedeem] = useState(null);
  const [generate, setGenerate] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchAllAdminVendors(currentPage);
    fetchAllCoupons(currentPage);
    getPersonalInfo();
    fetchWalletPoints();
    fetchPoints();
    fetchBarGraph();
    // fetchAllVendorsAsUser();
    // fetchAllCouponsAsUser();
  }, []);

  const fetchAllAdminVendors = async (currentPage) => {
    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    dispatch(setFetching(true));
    try {
      if (role === '1') {
        const response = await getAllVendorsValid(currentPage, token);
        if (response.status === 200) {
          setAdminVendors(response?.data.vendorsList);
          setTotalPages(response.data.totalPages);
        } else {
          setAdminVendors([]);
        }
      } else if (role === '2') {
        const response = await getAllVendorsValid(currentPage, token);
        if (response.status === 200) {
          setAdminVendors(response?.data.vendorsList);
          setTotalPages(response.data.totalPages);
        } else {
          setAdminVendors([]);
        }
      } else if (role === '3') {
        const response = await vendorsList(currentPage, token);
        if (response.status === 200) {
          console.warn(response);
          setAdminVendors(response?.data.Admins);
          setTotalPages(response.data.totalPages);
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
    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    dispatch(setFetching(true));
    setShowAllVendors(true);
    try {
      if (role === '1') {
        const response = await getAllVendorsValid(currentPage, token);
        if (response.status === 200) {
          setAdminVendors(response.data.vendorsList);
          setTotalPages(response.data.totalPages);
        } else {
          setAdminVendors([]);
        }
      } else if (role === '2') {
        const response = await getAllVendorsValid(currentPage, token);
        if (response.status === 200) {
          setAdminVendors(response?.data.vendorsList);
          setTotalPages(response.data.totalPages);
        } else {
          setAdminVendors([]);
        }
      } else if (role === '3') {
        const response = await vendorsList(currentPage, token);
        if (response.status === 200) {
          setAdminVendors(response.data?.Admins);
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
    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    dispatch(setFetching(true));
    setShowAllCoupons(true);
    try {
      if (role === '3') {
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

  const fetchAllCoupons = async (currentPage) => {
    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    try {
      if (role === '1') {
        const response = await getAllCoupons(currentPage, token);
        if (response.status === 200) {
          console.warn(response);
          setGenerate(response.data.valid_coupon);
          setRedeem(response.data.redeem_coupon);
          setCoupons(response?.data.couponlist);
          setTotalPages(response.data.totalPages);
        } else {
          setCoupons([]);
        }
      } else if (role === '2') {
        const response = await getAllCouponsForVendor(currentPage, token);
        console.warn(response);
        if (response.status === 200) {
          setGenerate(response.data.valid_coupon);
          setRedeem(response.data.redeem_coupon);
          setCoupons(response?.data.couponlist);
          setTotalPages(response.data.totalPages);
        } else {
          setCoupons([]);
        }
      } else if (role === '3') {
        const response = await getAllCouponsForUser(currentPage, token);
        if (response.status === 200) {
          setCoupons(response.data.couponlist);
          setTotalPages(response.data.totalPages);
        } else {
          setCoupons([]);
        }
      }
    } catch (error) {
      console.error('Error fetching all coupons:', error);
      setCoupons([]);
    } finally {
      setLoading(false);
      dispatch(setFetching(false));
    }
  };

  const getPersonalInfo = async () => {
    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);
    try {
      if (role === '1') {
        const response = await getAdminInfo(token);
        if (response.status === 200) {
          const data = response.data.vendorInfo;
          setVendorInfo(data);
        }
      } else if (role === '2') {
        const response = await getAdminInfo(token);
        if (response.status === 200) {
          const data = response.data.vendorInfo;
          setVendorInfo(data);
        }
      } else if (role === '3') {
        const response = await getUserInfo(token);
        if (response.status === 200) {
          const data = response.data.vendorInfo;
          setVendorInfo(data);
        }
      }
    } catch (error) {
      console.log(error);
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

  const fetchPoints = async () => {
    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);
    dispatch(setFetching(true));
    try {
      if (role === '1') {
        const response = await getDashboardPoint(token);
        if (response.status === 200) {
          console.warn(response);
          setPoints(response?.data.points);
        } else {
          setPoints({});
        }
      } else if (role === '2') {
        const response = await getDashboardPoint(token);
        if (response.status === 200) {
          console.warn(response);
          setPoints(response?.data.points);
        } else {
          setPoints({});
        }
      } else if (role === '3') {
        const response = await getDashboardUserPoint(token);
        if (response.status === 200) {
          console.warn(response);
          setPoints(response?.data.points);
        } else {
          setPoints({});
        }
      }
    } catch (error) {
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

  const maintoken = localStorage.getItem('auth_token');
  const role = maintoken.charAt(maintoken.length - 1);

  // const datas = [
  //   { label: 'Jan', value: 85 },
  //   { label: 'Feb', value: 10 },
  //   { label: 'Mar', value: 60 },
  //   { label: 'Apr', value: 80 },
  //   { label: 'May', value: 40 },
  //   { label: 'Jun', value: 35 },
  //   { label: 'Jul', value: 25 },
  //   { label: 'Aug', value: 28 },
  //   { label: 'Sep', value: 70 },
  //   { label: 'Oct', value: 10 },
  //   { label: 'Nov', value: 70 },
  //   { label: 'Dec', value: 60 },
  // ];

  let maxObject = graph[0]; // Initialize with the first object
  for (const data of graph) {
    if (data.value > maxObject.value) {
      maxObject = data; // Update maxObject if a larger value is found
    }
  }

  const sum = graph.reduce((acc, item) => acc + item.value, 0);

  const totalPoints = points?.total_point || 0;
  const creditedPoints = points?.redeem_point || 0;
  const debitedPoints = points?.generate_point || 0;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  return (
    <div className="">
      <h5 className="hello-text">Hi {vendorInfo[0]?.name},</h5>
      <h3 className="" style={{ textAlign: 'left' }}>
        Welcome to Ride Dost!
      </h3>

      <div className="grid-container">
        <Cards
          totalCoupons={generate + redeem}
          totalVendors={adminVendors?.length}
          max={max}
          data={data}
          sales={sales}
        />
        <div id="div1" className="grid-col">
          <div className="cards_1">
            <Amcharts
              data={graph}
              maxObject={maxObject}
              sum={sum}
              setSales={setSales}
            />
          </div>
        </div>
        <div id="div2" className="grid-col">
          <div className="cards_2 cards-padding">
            <ProfileDashboard
              vendorInfo={vendorInfo}
              totalCoupons={coupons?.length}
              totalVendors={adminVendors?.length}
              validCouponsLength={generate}
              redeemCouponsLength={redeem}
            />
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
              adminVendors={adminVendors}
              fetchAllVendorsList={fetchAllVendorsList}
            />
          </div>
        </div>
        <div id="div5" className="grid-col">
          <div className="cards_2">
            <CouponsTable
              coupons={coupons}
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
        ''
      )}
      {showAllCoupons ? (
        <ViewAllCouponPoupop setShowAllCoupons={setShowAllCoupons} />
      ) : (
        ''
      )}
    </div>
  );
};

export default Dashboard;
