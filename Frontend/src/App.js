import React from "react";
import { Routes, Route } from "react-router-dom";
import LoadingOverlay from "./components/LoadingOverlay";
import { useSelector } from "react-redux";
import Account from "./routes/Account";
import Dashboard from "./routes/Dashborad";
import Login from "./routes/Login";
import NotFoundPage from "./routes/NotFoundPage";
import ManageTeam from "./routes/ManageTeam";
import ProfileForm from "./routes/ProfileForm";
import InvoiceBalance from "./routes/InvoiceBalance";
import AddVendor from "./routes/AddVendor";
import VendorList from "./routes/VendorList";
import ProductList from "./routes/ProductList";
import SendRequest from "./routes/SendRequest";
import PaymentSettlements from "./routes/PaymentSettlements";
import ApprovalRequest from "./routes/ApprovalRequests";
import Wallet from "./routes/Wallet";
import Profile from "./routes/Profile";
import ProfileInfo from "./routes/ProfileInfo";
import Checkout from "./routes/Checkout";
import DailyReports from "./routes/DailyReports";
import UserDashboard from "./routes/UserDashboard";
import RejectedRequest from "./routes/RejectedRequests";
import Suspended from "./routes/Suspended";

function App() {
  const fetching = useSelector((state) => state.fetching);
  
  const maintoken = localStorage.getItem("auth_token");
  const role = maintoken?.charAt(maintoken.length - 1);
  const token = maintoken?.slice(0, -1);
  console.warn(role)

  return (
    <>
      {fetching && <LoadingOverlay show={fetching} />}
      <Routes>
        <Route index element={<Login />} />
        <Route path="/" element={<Account />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="managevendor" element={<ManageTeam />} />
          <Route path="profileform" element={<ProfileForm />} />
          <Route path="invoicebalance" element={<InvoiceBalance />} />
          <Route path="addvendor" element={<AddVendor />} />
          <Route path="vendorslist" element={<VendorList />} />
          <Route path="productlist" element={<ProductList />} />
          <Route path="sendrequest" element={<SendRequest />} />
          <Route path="paymentsettlements" element={<PaymentSettlements />} />
          <Route path="approvalrequest" element={<ApprovalRequest />} />
          <Route path="rejectedrequest" element={<RejectedRequest />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profileinfo" element={<ProfileInfo />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="dailyreports" element={<DailyReports />} />
          <Route path="suspended" element={<Suspended />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
//  {role === "1"&& <><Route index element={<Dashboard />} />
//           <Route path="dashboard" element={<Dashboard />} /></>}
//           {role === "2"&& <><Route index element={<Dashboard />} />
//           <Route path="dashboard" element={<Dashboard />} /></>}
//           {role === "3"&& <><Route index element={<UserDashboard />} /> 
//           <Route path="userdashboard" element={<UserDashboard />} />
//           </>}




//  {role === "3"? <><Route index element={<UserDashboard />} /> 
//           <Route path="userdashboard" element={<UserDashboard />} />
//           </>:<><Route index element={<Dashboard />} />
//           <Route path="dashboard" element={<Dashboard />} /></>}