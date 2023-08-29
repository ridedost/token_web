import React from "react";
import "./index.css";
import Check from "../../assets/check-green.svg";
import { AiFillCloseCircle } from "react-icons/ai";
const ConfirmModal = ({ setShowConfirm }) => {
  return (
    <div className="modal">
      <div className="modal-content modal-confirm">
        <span className="cancle-modal" onClick={() => setShowConfirm(false)}>
          <AiFillCloseCircle fontSize={40} />
        </span>
        <div className="confirm-modal">
          <div className="check-logo">
            <img src={Check} />
          </div>
          <div className="confirm-text" style={{ paddingLeft: "30px" }}>
            <h4>Sure you want to accept?</h4>
            <p>Are you sure you want to accept this?</p>
          </div>
        </div>
        <button
          onClick={() => setShowConfirm(false)}
          className="save-button"
          style={{ height: "55px" }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
