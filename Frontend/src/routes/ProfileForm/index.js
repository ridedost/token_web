import React, { useState, useLayoutEffect } from "react";
import "./index.css";

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    address1: "",
    address2: "",
  });

  useLayoutEffect(() => {
    document.title = "Profile-Form";
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  // Check if any form field is empty
  const isFormEmpty = Object.values(formData).some((value) => value === "");

  return (
    <div className="user-profile-container">
      <h5>User Profile</h5>
      <div className="wizard-container">
        <div className="form-container">
          <form className="user-profile-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-col">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-col">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group-row">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group-row">
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                placeholder="Contact Number"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group-row">
              <input
                type="text"
                id="address1"
                name="address1"
                placeholder="Address 1"
                value={formData.address1}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group-row">
              <input
                type="text"
                id="address2"
                name="address2"
                placeholder="Address 2"
                value={formData.address2}
                onChange={handleChange}
                required
              />
            </div>
            <div className="btn-center">
              <button className="save-btn" type="submit" disabled={isFormEmpty}>
                <b>Save</b>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
