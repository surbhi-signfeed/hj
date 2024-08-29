import React, { useState, useEffect, useRef } from "react";

import AsSeenon from '../component/AsSeenon'
import Stayinloop from '../component/Stayinloop'
import News from '../component/News'
import Assocaition from '../component/Assocaition'
import Footer from '../component/Footer'
import Gallery from '../component/Gallery'
import Mcards from '../component/Mcards'
import Offplan from '../component/Offplan'
import Nawnew from '../component/Nav-new'
import PreferenceSidebar from '../component/PreferencesSidebar';
import { useCurrency } from '../CurrencyContext';
import CookieConsent from 'react-cookie-consent';
import { Helmet } from "react-helmet";
const Home = () => {
  const { currency, handleChangeCurrency } = useCurrency();


  // useEffect(() => {
  //   document.title = "Your Home Page Title"; // Replace with your desired title
  //   document.querySelector('meta[name="description"]').setAttribute('content', "Your meta description goes here."); // Replace with your desired meta description
  // }, []);


  return (
    <div>

      {/* start seo */}
   
      <Helmet>
      <title>Home Page
      </title>
      <meta name="title" content="Rent, Buy, or Sell Properties in Dubai Real Estate Market " />
        <meta name="description" content="HJ Real Estates will help you find the best properties to rent, buy or sell in Dubai Real Estate market. Find your dream property in Dubai with us." />
        <meta name="keywords" content="Dubai Real Estate" />
        {/* <link rel="canonical" href="https://www.omkatech.com/services/designing"></link> */}

        <meta name="robots" content="index, follow" />
      </Helmet>
      {/* end seo */}
      <Nawnew  />
  
      <div className='container-xxl' style={{marginTop:"-20px"}}>
      <AsSeenon/><br/>
      <br>
      </br>

      <Mcards   />
      <Stayinloop/>
      <br/>
      <Gallery/>
      <br/>
      <Offplan />
      <br/>
      <News/>
      <br/>
       <Assocaition/>
      <br/>
      </div>
      <Footer/>
      <CookieConsent
      location="bottom"
      buttonText="Accept"
      declineButtonText="Reject"
      enableDeclineButton
      cookieName="myAwesomeCookieName2"
      style={{ background: "#2B373B" }}
      buttonStyle={{ color: "#fff", fontSize: "13px", background: "#28a745", border: "none", borderRadius: "5px" }}
      declineButtonStyle={{ color: "#fff", fontSize: "13px", background: "#dc3545", border: "none", borderRadius: "5px" }}
      expires={150}
      onAccept={() => {
        console.log("Accept was clicked!");
      }}
      onDecline={() => {
        console.log("Decline was clicked!");
      }}
    >
      We use cookies to ensure that we give you the best experience on our website.{" "}
      <span style={{ fontSize: "10px" }}>If you continue to use this site we will assume that you are happy with it.</span>
    </CookieConsent>
  

    </div>
  )
}

export default Home
