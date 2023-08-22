import React, { useEffect } from "react";
import "./index.css";
import { BsCheckCircle } from "react-icons/bs";

const Checkout = () => {
  useEffect(() => {
    document.title = "Checkout";
  }, []);

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h3>Checkout</h3>
        <div className="break-line" style={{ marginTop: "25px" }}></div>
        <form>
          <div className="phone-number">
            <label>Phone Number</label>
            <input placeholder="+91 64894 XXXX" />
          </div>
          <div className="mid-input-field">
            <div className="amount">
              <label>Amount</label>
              <input placeholder="4800 Rs" />
            </div>
            <div className="coupon-code">
              <label>
                Coupon Code <span>(optional)</span>
              </label>
              <input placeholder="ZA09 15XXX" />
              <span>
                <BsCheckCircle color="#32C770" fontSize={25} />
              </span>
            </div>
          </div>
          <div className="button-container">
            <button>Confirm Details</button>
            <p>
              Your personal data will be used to process your order, support
              your experience throughout this website, and for other purposes
              described in our privacy policy.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
