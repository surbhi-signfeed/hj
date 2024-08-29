import React, { useState, useEffect, useRef } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaPinterestP, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';


const Footer = ({setPageTitle}) => {


  const { language, translations, updateTranslations } = useLanguage();

  const textKeys = {

    Contact:'Contact',
    Home:'Home',
    About:'About',
    Careers:'Careers',
    Area:'Area',
    Our:'Our',
    Headquarter:'Headquarter',
    Silver:'Silver',
    Direction:'Direction',
    India:'India',
    West:'West',
    Hong:'Hong',
    Unit:'Unit',
    Ground:'Ground',
    hj:'hj',
    Privacy:'Privacy',
    Estates:'Estates'
   };

  useEffect(() => {
    // Update translations for each text key
 
    
    updateTranslations(textKeys.Home, 'Home'); 
    updateTranslations(textKeys.About, 'About Us'); 
    updateTranslations(textKeys.Area, 'Area Guides');
    updateTranslations(textKeys.Careers, 'Careers'); 
    updateTranslations(textKeys.Contact, 'Contact Us');
    updateTranslations(textKeys.India, 'India Office'); 
    updateTranslations(textKeys.Estates, '  HJ Real Estates is a company registered in Dubai, United Arab Emirates (License No. 1099736), 1105, Silver Tower, Business Bay,Dubai, UAE.');  
    updateTranslations(textKeys.Ground, ' 28, Ground Floor, Josif Broz Tito Avenue No. 32, Cantonment,Accra');   
    updateTranslations(textKeys.Our, 'Our Offices');   
    updateTranslations(textKeys.Unit, 'Unit 1707, Level 17, Tower 2, Silvercord Centre, Tsim Sha Tsui,Kowloon');      
    updateTranslations(textKeys.Hong, 'Hong Kong Office');
    updateTranslations(textKeys.West, '38, West Punjabi Bagh Club Road, New Delhi - 110026');
    updateTranslations(textKeys.Direction, 'Get Direction'); 
    updateTranslations(textKeys.Ghana, 'Ghana Office');
    updateTranslations(textKeys.hj, 'HJ Real Estates. All Rights Reserved');  
    updateTranslations(textKeys.Headquarter, 'Dubai Headquarter');
    updateTranslations(textKeys.Privacy, 'Privacy Policy & Terms & Conditions'); 
    updateTranslations(textKeys.Silver, ' 1104, Silver Tower, Business Bay, Dubai, UAE'); 
   
    

}, [language, updateTranslations]);
  return (
    <div>
        {/* footer */}
        <footer className="footer">
        <div className="footer-top">
          <div className="container">
            <div className="footer-nav">
            <Link to="/">{translations[textKeys.Home] || 'Loading...'} </Link>
            <Link to="/about" >{translations[textKeys.About] || 'Loading...'}</Link>
            <Link to="/Areaguide" >{translations[textKeys.Area] || 'Loading...'}</Link>
            <Link to="/Careers" >{translations[textKeys.Careers] || 'Loading...'}</Link>
            <Link to="/contactus" >{translations[textKeys.Contact] || 'Loading...'}</Link>
              
            </div>
            <div className="footer-social">
              <a href="https://www.facebook.com/hjrealestatess/" target='_blank'>
              <FaFacebook />
              </a>
              <a href="https://www.instagram.com/hjrealestates/" target='_blank'>
              <FaInstagram/>
              </a>
              <a href="https://www.linkedin.com/company/hjrealestates/" target='_blank'>
              <FaLinkedin/>
              </a>
              <a href="https://x.com/HJRealestates?mx=2" target='_blank'>
              <FaXTwitter />
              </a>
              <a href="https://www.youtube.com/@hjrealestates" target='_blank'>
              <FaYoutube />
              </a>
              <a href="https://www.pinterest.com/hjrealestates/" target='_blank'>
              <FaPinterestP />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-offices">
          <h3 className="ouroffice">{translations[textKeys.Our] || 'Loading...'}</h3>
          <div className="container">
            <div className="office">
              <h3>
                <span role="img" aria-label="UAE Flag">
                  <img src="../img/emirates.png"></img>
                </span>
                <br /> {translations[textKeys.Headquarter] || 'Loading...'}
              </h3>
              <p>{translations[textKeys.Silver] || 'Loading...'}</p>
              <p>
                <i className="fas fa-phone-alt"></i> +971 4326 2191
              </p>
              <a href="#get-direction">{translations[textKeys.Direction] || 'Loading...'} <FaArrowRightLong /></a>
            </div>
            <div className="office">
              <h3>
                <span role="img" aria-label="India Flag">
                  <img src="../img/india.png"></img>
                </span>
                <br />  {translations[textKeys.India] || 'Loading...'}
              </h3>
              <p> {translations[textKeys.West] || 'Loading...'}</p>
              <p>
                <i className="fas fa-phone-alt"></i> +91 76543 21086
              </p>
              <a href="#get-direction"> {translations[textKeys.Direction] || 'Loading...'}<FaArrowRightLong /></a>
            </div>
            <div className="office">
              <h3>
                <span role="img" aria-label="Hong Kong Flag">
                  <img src="../img/kong.png"></img>
                </span>
                <br />{translations[textKeys.Hong] || 'Loading...'} 
              </h3>
              <p>
              {translations[textKeys.Unit] || 'Loading...'} 
            
              </p>
              <p>
                <i className="fas fa-phone-alt"></i> +852 6438 1051
              </p>
              <a href="#get-direction">{translations[textKeys.Direction] || 'Loading...'} <FaArrowRightLong /></a>
            </div>
            <div className="office">
              <h3>
                <span role="img" aria-label="Ghana Flag">
                  <img src="../img/ghana.png"></img>
                </span>
                <br />{translations[textKeys.Ghana] || 'Loading...'} 
              </h3>
              <p>
              {translations[textKeys.Ground] || 'Loading...'} 
            
              </p>
              <p>
                <i className="fas fa-phone-alt"></i> +233 53 758 6262
              </p>
              <a href="#get-direction">{translations[textKeys.Direction] || 'Loading...'} <FaArrowRightLong /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <p> ©2024 {translations[textKeys.hj] || 'Loading...'}  .</p>
            <p> {translations[textKeys.Privacy] || 'Loading...'}</p>
            <p>
            {translations[textKeys.Estates] || 'Loading...'}
             
            </p>
          </div>
        </div>
      </footer>

    
      <a
        href="https://api.whatsapp.com/send?phone=51955081075&text=Hola%21%20Quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20Varela%202."
        className="float"
        target="_blank"
      >
        <i className="fa fa-whatsapp my-float"></i>
      </a>
      {/* <a
        href="https://api.whatsapp.com/send?phone=51955081075&text=Hola%21%20Quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20Varela%202."
        className="float1"
        target="_blank"
      >
        <i className="fa fa-comment-o my-float1"></i>
      </a> */}
    </div>
  )
}

export default Footer
