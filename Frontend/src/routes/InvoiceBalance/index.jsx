import React, { useState, useLayoutEffect } from "react";
import "./index.css";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { MdOutlineThumbUpOffAlt } from "react-icons/md";
import { BsHourglassSplit } from "react-icons/bs";
const InvoiceBalance = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useLayoutEffect(() => {
    document.title = "Invoice Balance";
  }, []);
  // Sample data for the table
  const data = [
    { id: 1, column1: "Data 1", column2: "Data 2", column3: "Data 3" },
    { id: 2, column1: "Data 4", column2: "Data 5", column3: "Data 6" },
    { id: 3, column1: "Data 7", column2: "Data 8", column3: "Data 9" },
    { id: 4, column1: "Data 10", column2: "Data 11", column3: "Data 12" },
    { id: 5, column1: "Data 13", column2: "Data 14", column3: "Data 15" },
    { id: 6, column1: "Data 16", column2: "Data 17", column3: "Data 18" },
    { id: 7, column1: "Data 19", column2: "Data 20", column3: "Data 21" },
    { id: 8, column1: "Data 10", column2: "Data 11", column3: "Data 12" },
    { id: 9, column1: "Data 13", column2: "Data 14", column3: "Data 15" },
    { id: 10, column1: "Data 16", column2: "Data 17", column3: "Data 18" },
    { id: 11, column1: "Data 19", column2: "Data 20", column3: "Data 21" },
    { id: 12, column1: "Data 10", column2: "Data 11", column3: "Data 12" },
    { id: 13, column1: "Data 13", column2: "Data 14", column3: "Data 15" },
    { id: 14, column1: "Data 16", column2: "Data 17", column3: "Data 18" },
    { id: 15, column1: "Data 19", column2: "Data 20", column3: "Data 21" },
  ];

  // Pagination
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentData = data.slice(firstIndex, lastIndex);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="table-subContainer">
      <h5>Invoice Balance</h5>
      <div className="table-container" style={{ overflow: "none" }}>
        <div className="table-wrapper">
          <table className="tables">
            <thead className="table-head">
              <tr className="head-tr">
                <th>
                  <input type="checkbox" className="checkbox" />
                </th>
                <th>Sr. No.</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Cost</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {currentData.map((row) => (
                <tr className="body-tr" key={row.id}>
                  <td>
                    <input type="checkbox" className="checkbox" />
                  </td>
                  <td>{row.id}</td>
                  <td>{row.column1}</td>
                  <td>{row.column2}</td>
                  <td>{row.column3}</td>
                  <td>{row.column3}</td>
                  <td>
                    <span>12/12/2023</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="pagination">
        {data.length > 0 && (
          <ul className="pagination-list">
            <li
              className={`pagination-item ${
                currentPage === 1 ? "disabled" : ""
              }`}
              onClick={() => currentPage !== 1 && paginate(currentPage - 1)}
            >
              <AiOutlineLeft />
            </li>
            {Array.from({
              length: Math.ceil(data.length / itemsPerPage),
            }).map((_, index) => (
              <li
                key={index}
                className={`pagination-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </li>
            ))}
            <li
              className={`pagination-item ${
                currentPage === Math.ceil(data.length / itemsPerPage)
                  ? "disabled"
                  : ""
              }`}
              onClick={() =>
                currentPage !== Math.ceil(data.length / itemsPerPage) &&
                paginate(currentPage + 1)
              }
            >
              <AiOutlineRight />
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default InvoiceBalance;
