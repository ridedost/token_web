import React, { useEffect } from "react";
import "./index.css";
import CSV from "../../assets/csv.svg";
import { CiCalendar } from "react-icons/ci";
import { MdOutlineAccessTime } from "react-icons/md";
const DailyReports = () => {
  useEffect(() => {
    document.title = "Daily Reports";
  }, []);

  const reports = [
    {
      title: "RUM",
      date: "21st JUN 2023",
      time: "04:00PM",
    },
    {
      title: "RUM",
      date: "21st JUN 2023",
      time: "04:00PM",
    },
    {
      title: "RUM",
      date: "21st JUN 2023",
      time: "04:00PM",
    },
    {
      title: "RUM",
      date: "21st JUN 2023",
      time: "04:00PM",
    },
    {
      title: "RUM",
      date: "21st JUN 2023",
      time: "04:00PM",
    },
    {
      title: "RUM",
      date: "21st JUN 2023",
      time: "04:00PM",
    },
    {
      title: "RUM",
      date: "21st JUN 2023",
      time: "04:00PM",
    },
    {
      title: "RUM",
      date: "21st JUN 2023",
      time: "04:00PM",
    },
    {
      title: "RUM",
      date: "21st JUN 2023",
      time: "04:00PM",
    },
    {
      title: "RUM",
      date: "21st JUN 2023",
      time: "04:00PM",
    },
    {
      title: "RUM",
      date: "21st JUN 2023",
      time: "04:00PM",
    },
    {
      title: "RUM",
      date: "21st JUN 2023",
      time: "04:00PM",
    },
  ];

  return (
    <div style={{ height: "100%" }}>
      <h5 className="" style={{ textAlign: "left" }}>
        Daily Reports
      </h5>

      <div className="report-row">
        {reports?.map((report, index) => (
          <div className="report-col">
            <div className="report-card" key={index}>
              <div className="img-csv">
                <div className="csv-circle">
                  <img src={CSV} />
                </div>
                <h5 className="">{report.title}</h5>
              </div>
              <div className="date-time">
                <span>
                  <CiCalendar />
                  &nbsp;{report.date}
                </span>
                <span>
                  <MdOutlineAccessTime />
                  &nbsp;{report.time}
                </span>
              </div>
              <div
                className="add-product-button"
                style={{ width: "100%", paddingTop: "25px" }}
              >
                <button style={{ width: "100%" }}>Download</button>
              </div>
            </div>
          </div>
        ))}
        {/* <div className="report-col">
          <div className="report-card">
            <div className="img-csv">
              <div className="csv-circle">
                <img src={CSV} />
              </div>
              <h5 className="">DATA TITLE</h5>
            </div>
            <div className="date-time">
              <span>
                <CiCalendar />
                &nbsp; 21st JUN 2023
              </span>
              <span>
                <MdOutlineAccessTime /> &nbsp; 04:00PM
              </span>
            </div>
            <div
              className="add-product-button"
              style={{ width: "100%", paddingTop: "25px" }}
            >
              <button style={{ width: "100%" }}>Download</button>
            </div>
          </div>
        </div> */}
        <div className="report-col">
          <div className="report-card">
            <div className="img-csv">
              <div className="csv-circle">
                <img src={CSV} />
              </div>
              <h5 className="">DATA TITLE</h5>
            </div>
            <div className="date-time">
              <span>
                <CiCalendar />
                &nbsp; 21st JUN 2023
              </span>
              <span>
                <MdOutlineAccessTime /> &nbsp; 04:00PM
              </span>
            </div>
            <div
              className="add-product-button"
              style={{ width: "100%", paddingTop: "25px" }}
            >
              <button style={{ width: "100%" }}>Download</button>
            </div>
          </div>
        </div>
      </div>

      <div className="pagination-row"></div>
    </div>
  );
};

export default DailyReports;
