/** @format */

import React, { useState, useEffect, useReducer } from 'react';
import './index.css';
import { AiOutlineDelete } from 'react-icons/ai';
import { HiPencil, HiOutlineSearch } from 'react-icons/hi';
import {
  getAllProducts,
  addProducts,
  editProducts,
  deleteProducts,
  searchProductVendor,
} from '../../Api/adminApi';
import { getAllProductForUser, searchProduct } from '../../Api/userApi';
import { setFetching } from '../../redux/reducer/fetching';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import AddProductModal from '../../components/AddProductModal';
import EditProductModal from '../../components/EditProductModal';
import Apple from '../../assets/apple.svg';
import Check from '../../assets/check.svg';
import CheckBlue from '../../assets/blue-check.svg';
import Dot from '../../assets/dot.svg';
import Pagination from '../../components/Pagination';
import jwtDecode from 'jwt-decode';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [select, setSelect] = useState(false);
  const [routes, setRoutes] = useState(false);
  const [editProductId, setEditProductId] = useState('');
  const [product, setProduct] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [imageUrl, setImageUrl] = useState('');
  const [imageResponse, setImageResponse] = useState('');
  const [userId, setUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    rating: '',
    productimage: '',
    description: '',
  });
  const [editProduct, setEditProduct] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: '',
      price: '',
      rating: '',
      productimage: '',
      description: '',
    },
  );
  const itemsPerPage = 9;

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Product List';
    const decodedToken = jwtDecode(token);
    const { userId } = decodedToken;
    setUserId(userId);
    console.warn(userId);
    // Initialize currentPage to 1 if it's undefined
    const initialPage = currentPage || 1;
    setTimeout(() => {
      fetchProduct(userId, initialPage);
    }, 1000);
  }, [currentPage, userId]);

  const fetchProduct = async (userId, currentPage) => {
    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    // console.warn(userId);
    dispatch(setFetching(true));
    try {
      if (role === '1') {
        const response = await getAllProducts(userId, currentPage, token);
        if (response.status === 200) {
          console.warn(response);
          const data = response.data.product;
          setProducts(data);
          setTotalPages(response.data.totalPages);
          setRoutes(true);
        } else {
          setProducts([]);
        }
      } else if (role === '2') {
        const response = await getAllProducts(userId, currentPage, token);
        if (response.status === 200) {
          const data = response.data.product;
          setProducts(data);
          setTotalPages(response.data.totalPages);
          setRoutes(true);
        } else {
          setProducts([]);
        }
      } else if (role === '3') {
        const response = await getAllProductForUser(currentPage, token);
        if (response.status === 200) {
          const data = response.data.product;
          setProducts(data);
          setTotalPages(response.data.totalPages);
          setRoutes(true);
        } else {
          setProducts([]);
        }
      }
    } catch (error) {
      setProducts([]);
    } finally {
      dispatch(setFetching(false));
    }
  };

  // Pagination
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentData = products?.slice(firstIndex, lastIndex) || [];

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleAddProduct = async (imageUrl, currentPage) => {
    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);
    const newProductList = {
      ...newProduct,
      productimage: imageUrl,
    };
    dispatch(setFetching(true));
    try {
      if (role === '1') {
        const response = await addProducts(token, newProductList);
        if (response.status === 201) {
          toast.success('Product added successfully!');
          // Update the state after adding a product
          fetchProduct(userId, currentPage); // Pass currentPage as a parameter
        } else {
          toast.error('Error adding product. Please try again later!');
        }
      }
      // ... (rest of the code)
    } catch (error) {
      console.warn(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setFetching(false));
      setShowAddModal(false);
      setNewProduct({
        name: '',
        price: '',
        rating: '',
        description: '',
      });
    }
  };
  const handleEditProduct = async (id, imageUrl) => {
    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);
    const newProductList = {
      ...editProduct,
      productimage: imageUrl,
    };
    console.log(editProduct);
    dispatch(setFetching(true));
    // console.log(editProduct);
    try {
      if (role === '1') {
        const response = await editProducts(id, token, editProduct);
        if (response.status === 200) {
          setShowEditModal(false);
          toast.success('Product edited successfully!');
          fetchProduct(userId, currentPage); // Pass currentPage as a parameter
        } else {
          toast.error('Error editing product. Please try again later!');
        }
      } else if (role === '2') {
        const response = await editProducts(id, token, editProduct);
        if (response.status === 200) {
          setShowEditModal(false);
          toast.success('Product edited successfully!');
          fetchProduct(userId, currentPage); // Pass currentPage as a parameter
        } else {
          toast.error('Error editing product. Please try again later!');
        }
      }
    } catch (error) {
      toast.error('Error editing product. Please try again later!');
    } finally {
      dispatch(setFetching(false));
      setEditProductId('');
      setEditProduct({
        name: '',
        price: '',
        description: '',
      });
    }
  };

  const handleDeleteProduct = async (id) => {
    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    dispatch(setFetching(true));
    try {
      if (role === '1') {
        const response = await deleteProducts(token, id);
        if (response.status === 200) {
          toast.success('Product deleted successfully!');
          fetchProduct(userId, currentPage);
        } else {
          toast.error('Error deleting product. Please try again later!');
        }
      }
    } catch (error) {
      toast.error('Error deleting product. Please try again later!');
    } finally {
      dispatch(setFetching(false));
    }
  };

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      const allRowIds = products.map((user) => user._id);
      setSelectedRows(allRowIds);
    }
    setSelectAll(!selectAll);
  };

  const handleEditButtonClick = (product, id) => {
    setProduct(product);
    setEditProduct({
      name: product.name,
      price: product.price,
      rating: product.rating,
      productimage: product.productimage,
      description: product.description,
    }); // Initialize editProduct with the values of the selected product
    setEditProductId(id);
    setShowEditModal(true);
  };

  const handleDropdown = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((user) => ({
        ...user,
        show: user._id === id ? !user.show : user.show,
      })),
    );
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
  console.warn(imageUrl);
  const maintoken = localStorage.getItem('auth_token');
  const role = maintoken.charAt(maintoken.length - 1);
  const token = maintoken.slice(0, -1);
  useEffect(() => {
    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);
    // Function to fetch data based on the search term and current page
    const handleSearch = async () => {
      try {
        if (role === '1') {
          const response = await searchProductVendor(
            searchTerm,
            currentPage,
            token,
          );
          const { vendorsList, totalPages, message } = response.data;
          console.warn(response);
          if (message === 'Data not found') {
            setProducts([]);
          } else {
            setProducts(vendorsList);
            setTotalPages(totalPages);
          }
        } else if (role === '2') {
          const response = await searchProductVendor(
            searchTerm,
            currentPage,
            token,
          );
          const { vendorsList, totalPages, message } = response.data;
          console.warn(response);
          if (message === 'Data not found') {
            setProducts([]);
          } else {
            setProducts(vendorsList);
            setTotalPages(totalPages);
          }
        } else if (role === '3') {
          const response = await searchProduct(searchTerm, currentPage, token);
          const { vendorsList, totalPages, message } = response.data;
          console.warn(response);
          if (message === 'Data not found') {
            setProducts([]);
            fetchProduct(userId, currentPage);
          } else {
            setProducts(vendorsList);
            setTotalPages(totalPages);
          }
        }
      } catch (error) {
        console.error('Error fetching vendor data:', error);
      }
    };

    handleSearch(); // Call the fetchData function when the component mounts or when searchTerm/currentPage changes.
  }, [searchTerm, currentPage]);
  return (
    <>
      <div className="justifyBetween">
        <h5>Product List</h5>
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search in vendor list"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <span id="search">
            <HiOutlineSearch />
          </span>
          {/* <span id="arrow">
            <VscArrowRight />
          </span> */}
        </div>
      </div>
      <div className="product-list-container margin_top">
        <div className="main-heading">
          <div className="main-heading-container">
            <h3>My Listings</h3>
            <p>
              Reviews you’ve received will be visible both here and on your
              public profile.
            </p>
          </div>
          {role === '3' ? (
            ''
          ) : (
            <div className="add-product-button">
              <button onClick={() => setShowAddModal(true)}>
                + Add Products
              </button>
            </div>
          )}
        </div>
        <div className="break-line"></div>
        <div className="grid-wrapper" style={{ height: '61vh' }}>
          <div className="product-grid">
            {products?.length > 0
              ? products.map((product, index) => (
                  <div className="product-grid-col" key={index}>
                    <div
                      className={`${
                        select ? 'product-card product-border' : 'product-card'
                      }`}
                    >
                      <div className="product-img">
                        <img
                          className="p-image"
                          src={
                            product.productimage ? product.productimage : Apple
                          }
                        />
                        {select ? (
                          <>
                            <img id="blue-check" src={CheckBlue} />
                            <img className="check" src={Check} />
                          </>
                        ) : (
                          ''
                        )}
                        {role === '3' ? (
                          ''
                        ) : (
                          <span
                            // className="dropdown-toggle "
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <div className="o-shape"></div>
                            <img className="o-dot" src={Dot} />
                          </span>
                        )}
                        <div className="dropdown action-dropdown">
                          <ul
                            className={`${'dropdown-menu drop-body'}`}
                            aria-labelledby="dropdownMenuButton1"
                          >
                            <li>
                              <span
                                onClick={() =>
                                  handleEditButtonClick(product, product._id)
                                }
                                className="dropdown-item  drop-item"
                                style={{ fontSize: '20px' }}
                              >
                                <HiPencil fontSize={22} />
                                &nbsp; &nbsp;Edit
                              </span>
                            </li>
                            <li>
                              <span
                                onClick={() => handleDeleteProduct(product._id)}
                                className="dropdown-item drop-item"
                                style={{ fontSize: '20px' }}
                              >
                                <AiOutlineDelete fontSize={22} />
                                &nbsp; &nbsp;Delete
                              </span>
                            </li>
                          </ul>
                        </div>
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
              : // <div className="no-product no-product-col">
                //   <h1 colSpan="9" className="no-data">
                //     No Product Available
                //   </h1>
                // </div>
                null}
          </div>
        </div>
        <Pagination
          routes={routes}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          handlePageClick={handlePageClick}
          pageNumbers={pageNumbers}
        />
      </div>
      {showAddModal ? (
        <AddProductModal
          newProduct={newProduct}
          setNewProduct={setNewProduct}
          handleAddProduct={handleAddProduct}
          setShowAddModal={setShowAddModal}
          setImageUrl={setImageUrl}
          imageUrl={imageUrl}
          setImageResponse={setImageResponse}
          imageResponse={imageResponse}
          currentPage={currentPage}
        />
      ) : (
        ''
      )}
      {showEditModal ? (
        <EditProductModal
          products={products}
          editProductId={editProductId}
          editProduct={editProduct}
          setEditProduct={setEditProduct}
          handleEditProduct={handleEditProduct}
          setShowEditModal={setShowEditModal}
          setImageUrl={setImageUrl}
          imageUrl={imageUrl}
          setImageResponse={setImageResponse}
          imageResponse={imageResponse}
          currentPage={currentPage}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default ProductList;
