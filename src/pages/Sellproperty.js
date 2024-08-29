import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../component/Footer";
import { Helmet } from 'react-helmet';
import "../css/Sell.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PhoneInput from "react-phone-input-2";
import FilterNav from "../component/FilterNav";
import NavToAll from "../component/NavToAll";
import { HiArrowUpRight } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import Swal from "sweetalert2";



const Sellproperty = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { language, translations, updateTranslations } = useLanguage();
  const [loading, setLoading] = useState(false); // Add loading state


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading spinner/logo

    const formData = {
      phone,
      name,
      msg: message,
      propertyType,
      mail: email,
    };

    try {
      const response = await fetch('http://localhost:4000/api/send-sellform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Thank you!",
          text: "Thanks for reaching out. We will get back to you soon.",
        });
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "An unexpected error occurred",
              });      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An unexpected error occurred",
      });  
      }finally {
      setLoading(false); // Hide loading spinner/logo
    }
  };
 

  const Contactus = () =>{
    navigate("/contactus")
  }

  

  const textKeys = {
   
    TRUSTED:'TRUSTED',
    Request:'Request', 
    We:'We',
    Choose:'Choose',
    years:'years',
    When:'When',
    Our12:'Our12', 
    PropertyValuation:'PropertyValuation', 
    buyers:'buyers',
    agent:'agent',
    Propertyation:'Propertyation',
    Learn:'Learn',
    Negotiations:'Negotiations',
    Take:'Take',
    Those:'Those',
    Ownership:'Ownership',
    Whether:'Whether', 
    dedicated:'dedicated', 
    Name:'Name',
    Mobile:'Mobile', 
    email:'email',
    Message:'Message', 
    Submit:'Submit',
    PropertyType:'PropertyType',
   };

  useEffect(() => {
    // Update translations for each text key
 
    updateTranslations(textKeys.TRUSTED,'YOUR TRUSTED PARTNER AT YOUR SERVICE')
      updateTranslations(textKeys.Request,'Request Valuation') 
      updateTranslations(textKeys.We,'We have a well-crafted and Meticulous strategy to sell your house')  
      updateTranslations(textKeys.Choose,'Why Choose Us?')  
      updateTranslations(textKeys.years,' We have 14 years of experience in the Dubai real estate market. Our trained agents deliver first-class service for real estate deals. Choose HJ Real Estates to buy or sell your property in Dubai and experience our property management service. As property managers and brokers with a global presence, we have all the expertise related to real estate contacts and are well-versed in all the neighborhoods in Dubai if you wish to buy a property here.')
      updateTranslations(textKeys.When,'When will you come')
      updateTranslations(textKeys.Our12,' Our large network of links with reputable architects, engineers, developers, and lawyers can help you find better properties and assist with legal issues professionally. We’re your trusted partner with deep knowledge of the Dubai Real Estate market, so your property’s success story begins with us. Contact us, and let’s embark on this journey together.')
      updateTranslations(textKeys.PropertyValuation,'Request a Property Valuation')  
      updateTranslations(textKeys.Organisers,'Organisers') 
      updateTranslations(textKeys.Message,'Message')  
      updateTranslations(textKeys.email,'Email') 
      updateTranslations(textKeys.Name, 'Name') 
      updateTranslations(textKeys.Mobile,'Mobile')  
      
      updateTranslations(textKeys.PropertyType, 'Property Type');
      updateTranslations(textKeys.Submit, 'Submit');
      updateTranslations(textKeys.Propertyation,'Property Valuation');
      updateTranslations(textKeys.buyers, 'We know buyers search online for properties, so we use property portals to list available Dubai properties. As web portals are accessible to large audiences, we ensure our property listings are browseable at their convenience, resulting in faster sales at the best prices.');
      updateTranslations(textKeys.agent, 'As your property agent, we help determine the fair and competitive sale value of your property in the Dubai real estate market that you want to sell. We consider the overall property market trends to determine a property’s value in Dubai. We can also advise on upgrading your property to enhance its market value.'); 
      updateTranslations(textKeys.Whether, ' Whether you want to sell or buy a property in Dubai, our well-established negotiation expertise helps you secure the most favorable price. Throughout the entire process, we represent your interests, ensuring that every negotiation is conducted to maximize the value of your asset.');
      updateTranslations(textKeys.dedicated, 'Our dedicated Dubai real estate agent will handle all necessary documentation and oversee the conclusive property transfer process at the Dubai Land Department, ensuring a seamless ownership transition.');  
      updateTranslations(textKeys.Negotiations, 'Negotiations');  
      updateTranslations(textKeys.Ownership, 'Ownership Transfer');  
      updateTranslations(textKeys.residences, 'This event will feature residences held by expats hoping to secure Dubai residency visas for their family, as well as a range of upcoming special properties. Visitors hoping to live in a tax-friendly environment.'); 
}, [language, updateTranslations]);


  return (
    <div>
       <Helmet>
      <title>Sell Your Property
      </title>
      <meta name="title" content="Sell Your Property" />

        <meta name="description" content="states will help you find the best propertiessell in Dubai Real Estate market. Find your dream property in Dubai with us.HJ Real E" />
        <meta name="keywords" content="Sell Your Property" />
        {/* <link rel="canonical" href="https://www.omkatech.com/services/designing"></link> */}

        <meta name="robots" content="index, follow" />
      </Helmet>
     <NavToAll/>

      <div className="container ">
        <div className="row" >
          <div className="col-md-5 mt-5">
            <img
              src="https://hjrealestates.com/wp-content/uploads/2023/09/hj-real-estates-sell-hero.jpg"
              className="sell-imgg"
              alt="Sell Hero"
            />
          </div>
          <div className="col-md-6 mt-5">
            <p className="mt-2 sell-p">
              It can be difficult to  <span style={{fontWeight: "bold"}}>sell your property</span> at the best price if you
              don’t have the right knowledge about the Dubai real estate market.
              Our professional sales agents have years of experience selling
              properties in Dubai and can guide you at every step. Our in-depth
              knowledge of the global and <span style={{fontWeight: "bold"}}>Dubai Real Estate</span> markets is an added
              advantage of partnering with us. Trust us for an accurate property
              valuation that follows all the guidelines and industry standards
              laid down by government authorities. Experience the difference in
              selling your properties in Dubai with us.
            </p>
            <h4 className="mt-5" style={{ color: "#2c378f",fontWeight: "600" }}>
              HJ REAL ESTATES
            </h4>
            <div className="row">
              <div className="col-md-7 text-black">
                <h4  style={{fontWeight: "600"}}>{translations[textKeys.TRUSTED] || 'Loading...'} </h4>
              </div>
              <div className="col-md-5">
                <button
                  type="button"
                  className=" sell-bntn2"
           onClick={Contactus}
                >
                {translations[textKeys.Request] || 'Loading...'}    &nbsp; <HiArrowUpRight />
                </button>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="row sell-accon1" id="iii">
  <div className="col-md-12 col-sm-12">
    <h3 className="mt-5 text-center text-black">
    {translations[textKeys.We] || 'Loading...'} 
    </h3>
    <div className="row sell-card-m">
      {[
        {
          img: "https://hjrealestates.com/wp-content/uploads/2023/09/hj-real-estates-sell-property-valuation.png",
          title: translations[textKeys.Propertyation] || 'Loading...',
          text:  translations[textKeys.buyers] || 'Loading...',
        },
        {
          img: "https://hjrealestates.com/wp-content/uploads/2023/09/hj-real-estates-sell-marketing.png",
          title: translations[textKeys.Propertyation] || 'Loading...',
          text:  translations[textKeys.agent] || 'Loading...',
        },
        {
          img: "https://hjrealestates.com/wp-content/uploads/2023/09/hj-real-estates-sell-offer.png",
          title:translations[textKeys.Negotiations] || 'Loading...',
          text:  translations[textKeys.Whether] || 'Loading...',
        },
        {
          img: "https://hjrealestates.com/wp-content/uploads/2023/09/hj-real-estates-sell-transfer-ownership.png",
          title: translations[textKeys.Ownership] || 'Loading...',
          text: translations[textKeys.dedicated] || 'Loading...',
        },
      ].map((card, index) => (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
          <div className="card mt-5 shadow mb-5" style={{ width: "100%", border: "none" }}>
            <div className="card-body">
              <img
                src={card.img}
                alt={card.title}
                style={{ height: "64px", width: "64px" }}
                id="pv"
              />
              <h5 className="card-title"  style={{color:"black"}}>{card.title}</h5>
              <p className="card-text">{card.text}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

<div className="row sell-icon">
  <div className="col-md-6">
    <h2 className="mt-4" style={{color:"black"}}>  {translations[textKeys.Choose] || 'Loading...'} </h2>
    <p className="mt-4 sell-p" >
    {translations[textKeys.years] || 'Loading...'}  
    </p>
    <p className="mt-4 sell-p">
    {translations[textKeys.Our12] || 'Loading...'}   
    </p>
    <button type="button" className="sell-bntn3 myprimary"  onClick={Contactus}>
    {translations[textKeys.Request] || 'Loading...'}    &nbsp; <HiArrowUpRight />
    </button>


    
  </div>
  <div className="col-md-6">
    <img
      src="https://hjrealestates.com/wp-content/uploads/2023/09/hj-real-estates-sell-about-us.jpg"
      className="sell-img2"
      alt="About Us"
    />
  </div>
</div>

        <div className="row mb-5 mt-5">
          <div className="col-md-12 mt-5 mb-5">
            <div className="accordion sell-accon" id="accordionExample">
              {[
                {
                  header:
                    "How can I sell my properties in Dubai through HJ Real Estates?",
                  body: "To sell with us, contact our sales specialist and schedule a meeting. Once you have been onboarded, we put you at ease at every point.",
                },
                {
                  header:
                    "What factors determine the market value of Dubai properties?",
                  body: "It is determined by location, amenities available, social and health infrastructure, transport facilities, and more.",
                },
                {
                  header:
                    "How long does it typically take to sell your property in Dubai?",
                  body: "On average, properties in high-demand areas may sell more quickly, while others might take longer. But we will work hard to sell your house in time.",
                },
                {
                  header:
                    "What fees and costs should I expect when selling my property?",
                  body: "There is a fee associated with selling a property. Contact our team and have a detailed breakdown of the associated costs.",
                },
                {
                  header:
                    "Can I sell my property if it is currently rented to tenants?",
                  body: "Yes, you can sell a property with tenants. However, specific regulations apply. Existing lease terms, tenant rights, and proper communication are critical. Our team navigates these complexities, ensuring a smooth transition for you and the tenants.",
                },
              ].map((item, index) => (
                <div className="accordion-item" key={index}>
                  <h2 className="accordion-header" id={`heading${index}`}>
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index}`}
                      aria-expanded={index === 0 ? "true" : "false"}
                      aria-controls={`collapse${index}`}
                      style={{fontWeight:"bold"}}
                    >
                      {item.header}
                    </button>
                  </h2>
                  <div
                    id={`collapse${index}`}
                    className={`accordion-collapse collapse ${
                      index === 0 ? "show" : ""
                    }`}
                    aria-labelledby={`heading${index}`}
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">{item.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="row mb-5" >
          <div className="col-md-1"></div>
          <div className="col-12 col-md-4 mt-5">
            <img
              src="https://hjrealestates.com/wp-content/uploads/2023/09/hj-real-estates-sell-cta-768x768.jpg"
              className="sell-img2"
              alt="Buy Home"
            />
          </div>
          <div className="col-12 col-md-5 mt-5">
          <form onSubmit={handleSubmit}>
      <h3 style={{color:"black"}}>  {translations[textKeys.PropertyValuation] || 'Loading...'} </h3>
      <div className="row">
        <div className="col-md-6 mt-2">
          <label className="form-label">{translations[textKeys.Name] || 'Loading...'}</label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col-md-6 mt-2">
          <label className="form-label">{translations[textKeys.email] || 'Loading...'}</label>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="col-md-6 mt-2">
          <label className="form-label">{translations[textKeys.Mobile] || 'Loading...'}</label>
          <PhoneInput
            country={'us'}
            value={phone}
            onChange={setPhone}
            inputClass="form-control"
            style={{ border: '1px solid #e0e0e0', borderRadius: '4px' }}
          />
        </div>
        <div className="col-md-6 mt-2">
          <label className="form-label">{translations[textKeys.PropertyType] || 'Loading...'}</label>
          <input
            type="text"
            className="form-control"
            placeholder="Property Type"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          />
        </div>
        <div className="col-md-12 mt-2">
          <label className="form-label">{translations[textKeys.Message] || 'Loading...'}</label>
          <textarea
            className="form-control"
            rows="4"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <div className="col-md-12 mt-2">
          <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#2c378f' }}>
          {translations[textKeys.Submit] || 'Loading...'} 
          </button>
        </div>
      </div>
    </form>
          </div>
        </div>
        {loading && (
        <div style={styles.loadingOverlay}>
          <div >
            <img src="../img/with-background.gif" alt="Loading..." style={styles.loadingLogo} />
          </div>
        </div>
      )}
      </div>
      <Footer />
    </div>
  );
};

export default Sellproperty;
const styles = {
 
  loadingOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
   
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  
  loadingLogo: {
   
    width: '320px',
    height: '320px',
    alignItems: 'center',
  },
 

};