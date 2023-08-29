import React, { useState } from "react";
import "./index.css";
import { LuCheckCircle } from "react-icons/lu";
import { addVendor } from "../../Api/adminApi";
import { setFetching } from "../../redux/reducer/fetching";
import { useNavigate } from "react-router-dom";
import Check from "../../assets/check.svg";
import Circle from "../../assets/blue-circle.svg";
import Upload from "../../assets/upload-file.svg";
import Background from "../../assets/submit-background.svg";

const MultiStepForm = ({
  currentStep,
  handleChange,
  formData,
  renderStep,
  handleSubmit,
  handleIdProof,
  handleLogo,
  handleReset,
}) => {
  return (
    <>
      <div className="wizard">
        <div className="table-wrapper">
          <div className="card-body">
            <div className="twitter-bs-wizard">
              <ul className="twitter-bs-wizard-nav nav nav-pills nav-justified">
                <li className="nav-item">
                  <a
                    className={`nav-link ${currentStep === 1 ? "active" : ""}`}
                  >
                    <span className="step-number">1</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${currentStep === 2 ? "active" : ""}`}
                  >
                    <span className="step-number">2</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${currentStep === 3 ? "active" : ""}`}
                  >
                    <span className="step-number">3</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="break-line" style={{ marginTop: "25px" }}></div>
        <div>
          {currentStep === 1 ? <h2>Componey Details</h2> : ""}
          {currentStep === 2 ? <h2>Owner Details</h2> : ""}
          {currentStep === 3 ? <h2>Submit your quote request</h2> : ""}
        </div>
        <form
          className="tab-content twitter-bs-wizard-tab-content"
          onSubmit={handleSubmit}
        >
          {renderStep(
            1,
            <div>
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
                <div className="form-col-left">
                  <input
                    type="text"
                    id="lastName"
                    name="companyOwner"
                    placeholder="Company Owner"
                    value={formData.companyOwner}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-col-left">
                  <input
                    type="text"
                    id="firstName"
                    name="logo"
                    placeholder="Company Logo"
                    required
                  />
                  <input
                    type="file"
                    id="firstName"
                    name="logo"
                    className="fileChange"
                    onChange={handleLogo}
                    placeholder="Company Logo"
                  />
                  <img src={Upload} />
                </div>
                <div className="form-col">
                  <input
                    type="text"
                    id="firstName"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-col">
                  <input
                    type="text"
                    id="firstName"
                    name="thresholdvalue"
                    placeholder="Coupon Threshold"
                    value={formData.thresholdvalue}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-col-left">
                  <input
                    type="text"
                    id=""
                    style={{ width: "100%" }}
                    name="presentageValue"
                    placeholder="Percentage"
                    value={formData.presentageValue}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          )}
          {renderStep(
            2,
            <div>
              <div className="form-row">
                <div className="form-col">
                  <input
                    type="text"
                    id="firstName"
                    name="name"
                    placeholder="Owner Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-col-left">
                  <input
                    type="text"
                    id="lastName"
                    name="email"
                    placeholder="Email ID"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-col-left">
                  <input
                    type="text"
                    id="lastName"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-col">
                  <input
                    type="text"
                    id="firstName"
                    name="id-proof"
                    placeholder="ID Proof"
                    required
                  />
                  <input
                    type="file"
                    id="firstName"
                    name="id-proof"
                    className="fileChange"
                    onChange={handleIdProof}
                    placeholder="ID Proof"
                  />
                  <img src={Upload} />
                </div>
              </div>
            </div>
          )}

          {renderStep(
            3,
            <div className="submit-request">
              <div className="align-item-center relative">
                <img src={Background} />
                <img id="circle" src={Circle} />
                <img id="check" src={Check} />
                <h4>Submit your quote request</h4>
                <p>
                  Please review all the information you previously typed in the
                  past steps, and if all is okay, submit your message to receive
                  a project quote in 24 - 48 hours.
                </p>
                <div className="button-go">
                  <button className="primary-button" onClick={handleReset}>
                    Go Back
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default MultiStepForm;
// className={`${currentStep === 3 ? "" : "details-margin-top"}`}
