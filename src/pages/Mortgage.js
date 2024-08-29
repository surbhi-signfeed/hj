import React, { useState, useEffect } from "react";
import Calculator from "./Calculator";
import Footer from '../component/Footer'
import FilterNav from '../component/FilterNav';
import NavToAll from '../component/NavToAll';
import PhoneInput from "react-phone-input-2";
import { useCurrency } from "../CurrencyContext";
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { Helmet } from "react-helmet";
import axios from "axios";

const Mortgage = () => {
  const { currency, convertAmount, convertBackAmount } = useCurrency();
  const [propertyPrice, setPropertyPrice] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [mortgagePeriod, setMortgagePeriod] = useState('5'); // Default to 30 years
  const [interestRate, setInterestRate] = useState('5'); // Default to 3.5%
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [title, setTitle] = useState('esrdhtfyg');
  const { language, translations, updateTranslations } = useLanguage();


  const handlePropertyPriceChange = (e) => {
    const price = parseFloat(e.target.value);
    setPropertyPrice(price);
  // Set deposit to 10% of property price
  };

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

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const calculateMonthlyPayment = () => {
    const loanAmount = propertyPrice - depositAmount;
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = mortgagePeriod * 12;
    const monthlyPayment =
      (loanAmount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

    setMonthlyPayment(monthlyPayment.toFixed(2));
    setShowPopup(true); // Show popup with monthly payment
  };

  const textKeys = {
    Financial: 'Financial',
    We:'We',
    mortgage:'mortgage',
    Calculator:'Calculator', 
    Property:'Property',
    Deposit:'Deposit',
    Period:'Period',
    Interest:'Interest',
    payment:'payment',
    guides:'guides',
    TSecuring:'TSecuring',
    adopt:'adopt',
    How:'How',
    what:'what',
    with:'with',
    more:'more',
    long:'long',
    average:'average',
    q4:'q4',
    a4:'a4',
    q5:'q5',
    a5:'a5',
    q6:'q6',
      a6:'a6'

   };

  useEffect(() => {
    // Update translations for each text key
 
    updateTranslations(textKeys.Financial, 'Financial suggestions without sound knowledge and expertise are a loss-making decision, and when it comes to mortgages, it is wise to rely on experts’s advice. Home mortgage advice services also call for expert opinion, and in Dubai, you can always rely on HJ Real Estates mortgage advisory support for free.');  
    updateTranslations(textKeys.We, 'We have been operative in Dubai for more than 14- years in the Dubai real estate  market, and mortgage advisory is one of the servicesthat we provide to our clients, educating them about the eligibility criteria, tenancy contracts, DEWA bills, bank documentation, work out the monthly payments,look out for better interest rates, down payment, and also giving them insight about using the '); 
    updateTranslations(textKeys.mortgage,'    mortgage calculator.')
      updateTranslations(textKeys.Calculator,'Mortgage Calculator.') 
      updateTranslations(textKeys.Property,'Property Price.')  
      updateTranslations(textKeys.Deposit,'Deposit.') 
      updateTranslations(textKeys.q6,' Can I sell my property if it is currently rented to tenants?.') 
      updateTranslations(textKeys.a6,'Yes, you can sell a property with tenants. However, specific regulations apply. Existing lease terms, tenant rights, and proper communication are critical. Our team navigates these complexities, ensuring a smooth transition for you and the tenants.')  

      updateTranslations(textKeys.a5,' Yes, you can sell a property with tenants. However, specific regulations apply. Existing lease terms, tenant rights, and proper communication are critical. Our team navigates these complexities, ensuring a smooth transition for you and the tenants.') 
      updateTranslations(textKeys.q5,'Can I sell my property if it is currently rented to tenants?.')   
      updateTranslations(textKeys.a4,'There is a fee associated with selling a property. Contact our team and have a detailed breakdown of the associated costs.') 
      updateTranslations(textKeys.q4,' What fees and costs should I expect when selling my property?.')  
      updateTranslations(textKeys.Period,'Mortgage Period.')  
      updateTranslations(textKeys.more,'It is determined by location, amenities available, social and health infrastructure, transport facilities, and more..')  
      updateTranslations(textKeys.Interest,' Interest Rate.')  
      updateTranslations(textKeys.TSecuring,'TSecuring mortgage approvals should be a simple process. As the best mortgage broker in Dubai, we aim to simplify the approval process, ensuring that the journey to securing a mortgage is straightforward and stress-free regardless of your property venture') 
      updateTranslations(textKeys.payment,'  Calculate Payment Now.')  
      updateTranslations(textKeys.average,' On average, properties in high-demand areas may sell more quickly, while others might take longer. But we will work hard to sell your house in time.')   
      updateTranslations(textKeys.long,'How long does it typically take to sell your property in Dubai?') 
      updateTranslations(textKeys.guides,'HJ Real Estates prioritizes your needs, guides you through how mortgages in Dubai work, and is committed to providing you with the exact mortgage advisory that you are looking for in Dubai, UAE..')  
      updateTranslations(textKeys.adopt,'We adopt an approach to mortgage solutions, collaborating with an extensive network of lenders. Our commitment is to work in your best interests rather than ours, ensuring that the mortgage rates we secure in Dubai are tailored to optimize your financial well-being.') 
      updateTranslations(textKeys.How,'  How can I sell my properties in Dubai through HJ Real Estates?.')  
      updateTranslations(textKeys.with,' To sell with us, contact our sales specialist and schedule a meeting. Once you have been onboarded, we put you at ease at every point.')  
      updateTranslations(textKeys.what,' What factors determine the market value of Dubai properties?.') 
}, [language, updateTranslations]);

//<span className='mort-span'>mortgage calculator.</span>
  //<span className='mort-span'>Dubai real estate</span>

  return (
    <div>
          <Helmet>
      <title>Mortgage Advice</title>
      <meta name="title" content="Use Online Mortgage Calculator Dubai to Estimate Monthly Payments  " />
        <meta name="description" content="Calculate and know your monthly mortgage amount with the help of HJ’s free mortgage calculator Dubai. Visit our website and calculate now to know your monthly loan repayments." />
        <meta name="keywords" content="mortgage calculator Dubai" />
        {/* <link rel="canonical" href="https://www.omkatech.com/services/designing"></link> */}

        <meta name="robots" content="index, follow" />
      </Helmet>
 <NavToAll/>
    
      <div className="container mt-2" style={{padding:"50px"}} >
        <div className="row">
      
          <div
            className="col-md-8 col-12 col-sm-12 hide-scrollbar container"
            style={{ height: "600px", overflowY: "scroll" }}
          >
           
<p className="mortgage-p">
{translations[textKeys.Financial] || 'Loading...'} </p>
<br/>
<p className="mortgage-p">
{translations[textKeys.We] || 'Loading...'}
<span className='mort-span'>{translations[textKeys.mortgage] || 'Loading...'}</span></p>
 <br></br>
 <div className="calculator-rent">
 <div className="mortgage-calculator">
      <h2 style={{ color: "black" }}>{translations[textKeys.Calculator] || 'Loading...'}</h2>
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
            <label>{translations[textKeys.Property] || 'Loading...'}<br /> ($):</label>
            <div className="input-with-currency">
              <input
                type="number"
                className="form-control"
                value={propertyPrice}
                onChange={handlePropertyPriceChange}
                required
              />
            </div>
          </div>

          <div className="col-md-3 col-12 mb-3">
            <label>{translations[textKeys.Deposit] || 'Loading...'} <br />($):</label>
            <input
              type="number"
              className="form-control"
              value={depositAmount}
              onChange={(e) => setDepositAmount(parseFloat(e.target.value))}
              required
            />
          </div>

          <div className="col-md-3 col-12 mb-3">
            <label> {translations[textKeys.Period] || 'Loading...'} <br />(years):</label>
            <input
              type="number"
              className="form-control"
              value={mortgagePeriod}
              onChange={(e) => setMortgagePeriod(parseInt(e.target.value))}
              min="5"
              max="30"
              required
            />
          </div>

          <div className="col-md-3 col-12 mb-3">
            <label>{translations[textKeys.Interest] || 'Loading...'} <br />(%):</label>
            <input
              type="number"
              className="form-control"
              step="0.01"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block mt-4"
          style={{ backgroundColor: '#2c378f', borderRadius: '20px' }}
        >
        {translations[textKeys.payment] || 'Loading...'} 
        </button>
      </form>

      {showPopup && (
        <div className="popup-form">
          <div className="popup-content">
            <button className="close-popup" onClick={togglePopup}>×</button>
            <div className='row'>
              <h3 className='col-md-7'>Monthly Payment:</h3>
            </div>
            <h5 className='col-md-3'>$ {convertAmount(monthlyPayment)}</h5>

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

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>

            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
          </div>
        </div>
      )}
    </div>
              </div>
              <br></br>
<p className="mortgage-p">
{translations[textKeys.guides] || 'Loading...'} </p>
  <br/>

  <p className="mortgage-p">{translations[textKeys.TSecuring] || 'Loading...'} 
.</p>
  <br/>
<p className="mortgage-p">
{translations[textKeys.adopt] || 'Loading...'} 


</p>

<br/>
<div className='col-md-12 mt-5 mb-5'>
      <div className="accordion" id="accordionExample">
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingOne">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
      {translations[textKeys.How] || 'Loading...'} 
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        {translations[textKeys.with] || 'Loading...'}  
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingTwo">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
      {translations[textKeys.what] || 'Loading...'}     
      </button>
    </h2>
    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div className="accordion-body">
      <p>   {translations[textKeys.more] || 'Loading...'} </p>
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingThree">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
      {translations[textKeys.long] || 'Loading...'}  
      </button>
    </h2>
    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div className="accordion-body">
      {translations[textKeys.average] || 'Loading...'}   
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingFour">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
      {translations[textKeys.q4] || 'Loading...'}   
      </button>
    </h2>
    <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
      <div className="accordion-body">
      {translations[textKeys.a4] || 'Loading...'}   </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingFive">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
      {translations[textKeys.q5] || 'Loading...'}  
      </button>
    </h2>
    <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
      <div className="accordion-body">
      {translations[textKeys.a5] || 'Loading...'}    </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingSix">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
      {translations[textKeys.q6] || 'Loading...'} 
      </button>
    </h2>
    <div id="collapseSix" className="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#accordionExample">
      <div className="accordion-body">
      {translations[textKeys.a6] || 'Loading...'}      </div>
    </div>
  </div>
  
</div>
</div>
          </div>
     
          <div className="col-md-4 col-12 col-sm-12">
      
            <div className=".img-fluid ">
            <Link to="/Contactus">   <img src="../img/banner.png" alt="Apartment Ad" className='img-fluid' style={{cursor: "pointer"}}/> </Link>
        
        </div>
          </div>
      
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Mortgage;
