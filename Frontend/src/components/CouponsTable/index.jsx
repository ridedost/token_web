/** @format */

import React, { useEffect, useState } from 'react';
import { getAllVendors } from '../../Api/adminApi';
import { vendorsList } from '../../Api/userApi';

import './index.css';
import { setFetching } from '../../redux/reducer/fetching';
import { useDispatch } from 'react-redux';
import User from '../../assets/header/user.svg';
import RightArrow from '../../assets/right-arrow-vector.svg';
import ProfileImg from '../../assets/header/user.svg';
import Bar from '../../assets/vertical-bar.svg';
import RedBar from '../../assets/bars/bar-red.svg';
import { AiOutlineMail } from 'react-icons/ai';
import ViewAllVendorsPoupop from '../ViewAllVendorsPoupop';

const CouponsTable = ({ coupons, fetchAllCouponsList }) => {
  return (
    <React.Fragment>
      <div className="list-heading">
        <h3>Coupon</h3>
        <div onClick={fetchAllCouponsList} className="view-all-list">
          <h6>View All</h6>
          <img src={RightArrow} />
        </div>
      </div>
      <section className="vendors-list-data">
        {coupons?.length > 0
          ? coupons?.slice(0, 3).map((coupon, index) => (
              <div className="vendors-all-list alignItems" key={index}>
                <img src={Bar} height={61} />
                {/* <img src={RedBar} height={61} /> */}
                <div className="vendors-list">
                  <h4>{coupon.couponCode}</h4>
                  <div className="contact">
                    <span>{coupon.userName}</span> <span>.</span>
                    <span>
                      &nbsp;{coupon.point.toString().slice(0, 3)} points
                    </span>
                  </div>
                </div>
                {coupon?.status == 'redeem' ? (
                  <div className="redeemed">
                    <h5>REDEEMED</h5>
                  </div>
                ) : null}
                {/* <div className="expire">
                    <h5>EXPIRED</h5>
                  </div> */}
              </div>
            ))
          : ''}
      </section>
    </React.Fragment>
  );
};

export default CouponsTable;
