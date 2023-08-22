import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import "./index.css";
import { getAllVendors } from "../../Api/adminApi";
import { setFetching } from "../../redux/reducer/fetching";
import { useDispatch } from "react-redux";

const ManageTeam = () => {
  // const [vendors, setVendors] = useState([]);

  // const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Manage Team";
    // fetchVendor();
  }, []);

  // console.log(vendors);
  // const fetchVendor = async () => {
  //   const token = localStorage.getItem("auth_token");
  //   dispatch(setFetching(true));
  //   console.log(token);
  //   try {
  //     const response = await getAllVendors(token);
  //     console.log(response);
  //     if (response.status === 200) {
  //       const data = response.data.vendors;
  //       setVendors(data);
  //       dispatch(setFetching(false));
  //     }
  //   } catch (error) {
  //     addToast("Error fetching data. Please try again later!", {
  //       appearance: "error",
  //     });
  //     dispatch(setFetching(false));
  //   }
  // };

  return (
    <div className="table-subContainer">
      <h5>Manage Team</h5>
      <Table />
    </div>
  );
};

export default ManageTeam;
