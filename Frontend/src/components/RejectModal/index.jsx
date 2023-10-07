/** @format */

import React, { useState } from 'react';
import Check from '../../assets/check-green.svg';
import { AiFillCloseCircle } from 'react-icons/ai';
import { setFetching } from '../../redux/reducer/fetching';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { vendorReject } from '../../Api/adminApi';

const RejectModal = ({ setShowReject, rejectId }) => {
  const [reject_region, setReject_Region] = useState('');

  const dispatch = useDispatch();

  const handleReject = async (id, reject_region) => {
    console.log(id);
    setShowReject(true);
    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);
    dispatch(setFetching(true));

    const data = {
      reject_region: reject_region,
    };

    try {
      if (role === '1') {
        const response = await vendorReject(id, data, token);
        if (response.status === 200) {
          setShowReject(false);
          dispatch(setFetching(false));
          toast.success('Request Rejected !');
        }
      } else if (role === '2') {
        const response = await vendorReject(id, data, token);
        if (response.status === 200) {
          setShowReject(false);
          dispatch(setFetching(false));
          toast.success('Request Rejected !');
        }
      }
    } catch (error) {
      dispatch(setFetching(false));
      toast.error('Request Not Rejected!');
    }
    // Handle the approval logic here
  };
  console.warn(reject_region);
  return (
    <div className="modal">
      <div className="modal-content  modal-height">
        <span className="cancle-modal" onClick={() => setShowReject(false)}>
          <AiFillCloseCircle fontSize={40} />
        </span>
        <div className="confirm-modal">
          <div className="check-logo">
            <img src={Check} />
          </div>
          <div className="confirm-text" style={{ paddingLeft: '30px' }}>
            <h4>Sure you want to reject?</h4>
            <p>Are you sure you want to reject this?</p>
          </div>
        </div>
        <input
          type="text"
          placeholder="Reason for reject"
          value={reject_region}
          onChange={(e) => setReject_Region(e.target.value)}
          style={{ height: '80px', marginBottom: '25px' }}
        />
        <button
          onClick={() => handleReject(rejectId, reject_region)}
          className="save-button"
          style={{ height: '55px' }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default RejectModal;
