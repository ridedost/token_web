/** @format */

import React, { useState, useEffect } from 'react';
import './index.css';
import Camera from '../../assets/camera.svg';
import { AiFillCloseCircle } from 'react-icons/ai';
import { HiPencil } from 'react-icons/hi';
import { updateAdminInfo, getAdminInfo } from '../../Api/adminApi';
import { userUpdate, getUserInfo } from '../../Api/userApi';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileImage } from '../../redux/reducer/profileImage';
import { setFetching } from '../../redux/reducer/fetching';
import { setName } from '../../redux/reducer/name';
import { upload_Image } from '../../Api/cloudImage';

const ProfileInfo = () => {
  const [vendorInfo, setVendorInfo] = useState({});
  const [showInput, setShowInput] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    DOB: '',
    address: '',
    presentageValue: 0,
    profileImage: '',
  });

  const [editableFields, setEditableFields] = useState({
    name: false,
    gender: false,
    DOB: false,
    address: false,
    presentageValue: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    getPersonalInfo();
  }, []);

  const getPersonalInfo = async () => {
    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);
    dispatch(setFetching(true));
    try {
      if (role === '1') {
        const response = await getAdminInfo(token);
        if (response.status === 200) {
          let data = response.data.vendorInfo;
          setVendorInfo(data);
          setFormData();
          setSelectedImage(data?.profileImage?.url || null);
          setName(data?.name || null);
          dispatch(setFetching(false));
        }
      } else if (role === '2') {
        const response = await getAdminInfo(token);
        if (response.status === 200) {
          let data = response.data.vendorInfo;
          setVendorInfo(data);
          setFormData();
          setSelectedImage(data?.profileImage?.url || null);
          setName(data?.name || null);
          dispatch(setFetching(false));
        }
      }
      if (role === '3') {
        const response = await getUserInfo(token);
        if (response.status === 200) {
          let data = response.data.vendorInfo;
          setVendorInfo(data);
          setFormData();
          setSelectedImage(data?.profileImage?.url || null);
          setName(data?.name || null);
          dispatch(setFetching(false));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (field, value) => {
    // console.warn(field, value);
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const toggleEditableField = (field) => {
    setEditableFields((prevFields) => ({
      ...prevFields,
      [field]: !prevFields[field],
    }));
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    // Check if a file is selected
    if (!file) {
      return;
    }

    // Check the file type
    const fileName = file.name.toLowerCase();
    if (!fileName.endsWith('.jpg') && !fileName.endsWith('.png')) {
      toast.error('Please select a valid JPG or PNG image.');
      event.target.value = null; // Reset the input field
      setSelectedImage(null);
      return;
    }

    // setError(''); // Clear any previous error messages

    // Read and display the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload the image to a server or cloud service
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'imageridedost');
    data.append('cloud_name', 'dlrgh9gam');
    dispatch(setFetching(true));
    try {
      let response = await upload_Image(data);
      const imageUrl = response?.data?.secure_url;
      setImageUrl(imageUrl);
      dispatch(setFetching(false));
    } catch (error) {
      dispatch(setFetching(false));
      toast.error('Profile Image Upload failed');
    }
  };

  const handleFormSubmit = async (e, imageUrl) => {
    e.preventDefault();
    // console.warn(imageUrl);
    const updatedFormData = {
      ...formData,
      profileImage: imageUrl,
    };

    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);
    dispatch(setFetching(true));
    try {
      if (role === '1') {
        const response = await updateAdminInfo(token, updatedFormData);
        if (response.status === 200) {
          toast.success('Profile Update Successfully');
          dispatch(setFetching(false));
        }
        dispatch(setFetching(true));
        getPersonalInfo();
        dispatch(setFetching(false));
        setEditableFields({
          name: false,
          gender: false,
          DOB: false,
          address: false,
          presentageValue: false,
        });
      }
      if (role === '2') {
        const response = await updateAdminInfo(token, updatedFormData);
        if (response.status === 200) {
          toast.success('Profile Update Successfully');
          dispatch(setFetching(false));
        }
        dispatch(setFetching(true));
        getPersonalInfo();
        dispatch(setFetching(false));
        setEditableFields({
          name: false,
          gender: false,
          DOB: false,
          address: false,
          presentageValue: false,
        });
      }
      if (role === '3') {
        const response = await userUpdate(token, updatedFormData);
        if (response.status === 200) {
          toast.success('Profile Update Successfully');
          dispatch(setFetching(false));
        }
        dispatch(setFetching(true));
        getPersonalInfo();
        dispatch(setFetching(false));
        setEditableFields({
          name: false,
          gender: false,
          DOB: false,
          address: false,
          presentageValue: false,
        });
      }
    } catch (error) {
      toast.error('Profile Update failed');
    }
  };

  dispatch(setProfileImage(imageUrl));
  dispatch(setName(vendorInfo[0]?.name));
  console.warn(imageUrl);
  const maintoken = localStorage.getItem('auth_token');
  const role = maintoken.charAt(maintoken.length - 1);
  const token = maintoken.slice(0, -1);

  return (
    <div className="profile-box">
      <div className="profile-content-container">
        <form onSubmit={(e) => handleFormSubmit(e, imageUrl)}>
          <div className="content-container">
            <span>Personal Info</span>
            <button type="submit" className="profile-submit">
              Update
            </button>
          </div>
          <div className="content-padding-top">
            <div className="profile-content">
              <div className="profile-accordian">
                <div className="full-name">
                  <div className="name-container">
                    <span className="full-name-size">Full Name</span>
                    {editableFields.name ? (
                      <input
                        // value={formData.name || vendorInfo[0]?.name}
                        value={formData?.name}
                        defaultValue={vendorInfo[0]?.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                      />
                    ) : (
                      <span className="text-uppercase">
                        {vendorInfo[0]?.name}
                      </span>
                    )}
                  </div>
                  <span onClick={() => toggleEditableField('name')}>
                    {editableFields.name ? (
                      <AiFillCloseCircle fontSize={30} />
                    ) : (
                      <HiPencil fontSize={30} />
                    )}
                  </span>
                </div>
                <div className="break-line"></div>
                <div className="full-name">
                  <div className="name-container">
                    <span className="full-name-size">Gender</span>
                    {editableFields.gender ? (
                      <input
                        // value={formData.gender || vendorInfo[0]?.gender}
                        value={formData?.gender}
                        defaultValue={vendorInfo[0]?.gender}
                        onChange={(e) => handleChange('gender', e.target.value)}
                      />
                    ) : (
                      <span className="text-uppercase">
                        {vendorInfo[0]?.gender}
                      </span>
                    )}
                  </div>
                  <span>
                    <span onClick={() => toggleEditableField('gender')}>
                      {editableFields.gender ? (
                        <AiFillCloseCircle fontSize={30} />
                      ) : (
                        <HiPencil fontSize={30} />
                      )}
                    </span>
                  </span>
                </div>
                <div className="break-line"></div>
                <div className="full-name">
                  <div className="name-container">
                    <span className="full-name-size">Date of Birth</span>
                    {editableFields.DOB ? (
                      ''
                    ) : (
                      <span>{vendorInfo[0]?.DOB}</span>
                    )}
                  </div>
                  <span onClick={() => toggleEditableField('DOB')}>
                    {editableFields.DOB ? (
                      <AiFillCloseCircle fontSize={30} />
                    ) : (
                      <HiPencil fontSize={30} />
                    )}
                  </span>
                </div>
                <div className="date-of-birth">
                  {editableFields.DOB ? (
                    <>
                      <input
                        type="date"
                        placeholder="Date"
                        style={{ height: '45px' }}
                        // value={formData.DOB || vendorInfo[0]?.DOB}
                        value={formData?.DOB}
                        onChange={(e) => handleChange('DOB', e.target.value)}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="break-line"></div>
                <div className="full-name">
                  <div className="name-container">
                    <span className="full-name-size">Email</span>
                    <span>{vendorInfo[0]?.email}</span>
                  </div>
                </div>
                <div className="break-line"></div>
                <div className="full-name">
                  <div className="name-container">
                    <span className="full-name-size">Phone Number</span>
                    <span>
                      {vendorInfo[0]?.phoneNumber
                        ? vendorInfo[0]?.phoneNumber
                        : vendorInfo[0]?.mobile}
                    </span>
                  </div>
                </div>
                <div className="break-line"></div>
                <div className="full-name">
                  <div className="name-container">
                    <span className="full-name-size">Address</span>
                    {editableFields.address ? (
                      <input
                        // value={formData.address || vendorInfo[0]?.address}
                        value={formData?.address}
                        defaultValue={vendorInfo[0]?.address}
                        onChange={(e) =>
                          handleChange('address', e.target.value)
                        }
                      />
                    ) : (
                      <span className="text-uppercase">
                        {vendorInfo[0]?.address}
                      </span>
                    )}
                  </div>
                  <span onClick={() => toggleEditableField('address')}>
                    {editableFields.address ? (
                      <AiFillCloseCircle fontSize={30} />
                    ) : (
                      <HiPencil fontSize={30} />
                    )}
                  </span>
                </div>
                {role === '3' ? null : <div className="break-line"></div>}
                {role === '3' ? null : (
                  <div className="full-name">
                    <div className="name-container">
                      <span className="full-name-size">Percentage</span>
                      {editableFields.presentageValue ? (
                        <input
                          value={formData?.presentageValue}
                          defaultValue={vendorInfo[0]?.presentageValue}
                          onChange={(e) =>
                            handleChange('presentageValue', e.target.value)
                          }
                        />
                      ) : (
                        <span>{vendorInfo[0]?.presentageValue}</span>
                      )}
                    </div>
                    <span
                      onClick={() => toggleEditableField('presentageValue')}
                    >
                      {editableFields.presentageValue ? (
                        <AiFillCloseCircle fontSize={30} />
                      ) : (
                        <HiPencil fontSize={30} />
                      )}
                    </span>
                  </div>
                )}
              </div>
              <div className="change-pic">
                <div className="Picture">
                  <div className="icon-box">
                    {selectedImage ? (
                      <img
                        className="profile-image"
                        src={selectedImage}
                        alt="Profile Picture"
                      />
                    ) : (
                      <>
                        <img
                          className={`${
                            vendorInfo[0]?.profileImage
                              ? 'profile-image'
                              : 'camera'
                          }`}
                          src={`${
                            vendorInfo[0]?.profileImage
                              ? vendorInfo[0]?.profileImage
                              : Camera
                          }`}
                        />
                        {vendorInfo[0]?.profileImage ? null : (
                          <h5>Change picture</h5>
                        )}
                      </>
                    )}
                    <input
                      type="file"
                      onChange={handleImageChange}
                      style={{
                        display: showInput || selectedImage ? 'block' : '',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileInfo;
