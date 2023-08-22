import React, { useState, useLayoutEffect } from "react";
import MultiStepForm from "../../components/MultiStepForm";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addVendor } from "../../Api/adminApi";

const AddVendor = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    companyName: "",
    companyOwner: "",
    name: "",
    phoneNumber: "",
    email: "",
    cash: "",
  });

  useLayoutEffect(() => {
    document.title = "Add Vendor";
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const renderStep = (stepNumber, content) => {
    return (
      <div className={`tab-pane ${currentStep === stepNumber ? "active" : ""}`}>
        {content}
      </div>
    );
  };

  const navigate = useNavigate();
  const handleSubmit = async () => {
    const maintoken = localStorage.getItem("auth_token");
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);
    try {
      const response = await addVendor(formData, token);
      console.warn(response);
      if (response.status === 201) {
        toast.success("Vendor added Successfully");
        navigate("/vendorslist");
      }
    } catch (error) {
      toast.error("Vendor addition failed");
    }
  };
  return (
    <div className="align-item-center">
      <h2>Add A Vendor</h2>
      <MultiStepForm
        currentStep={currentStep}
        handleChange={handleChange}
        formData={formData}
        renderStep={renderStep}
        handleSubmit={handleSubmit}
      />
      <div className="button-navigation">
        {currentStep > 1 && (
          <button className="primary-outline" onClick={handlePrevious}>
            Previous step
          </button>
        )}
        <br />
        {currentStep < 2 && (
          <button className="primary-button" onClick={handleNext}>
            Next
          </button>
        )}
        {currentStep === 2 && (
          <button className="primary-button" onClick={handleSubmit}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default AddVendor;
