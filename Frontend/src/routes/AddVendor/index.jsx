/** @format */

import React, { useState, useLayoutEffect, useEffect } from 'react';
import MultiStepForm from '../../components/MultiStepForm';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addVendor } from '../../Api/adminApi';
import { useDispatch } from 'react-redux';
import { setFetching } from '../../redux/reducer/fetching';
import { upload_Image } from '../../Api/cloudImage';

const AddVendor = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [imageUrl, setImageUrl] = useState('');
  const [companyLogo, setCompanyLogo] = useState('');
  const [idProofLogo, setIdProofLogo] = useState('');
  const [comLogoName, setComLogoName] = useState('');
  const [componyUrl, setComponyUrl] = useState('');
  const [idProofUrl, setIdProofUrl] = useState('');
  const [statusLogo, setStatusLogo] = useState('');
  const [statusId, setStatusId] = useState('');

  const [formData, setFormData] = useState({
    companyName: '',
    companyOwner: '',
    name: '',
    phoneNumber: '',
    email: '',
    presentageValue: '',
    thresholdvalue: '',
    id_proof: '',
    companyLogo: '',
  });
  console.log(componyUrl);
  console.log(idProofUrl);
  console.log(formData);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    document.title = 'Add Vendor';
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

  const handleIdProof = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    // Check the file type
    const fileName = file.name.toLowerCase();
    if (!fileName.endsWith('.jpg') && !fileName.endsWith('.png')) {
      toast.error('Please select a valid JPG or PNG image.');
      e.target.value = null; // Reset the input field
      setStatusLogo(null);
      return;
    }
    setIdProofLogo(file.name);
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'imageridedost');
    data.append('cloud_name', 'dlrgh9gam');
    try {
      let response = await upload_Image(data);
      setStatusId(response.status);
      response = response?.data?.secure_url;
      setIdProofUrl(response); // Set componyUrl here
    } catch (error) {
      toast.error('An error occurred while uploading company logo');
      console.error('Error uploading company logo:', error);
    }
  };

  const handleLogo = async (e) => {
    const file = e.target.files[0];
    // console.warn(file.name);
    if (!file) {
      return;
    }

    // Check the file type
    const fileName = file.name.toLowerCase();
    if (!fileName.endsWith('.jpg') && !fileName.endsWith('.png')) {
      toast.error('Please select a valid JPG or PNG image.');
      e.target.value = null; // Reset the input field
      setStatusLogo(null);
      return;
    }
    setComLogoName(file.name);
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'imageridedost');
    data.append('cloud_name', 'dlrgh9gam');
    try {
      let response = await upload_Image(data);
      console.warn(response.status);
      setStatusLogo(response.status);
      response = response?.data?.secure_url;
      setComponyUrl(response); // Set componyUrl here
    } catch (error) {
      toast.error('An error occurred while uploading company logo');
      console.error('Error uploading company logo:', error);
    }
  };

  const handleSubmit = async (componyUrl, idProofUrl) => {
    const updatedFormData = {
      ...formData,
    };

    // Conditionally set companyLogo and id_proof if the URLs are not empty
    if (componyUrl !== '') {
      updatedFormData.companyLogo = componyUrl;
    }

    if (idProofUrl !== '') {
      updatedFormData.id_proof = idProofUrl;
    }
    console.log(updatedFormData);
    try {
      const maintoken = localStorage.getItem('auth_token');
      const role = maintoken.charAt(maintoken.length - 1);
      const token = maintoken.slice(0, -1);

      dispatch(setFetching(true));

      if (
        updatedFormData.companyLogo &&
        updatedFormData.companyName &&
        updatedFormData.companyOwner &&
        updatedFormData.email &&
        updatedFormData.id_proof &&
        updatedFormData.name &&
        updatedFormData.phoneNumber &&
        updatedFormData.presentageValue &&
        updatedFormData.thresholdvalue
      ) {
        const response = await addVendor(updatedFormData, token);
        if (response.status === 201) {
          toast.success('Vendor added Successfully');
          setComLogoName('');
          setIdProofLogo('');
        } else {
          toast.error('Vendor addition failed');
        }
        handleNext();
      } else {
        toast.warn('Please fill in all required fields');
      }

      dispatch(setFetching(false));
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('Vendor addition failed');
      toast.error(error.response.data.message);
      dispatch(setFetching(false));
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
      <div className={`tab-pane ${currentStep === stepNumber ? 'active' : ''}`}>
        {content}
      </div>
    );
  };

  const navigate = useNavigate();
  const handleReset = () => {
    setFormData({
      companyName: '',
      companyOwner: '',
      name: '',
      phoneNumber: '',
      email: '',
      presentageValue: '',
      id_proof: null,
      companyLogo: null,
      address: '',
      thresholdvalue: '',
    });
    setCurrentStep(1);
  };

  // console.log(statusLogo);
  console.warn(formData);

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
        comLogoName={comLogoName}
        idProofLogo={idProofLogo}
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
            className={`${currentStep === 2 ? 'd-none' : 'primary-button'}`}
            onClick={handleNext}
          >
            Next
          </button>
        )}
        {currentStep === 2 && statusLogo === statusId && (
          <button
            className="primary-button"
            onClick={() => handleSubmit(componyUrl, idProofUrl)}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default AddVendor;
