/** @format */

import React from 'react';
import './index.css';
import { FaUsers } from 'react-icons/fa';
import { LuLayers, LuTag, LuBriefcase } from 'react-icons/lu';
import GraphVendor from '../../assets/graph-vendor.svg';
import VectorPoints from '../../assets/header/vector-points.svg';
import SalesGraph from '../../assets/sales-graph.svg';
import Bars_3 from '../../assets/bars/bars_3.svg';
import Bars_4 from '../../assets/bars/bars_4.svg';
import Bars_5 from '../../assets/bars/bars_5.svg';
import Bars_6 from '../../assets/bars/bars_6.svg';
import Bars_7 from '../../assets/bars/bars_7.svg';
import VendorsGroup from '../../assets/vendors-group.svg';

const Cards = ({ totalCoupons, totalVendors, max, data, sales }) => {
  const dataPoints = [70, 50, 90, 30, 60];
  return (
    <React.Fragment>
      {/* <div className="cards-container" style={{ marginTop: "25px" }}>
        <div className="cards-grid">
          {data?.map((item, index) => (
            <div className="cards" key={index}>
              <div className="cards-content">
                <h3 className="cards-title">{item.title}</h3>
                <p className="cards-value">{item.value}</p>
              </div>
              <div className="cards-icon">{item.icon}</div>
            </div>
          ))}
          <div className="cards">
            <div className="cards-para-div">
              <span className="cards-para">Coupons</sapn>
            </div>
            <div className="cards-numbers">
              <span className="cards-value">158.7</span>
            </div>
            <div className="coupons-container">
              <img src={Bars_3} />
              <img src={Bars_4} />
              <img src={Bars_5} />
              <img src={Bars_6} />
              <img src={Bars_7} />
            </div>
          </div>
          <div className="cards-vendors">
            <div className="vendors-flex">
              <div className="vendors-container">
                <img src={VendorsGroup} />
              </div>
              <div className="cards-para-div">
                <span className="cards-para">New Vendors</sapn>
                <div className="cards-numbers">
                  <span className="cards-value">1,587</span>
                </div>
              </div>
              <div className="graph-zigzag">
                <img src={GraphVendor} />
              </div>
            </div>
          </div>
          <div className="cards-points">
            <div className="points-flex">
              <div className="points-container">
                <img src={VectorPoints} />
              </div>
              <div className="cards-para-div">
                <span className="cards-para">Points</sapn>
                <div className="cards-numbers">
                  <span className="cards-value">RD 350.40</span>
                </div>
              </div>
            </div>
          </div>
          <div className="cards-sales">
            <div className="points-flex">
              <div className="cards-para-div">
                <span className="sales-para">Sales</sapn>
                <div className="cards-numbers">
                  <span className="cards-value">$540.50</span>
                </div>
                <div className="graph-zigzag-sales">
                  <img src={SalesGraph} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div id="div6" className="grid-col">
        <div className="cards">
          <div className="cards-para-div">
            <span className="cards-para">Coupons</span>
          </div>
          <div className="cards-numbers">
            <span className="cards-value">{totalCoupons || 0}</span>
          </div>
          <div className="coupons-container">
            <img src={Bars_3} />
            <img src={Bars_4} />
            <img src={Bars_5} />
            <img src={Bars_6} />
            <img src={Bars_7} />
          </div>
        </div>
      </div>
      <div id="div7" className="grid-col">
        <div className="cards-vendors">
          <div className="vendors-flex">
            <div className="vendors-container">
              <img src={VendorsGroup} />
            </div>
            <div className="cards-para-div">
              <span className="cards-para">New Vendors</span>
              <div className="cards-numbers">
                <span className="cards-value">{totalVendors || 0}</span>
              </div>
            </div>
            <div className="graph-zigzag">
              <img src={GraphVendor} />
            </div>
          </div>
        </div>
      </div>
      <div id="div8" className="grid-col">
        <div className="cards-points">
          <div className="points-flex">
            <div className="points-container">
              <img src={VectorPoints} />
            </div>
            <div className="cards-para-div">
              <span className="cards-para">Points</span>
              <div className="cards-numbers">
                <span className="cards-value">
                  RD {max.toString().slice(0, 5) || 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="div9" className="grid-col">
        <div className="cards-sales">
          <div className="points-flex">
            <div className="cards-para-div">
              <span className="sales-para">Sales</span>
              <div className="cards-numbers">
                <span className="cards-value">
                  ₹{sales.toString().slice(0, 5) || 0}
                </span>
              </div>
              <div className="graph-zigzag-sales">
                <img src={SalesGraph} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Cards;
