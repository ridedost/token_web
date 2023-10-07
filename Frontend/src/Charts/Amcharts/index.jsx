/** @format */

import React from 'react';
import './index.css';
import VectorPoints from '../../assets/header/vector-points.svg';

const Amcharts = ({ data, maxObject, sum, setSales }) => {
  const maxValue = Math?.max(...data.map((item) => item?.value));
  console.warn(maxValue);
  setSales(maxValue);
  console.warn(data);
  console.warn(maxObject);
  console.warn(sum);
  console.warn(maxValue);

  return (
    <div className="bar-charts">
      <div className="bar-heading">
        <div className="bar-text">
          <p>Total Spent</p>
          <h3 className="">
            ₹
            {sum ? sum.toString().slice(0, 5) : maxValue.toString().slice(0, 5)}
          </h3>
        </div>
        <div className="points-container" style={{ borderRadius: '14px' }}>
          <img src={VectorPoints} alt="Vector Points" />
        </div>
      </div>
      <div className="bar-dotted-line">
        <p>
          ₹
          {maxObject?.value
            ? maxObject?.value.toString().slice(0, 5)
            : maxValue.toString().slice(0, 5)}
        </p>
      </div>
      <div className="bar-chart">
        {data.map((item) => (
          <div
            className={`bar ${item === maxObject || maxValue ? 'max-bar' : ''}`}
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
