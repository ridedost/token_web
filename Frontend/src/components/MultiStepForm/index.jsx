/** @format */

import React, { useState } from 'react';
import './index.css';
import { LuCheckCircle } from 'react-icons/lu';
import { addVendor } from '../../Api/adminApi';
import { setFetching } from '../../redux/reducer/fetching';
import { useNavigate } from 'react-router-dom';
import Check from '../../assets/check.svg';
import Circle from '../../assets/blue-circle.svg';
import Upload from '../../assets/upload-file.svg';
import Background from '../../assets/submit-background.svg';
import { VscStarFull } from 'react-icons/vsc';
const MultiStepForm = ({
  currentStep,
  handleChange,
  formData,
  renderStep,
  handleSubmit,
  handleIdProof,
  handleLogo,
  handleReset,
  comLogoName,
  idProofLogo,
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
                    className={`nav-link ${currentStep === 1 ? 'active' : ''}`}
                  >
                    <span className="step-number">1</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${currentStep === 2 ? 'active' : ''}`}
                  >
                    <span className="step-number">2</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${currentStep === 3 ? 'active' : ''}`}
                  >
                    <span className="step-number">3</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="break-line" style={{ marginTop: '25px' }}></div>
        <div>
          {currentStep === 1 ? <h2>Componey Details</h2> : ''}
          {currentStep === 2 ? <h2>Owner Details</h2> : ''}
          {currentStep === 3 ? <h2>Submit your quote request</h2> : ''}
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
                  <label className="add-label">
                    Company Name &nbsp;<span>*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="companyName"
                    placeholder="Company Name"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                  />
                  {/* <span>*</span> */}
                </div>
                <div className="form-col-left">
                  <label className="add-label">
                    Company Owner&nbsp;<span>*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="companyOwner"
                    placeholder="Company Owner"
                    value={formData.companyOwner}
                    onChange={handleChange}
                    required
                  />
                  {/* <span>*</span> */}
                </div>
              </div>
              <div className="form-row">
                <div className="form-col-left">
                  <label className="add-label">
                    Company Logo &nbsp;<span>*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="logo"
                    placeholder={comLogoName ? comLogoName : 'Company Logo'}
                    required
                  />
                  <input
                    type="file"
                    id="firstName"
                    name="logo"
                    className="fileChange"
                    onChange={handleLogo}
                    placeholder={comLogoName ? comLogoName : 'Company Logo'}
                  />
                  <img src={Upload} />
                  {/* <span>*</span> */}
                </div>
                <div className="form-col">
                  <label className="add-label">
                    Address &nbsp;<span>*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                  {/* <span>*</span> */}
                </div>
              </div>
              <div className="form-row">
                <div className="form-col">
                  <label className="add-label">
                    Coupon Threshold &nbsp;<span>*</span>
                  </label>
                  <input
                    type="number"
                    id="firstName"
                    name="thresholdvalue"
                    placeholder="Coupon Threshold"
                    value={formData.thresholdvalue}
                    onChange={handleChange}
                    required
                  />
                  {/* <span>*</span> */}
                </div>
                <div className="form-col-left">
                  <label className="add-label">
                    Percentage % &nbsp;<span>*</span>
                  </label>
                  <input
                    type="number"
                    id=""
                    style={{ width: '100%' }}
                    name="presentageValue"
                    placeholder="Percentage %"
                    value={formData.presentageValue}
                    onChange={handleChange}
                    required
                  />
                  {/* <span>*</span> */}
                </div>
              </div>
            </div>,
          )}
          {renderStep(
            2,
            <div>
              <div className="form-row">
                <div className="form-col">
                  <label className="add-label">
                    Owner Name &nbsp;<span>*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="name"
                    placeholder="Owner Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  {/* <span>*</span> */}
                </div>
                <div className="form-col-left">
                  <label className="add-label">
                    Email ID &nbsp;<span>*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="email"
                    placeholder="Email ID"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {/* <span>*</span> */}
                </div>
              </div>
              <div className="form-row">
                <div className="form-col-left">
                  <label className="add-label">
                    Phone Number &nbsp;<span>*</span>
                  </label>
                  <input
                    type="number"
                    id="lastName"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                  {/* <span>*</span> */}
                </div>
                <div className="form-col">
                  <label className="add-label">
                    ID Proof &nbsp;<span>*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="id-proof"
                    placeholder={idProofLogo ? idProofLogo : 'ID Proof'}
                    required
                  />
                  <input
                    type="file"
                    id="firstName"
                    name="id-proof"
                    className="fileChange"
                    onChange={handleIdProof}
                    placeholder={idProofLogo ? idProofLogo : 'ID Proof'}
                  />
                  <img src={Upload} />
                  {/* <span>*</span> */}
                </div>
              </div>
            </div>,
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
            </div>,
          )}
        </form>
      </div>
    </>
  );
};

export default MultiStepForm;
// className={`${currentStep === 3 ? "" : "details-margin-top"}`}
