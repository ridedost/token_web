import React from "react";
import Thumb from "../../assets/thumb-icon.svg";
import "./index.css";
const Control = () => {
  return (
    <div className="control-container">
      <img src={Thumb} />
      <p className="bold">Control card security in-app with a tap</p>
      <p>Discover our cards benefits, with one tap.</p>
      <div className="add-product-button">
        <button className="control-button">Cards</button>
      </div>
    </div>
  );
};

export default Control;
