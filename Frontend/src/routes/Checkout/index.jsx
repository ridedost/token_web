/** @format */
import React, { useEffect, useState } from 'react';
import './index.css';
import { BsCheckCircle } from 'react-icons/bs';
import { checkoutPost } from '../../Api/adminApi';
import { toast } from 'react-toastify';
import ConfirmModal from '../../components/ConfirmModal';
import { setFetching } from '../../redux/reducer/fetching';
import { useDispatch } from 'react-redux';
// import io from 'socket.io-client';
// import { sendEvent } from '../../utils/sendEvent';

const Checkout = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    amount: null,
    coupon: '',
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [isValidCoupon, setIsValidCoupon] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Checkout';
  }, []);

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: field === 'amount' ? Number(value) : value,
    }));

    // Check coupon code format as the user types
    if (field === 'coupon') {
      const couponPattern = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
      setIsValidCoupon(couponPattern.test(value) || value === '');
    }
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    const maintoken = localStorage.getItem('auth_token');
    const role = maintoken.charAt(maintoken.length - 1);
    const token = maintoken.slice(0, -1);

    // Check coupon code format one more time before submitting (optional)
    const couponPattern = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
    if (formData.coupon.trim() !== '' && !couponPattern.test(formData.coupon)) {
      setIsValidCoupon(false);
      return;
    }
    dispatch(setFetching(true));
    try {
      const response = await checkoutPost(token, formData);

      console.log(formData);
      if (role === '1') {
        if (response.status === 200) {
          console.warn(response);
          toast.success('Submit Successfully');
          // sendEvent('7987432368', 'success', 'your coupon used');
          dispatch(setFetching(false));
          setFormData({
            phoneNumber: '',
            amount: 0,
            coupon: '',
          });
          setIsValidCoupon(true);
        }
      }
      if (role === '2') {
        if (response.status === 200) {
          console.warn('after', formData.phoneNumber);
          toast.success('Submit Successfully');
          console.warn(formData.phoneNumber);
          // sendEvent('7987432368', 'success', 'your coupon used');
          dispatch(setFetching(false));
          setFormData({
            phoneNumber: '',
            amount: 0,
            coupon: '',
          });
          console.warn('before', formData.phoneNumber);
          setIsValidCoupon(true);
        }
      }
    } catch (error) {
      dispatch(setFetching(false));
      toast.error('Submit failed');
      toast.error(error.response.data.message);
    }
  };

  console.warn(isValidCoupon);
  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h3>Checkout</h3>
        <div className="break-line" style={{ marginTop: '25px' }}></div>
        <form onSubmit={handleCheckout}>
          <div className="phone-number">
            <label className="checkout-label">
              Phone Number&nbsp;<span>*</span>
            </label>
            <input
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
              value={formData.phoneNumber}
              placeholder="+91 64894 XXXX"
            />
          </div>
          <div className="mid-input-field">
            <div className="amount">
              <label className="checkout-label">
                Amount &nbsp;<span>*</span>
              </label>
              <input
                onChange={(e) => handleChange('amount', e.target.value)}
                value={formData.amount}
                placeholder="Rs"
              />
            </div>
            <div className="coupon-code">
              <label>
                Coupon Code <span>(optional)</span>
              </label>
              <input
                onChange={(e) => handleChange('coupon', e.target.value)}
                value={formData.coupon}
                placeholder="ZA09 15XXX"
              />
              {isValidCoupon && formData.coupon != '' && (
                <span>
                  <BsCheckCircle color="#32C770" fontSize={25} />
                </span>
              )}
            </div>
          </div>
          <div className="button-container">
            <button type="submit">Confirm Details</button>
            <p>
              Your personal data will be used to process your order, support
              your experience throughout this website, and for other purposes
              described in our privacy policy.
            </p>
          </div>
        </form>
      </div>
      {showConfirm ? <ConfirmModal setShowConfirm={setShowConfirm} /> : null}
    </div>
  );
};

export default Checkout;
