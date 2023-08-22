import React from "react";
import "./index.css";
const YearSelect = () => {
  const yearStart = 1940;
  const yearEnd = new Date().getFullYear(); // current year
  const yearSelected = 1992;

  const handleChange = (event) => {
    const selectedYear = event.target.value;
    // Add your logic here for handling the selected year, if needed
    console.log("Selected year:", selectedYear);
  };

  const renderOptions = () => {
    const options = [];
    options.push(
      <option key="default" value="">
        Year
      </option>
    ); // first option

    for (let i = yearStart; i <= yearEnd; i++) {
      const selected = i === yearSelected ? true : false;
      options.push(
        <option key={i} value={i} selected={selected}>
          {i}
        </option>
      );
    }

    return options;
  };

  return (
    <select id="year" name="year" onChange={handleChange}>
      {renderOptions()}
    </select>
  );
};

export default YearSelect;
