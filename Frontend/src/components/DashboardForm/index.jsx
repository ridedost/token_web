import React, { useState } from "react";
import "./index.css";

const DashboardForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress: "",
    companyLogo: null,
    ownerName: "",
    ownerAddress: "",
    ownerProfileImage: null,
    productName: "",
    productDescription: "",
    productImage: null,
    productPrice: "",
    couponCodeValue: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  // Check if any form field is empty
  const isFormEmpty = Object.values(formData).some((value) => value === "");

  return (
    <div className="">
      <div className="form-container">
        <div className="table-wrapper">
          <div className="center">
            <h4 className="heading">Company Details</h4>
          </div>
          <form className="dashboard-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-col">
                <input
                  type="text"
                  id="firstName"
                  name="companyName"
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-col">
                <input
                  type="text"
                  id="lastName"
                  name="companyAddress"
                  placeholder="Company Address"
                  value={formData.companyAddress}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-col">
                <label htmlFor="companyLogo">Company Logo:</label>
                <input
                  type="file"
                  id="firstName"
                  name="companyLogo"
                  accept="image/*"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="center">
              <h4 className="heading">Owner Details</h4>
            </div>
            <div className="form-row">
              <div className="form-col">
                <input
                  type="text"
                  id="firstName"
                  name="ownerName"
                  placeholder="Owner Name"
                  value={formData.ownerName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-col">
                <input
                  type="text"
                  id="lastName"
                  name="ownerAddress"
                  placeholder="Owner Address"
                  value={formData.ownerAddress}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-col">
                <label htmlFor="ownerProfileImage">Owner Profile Image:</label>
                <input
                  type="file"
                  id="firstName"
                  name="ownerProfileImage"
                  accept="image/*"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="center">
              <h4 className="heading">Product Listing</h4>
            </div>
            <div className="form-row">
              <div className="form-col">
                <input
                  type="text"
                  id="firstName"
                  name="productName"
                  placeholder="Product Name"
                  value={formData.productName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-col">
                <textarea
                  id="lastName"
                  name="productDescription"
                  placeholder="Product Description"
                  value={formData.productDescription}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-col">
                <label htmlFor="productImage" className="file-input-label">
                  Product Image
                </label>
                <input
                  type="file"
                  id="firstName"
                  name="productImage"
                  accept="image/*"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-col">
                <input
                  type="text"
                  id="lastName"
                  name="productPrice"
                  placeholder="Product Price"
                  value={formData.productPrice}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="center">
              <h4 className="heading">Coupon Code Value</h4>
            </div>
            <div className="form-row">
              <div className="form-col">
                <input
                  type="text"
                  id="firstName"
                  name="couponCodeValue"
                  placeholder="Coupon Code Value"
                  value={formData.couponCodeValue}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="btn-center">
              <button className="save-btn" type="submit" disabled={isFormEmpty}>
                <b>Submit</b>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DashboardForm;
