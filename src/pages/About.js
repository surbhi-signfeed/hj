import React, { useState,useEffect } from "react";


import "react-phone-input-2/lib/style.css";
import Footer from "../component/Footer";
import { Helmet } from 'react-helmet';
import FilterNav from "../component/FilterNav";
import "../css/About.css";
import Assocaition from "../component/Assocaition";
import { Input, initMDB } from "mdb-ui-kit";
import NavToAll from "../component/NavToAll";
import { IoMdCheckboxOutline } from "react-icons/io";
import { useLanguage } from '../LanguageContext';
const About = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const { language, translations, updateTranslations } = useLanguage();
  initMDB({ Input });

console.log("basurl",baseUrl)
  
  const textKeys = {
    aboutus: 'aboutus',
    aboutusp: 'aboutusp',
    country:'country',
    propertys:'propertys', 
    realestate:'realestate',
    Deals:'Deals',
    our:'our',
    mission:'mission',
    missionp:'missionp',
    missionp1:'missionp1',
    experts:'experts',
    experts1:'experts1',
    experts2:"experts2",
    meet:"meet",
    meetp:"meetp",
    satb:'satb',
    satbp:'satbp',
    jasb:'jasb',
    jasbp:'jasbp'

   };

  useEffect(() => {
    // Update translations for each text key
 
    updateTranslations(textKeys.aboutus, ' Celebrating Over 14 Years in the Real Estate Industry'); 
    updateTranslations(textKeys.aboutusp, '       At HJ Real Estates, our clients are at the core. This helped us gain the badge of being one of the most prominent real estate companies based in Dubai, with extensive experience spanning over 14 years. Whether you are a property owner, buyer, seller or tenant looking to rent property, we value your aspirations and business needs with 360-degree services for real estate deals.'); 
    updateTranslations(textKeys.country, 'Countries');    
    updateTranslations(textKeys.propertys, 'Property Sold');  
    updateTranslations(textKeys.realestate, 'Real Estate Experts');
    updateTranslations(textKeys.Deals, 'Deals'); 
    updateTranslations(textKeys.mission, ' Our Vision and Mission');   
    updateTranslations(textKeys.missionp, '  At HJ Real Estates, we understand the value and challenges of property ownership or renting. Our experts are dedicated to guiding you with the right consultancy services and buying and We have the vision of helping clients from the start to the end in handling real estate transactions of every size and complexity. selling to ensure you make the right estate decisions.');   
    updateTranslations(textKeys.our, '—— Our success speaks through the statistics');  
    updateTranslations(textKeys.missionp1, 'Dubai Real Estate’s future is among the brightest in this market.We manage and resolve all the challenges and complex transactions in this sector for clients so that they have complete satisfaction in their deals. Our mission is to guide our clients with the utmost care and respect so that every deal process stays transparent with all the parties involved.'); 
    updateTranslations(textKeys.experts, ' Our Expertise'); 
    updateTranslations(textKeys.experts2, '    Fundamentally, we ensure the best negotiations for our clients so that our client wins the deal. We specialise in buying, selling, leasing, and property management of different types of properties, be it residential, offplan, ready to move-in or rental. As property transactions involve lots of legal formalities, our experts cater to all the requirements in the most legitimate manner so that you enjoy the best real estate dealing experience in a hassle-free manner, right from selecting the properties to moving in or renting them.'); 
    updateTranslations(textKeys.experts1, '    We believe in performances and not the promises to ensure a client’s success.'); 
    updateTranslations(textKeys.meet, 'Meet Our Team');  
    updateTranslations(textKeys.satb, 'Sathbir Singh Sachdeva'); 
    updateTranslations(textKeys.satbp, 'CEO & Founder '); 
    updateTranslations(textKeys.jasbp, 'Director '); 
    updateTranslations(textKeys.jasb, 'Jasbier Singh Sachdeva ');   
    updateTranslations(textKeys.meetp, 'Our success is built upon the expertise, dedication, and leadership of our exceptional team. Get to know the professionals who drive our organization forward, ensuring our clients receive the highest level of service and support.');
    // updateTranslations(textKeys.founderTitle, 'Founder of HJ Real Estates');
}, [language, updateTranslations]);

  return (
    
    <div>
        <Helmet>
      <title>About </title>
      <meta name="title" content="About Us" />
        <meta name="description" content="We understand the needs of investors also guide our investors well and provide latest information about real estate. " />
        <meta name="keywords" content="About" />
        {/* <link rel="canonical" href="https://www.omkatech.com/services/designing"></link> */}

        <meta name="robots" content="index, follow" />
      </Helmet>
      <NavToAll/>
   <div className="body">     
     <div className="container about-padd ">
        <div className="row mt-5">
          <div className="col-md-6 col-6 col-lg-3 col-sm-6">
            <img
              src="https://hjrealestates.com/wp-content/uploads/2023/08/hj-real-estates-our-about-burj-khalifa.jpg"
              alt="..."
              className="about-img img-fluid"
            ></img>
          </div>
          <div className="col-md-6 col-6 mt-5 col-lg-3  col-sm-6">
            <img
              src="https://hjrealestates.com/wp-content/uploads/2023/08/hj-real-estates-our-story-sathbir-siingh-sachdeva.jpg"
              alt="..."
              className="about-img img-fluid"
            ></img>
          </div>
          <div className="col-md-12 col-12 col-lg-6  col-sm-12">
            <h4 className="about-h">
            {translations[textKeys.aboutus] || 'Loading...'} 
            </h4>
            <p className="mt-3 about-p">
            {translations[textKeys.aboutusp] || 'Loading...'} 
       
            </p>

            <h4 className="about-apan" > <IoMdCheckboxOutline style={{fontSize:"26px",color:"#16248c"}}/> 5  {translations[textKeys.country] || 'Loading...'}  </h4>
            <h4 className="about-apan"> <IoMdCheckboxOutline style={{fontSize:"26px",color:"#16248c"}}/> 500+  {translations[textKeys.propertys] || 'Loading...'}</h4>
            <h4 className="about-apan"> <IoMdCheckboxOutline style={{fontSize:"26px",color:"#16248c"}}/> 250+ {translations[textKeys.realestate] || 'Loading...'} </h4>
            <h4 className="about-apan"> <IoMdCheckboxOutline style={{fontSize:"26px",color:"#16248c"}}/> 750M AED+ {translations[textKeys.Deals] || 'Loading...'} </h4>
            <p className="mt-4">{translations[textKeys.our] || 'Loading...'}</p>
          </div>
        </div>
      </div>

      <div className="col-md-12 col-sm-12 col-xs-12 ">
        <img
          src="https://hjrealestates.com/wp-content/uploads/2023/08/hj-real-estates-about-video-intro.jpg"
          alt=""
          className="about-img2 img-fluid"
        ></img>
      </div>

      <div className="container mt-5" >
        <h2 className="text-center about-h1"> {translations[textKeys.mission] || 'Loading...'} </h2>
        <div className="row">
          <div className="col-md-6">
            <p className="about-p">
            {translations[textKeys.missionp] || 'Loading...'}
         
            </p>
          </div>
          <div className="col-md-6">
            <p className="about-p">
            {translations[textKeys.missionp1] || 'Loading...'}
       
            </p>
          
          </div>
        </div>
        <br />
        <div>
          <h2 className="text-center  about-h1">   {translations[textKeys.experts] || 'Loading...'} </h2>
          <div className="row mt-3">
            <div className="col-md-12 text-center about-p">
            {translations[textKeys.experts1] || 'Loading...'}
           <br/>  {translations[textKeys.experts2] || 'Loading...'} 
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* <div className="mb-5 col-md-12 col-sm-12 col-xs-12 mt-5">
          <img
            src="https://hjrealestates.com/wp-content/uploads/2023/08/hj-real-estates-about-our-team-bg.jpg"
            alt=""
            className="about-img3 "
          ></img>
              <div className="about-overlay-imagesmeet">
           <div className="meett">
            <h5>Meet Our Team</h5>
            <p>Our success is built upon the expertise, dedication, and leadership of our exceptional team. Get to know the professionals who drive our organization forward, ensuring our clients receive the highest level of service and support.</p>
           </div>

          </div>
          <div className="about-overlay-images">
            <div className="overlay-image">
              <img
                src="https://hjrealestates.com/wp-content/uploads/2023/06/hj-real-estates-our-team-sathbir-siingh-sachdeva.jpg"
                alt="..."
                className="about-img121 overlay-img about-img-again img-fluid"
              ></img>
            </div>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <div className="overlay-image">
              <img
                src="https://hjrealestates.com/wp-content/uploads/2023/08/hj-real-estates-our-story-jasbier-sachdeva.jpg"
                alt="..."
                className="about-img121 overlay-img about-img-again img-fluid"
              ></img>
            </div>
          </div>
      
        </div> */}



