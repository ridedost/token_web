/** @format */

import React, { useEffect, useState } from 'react';
import './index.css';
import CSV from '../../assets/csv.svg';
import { CiCalendar } from 'react-icons/ci';
import { MdOutlineAccessTime } from 'react-icons/md';
import Pagination from '../../components/Pagination';
import { getDailyReports } from '../../Api/adminApi';
import { setFetching } from '../../redux/reducer/fetching';
import { useDispatch } from 'react-redux';

const DailyReports = () => {
  const [reports, setReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    document.title = 'Daily Reports';
    getReports(currentPage);
  }, [currentPage]);

  const dispatch = useDispatch();
  const getReports = async (currentPage) => {
    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);
    dispatch(setFetching(true));
    try {
      const response = await getDailyReports(currentPage, token);
      if (response.status === 200) {
        console.log(response);
        setReports(response.data.csv);
        setTotalPages(response.data.totalPages);
      } else {
        setReports([]);
      }
    } catch (error) {
      setReports([]);
    } finally {
      dispatch(setFetching(false));
    }
  };

  const handleDownload = (csvUrl, filename) => {
    // Fetch the CSV data from the URL
    fetch(csvUrl)
      .then((response) => response.text())
      .then((csvData) => {
        // Convert the CSV data to a Blob
        const blob = new Blob([csvData], { type: 'text/csv' });

        // Create a temporary URL for the Blob
        const url = window.URL.createObjectURL(blob);

        // Create a temporary anchor element for downloading
        const a = document.createElement('a');
        a.href = url;
        a.download = filename || 'data.csv'; // You can specify the filename here

        // Trigger the click event to start the download
        document.body.appendChild(a);
        a.click();

        // Clean up by revoking the Blob URL
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch((error) => {
        console.error('Error downloading CSV:', error);
      });
  };

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
    <div style={{ height: '100%' }}>
      <h5 className="" style={{ textAlign: 'left' }}>
        Daily Reports
      </h5>

      <div className="report-row">
        {reports?.length > 0 ? (
          reports?.map((report, index) => (
            <div className="report-col">
              <div className="report-card" key={index}>
                <div className="img-csv">
                  <div className="csv-circle">
                    <img src={CSV} />
                  </div>
                  {/* <h5 className="">{report.title}</h5> */}
                  <h5 className="">Csv</h5>
                </div>
                <div className="date-time">
                  <span>
                    <CiCalendar />
                    &nbsp;{report.createdAt}
                  </span>
                  <span>
                    <MdOutlineAccessTime />
                    &nbsp;{report.time.slice(0, 5)}
                  </span>
                </div>
                <div
                  className="add-product-button"
                  style={{ width: '100%', paddingTop: '25px' }}
                >
                  <button
                    style={{ width: '100%' }}
                    onClick={() =>
                      handleDownload(report.csvfileurl, 'report.csv')
                    }
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-product">
            <h1 colSpan="9" className="no-data">
              No Daily Reports Available
            </h1>
          </div>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        handlePageClick={handlePageClick}
        pageNumbers={pageNumbers}
      />
    </div>
  );
};

export default DailyReports;
