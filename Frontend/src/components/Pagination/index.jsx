/** @format */

import React from 'react';
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from 'react-icons/md';
import './index.css';
const Pagination = ({
  currentPage,
  totalPages,
  handlePrevPage,
  handleNextPage,
  handlePageClick,
  pageNumbers,
  routes,
}) => {
  // console.warn( pageNumbers)
  return totalPages > 1 ? (
    <div
      className={`${
        routes
          ? 'pagination-container-routes'
          : 'pagination-container pagination-for-poupop'
      }`}
    >
      {currentPage > 1 && (
        <span
          className="span-btn"
          style={{ display: 'flex' }}
          onClick={handlePrevPage}
        >
          <MdOutlineKeyboardArrowLeft fontSize={25} />
        </span>
      )}
      {pageNumbers?.map((page, index) => {
        if (
          page === 1 ||
          page === totalPages ||
          (index + 1 <= currentPage + 1 && index + 1 >= currentPage - 1)
        ) {
          return (
            <span
              className={`${
                currentPage === page ? 'active-btn' : 'non-active-btn span-btn'
              }`}
              key={page}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </span>
          );
        } else if (
          (index + 1 === currentPage + 2 && index + 2 < totalPages) ||
          (index + 1 === currentPage - 2 && index > 1)
        ) {
          return (
            <span style={{ fontSize: '25px' }} key={page}>
              ...
            </span>
          );
        }
        return null;
      })}
      {currentPage < totalPages && (
        <span
          className="span-btn"
          style={{ display: 'flex' }}
          onClick={handleNextPage}
        >
          <MdOutlineKeyboardArrowRight fontSize={25} />
        </span>
      )}
    </div>
  ) : null;
};

export default Pagination;
