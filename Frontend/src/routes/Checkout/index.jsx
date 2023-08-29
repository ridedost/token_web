import React, { useEffect, useState } from "react";
import "./index.css";
import { BsCheckCircle } from "react-icons/bs";
import { checkoutPost } from "../../Api/adminApi";
import { toast } from "react-toastify";
import ConfirmModal from "../../components/ConfirmModal";
const Checkout = () => {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    amount: 0,
    coupon: "",
  });

  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    document.title = "Checkout";
  }, []);

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: field === "amount" ? Number(value) : value,
    }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    const maintoken = localStorage.getItem("auth_token");
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    try {
      const response = await checkoutPost(token, formData);

      if (response.status === 200) {
        toast.success("Submit Successfully");
      }
    } catch (error) {
      toast.error("Submit failed");
    }
    // setShowConfirm(true);
    // console.log(formData);
  };
  // console.warn(formData);
  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h3>Checkout</h3>
        <div className="break-line" style={{ marginTop: "25px" }}></div>
        <form onSubmit={handleCheckout}>
          <div className="phone-number">
            <label>Phone Number</label>
            <input
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              placeholder="+91 64894 XXXX"
            />
          </div>
          <div className="mid-input-field">
            <div className="amount">
              <label>Amount</label>
              <input
                onChange={(e) => handleChange("amount", e.target.value)}
                placeholder="4800 Rs"
              />
            </div>
            <div className="coupon-code">
              <label>
                Coupon Code <span>(optional)</span>
              </label>
              <input
                onChange={(e) => handleChange("coupon", e.target.value)}
                placeholder="ZA09 15XXX"
              />
              <span>
                <BsCheckCircle color="#32C770" fontSize={25} />
              </span>
            </div>
          </div>
          <div className="button-container">
            <button type="submit">Confirm Details</button>
            <p>
              Your personal data will be used to process your order, support
              your experience throughout this website, and for other purposes
              described in our privacy policy.
            </p>
          </div>
        </form>
      </div>
      {showConfirm ? <ConfirmModal setShowConfirm={setShowConfirm} /> : null}
    </div>
  );
};

export default Checkout;
