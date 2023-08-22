import React from "react";
import "./index.css";
import VectorPoints from "../../assets/header/vector-points.svg";

const Amcharts = ({ data, maxObject, sum }) => {
  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <div className="bar-charts">
      <div className="bar-heading">
        <div className="bar-text">
          <p>Total Spent</p>
          <h3 className="">${sum}</h3>
        </div>
        <div className="points-container" style={{ borderRadius: "14px" }}>
          <img src={VectorPoints} alt="Vector Points" />
        </div>
      </div>
      <div className="bar-dotted-line">
        <p>${maxObject.value}</p>
      </div>
      <div className="bar-chart">
        {data.map((item) => (
          <div
            className={`bar ${item === maxObject ? "max-bar" : ""}`}
            key={item.label}
            style={{ height: `${(item.value / maxValue) * 100}%` }}
          >
            <div className="bar-label">{item.label}</div>
            <div className="bar-value">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Amcharts;