<div className="team-section">
      <div className="background-image">
        <div className="overlay">
          
          <p>
          <h2 style={{color:"white"}} className=" about-h1">  {translations[textKeys.meet] || 'Loading...'} </h2><br/>
          {translations[textKeys.meetp] || 'Loading...'}   
          </p>
        </div>
      </div>
      <div className="team-cards">
        <div className="cardp">
          <img
            src="https://hjrealestates.com/wp-content/uploads/2023/06/hj-real-estates-our-team-sathbir-siingh-sachdeva.jpg"
            alt="Sathbir Singh Sachdeva"
          />
          <div className="cardp-content">
            <h3>     {translations[textKeys.satb] || 'Loading...'} </h3>
            <p> {translations[textKeys.satbp] || 'Loading...'}</p>
          </div>
        </div>
        <div className="cardp">
          <img
            src="https://hjrealestates.com/wp-content/uploads/2023/08/hj-real-estates-our-story-jasbier-sachdeva.jpg"
            alt="Jasbier Singh Sachdeva"
          />
          <div className="cardp-content">
            <h3> {translations[textKeys.jasb] || 'Loading...'} </h3>
            <p> {translations[textKeys.jasbp] || 'Loading...'}</p>
          </div>
        </div>
      </div>
    </div>

        <div className=" asso" >
          <Assocaition />
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
