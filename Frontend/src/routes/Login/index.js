import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import Image from "../../assets/logo-light.svg";
// import { auth } from "../../firebase.config";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast } from "react-toastify";
import Register from "../../components/Register";
import { useDispatch } from "react-redux";
import { setMobileNumber } from "../../redux/reducer/mobileNumber";
import { setFetching } from "../../redux/reducer/fetching";
import { checkIfUserExists } from "../../Api/userApi";
import { checkIfAdminExists } from "../../Api/adminApi";
import { useNavigate } from "react-router-dom";
import { AUTH_TOKEN_KEY } from "../../constant";
import { useSelector } from "react-redux";
import { setAuthToken } from "../../redux/reducer/auth";
import { loginAdmin, loginUser } from "../../redux/reducer/role";

const Login = () => {
  const [otp, setOtp] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [user, setUser] = useState(false);
  const [inputEnable, setInputEnable] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [show, setShow] = useState(false);
  const recaptchaVerifierRef = useRef(null);
  const confirmationResultRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authToken = useSelector((state) => state.auth.authToken);

  // console.log(role.admin);
  // useEffect(() => {
  //   recaptchaVerifierRef.current = new RecaptchaVerifier(
  //     "recaptcha-container",
  //     {
  //       size: "invisible",
  //     },
  //     auth
  //   );
  // }, []);
  // console.log(authToken);

  useEffect(() => {
    document.title="Ride Dost"
    localStorage.getItem("auth_token") &&
      navigate("/dashboard", { replace: true });
  }, [navigate, authToken]);

const isIndianPhoneNumber = (phoneNumber) => {
  const regex = /^\+91[6-9]\d{9}$/;
  return regex.test(phoneNumber) && phoneNumber.length === 13;
};

const handlePhoneNumberChange = (event) => {
  const { value } = event.target;
  let phoneNumber = value.trim(); // Trim whitespace from the phone number

  // Remove any existing "+91" country code
  phoneNumber = phoneNumber.replace("+91", "");

  // Limit the phone number to 10 digits
  phoneNumber = phoneNumber.slice(0, 10);

  // Add the "+91" country code if the phone number is not empty
  const formattedPhoneNumber = phoneNumber ? `+91${phoneNumber}` : "";

  setPhoneNumber(formattedPhoneNumber);
  const isValid = isIndianPhoneNumber(formattedPhoneNumber); // Check validity with country code
  setIsValid(isValid);
};


  const handleOtpChange = (event) => {
    const { value } = event.target;
    setOtp(value);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  // const sendOTP = (phoneNumber) => {
  //   dispatch(setFetching(true));
  //   const appVerifier = recaptchaVerifierRef.current;
  //   signInWithPhoneNumber(auth, phoneNumber, appVerifier)
  //     .then((confirmationResult) => {
  //       confirmationResultRef.current = confirmationResult;
  //       dispatch(setFetching(false));
  //       toast.success("OTP sent successfully!");
  //       setInputEnable(false);
  //       setShow(true);
  //     })
  //     .catch((error) => {
  //       console.log("Firebase error:", error.message, error);
  //       dispatch(setFetching(false));
  //     });
  // };

  const onSignup = async (convertedNumber) => {
    console.warn(convertedNumber);
    // const formatPh = phoneNumber;
    // const convertedNumber = formatPh.replace("+91", "");
    dispatch(setFetching(true));
    try {
      const response = await checkIfUserExists(convertedNumber);
      console.log(response);
      if (response.status === 200) {
        toast.success("Congratulations! You have successfully logged in!");
        const authToken = response.data.token;
        localStorage.setItem(AUTH_TOKEN_KEY, authToken);
        dispatch(setAuthToken(authToken)); // Dispatch the action to update the authToken
        dispatch(loginUser(true));
        dispatch(setFetching(false));
         const maintoken = localStorage.getItem("auth_token");
        const role = maintoken?.charAt(maintoken.length - 1);
         const token = maintoken?.slice(0, -1);
         console.warn(role)

        if (authToken ) {
          navigate("/dashboard");
        }
}
    } catch (error) {
      dispatch(setFetching(false));
      setUser(true);
    }
  };

  const onLogin = async (phoneNumber) => {
    dispatch(setFetching(true));
    const formatPh = phoneNumber;
    const convertedNumber = formatPh.replace("+91", "");
    try {
      const response = await checkIfAdminExists(convertedNumber);
      if (response.status === 200) {
        toast.success("Congratulations! You have successfully logged in!");
        const authToken = response.data.token;
        localStorage.setItem(AUTH_TOKEN_KEY, authToken);
        dispatch(setAuthToken(authToken)); // Dispatch the action to update the authToken
        dispatch(loginAdmin(true));
        dispatch(setFetching(false));
        if (authToken) {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      dispatch(setMobileNumber(convertedNumber));
      onSignup(convertedNumber);
    }
  };

  // const onOTPVerify = (e) => {
  //   dispatch(setFetching(true));
  //   e.preventDefault();
  //   if (confirmationResultRef.current) {
  //     if (otp.length === 6 && /^\d+$/.test(otp)) {
  //       confirmationResultRef.current
  //         .confirm(otp)
  //         .then(async (res) => {
  //           toast.success("Mobile OTP Verified Successfully!");
  //           dispatch(setMobileNumber(phoneNumber));
  //           dispatch(setFetching(false));
  //           onLogin(phoneNumber);
  //         })
  //         .catch((err) => {
  //           toast.error("Invalid OTP. Please enter the correct code.");
  //           dispatch(setFetching(false));
  //         });
  //     } else {

  //     }
  //   } else {
  //     console.log("No confirmation result available");
  //   }
  // };

  const handleSignupClick = (e) => {
    e.preventDefault();
    // const formatPh = phoneNumber;
    // const convertedNumber = formatPh.replace("+91", "");
    // console.log(formatPh);
    // sendOTP(phoneNumber);
    
    onLogin(phoneNumber);
  };
console.warn(phoneNumber)
  return (
    <section className="form-body">
      <div className="website-logo">
        <div className="recaptcha-container" id="recaptcha-container"></div>
        <div className="logo">
          <img className="logo-size" src={Image} alt="" />
        </div>
      </div>
      <div className="row_">
        <div className="img-holder">
          <div className="bg"></div>
          <div className="info-holder"></div>
        </div>
        <div className="form-holder">
          <div className="form-content">
            <div className="login-card">
              <h3 className="welcome">Welcome to Ride Dost!</h3>
              {user ? (
                <Register phoneNumber={phoneNumber} />
              ) : (
                <>
                  <form>
                    <input
                      className="form-control_"
                      type="text"
                      name="number"
                      placeholder="Enter Phone Number"
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      disabled={!inputEnable}
                      required
                    />
                    {isFocused && !isValid && (
                      <span style={{ color: "red" }}>
                        Please enter a valid phone number.
                      </span>
                    )}
                    <input
                      className="form-control_"
                      type="number"
                      name="otp"
                      onChange={handleOtpChange}
                      placeholder="Enter OTP"
                      disabled={inputEnable}
                      required
                    />
                    <div className="form-button">
                      {show ? (
                        <button
                          id="submit"
                          type="submit"
                          className="ibtn"
                          // onClick={onOTPVerify}
                        >
                          Verify OTP
                        </button>
                      ) : (
                        <button
                          id="submit"
                          type="submit"
                          className="ibtn"
                          disabled={!isValid}
                          onClick={handleSignupClick}
                        >
                          Send OTP
                        </button>
                      )}
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
