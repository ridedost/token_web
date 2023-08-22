import React, { useState, useEffect } from "react";
import "./index.css";
import {
  AiOutlineDelete,
  AiOutlineRight,
  AiOutlineEdit,
  AiOutlinePlus,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { HiPencil } from "react-icons/hi";
import {
  getAllProducts,
  addProducts,
  editProducts,
  deleteProducts,
} from "../../Api/adminApi";
import { setFetching } from "../../redux/reducer/fetching";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import AddProductModal from "../../components/AddProductModal";
import EditProductModal from "../../components/EditProductModal";
import Apple from "../../assets/apple.svg";
import Check from "../../assets/check.svg";
import Dot from "../../assets/dot.svg";

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [vendors, setVendors] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [select, setSelect] = useState(false);
  const [editProductId, setEditProductId] = useState("");
  const [user, setUser] = useState({});
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [editProduct, setEditProduct] = useState({
    name: "",
    price: "",
    description: "",
  });
  const itemsPerPage = 10;

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Product List";
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    const maintoken = localStorage.getItem("auth_token");
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    dispatch(setFetching(true));
    try {
      if (role === "1") {
        const response = await getAllProducts(token);

        if (response.status === 200) {
          const data = response.data.products;
          setVendors(data);
        } else {
          setVendors([]);
        }
      } else if (role === "2") {
        const response = await getAllProducts(token);

        if (response.status === 200) {
          const data = response.data.products;
          setVendors(data);
        } else {
          setVendors([]);
        }
      }
    } catch (error) {
      setVendors([]);
    } finally {
      dispatch(setFetching(false));
    }
  };

  // Pagination
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentData = vendors?.slice(firstIndex, lastIndex) || [];

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddProduct = async () => {
    const maintoken = localStorage.getItem("auth_token");
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    dispatch(setFetching(true));
    try {
      if (role === "1") {
        const response = await addProducts(token, newProduct);
        console.warn(response);
        if (response.status === 201) {
          toast.success("Product added successfully!");
          fetchVendors();
        } else {
          toast.error("Error adding product. Please try again later!");
        }
      }
    } catch (error) {
      toast.error("Error adding product. Please try again later!");
    } finally {
      dispatch(setFetching(false));
      setShowAddModal(false);
      setNewProduct({
        name: "",
        price: "",
        description: "",
      });
    }
  };

  const handleEditProduct = async (id) => {
    const maintoken = localStorage.getItem("auth_token");
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);
    console.log(editProduct);
    dispatch(setFetching(true));
    // console.log(editProduct);
    try {
      if (role === "1") {
        const response = await editProducts(id, token, editProduct);
        if (response.status === 200) {
          setShowEditModal(false);
          toast.success("Product edited successfully!");
          fetchVendors();
        } else {
          toast.error("Error editing product. Please try again later!");
        }
      }
    } catch (error) {
      toast.error("Error editing product. Please try again later!");
    } finally {
      dispatch(setFetching(false));
      setEditProductId("");
      setEditProduct({
        name: "",
        price: "",
        description: "",
      });
    }
  };

  const handleDeleteProduct = async (id) => {
    const maintoken = localStorage.getItem("auth_token");
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    dispatch(setFetching(true));
    try {
      if (role === "1") {
        const response = await deleteProducts(token, id);
        if (response.status === 200) {
          toast.success("Product deleted successfully!");
          fetchVendors();
        } else {
          toast.error("Error deleting product. Please try again later!");
        }
      }
    } catch (error) {
      toast.error("Error deleting product. Please try again later!");
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
      const allRowIds = vendors.map((user) => user._id);
      setSelectedRows(allRowIds);
    }
    setSelectAll(!selectAll);
  };

  const handleEditButtonClick = (user, id) => {
    setUser(user);
    setEditProduct({ ...user }); // Initialize editProduct with the values of the selected product
    setEditProductId(id);
    setShowEditModal(true);
  };

  const handleDropdown = (id) => {
    setVendors((prevVendors) =>
      prevVendors.map((user) => ({
        ...user,
        show: user._id === id ? !user.show : user.show,
      }))
    );
  };

  return (
    <>
      <div className="product-list-container">
        <div className="main-heading">
          <div className="main-heading-container">
            <h3>My Listings</h3>
            <p>
              Reviews you’ve received will be visible both here and on your
              public profile.
            </p>
          </div>
          <div className="add-product-button">
            <button onClick={() => setShowAddModal(true)}>
              + Add Products
            </button>
          </div>
        </div>
        <div className="break-line"></div>
        <div className="grid-wrapper">
          <div className="product-grid">
            <div className="product-grid-col">
              <div
                className={`${
                  select ? "product-card product-border" : "product-card"
                }`}
              >
                <div className="product-img">
                  <img className="p-image" src={Apple} />
                  {select ? (
                    <>
                      <div className="check-sign-rotate"></div>
                      <img className="check" src={Check} />
                    </>
                  ) : (
                    ""
                  )}
                  <span
                    className="dropdown-toggle "
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="o-shape"></div>
                    <img className="o-dot" src={Dot} />
                  </span>
                  <div className="dropdown action-dropdown">
                    <ul
                      className={`${"dropdown-menu drop-body"}`}
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <span
                          onClick={() => setShowEditModal(true)}
                          className="dropdown-item  drop-item"
                          style={{ fontSize: "20px" }}
                        >
                          <HiPencil fontSize={22} />
                          &nbsp; &nbsp;Edit
                        </span>
                      </li>
                      <li>
                        <span
                          // onClick={() => handleDelete(user._id)}
                          className="dropdown-item drop-item"
                          style={{ fontSize: "20px" }}
                        >
                          <AiOutlineDelete fontSize={22} />
                          &nbsp; &nbsp;Delete
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="product-detail">
                  <h3>Apple Store</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Vestibulum enim
                    metus nunc sagittis ut. Leo lorem placerat vitae eu nunc
                    tortor feugiat. Interdum purus.
                  </p>
                  <div className="line"></div>
                  <div className="price">
                    <h2 className="text">Price</h2>
                    <h2 className="number">₹4,588/-</h2>
                  </div>
                  <div className="select-button">
                    <button
                      onClick={() => setSelect(!select)}
                      className={`${select ? "outline" : "solid"}`}
                    >
                      {select ? "Unselect" : "Select"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="product-grid-col">
              <div
                className={`${
                  select ? "product-card product-border" : "product-card"
                }`}
              >
                <div className="product-img">
                  <img className="p-image" src={Apple} />
                  {select ? (
                    <>
                      <div className="check-sign-rotate"></div>
                      <img className="check" src={Check} />
                    </>
                  ) : (
                    ""
                  )}
                  <span
                    className="dropdown-toggle "
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="o-shape"></div>
                    <img className="o-dot" src={Dot} />
                  </span>
                  <div className="dropdown action-dropdown">
                    <ul
                      className={`${"dropdown-menu drop-body"}`}
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <span
                          onClick={() => setShowEditModal(true)}
                          className="dropdown-item  drop-item"
                          style={{ fontSize: "20px" }}
                        >
                          <HiPencil fontSize={22} />
                          &nbsp; &nbsp;Edit
                        </span>
                      </li>
                      <li>
                        <span
                          // onClick={() => handleDelete(user._id)}
                          className="dropdown-item drop-item"
                          style={{ fontSize: "20px" }}
                        >
                          <AiOutlineDelete fontSize={22} />
                          &nbsp; &nbsp;Delete
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="product-detail">
                  <h3>Apple Store</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Vestibulum enim
                    metus nunc sagittis ut. Leo lorem placerat vitae eu nunc
                    tortor feugiat. Interdum purus.
                  </p>
                  <div className="line"></div>
                  <div className="price">
                    <h2 className="text">Price</h2>
                    <h2 className="number">₹4,588/-</h2>
                  </div>
                  <div className="select-button">
                    <button
                      onClick={() => setSelect(!select)}
                      className={`${select ? "outline" : "solid"}`}
                    >
                      {select ? "Unselect" : "Select"}
                    </button>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="product-grid-col">
              <div
                className={`${
                  select ? "product-card product-border" : "product-card"
                }`}
              >
                <div className="product-img">
                  <img className="p-image" src={Apple} />
                  {select ? (
                    <>
                      <div className="check-sign-rotate"></div>
                      <img className="check" src={Check} />
                    </>
                  ) : (
                    ""
                  )}
                  <span
                    className="dropdown-toggle "
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="o-shape"></div>
                    <img className="o-dot" src={Dot} />
                  </span>
                  <div className="dropdown action-dropdown">
                    <ul
                      className={`${"dropdown-menu drop-body"}`}
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <span
                          onClick={() => setShowEditModal(true)}
                          className="dropdown-item  drop-item"
                          style={{ fontSize: "20px" }}
                        >
                          <HiPencil fontSize={22} />
                          &nbsp; &nbsp;Edit
                        </span>
                      </li>
                      <li>
                        <span
                          // onClick={() => handleDelete(user._id)}
                          className="dropdown-item drop-item"
                          style={{ fontSize: "20px" }}
                        >
                          <AiOutlineDelete fontSize={22} />
                          &nbsp; &nbsp;Delete
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="product-detail">
                  <h3>Apple Store</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Vestibulum enim
                    metus nunc sagittis ut. Leo lorem placerat vitae eu nunc
                    tortor feugiat. Interdum purus.
                  </p>
                  <div className="line"></div>
                  <div className="price">
                    <h2 className="text">Price</h2>
                    <h2 className="number">₹4,588/-</h2>
                  </div>
                  <div className="select-button">
                    <button
                      onClick={() => setSelect(!select)}
                      className={`${select ? "outline" : "solid"}`}
                    >
                      {select ? "Unselect" : "Select"}
                    </button>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="product-grid-col">
              <div
                className={`${
                  select ? "product-card product-border" : "product-card"
                }`}
              >
                <div className="product-img">
                  <img className="p-image" src={Apple} />
                  {select ? (
                    <>
                      <div className="check-sign-rotate"></div>
                      <img className="check" src={Check} />
                    </>
                  ) : (
                    ""
                  )}
                  <span
                    className="dropdown-toggle "
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="o-shape"></div>
                    <img className="o-dot" src={Dot} />
                  </span>
                  <div className="dropdown action-dropdown">
                    <ul
                      className={`${"dropdown-menu drop-body"}`}
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <span
                          onClick={() => setShowEditModal(true)}
                          className="dropdown-item  drop-item"
                          style={{ fontSize: "20px" }}
                        >
                          <HiPencil fontSize={22} />
                          &nbsp; &nbsp;Edit
                        </span>
                      </li>
                      <li>
                        <span
                          // onClick={() => handleDelete(user._id)}
                          className="dropdown-item drop-item"
                          style={{ fontSize: "20px" }}
                        >
                          <AiOutlineDelete fontSize={22} />
                          &nbsp; &nbsp;Delete
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="product-detail">
                  <h3>Apple Store</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Vestibulum enim
                    metus nunc sagittis ut. Leo lorem placerat vitae eu nunc
                    tortor feugiat. Interdum purus.
                  </p>
                  <div className="line"></div>
                  <div className="price">
                    <h2 className="text">Price</h2>
                    <h2 className="number">₹4,588/-</h2>
                  </div>
                  <div className="select-button">
                    <button
                      onClick={() => setSelect(!select)}
                      className={`${select ? "outline" : "solid"}`}
                    >
                      {select ? "Unselect" : "Select"}
                    </button>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="product-grid-col">
              <div
                className={`${
                  select ? "product-card product-border" : "product-card"
                }`}
              >
                <div className="product-img">
                  <img className="p-image" src={Apple} />
                  {select ? (
                    <>
                      <div className="check-sign-rotate"></div>
                      <img className="check" src={Check} />
                    </>
                  ) : (
                    ""
                  )}
                  <span
                    className="dropdown-toggle "
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="o-shape"></div>
                    <img className="o-dot" src={Dot} />
                  </span>
                  <div className="dropdown action-dropdown">
                    <ul
                      className={`${"dropdown-menu drop-body"}`}
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <span
                          onClick={() => setShowEditModal(true)}
                          className="dropdown-item  drop-item"
                          style={{ fontSize: "20px" }}
                        >
                          <HiPencil fontSize={22} />
                          &nbsp; &nbsp;Edit
                        </span>
                      </li>
                      <li>
                        <span
                          // onClick={() => handleDelete(user._id)}
                          className="dropdown-item drop-item"
                          style={{ fontSize: "20px" }}
                        >
                          <AiOutlineDelete fontSize={22} />
                          &nbsp; &nbsp;Delete
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="product-detail">
                  <h3>Apple Store</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Vestibulum enim
                    metus nunc sagittis ut. Leo lorem placerat vitae eu nunc
                    tortor feugiat. Interdum purus.
                  </p>
                  <div className="line"></div>
                  <div className="price">
                    <h2 className="text">Price</h2>
                    <h2 className="number">₹4,588/-</h2>
                  </div>
                  <div className="select-button">
                    <button
                      onClick={() => setSelect(!select)}
                      className={`${select ? "outline" : "solid"}`}
                    >
                      {select ? "Unselect" : "Select"}
                    </button>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="product-grid-col">
              <div
                className={`${
                  select ? "product-card product-border" : "product-card"
                }`}
              >
                <div className="product-img">
                  <img className="p-image" src={Apple} />
                  {select ? (
                    <>
                      <div className="check-sign-rotate"></div>
                      <img className="check" src={Check} />
                    </>
                  ) : (
                    ""
                  )}
                  <span
                    className="dropdown-toggle "
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="o-shape"></div>
                    <img className="o-dot" src={Dot} />
                  </span>
                  <div className="dropdown action-dropdown">
                    <ul
                      className={`${"dropdown-menu drop-body"}`}
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <span
                          onClick={() => setShowEditModal(true)}
                          className="dropdown-item  drop-item"
                          style={{ fontSize: "20px" }}
                        >
                          <HiPencil fontSize={22} />
                          &nbsp; &nbsp;Edit
                        </span>
                      </li>
                      <li>
                        <span
                          // onClick={() => handleDelete(user._id)}
                          className="dropdown-item drop-item"
                          style={{ fontSize: "20px" }}
                        >
                          <AiOutlineDelete fontSize={22} />
                          &nbsp; &nbsp;Delete
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="product-detail">
                  <h3>Apple Store</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Vestibulum enim
                    metus nunc sagittis ut. Leo lorem placerat vitae eu nunc
                    tortor feugiat. Interdum purus.
                  </p>
                  <div className="line"></div>
                  <div className="price">
                    <h2 className="text">Price</h2>
                    <h2 className="number">₹4,588/-</h2>
                  </div>
                  <div className="select-button">
                    <button
                      onClick={() => setSelect(!select)}
                      className={`${select ? "outline" : "solid"}`}
                    >
                      {select ? "Unselect" : "Select"}
                    </button>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="product-grid-col">
              <div
                className={`${
                  select ? "product-card product-border" : "product-card"
                }`}
              >
                <div className="product-img">
                  <img className="p-image" src={Apple} />
                  {select ? (
                    <>
                      <div className="check-sign-rotate"></div>
                      <img className="check" src={Check} />
                    </>
                  ) : (
                    ""
                  )}
                  <span
                    className="dropdown-toggle "
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="o-shape"></div>
                    <img className="o-dot" src={Dot} />
                  </span>
                  <div className="dropdown action-dropdown">
                    <ul
                      className={`${"dropdown-menu drop-body"}`}
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <span
                          onClick={() => setShowEditModal(true)}
                          className="dropdown-item  drop-item"
                          style={{ fontSize: "20px" }}
                        >
                          <HiPencil fontSize={22} />
                          &nbsp; &nbsp;Edit
                        </span>
                      </li>
                      <li>
                        <span
                          // onClick={() => handleDelete(user._id)}
                          className="dropdown-item drop-item"
                          style={{ fontSize: "20px" }}
                        >
                          <AiOutlineDelete fontSize={22} />
                          &nbsp; &nbsp;Delete
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="product-detail">
                  <h3>Apple Store</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Vestibulum enim
                    metus nunc sagittis ut. Leo lorem placerat vitae eu nunc
                    tortor feugiat. Interdum purus.
                  </p>
                  <div className="line"></div>
                  <div className="price">
                    <h2 className="text">Price</h2>
                    <h2 className="number">₹4,588/-</h2>
                  </div>
                  <div className="select-button">
                    <button
                      onClick={() => setSelect(!select)}
                      className={`${select ? "outline" : "solid"}`}
                    >
                      {select ? "Unselect" : "Select"}
                    </button>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="product-grid-col">
              <div
                className={`${
                  select ? "product-card product-border" : "product-card"
                }`}
              >
                <div className="product-img">
                  <img className="p-image" src={Apple} />
                  {select ? (
                    <>
                      <div className="check-sign-rotate"></div>
                      <img className="check" src={Check} />
                    </>
                  ) : (
                    ""
                  )}
                  <span
                    className="dropdown-toggle "
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="o-shape"></div>
                    <img className="o-dot" src={Dot} />
                  </span>
                  <div className="dropdown action-dropdown">
                    <ul
                      className={`${"dropdown-menu drop-body"}`}
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <span
                          onClick={() => setShowEditModal(true)}
                          className="dropdown-item  drop-item"
                          style={{ fontSize: "20px" }}
                        >
                          <HiPencil fontSize={22} />
                          &nbsp; &nbsp;Edit
                        </span>
                      </li>
                      <li>
                        <span
                          // onClick={() => handleDelete(user._id)}
                          className="dropdown-item drop-item"
                          style={{ fontSize: "20px" }}
                        >
                          <AiOutlineDelete fontSize={22} />
                          &nbsp; &nbsp;Delete
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="product-detail">
                  <h3>Apple Store</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Vestibulum enim
                    metus nunc sagittis ut. Leo lorem placerat vitae eu nunc
                    tortor feugiat. Interdum purus.
                  </p>
                  <div className="line"></div>
                  <div className="price">
                    <h2 className="text">Price</h2>
                    <h2 className="number">₹4,588/-</h2>
                  </div>
                  <div className="select-button">
                    <button
                      onClick={() => setSelect(!select)}
                      className={`${select ? "outline" : "solid"}`}
                    >
                      {select ? "Unselect" : "Select"}
                    </button>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="product-grid-col">
              <div
                className={`${
                  select ? "product-card product-border" : "product-card"
                }`}
              >
                <div className="product-img">
                  <img className="p-image" src={Apple} />
                  {select ? (
                    <>
                      <div className="check-sign-rotate"></div>
                      <img className="check" src={Check} />
                    </>
                  ) : (
                    ""
                  )}
                  <span
                    className="dropdown-toggle "
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="o-shape"></div>
                    <img className="o-dot" src={Dot} />
                  </span>
                  <div className="dropdown action-dropdown">
                    <ul
                      className={`${"dropdown-menu drop-body"}`}
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <span
                          onClick={() => setShowEditModal(true)}
                          className="dropdown-item  drop-item"
                          style={{ fontSize: "20px" }}
                        >
                          <HiPencil fontSize={22} />
                          &nbsp; &nbsp;Edit
                        </span>
                      </li>
                      <li>
                        <span
                          // onClick={() => handleDelete(user._id)}
                          className="dropdown-item drop-item"
                          style={{ fontSize: "20px" }}
                        >
                          <AiOutlineDelete fontSize={22} />
                          &nbsp; &nbsp;Delete
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="product-detail">
                  <h3>Apple Store</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Vestibulum enim
                    metus nunc sagittis ut. Leo lorem placerat vitae eu nunc
                    tortor feugiat. Interdum purus.
                  </p>
                  <div className="line"></div>
                  <div className="price">
                    <h2 className="text">Price</h2>
                    <h2 className="number">₹4,588/-</h2>
                  </div>
                  <div className="select-button">
                    <button
                      onClick={() => setSelect(!select)}
                      className={`${select ? "outline" : "solid"}`}
                    >
                      {select ? "Unselect" : "Select"}
                    </button>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="product-grid-col">
              <div
                className={`${
                  select ? "product-card product-border" : "product-card"
                }`}
              >
                <div className="product-img">
                  <img className="p-image" src={Apple} />
                  {select ? (
                    <>
                      <div className="check-sign-rotate"></div>
                      <img className="check" src={Check} />
                    </>
                  ) : (
                    ""
                  )}
                  <span
                    className="dropdown-toggle "
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="o-shape"></div>
                    <img className="o-dot" src={Dot} />
                  </span>
                  <div className="dropdown action-dropdown">
                    <ul
                      className={`${"dropdown-menu drop-body"}`}
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <span
                          onClick={() => setShowEditModal(true)}
                          className="dropdown-item  drop-item"
                          style={{ fontSize: "20px" }}
                        >
                          <HiPencil fontSize={22} />
                          &nbsp; &nbsp;Edit
                        </span>
                      </li>
                      <li>
                        <span
                          // onClick={() => handleDelete(user._id)}
                          className="dropdown-item drop-item"
                          style={{ fontSize: "20px" }}
                        >
                          <AiOutlineDelete fontSize={22} />
                          &nbsp; &nbsp;Delete
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="product-detail">
                  <h3>Apple Store</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Vestibulum enim
                    metus nunc sagittis ut. Leo lorem placerat vitae eu nunc
                    tortor feugiat. Interdum purus.
                  </p>
                  <div className="line"></div>
                  <div className="price">
                    <h2 className="text">Price</h2>
                    <h2 className="number">₹4,588/-</h2>
                  </div>
                  <div className="select-button">
                    <button
                      onClick={() => setSelect(!select)}
                      className={`${select ? "outline" : "solid"}`}
                    >
                      {select ? "Unselect" : "Select"}
                    </button>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="product-grid-col">
              <div
                className={`${
                  select ? "product-card product-border" : "product-card"
                }`}
              >
                <div className="product-img">
                  <img className="p-image" src={Apple} />
                  {select ? (
                    <>
                      <div className="check-sign-rotate"></div>
                      <img className="check" src={Check} />
                    </>
                  ) : (
                    ""
                  )}
                  <span
                    className="dropdown-toggle "
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="o-shape"></div>
                    <img className="o-dot" src={Dot} />
                  </span>
                  <div className="dropdown action-dropdown">
                    <ul
                      className={`${"dropdown-menu drop-body"}`}
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <span
                          onClick={() => setShowEditModal(true)}
                          className="dropdown-item  drop-item"
                          style={{ fontSize: "20px" }}
                        >
                          <HiPencil fontSize={22} />
                          &nbsp; &nbsp;Edit
                        </span>
                      </li>
                      <li>
                        <span
                          // onClick={() => handleDelete(user._id)}
                          className="dropdown-item drop-item"
                          style={{ fontSize: "20px" }}
                        >
                          <AiOutlineDelete fontSize={22} />
                          &nbsp; &nbsp;Delete
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="product-detail">
                  <h3>Apple Store</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Vestibulum enim
                    metus nunc sagittis ut. Leo lorem placerat vitae eu nunc
                    tortor feugiat. Interdum purus.
                  </p>
                  <div className="line"></div>
                  <div className="price">
                    <h2 className="text">Price</h2>
                    <h2 className="number">₹4,588/-</h2>
                  </div>
                  <div className="select-button">
                    <button
                      onClick={() => setSelect(!select)}
                      className={`${select ? "outline" : "solid"}`}
                    >
                      {select ? "Unselect" : "Select"}
                    </button>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="product-grid-col">
              <div
                className={`${
                  select ? "product-card product-border" : "product-card"
                }`}
              >
                <div className="product-img">
                  <img className="p-image" src={Apple} />
                  {select ? (
                    <>
                      <div className="check-sign-rotate"></div>
                      <img className="check" src={Check} />
                    </>
                  ) : (
                    ""
                  )}
                  <span
                    className="dropdown-toggle "
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="o-shape"></div>
                    <img className="o-dot" src={Dot} />
                  </span>
                  <div className="dropdown action-dropdown">
                    <ul
                      className={`${"dropdown-menu drop-body"}`}
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <span
                          onClick={() => setShowEditModal(true)}
                          className="dropdown-item  drop-item"
                          style={{ fontSize: "20px" }}
                        >
                          <HiPencil fontSize={22} />
                          &nbsp; &nbsp;Edit
                        </span>
                      </li>
                      <li>
                        <span
                          // onClick={() => handleDelete(user._id)}
                          className="dropdown-item drop-item"
                          style={{ fontSize: "20px" }}
                        >
                          <AiOutlineDelete fontSize={22} />
                          &nbsp; &nbsp;Delete
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="product-detail">
                  <h3>Apple Store</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Vestibulum enim
                    metus nunc sagittis ut. Leo lorem placerat vitae eu nunc
                    tortor feugiat. Interdum purus.
                  </p>
                  <div className="line"></div>
                  <div className="price">
                    <h2 className="text">Price</h2>
                    <h2 className="number">₹4,588/-</h2>
                  </div>
                  <div className="select-button">
                    <button
                      onClick={() => setSelect(!select)}
                      className={`${select ? "outline" : "solid"}`}
                    >
                      {select ? "Unselect" : "Select"}
                    </button>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="product-grid-col">
              <div
                className={`${
                  select ? "product-card product-border" : "product-card"
                }`}
              >
                <div className="product-img">
                  <img className="p-image" src={Apple} />
                  {select ? (
                    <>
                      <div className="check-sign-rotate"></div>
                      <img className="check" src={Check} />
                    </>
                  ) : (
                    ""
                  )}
                  <span
                    className="dropdown-toggle "
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="o-shape"></div>
                    <img className="o-dot" src={Dot} />
                  </span>
                  <div className="dropdown action-dropdown">
                    <ul
                      className={`${"dropdown-menu drop-body"}`}
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <span
                          onClick={() => setShowEditModal(true)}
                          className="dropdown-item  drop-item"
                          style={{ fontSize: "20px" }}
                        >
                          <HiPencil fontSize={22} />
                          &nbsp; &nbsp;Edit
                        </span>
                      </li>
                      <li>
                        <span
                          // onClick={() => handleDelete(user._id)}
                          className="dropdown-item drop-item"
                          style={{ fontSize: "20px" }}
                        >
                          <AiOutlineDelete fontSize={22} />
                          &nbsp; &nbsp;Delete
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="product-detail">
                  <h3>Apple Store</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Vestibulum enim
                    metus nunc sagittis ut. Leo lorem placerat vitae eu nunc
                    tortor feugiat. Interdum purus.
                  </p>
                  <div className="line"></div>
                  <div className="price">
                    <h2 className="text">Price</h2>
                    <h2 className="number">₹4,588/-</h2>
                  </div>
                  <div className="select-button">
                    <button
                      onClick={() => setSelect(!select)}
                      className={`${select ? "outline" : "solid"}`}
                    >
                      {select ? "Unselect" : "Select"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showAddModal ? (
        <AddProductModal
          newProduct={newProduct}
          setNewProduct={setNewProduct}
          handleAddProduct={handleAddProduct}
          setShowAddModal={setShowAddModal}
        />
      ) : (
        ""
      )}
      {showEditModal ? (
        <EditProductModal
          user={user}
          editProductId={editProductId}
          editProduct={editProduct}
          setEditProduct={setEditProduct}
          handleEditProduct={handleEditProduct}
          setShowEditModal={setShowEditModal}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default ProductList;
