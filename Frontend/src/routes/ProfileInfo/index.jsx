import React, { useState, useEffect } from "react";
import "./index.css";
import Camera from "../../assets/camera.svg";
import { AiFillCloseCircle } from "react-icons/ai";
import { HiPencil } from "react-icons/hi";

const ProfileInfo = () => {
  const [showInput, setShowInput] = useState(false);
  const [showInputName, setShowInputName] = useState(false);
  const [showInputGender, setShowInputGender] = useState(false);
  const [showInputDob, setShowInputDob] = useState(false);
  const [showInputAddress, setShowInputAddress] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    date: "",
    month: "",
    year: "",
    address: "",
    selectedImage: selectedImage,
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
      setShowInput(false);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();

    setFormData((prevData) => ({
      ...prevData,
      selectedImage: selectedImage,
    }));
  };

  useEffect(() => {
    // console.log("Form Data:", formData);
  }, [formData]);

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

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
                        value={formData.fullName}
                        onChange={(e) =>
                          handleChange("fullName", e.target.value)
                        }
                      />
                    ) : (
                      <span>Annate var(--color-black)</span>
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
                        value={formData.gender}
                        onChange={(e) => handleChange("gender", e.target.value)}
                      />
                    ) : (
                      <span>Not specified</span>
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
                    {showInputDob ? "" : <span>Not specified</span>}
                  </div>
                  <span onClick={() => setShowInputDob(!showInputDob)}>
                    {showInputDob ? (
                      <AiFillCloseCircle fontSize={30} />
                    ) : (
                      <HiPencil fontSize={30} />
                    )}
                  </span>
                </div>
                <div className="break-line"></div>
                <div className="date-of-birth">
                  {showInputDob ? (
                    <>
                      <input
                        value={formData.date}
                        onChange={(e) => handleChange("date", e.target.value)}
                      />
                      <input
                        value={formData.month}
                        onChange={(e) => handleChange("month", e.target.value)}
                      />
                      <input
                        value={formData.year}
                        onChange={(e) => handleChange("year", e.target.value)}
                      />
                    </>
                  ) : (
                    ""
                  )}
                  {/* <MonthSelect />
                  <DaySelect />
                  <YearSelect /> */}
                </div>
                <div className="full-name">
                  <div className="name-container">
                    <span className="full-name-size">Email</span>
                    <span>annatevar(--color-black)@gmail.com</span>
                  </div>
                </div>
                <div className="break-line"></div>
                <div className="full-name">
                  <div className="name-container">
                    <span className="full-name-size">Phone Number</span>
                    <span>(302)555-0107</span>
                  </div>
                </div>
                <div className="break-line"></div>
                <div className="full-name">
                  <div className="name-container">
                    <span className="full-name-size">Address</span>
                    {showInputAddress ? (
                      <input
                        value={formData.address}
                        onChange={(e) =>
                          handleChange("address", e.target.value)
                        }
                      />
                    ) : (
                      <span>Not specified</span>
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
                        <img className="camera" src={Camera} />
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
