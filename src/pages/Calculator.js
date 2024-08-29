import React, { useState, useEffect } from 'react';
import '../css/MortgageCalculator.css'; // Import CSS for styling
import { useCurrency } from "../CurrencyContext";
import PhoneInput from "react-phone-input-2";
import axios from "axios";

const formatPropertyPrice = (price) => {
  if (!price) return '';
  let formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (price >= 1000000) return (price / 1000000).toFixed(2) + 'M';
  if (price >= 1000) return (price / 1000).toFixed(2) + 'K';
  return formattedPrice;
};

const parsePropertyPrice = (price) => {
  if (typeof price === 'string') {
    price = price.replace(/,/g, '');
    const lastChar = price.slice(-1);
    const numericPart = parseFloat(price.slice(0, -1));

    switch (lastChar) {
      case 'K':
        return numericPart * 1000;
      case 'M':
        return numericPart * 1000000;
      default:
        return parseFloat(price);
    }
  }
  return parseFloat(price);
};

const MortgageCalculator = ({ fprice }) => {
  const { currency, convertAmount, convertBackAmount } = useCurrency();
  const [propertyPrice, setPropertyPrice] = useState(parsePropertyPrice(fprice));
  const [propertyPriceInput, setPropertyPriceInput] = useState(convertAmount(parsePropertyPrice(fprice)));
  const [depositAmount, setDepositAmount] = useState('');
  const [mortgagePeriod, setMortgagePeriod] = useState('5');
  const [interestRate, setInterestRate] = useState('5'); // Default interest rate of 5%
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State for controlling popup visibility
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const parsedPrice = parsePropertyPrice(fprice);
    setPropertyPrice(parsedPrice);
    setPropertyPriceInput(convertAmount(parsedPrice));
  }, [fprice, convertAmount]);

  useEffect(() => {
    if (propertyPrice) {
      let defaultDeposit = parseFloat(propertyPrice) * 0.1; // 10% deposit
      setDepositAmount(defaultDeposit.toFixed(2));
    }
  }, [propertyPrice]);

  const handlePropertyPriceChange = (e) => {
    const input = e.target.value;
    setPropertyPriceInput(input);
    const parsedPrice = parsePropertyPrice(convertBackAmount(input));
    setPropertyPrice(parsedPrice);
    if (parsedPrice) {
      let newDeposit = parsedPrice * 0.1;
      setDepositAmount(newDeposit.toFixed(2));
    }
  };

  const calculateMonthlyPayment = () => {
    let periodYears = parseInt(mortgagePeriod);
    if (periodYears < 5) periodYears = 5;
    if (periodYears > 30) periodYears = 30;
    let totalMonths = periodYears * 12;

    let principal = parseFloat(propertyPrice) - parseFloat(depositAmount);
    let monthlyRate = parseFloat(interestRate) / 100 / 12;

    let monthlyPaymentValue =
      (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalMonths));
    setMonthlyPayment(monthlyPaymentValue.toFixed(2));
    setShowPopup(true);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const [title, setTitle] = useState('esrdhtfyg');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !msg) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/calculatorFrom', {
        name,
        email,
        phone,
        msg,
        title
      });

      setSuccess('Thanks for your response. We will reach you shortly.');
      setError('');
    } catch (error) {
      setError('Error submitting form. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="mortgage-calculator">
      <h2 style={{color:"black"}}>Mortgage Calculator</h2>
      <br />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          calculateMonthlyPayment();
        }}
        className="calculator-form"
      >
        <div className="row">
          <div className="col-md-3 col-12 mb-3">
            <label>Property Price<br></br> ({currency}):</label>
            <div className="input-with-currency">
              <input
                type="text"
                className="form-control"
                value={propertyPriceInput}
                onChange={handlePropertyPriceChange}
                disabled // Disable input for user
                required
              />
            </div>
          </div>

          <div className="col-md-3 col-12 mb-3">
            <label>Deposit <br></br>({currency}):</label>
            <input
              type="text"
              className="form-control"
              value={convertAmount(depositAmount)}
              onChange={depositAmount}
              disabled // Disable input for user
              required
            />
          </div>

          <div className="col-md-3 col-12 mb-3">
            <label>Mortgage Period <br></br>(years):</label>
            <input
              type="number"
              className="form-control"
              value={mortgagePeriod}
              onChange={(e) => setMortgagePeriod(e.target.value)}
              min="5"
              max="30"
              required
            />
          </div>

          <div className="col-md-3 col-12 mb-3">
            <label>Interest Rate <br></br>(%):</label>
            <input
              type="number"
              className="form-control"
              step="0.01"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block mt-4"
          style={{ backgroundColor: '#2c378f', borderRadius: '6px' }}
        >
          Calculate Payment Now
        </button>
      </form>

      {showPopup && (
        <div className="popup-form">
          <div className="popup-content">
            <button className="close-popup" onClick={togglePopup}>×</button>
            <div className='row'>
              <h3 className='col-md-7'>Monthly Payment:</h3>
            </div>
            <h5 className='col-md-3'>{currency} {convertAmount(monthlyPayment)}</h5>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input type="text" className="form-control" required value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input type="email" className="form-control" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Phone:</label>
                <PhoneInput
                  className="phone-input"
                  country={"us"}
                  required
                  value={phone}
                  onChange={(phone) => setPhone(phone)}
                />
              </div>
              <div className="form-group">
                <label>Message:</label>
                <textarea className="form-control" rows="3" required value={msg} onChange={(e) => setMsg(e.target.value)}></textarea>
              </div>
              
              <button type="submit" className="btn" style={{backgroundColor:"#2c378f",color:"white"}}>
                Submit
              </button>
            </form>

            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default MortgageCalculator;
