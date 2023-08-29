import React, { useState, useLayoutEffect } from "react";
import MultiStepForm from "../../components/MultiStepForm";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addVendor } from "../../Api/adminApi";
import { useDispatch } from "react-redux";
import { setFetching } from "../../redux/reducer/fetching";

const AddVendor = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [imageUrl, setImageUrl] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");

  const [formData, setFormData] = useState({
    companyName: "",
    companyOwner: "",
    name: "",
    phoneNumber: "",
    email: "",
    presentageValue: "",
    id_proof: null,
    companyLogo: null,
  });

  const dispatch = useDispatch();

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

  const handleIdProof = (e) => {
    const file = e.target.files[0];
    TransformFileData(file);
  };

  const handleLogo = (e) => {
    const file = e.target.files[0];
    TransformFile(file);
  };

  const TransformFileData = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImageUrl(reader.result);
        setFormData((prevData) => ({
          ...prevData,
          id_proof: reader.result,
        }));
      };
    } else {
      setImageUrl("");
    }
  };

  const TransformFile = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setCompanyLogo(reader.result);
        setFormData((prevData) => ({
          ...prevData,
          companyLogo: reader.result,
        }));
      };
    } else {
      setCompanyLogo("");
    }
  };

  const handleSubmit = async () => {
    const maintoken = localStorage.getItem("auth_token");
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);
    console.warn(formData);
    dispatch(setFetching(true));
    try {
      const response = await addVendor(formData, token);

      if (response.status === 201) {
        toast.success("Vendor added Successfully");
      }
      handleNext();
      dispatch(setFetching(false));
    } catch (error) {
      toast.error("Vendor addition failed");
    }
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
  const handleReset = () => {
    setFormData({
      companyName: "",
      companyOwner: "",
      name: "",
      phoneNumber: "",
      email: "",
      presentageValue: "",
      id_proof: null,
      companyLogo: null,
      address: "",
      thresholdvalue: "",
    });
    setCurrentStep(1);
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
        handleIdProof={handleIdProof}
        handleLogo={handleLogo}
        handlePrevious={handlePrevious}
        handleReset={handleReset}
      />
      <div className="button-navigation">
        {currentStep > 1 && currentStep < 3 && (
          <button className="primary-outline" onClick={handlePrevious}>
            Previous step
          </button>
        )}
        <br />
        {currentStep < 3 && (
          <button
            className={`${currentStep === 2 ? "d-none" : "primary-button"}`}
            onClick={handleNext}
          >
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
