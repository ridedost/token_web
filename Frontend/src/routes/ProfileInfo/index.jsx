import React, { useState, useEffect } from "react";
import "./index.css";
import Camera from "../../assets/camera.svg";
import { AiFillCloseCircle } from "react-icons/ai";
import { HiPencil } from "react-icons/hi";
import { updateAdminInfo, getAdminInfo } from "../../Api/adminApi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setProfileImage } from "../../redux/reducer/profileImage";
import { setFetching } from "../../redux/reducer/fetching";

const ProfileInfo = () => {
  const [vendorInfo, setVendorInfo] = useState({});
  const [showInput, setShowInput] = useState(false);
  const [showInputName, setShowInputName] = useState(false);
  const [showInputGender, setShowInputGender] = useState(false);
  const [showInputDob, setShowInputDob] = useState(false);
  const [showInputAddress, setShowInputAddress] = useState(false);
  const [showInputPercentage, setShowInputPercentage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    DOB: "",
    address: "",
    presentageValue: 0,
    profileImage: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    getPersonalInfo();
  }, []);

  const getPersonalInfo = async () => {
    const maintoken = localStorage.getItem("auth_token");
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);
    dispatch(setFetching(true));
    try {
      const response = await getAdminInfo(token);

      if (response.status === 200) {
        const data = response.data.vendorInfo;
        setVendorInfo(data);
        setFormData({
          name: data.name,
          gender: data.gender,
          DOB: data.DOB,
          address: data.address,
          presentageValue: data.presentageValue,
          profileImage: data.selectedImage,
        });
        setSelectedImage(data?.profileImage?.url || null);
        dispatch(setFetching(false));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    console.warn(selectedImage);
    const updatedFormData = {
      ...formData,
      profileImage: selectedImage,
    };

    const maintoken = localStorage.getItem("auth_token");
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);
    dispatch(setFetching(true));
    try {
      const response = await updateAdminInfo(token, updatedFormData);

      if (response.status === 200) {
        toast.success("Profile Update Successfully");
        dispatch(setFetching(false));
      }
      dispatch(setFetching(true));
      getPersonalInfo();
      dispatch(setFetching(false));
    } catch (error) {
      toast.error("Profile Update failed");
    }
  };

  dispatch(setProfileImage(vendorInfo[0]?.profileImage?.url));
  console.warn(vendorInfo[0]?.profileImage);
  return (
    <div className="profile-box">
      <div className="profile-content-container">
        <form onSubmit={handleProfileSubmit}>
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
                    {showInputName ? (
                      <input
                        value={vendorInfo[0]?.name || formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                      />
                    ) : (
                      <span className="text-uppercase">
                        {vendorInfo[0]?.name}
                      </span>
                    )}
                  </div>
                  <span onClick={() => setShowInputName(!showInputName)}>
                    {showInputName ? (
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
                    {showInputGender ? (
                      <input
                        value={vendorInfo[0]?.gender || formData.gender}
                        onChange={(e) => handleChange("gender", e.target.value)}
                      />
                    ) : (
                      <span className="text-uppercase">
                        {vendorInfo[0]?.gender}
                      </span>
                    )}
                  </div>
                  <span>
                    <span onClick={() => setShowInputGender(!showInputGender)}>
                      {showInputGender ? (
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
                    {showInputDob ? "" : <span>{vendorInfo[0]?.DOB}</span>}
                  </div>
                  <span onClick={() => setShowInputDob(!showInputDob)}>
                    {showInputDob ? (
                      <AiFillCloseCircle fontSize={30} />
                    ) : (
                      <HiPencil fontSize={30} />
                    )}
                  </span>
                </div>
                <div className="date-of-birth">
                  {showInputDob ? (
                    <>
                      <input
                        type="date"
                        placeholder="Date"
                        style={{ height: "45px" }}
                        value={vendorInfo[0]?.address || formData.DOB}
                        onChange={(e) => handleChange("DOB", e.target.value)}
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
                    <span>{vendorInfo[0]?.phoneNumber}</span>
                  </div>
                </div>
                <div className="break-line"></div>
                <div className="full-name">
                  <div className="name-container">
                    <span className="full-name-size">Address</span>
                    {showInputAddress ? (
                      <input
                        value={vendorInfo[0]?.address || formData.address}
                        onChange={(e) =>
                          handleChange("address", e.target.value)
                        }
                      />
                    ) : (
                      <span className="text-uppercase">
                        {vendorInfo[0]?.address}
                      </span>
                    )}
                  </div>
                  <span onClick={() => setShowInputAddress(!showInputAddress)}>
                    {showInputAddress ? (
                      <AiFillCloseCircle fontSize={30} />
                    ) : (
                      <HiPencil fontSize={30} />
                    )}
                  </span>
                </div>
                <div className="break-line"></div>
                <div className="full-name">
                  <div className="name-container">
                    <span className="full-name-size">Percentage</span>
                    {showInputPercentage ? (
                      <input
                        value={
                          vendorInfo[0]?.presentageValue ||
                          formData.presentageValue
                        }
                        onChange={(e) =>
                          handleChange("presentageValue", e.target.value)
                        }
                      />
                    ) : (
                      <span>{vendorInfo[0]?.presentageValue}</span>
                    )}
                  </div>
                  <span
                    onClick={() => setShowInputPercentage(!showInputPercentage)}
                  >
                    {showInputPercentage ? (
                      <AiFillCloseCircle fontSize={30} />
                    ) : (
                      <HiPencil fontSize={30} />
                    )}
                  </span>
                </div>
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
                            vendorInfo[0]?.profileImage?.url
                              ? "profile-image"
                              : "camera"
                          }`}
                          src={`${
                            vendorInfo[0]?.profileImage?.url
                              ? vendorInfo[0]?.profileImage?.url
                              : Camera
                          }`}
                        />

                        <h5>Change picture</h5>
                      </>
                    )}
                    <input
                      type="file"
                      onChange={handleImageChange}
                      style={{
                        display: showInput || selectedImage ? "block" : "",
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
