/** @format */

import React, { useEffect, useState } from 'react';
import './index.css';
import { AiFillCloseCircle } from 'react-icons/ai';
import { HiOutlineSearch } from 'react-icons/hi';
import Pagination from '../Pagination';
import { IndexFunction } from '../../utils/IndexFunction';
import { setFetching } from '../../redux/reducer/fetching';
import { useDispatch } from 'react-redux';
import {
  getAllProductForPerticularVendor,
  searchPersonalVendorProduct,
} from '../../Api/userApi';
import Apple from '../../assets/apple.svg';
const ViewAllProductsPoupop = ({
  products,
  setProducts,
  userId,
  setShowProdusts,
}) => {
  // const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 8;

  const dispatch = useDispatch();

  useEffect(() => {
    handleViewProducts(userId, currentPage);
  }, [currentPage]);

  const handleViewProducts = async (id, currentPage) => {
    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);
    dispatch(setFetching(true));
    try {
      if (role === '3') {
        const response = await getAllProductForPerticularVendor(
          id,
          currentPage,
          token,
        );
        if (response.status === 200) {
          console.warn(response);
          setProducts(response?.data?.product);
          setTotalPages(response?.data?.totalPages);
          dispatch(setFetching(false));
          // fetchVendors();
        } else if (response.status === 204) {
          setProducts([]);
          setTotalPages(0);
        }
      }
    } catch (error) {
      setProducts([]);
    } finally {
      dispatch(setFetching(false));
    }
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
  useEffect(() => {
    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);
    // Function to fetch data based on the search term and current page
    const handleSearch = async () => {
      // const { vendorsList, totalPages, message } = response.data;
      // console.warn(response);
      // if (message === 'Data not found') {
      //   setProducts([]);
      //   // fetchProduct(userId, currentPage);
      // } else {
      //   setProducts(vendorsList);
      //   setTotalPages(totalPages);
      // }
      try {
        if (role === '3') {
          const response = await searchPersonalVendorProduct(
            userId,
            searchTerm,
            currentPage,
            token,
          );
          if (response.status === 200) {
            setProducts(response?.data?.vendorsList);
            setTotalPages(response?.data?.totalPages);
          }
          //  else if (response.status === 204) {
          //   setProducts([]);
          //   setTotalPages(0);
          // }
        }
      } catch (error) {
        console.error('Error fetching vendor data:', error);
      }
    };

    handleSearch(); // Call the fetchData function when the component mounts or when searchTerm/currentPage changes.
  }, [searchTerm, currentPage]);
  console.warn(searchTerm);
  return (
    <div className="modal">
      <div className=" modal-content-tables">
        <div className="justifyBetween">
          <div className="searchBar">
            <input
              type="text"
              placeholder="Search in product list"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* <span id="search">
              <HiOutlineSearch />
            </span> */}
            {/* <span id="arrow">
            <VscArrowRight />
          </span> */}
          </div>
        </div>
        <span className="cancle-modal" onClick={() => setShowProdusts(false)}>
          <AiFillCloseCircle fontSize={40} />
        </span>
        <div
          className={`${
            products.length > 0 ? 'grid-wrapper fullWidth ' : 'grid-wrapper '
          }`}
        >
          <div className="product-grid">
            {products?.length > 0 ? (
              products?.map((product, index) => (
                <div className="product-grid-col" key={index}>
                  <div className="product-card  product-card">
                    <div className="product-img">
                      <img
                        className="p-image"
                        src={
                          product.productimage ? product.productimage : Apple
                        }
                      />
                    </div>
                    <div className="product-detail">
                      <h4>{product.name}</h4>
                      <div className="product-description">
                        {product.description
                          ? product.description.toString().slice(0, 35)
                          : 'Lorem ipsum dolor sit amet'}
                        &nbsp;
                        <span>See More...</span>
                        <p className="tooltiptext">
                          {product.description
                            ? product.description
                            : 'Lorem ipsum dolor sit amet consectetur. Vestibulumenim metus nunc sagittis ut.'}
                        </p>
                      </div>

                      <div className="line"></div>
                      <div className="price">
                        <h4 className="text">Rating</h4>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <h4 className="number">{product.rating}</h4>
                      </div>
                      <div className="price">
                        <h4 className="text">Price</h4>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <h4 className="number">₹{product.price}/-</h4>
                      </div>
                      {/* <div className="select-button">
                          <button
                            onClick={() => setSelect(!select)}
                            className={`${select ? 'outline' : 'solid'}`}
                          >
                            {select ? 'Unselect' : 'Select'}
                          </button>
                        </div> */}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-product">
                <h1 colSpan="9" className="no-data">
                  No Product Available
                </h1>
              </div>
            )}
          </div>
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
    </div>
  );
};

export default ViewAllProductsPoupop;
