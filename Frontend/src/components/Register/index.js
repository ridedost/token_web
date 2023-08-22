import React, { useState } from "react";
import { useSelector } from "react-redux";
import { registerUser } from "../../Api/userApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFetching } from "../../redux/reducer/fetching";
import { AUTH_TOKEN_KEY } from "../../constant";
import { toast } from "react-toastify";

const Register = () => {
  const mobileNumber = useSelector((state) => state.mobileNumber.number);
  // console.log(mobileNumber);
  const convertedNumber = mobileNumber.replace("+91", "");
  const [user, setUser] = useState({
    mobile: "",
    name: "",
    DOB: "",
    email: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUserData = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(setFetching(true));
    const dobParts = user.DOB.split("-");
    const day = dobParts[0];
    const month = dobParts[1];
    const year = dobParts[2];
    const DOB = `${day}-${month}-${year}`;
    const mobile = convertedNumber;
    // Create a new object with the updated user data
    const updatedUser = { ...user, mobile, DOB };
    // Perform the registration logic with the updated user data
    // Reset the form after registration
    setUser({ mobile: "", name: "", DOB: "", email: "" });
    registerUser(updatedUser)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          toast.success("User successfully created!");
          const authToken = response.data.token;
          localStorage.setItem(AUTH_TOKEN_KEY, authToken);
          if (authToken) {
            navigate("/dashboard");
          }
          dispatch(setFetching(false));
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("User already exists!");
        dispatch(setFetching(false));
      });
    // Print the updated user data
    console.log(updatedUser);
  };

  // console.log(user);
  return (
    <div className=" ">
      {/* <h3 className="welcome">Welcome to Ride Dost!</h3> */}
      <form onSubmit={handleRegister}>
        <input
          className="form-control_"
          type="text"
          name="name"
          placeholder="Enter Username"
          value={user.name}
          onChange={getUserData}
          required
        />
        <input
          className="form-control_"
          type="email"
          name="email"
          placeholder="Enter Email"
          value={user.email}
          onChange={getUserData}
          required
        />
        <input
          className="form-control_"
          type="text"
          name="DOB"
          placeholder="Enter Date of Birth (DD-MM-YYYY)"
          value={user.DOB}
          onChange={getUserData}
          required
        />
        <input
          className="form-control_"
          type="text"
          name="number"
          placeholder="Enter Phone Number"
          defaultValue={mobileNumber}
          disabled={true}
          required
        />

        <div className="form-button">
          <button id="submit" type="submit" className="ibtn">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
