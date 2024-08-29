import React, { useState, useEffect } from 'react';
import axios from "axios";
import "react-phone-input-2/lib/style.css";
import Footer from "../component/Footer";
import { Helmet } from 'react-helmet';
import "../css/Contactpage.css";
import Swal from 'sweetalert2';
import { Input, initMDB } from "mdb-ui-kit";
import FilterNav from "../component/FilterNav1";
import NavToAll from "../component/NavToAll";
import { useLanguage } from '../LanguageContext';
// import HJLogo from ''; // Adjust the import path according to your project structure

const Contactus = () => {
  const { language, translations, updateTranslations } = useLanguage();
  initMDB({ Input });
 
  const [formData, setFormData] = useState({
    name: '',
    msg: '',
    email: '',
    phone: ''
  });

  const [loading, setLoading] = useState(false); // Add loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const { name, msg, email, phone } = formData;
    if (!name || !msg || !email || !phone) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Form',
        text: 'Please fill out all fields.'
      });
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Email',
        text: 'Please enter a valid email address.'
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true); // Show loading spinner/logo

    try {
      const response = await axios.post('http://localhost:4000/api/send-contactus', formData);
      Swal.fire({
        icon: 'success',
        title: 'Thank you!',
        text: 'Thanks for reaching out. We will get back to you soon.'
      });
      setFormData({ name: '', msg: '', email: '', phone: '' });
    } catch (error) {
      if (error.response) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.error
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'An unexpected error occurred'
        });
      }
    } finally {
      setLoading(false); // Hide loading spinner/logo
    }
  };

  const textKeys = {
    Contectus: 'Contectus',
    Contectus1: 'Contectus1',
    Contectusp:'Contectusp',
    Hours:'Hours',
    did:'did',
    Social:'Social',
    didDsc:'didDsc', 
    enquery:'enquery',
    entername:'entername',  
    enteremail:'enteremail',
    enterphone:'enterphone' ,
    Message:'Message',
    Submit:'Submit'
  };

  useEffect(() => {
    // Update translations for each text key
    updateTranslations(textKeys.Contectus, 'Looking to buy, sell, or just say hello? Let’s talk!');
    updateTranslations(textKeys.Contectus1, 'Come Visit Us!');
    updateTranslations(textKeys.Contectusp, ' 1104, Silver Tower, Business Bay, Dubai, UAE');
    updateTranslations(textKeys.did, 'Did you know?');
    updateTranslations(textKeys.Hours, 'Hours');
    updateTranslations(textKeys.Social, '   Our Social Media:');  
    updateTranslations(textKeys.enquery, 'Online Inquiry');  
    updateTranslations(textKeys.entername, 'Enter Name:');  
    updateTranslations(textKeys.enteremail, 'Enter Email:');  
    updateTranslations(textKeys.enterphone, ' Enter Phone:');  
    updateTranslations(textKeys.Message, 'Message');  
    updateTranslations(textKeys.Submit, 'Submit');  
    updateTranslations(textKeys.didDsc, '  There are many benefits to investing in Dubai real estate. Dubai offers lucrative investment opportunities due to its strong economy, attractive tax benefits, and diverse property market.Investors seeking to grow their wealth will find the city’s rentalmarket and capital appreciation ideal. Take advantage of thisthriving global hub and invest today.');        
  }, [language, updateTranslations]);

  return (
    <div>
      <Helmet>
        <title>Contact Us </title>
        <meta name="title" content="Contact us | HJ Real Estates| Best Dubai Property Agents " />
        <meta name="description" content="Have any enquiry or need advice related to Dubai real estate? Looking to buy, rent, or sell property in Dubai? Let’s talk. We will revert to you asap. " />
        <meta name="keywords" content="Contact Us" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <NavToAll />
      <br />
      <div className="container-fluid">
        <div className="row mt-5 mb-5">
          <div className="col-md-1"></div>
          <div className="col-md-9">
            <h1 className="contat-h">
              {translations[textKeys.Contectus] || 'Loading...'}
            </h1>
          </div>
        </div>
      </div>
      <hr />
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-lg-1"></div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <div>
              <h4 className="contact-h4">{translations[textKeys.Contectus1] || 'Loading...'}</h4>
              <p className="contect-p">{translations[textKeys.Contectusp] || 'Loading...'}</p>
            </div>
            <div>
              <h4 className="contact-h5">{translations[textKeys.Hours] || 'Loading...'}</h4>
              <p className="contect-p">Mon – Sat 09:00AM – 06:00PM GST</p>
            </div>
            <div>
              <h5 className="mt-3 contact-h5">{translations[textKeys.Social] || 'Loading...'}</h5>
              <div className="contact-social">
                <a href="#facebook">
                  <i className="fab fa-facebook-f" style={{ color: "#1877F2" }}></i>
                </a>
                <a href="#instagram">
                  <i className="fab fa-instagram" style={{ color: "#E60023" }}></i>
                </a>
                <a href="#linkedin">
                  <i className="fab fa-linkedin" style={{ color: "#0A66C2" }}></i>
                </a>
                <a href="#twitter">
                  <i className="fab fa-twitter" style={{ color: "#1DA1F2" }}></i>
                </a>
                <a href="#youtube">
                  <i className="fab fa-youtube" style={{ color: "#FF0000" }}></i>
                </a>
                <a href="#pinterest">
                  <i className="fab fa-pinterest" style={{ color: "#E60023" }}></i>
                </a>
              </div>
            </div>
            <hr />
            <div>
              <h4 className="contact-h5">{translations[textKeys.did] || 'Loading...'}</h4>
              <p className="contect-p">
                {translations[textKeys.didDsc] || 'Loading...'}
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center align-items-center">
            <img
              src="https://hjrealestates.com/wp-content/uploads/2023/09/hj-real-estates-sathbir-siingh-sachdeva.jpg"
              alt="..."
              className="contact-img"
            ></img>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 mobile-Inquiry">
            <h4 className="mb-5" style={{ color: "black" }}>{translations[textKeys.enquery] || 'Loading...'}</h4>
            <form onSubmit={handleSubmit} style={styles.contactform}>
              <div style={styles.contactformGroup}>
                <label className="label-contact" htmlFor="name" style={styles.contactlabel}>
                  {translations[textKeys.entername] || 'Loading...'}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={styles.contactinput}
                />
              </div>
              <div style={styles.contactformGroup}>
                <label className="label-contact" htmlFor="email" style={styles.contactlabel}>
                  {translations[textKeys.enteremail] || 'Loading...'}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={styles.contactinput}
                />
              </div>
              <div style={styles.contactformGroup}>
                <label className="label-contact" htmlFor="phone" style={styles.contactlabel}>
                  {translations[textKeys.enterphone] || 'Loading...'}
                </label>
                <input
                  type="phone"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={styles.contactinput}
                />
              </div>
              <div style={styles.contactformGroup}>
                <label className="label-contact" htmlFor="msg" style={styles.contactlabel}>
                  {translations[textKeys.Message] || 'Loading...'} :
                </label>
                <textarea
                  id="msg"
                  name="msg"
                  value={formData.msg}
                  onChange={handleChange}
                  style={{ ...styles.contactinput, ...styles.contacttextarea }}
                />
              </div>
              <button type="submit" className="btn" style={styles.contactbutton}>
                {translations[textKeys.Submit] || 'Loading...'}
              </button>
            </form>
          </div>
          <div className="col-lg-1"></div>
        </div>
      </div>

      {loading && (
        <div style={styles.loadingOverlay}>
          <div >
            <img src="../img/with-background.gif" alt="Loading..." style={styles.loadingLogo} />
          </div>
        </div>
      )}

      <div className="mt-5"></div>
      <Footer />
    </div>
  );
};

export default Contactus;

const styles = {
  contactformGroup: {
    marginBottom: "15px",
  },
  contactlabel: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  contactinput: {
    width: "100%",
    padding: "10px",
    border: "1px solid #dddddd",
    borderRadius: "5px",
    fontSize: "16px",
  },
  contacttextarea: {
    height: "100px",
    resize: "vertical",
  },
  contactbutton: {
    width: "100%",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#2c378f",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },
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
  // loading: {
  //   width: '150px',
  //   height: '150px',
  //   backgroundColor:"#2c378f",
  //   borderRadius:"50%",
  //   animation: 'rotate 2s linear infinite',
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  '@keyframes rotate': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
};
