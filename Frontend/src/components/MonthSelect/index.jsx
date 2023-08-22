import React from "react";
import "./index.css";

const MonthSelect = () => {
  const month_selected = new Date().getMonth() + 1; // current month (0-indexed)
  let option = "";
  let month = "";
  option = '<option value="">Month</option>'; // first option

  for (let i = 1; i <= 12; i++) {
    // value month number adding 0. 01 02 03 04..
    month = i <= 9 ? "0" + i : i;

    let selected = i === month_selected ? " selected" : "";
    option +=
      '<option value="' + month + '"' + selected + ">" + month + "</option>";
  }

  return (
    <select
      id="month"
      name="month"
      dangerouslySetInnerHTML={{ __html: option }}
    />
  );
};

export default MonthSelect;
