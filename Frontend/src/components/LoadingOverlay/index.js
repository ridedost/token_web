import React from "react";

import "./index.css";

export default ({ show = true, key = Math.random() * 1000 }) => {
  return (
    <section
      style={{ display: show ? "block" : "none" }}
      className="loader-container"
    >
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </section>
  );
};
