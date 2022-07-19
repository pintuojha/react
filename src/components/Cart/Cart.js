import React, { useState, useEffect } from 'react';
import ErrorDiv from '../Communication/ErrorDiv';
import MessageDiv from '../Communication/MessageDiv';
import moment from 'moment';
import {Link} from 'react-router-dom'

const Cart = (props) => {
  const yearList = [
    '2021',
    '2022',
    '2023',
    '2024',
    '2025',
    '2026',
    '2027',
    '2028',
    '2029',
  ];
  const monthList = [];
  for (var i = 1; i < 13; i++) {
    monthList.push(i);
  }
  const dayList = [];
  for (var i = 1; i < 32; i++) {
    dayList.push(i);
  }
  const [isError, setIsError] = useState(false);
  const [errorContent, setErrorContent] = useState('');
  const [hasMessage, setHasMessage] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [dayOfExpiry, setDayOfExpiry] = useState(dayList[0]);
  const [monthOfExpiry, setMonthOfExpiry] = useState(monthList[0]);
  const [yearOfExpiry, setYearOfExpiry] = useState(yearList[0]);
  const [CVV, setCVV] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [email, setEmail] = useState('');
  const [shouldShowPopup, setShouldShowPopup] = useState(false);
  const [OTP, setOTP] = useState('');
  const [isOTPWrong, setIsOTPWrong] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const SuccessComponent = () => {
    return (
      <>
        <img src="https://svgur.com/i/9t4.svg" style={{height:"50px",width:"50px",margin:"0 auto"}}alt="Success"></img>
        <h5>Order placed successfully</h5>
        <Link
          className="button"
          style={{
            padding: '0.5rem 1rem',
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            background: '#000',
            color: '#fff',
            width: 'fit-content',
          }}
          to="/"
        >
          Back to products
        </Link>
      </>
    );
  };

  const handleSubmit = async (e) => {

    /*
      Write code here to validate the following according to the given conditions

      1. CardNumber should be of 16 digits.
      2. CVV should 123
      3. The date of expiry should be after the current date (your code should not hardcode any date).
      
      Also, in case any of the above validation fail you must show the ErrorDiv component
      in Communication folder, to show your error message, the error message can be any valid statment.

      If all the validations are successfull, you must show the Popup component written below.
    */
   
  };

  const validateOTP = () => {
    /*
      Write code here to check if the OTP endered in the popup is equal to 123456
      If it is wrong set isOTPWrong to true else set isSuccess to true.
    */
  };

  const Popup = () => {
    return (
      <div id="popup" className="popup">
        <div className="overlay"></div>
        <div className="content">
          {isSuccess && <SuccessComponent />}
          {!isSuccess && (
            <>
              <div
                className="close-btn"
                onClick={() => {setShouldShowPopup(false);setIsOTPWrong(false);setOTP('')}}
              >
                &times;
              </div>
              <h3>ENTER OTP</h3>
              <input
                className="input"
                required
                autoFocus
                type="text"
                id="OTP"
                name="OTP"
                value={OTP}
                onChange={(e) => setOTP(e.target.value)}
              />
              {isOTPWrong && (
                <div
                  id="error"
                  className="error"
                  style={{
                    width: 'fit-content',
                    background: 'white',
                    height: 'fit-content',
                    color: 'white',
                    marginBottom: '0rem',
                  }}
                >
                  <h4 style={{ textTransform: 'none', color: '#e57373' }}>
                    Wrong OTP!
                  </h4>
                </div>
              )}
              <div
                className="button"
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  background: '#000',
                  color: '#fff',
                  width: 'fit-content',
                }}
                onClick={validateOTP}
              >
                validate otp
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <article className="container">
        <form className="form" onSubmit={handleSubmit}>
          <br></br>
          <img
            style={{ height: '5rem', width: '5rem' }}
            src={
              'https://images.vexels.com/media/users/3/200097/isolated/preview/942820836246f08c2d6be20a45a84139-shopping-cart-icon-shopping-cart-by-vexels.png'
            }
          ></img>
          <div
            style={{
              textTransform: 'uppercase',
              fontSize: '20px',
              fontWeight: 'bold',
            }}
          >
            Cart
          </div>
          <br></br>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <div className="form-control">
              <label className="text">Product Name</label>
              <input
                readOnly={true}
                type="text"
                id="productName"
                name="productName"
                value={props.location.state.name}
              />
            </div>
            <div className="form-control">
              <label className="text">Price</label>
              <input
                readOnly={true}
                type="text"
                id="price"
                name="price"
                value={"$"+props.location.state.price}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <div className="form-control">
              <label className="text">First Name</label>
              <input
                required
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="text">Last Name</label>
              <input
                required
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="form-control">
            <label className="text">Card Number</label>
            <input
              required
              type="number"
              id="cardNumber"
              name="cardNumber"
              value={cardNumber}
              placeholder="16 digits card number"
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <div className="date">
              <label className="text">Date of Expiry</label>

              <select
                id="day"
                className="dropdown"
                value={dayOfExpiry}
                onChange={(e) => setDayOfExpiry(e.target.value)}
              >
                {dayList.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <div></div>
              <select
                id="month"
                className="dropdown"
                value={monthOfExpiry}
                onChange={(e) => setMonthOfExpiry(e.target.value)}
              >
                {monthList.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>

              <div></div>
              <select
                id="year"
                className="dropdown"
                value={yearOfExpiry}
                onChange={(e) => setYearOfExpiry(e.target.value)}
              >
                {yearList.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="text">CVV</label>
              <input
                required
                type="number"
                placeholder="123 is the only valid CVV" 
                id="CVV"
                name="CVV"
                value={CVV}
                onChange={(e) => setCVV(e.target.value)}
              />
            </div>
          </div>
          <div className="form-control">
            <label className="text">Street Address</label>
            <input
              required
              type="text"
              id="streetAddress"
              name="streetAddress"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <div className="form-control">
              <label className="text">City</label>
              <input
                required
                type="text"
                id="city"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="text">ZIP Code</label>
              <input
                required
                type="text"
                id="zipCode"
                name="zipCode"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>
          </div>
          <div className="form-control">
            <label className="text">Email</label>
            <input
              required
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              background: '#000',
            }}
          >
            send otp
          </button>
          <br></br>
          <br></br>
        </form>
      </article>
      {hasMessage && <MessageDiv messageText={messageContent} width="700px" />}
      {isError && <ErrorDiv errorText={errorContent} width="700px" />}
      {shouldShowPopup && <Popup />}
    </>
  );
};

export default Cart;
