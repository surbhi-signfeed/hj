import React, { useState, useEffect } from "react";

import Footer from "../component/Footer";

import NavToAll from "../component/NavToAll";

import { Link } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import { Helmet } from "react-helmet";


const SellerGuide= () => {

  const { language, translations, updateTranslations } = useLanguage();
  const textKeys = {
    Ours: "Ours",
    whyis:"Whyis",
    thep:"thep",
    p1:"p1",
    p2:"p2",
    p3:"p3",
    p4:"p4",
    p5:"p5",
    p6:"p6",
    p7:"p7",
    p8:"p8",
    p9:"p9",
    p10:"p10",
    p11:"p11",
    p12:"p12",
    p13:"p13",
    p14:"p14",
    p15:"p15",
    p16:"p16",
   
  
  
    
  };

  useEffect(() => {
    // Update translations for each text key

    updateTranslations(
      textKeys.Ours,
      "Dubai is the centre of all fantastic real estate properties. Do you want to know how to sell property in Dubai? Selling a property in Dubai means a lot of excitement along with a lot of monetary benefits. Whether you want to sell your home in Dubai or an off-plan property, HJ Real Estates helps you know the procedures and following the proper steps is essential."
    );
    
    updateTranslations(
        textKeys.whyis,
        "How to Sell Property in Dubai?"
      );
      updateTranslations(
        textKeys.thep,
        "Here is how to sell property in Dubai:"
      );
  
      updateTranslations(
        textKeys.p1,
        "1. Preparing Your House for Sale"
      );
      updateTranslations(
        textKeys.p2,
        "It’s essential to make your house desirable to potential purchasers before advertising it. Declutter and thoroughly clean your home first. To increase its value, think about performing any required modifications or repairs."
      );
      updateTranslations(
        textKeys.p3,
        "2. Find a Trustworthy Real Estate Agent"
      );
      updateTranslations(
        textKeys.p4,
        "Collaborating with a respectable agent of HJ Real Estates with practical experience in the Dubai market is critical to a fruitful deal. They have significant experience and market skills to handle the intricacies of sell property in Dubai system. Exploration and interview different specialists to find the person who grasps your requirements and has a demonstrated history of fruitful deals."
      ); updateTranslations(
        textKeys.p5,
        "3. Set the Right Price"
      ); updateTranslations(
        textKeys.p6,
        "Deciding the correct cost for your property is urgent. Let your agent closely examine the property and highlight your property features so they can explain them to potential buyers. Consider factors like area, property size, conveniences, and condition while estimating your property price correctly."
      ); updateTranslations(
        textKeys.p7,
        "4. Powerful Advertising and Advancement"
      ); updateTranslations(
        textKeys.p8,
        "To draw in expected purchasers, you want to advertise your property. Use online stages, virtual tours and land sites to exhibit your property’s unique highlights. Proficient photos, virtual visits, and itemized deductions can have a tremendous effect on drawing in possible purchasers."
      ); updateTranslations(
        textKeys.p9,
        "5. Complete the Mandatory Paperwork"
      ); updateTranslations(
        textKeys.p10,
        "When you get offers from intrigued purchasers, now is the ideal time to arrange the deal’s details. Our agent will direct you through this cycle from the NOC to the transfer process. To avoid delays in the property sale, get all the required paperwork ready, including your valid passport and visa( if you’re an expat), the Title Deed, the Affection Plan, maintenance fees receipts, Dubai Electricity and Water Authority (DEWA) bills, and the tenancy agreement (if applicable)."
      );
      updateTranslations(
        textKeys.p11,
        "6. Sign the MOU and Pay Off the Mortgage"
      ); updateTranslations(
        textKeys.p12,
        "After accepting the home-sale offer, signing a legally binding agreement with the buyer called a Memorandum of Understanding (MOU), which outlines every detail and terms of the sale, is necessary."
      ); updateTranslations(
        textKeys.p13,
        "If your property is mortgaged with a bank/lender, apply for a Liability Letter stating the total outstanding amount remaining. This can take up to two weeks. Henceforth, the buyer commits to settling the mortgage to obtain a clearance certificate, the original title deed, and all other security documents."
      ); updateTranslations(
        textKeys.p14,
        "7. Close the deal"
      );
      updateTranslations(
        textKeys.p15,
        "Complete the property ownership transfer to the new owner by visiting the Dubai Land Department. Once done, you will receive your payment as a manager’s cheque. A new Title Deed will be issued to the new property owner."
      ); updateTranslations(
        textKeys.p16,
        "Selling your property in Dubai requires careful planning, expert advice, and attention to detail. By following the steps outlined in our comprehensive sellers guide, you’ll be well-prepared to navigate the sales process with confidence and achieve a successful sale."
      );
  }, [language, updateTranslations]);



  return (
    <div>
       <Helmet>
        <title>Sellers Guide  </title>
        <meta
          name="title"
          content="Sell property in Dubai explore best guide to help you get started"
        />
        <meta
          name="description"
          content="Want to sell a property in Dubai? HJ Real Estates is available to guide you through the Dubai property selling process. With this seller’s guide, you can easily navigate the sales process with confidence and achieve a successful sale."
        />
        <meta name="keywords" content="Sell Property in Dubai" />
        {/* <link rel="canonical" href="https://www.omkatech.com/services/designing"></link> */}

        <meta name="robots" content="index, follow" />
      </Helmet>
      <NavToAll />

      <div className="container mt-2" style={{ padding: "50px" }}>
        <div className="row">
          <div
            className="col-md-8 col-12 col-sm-12 hide-scrollbar container"
            style={{ height: "600px", overflowY: "scroll" }}
          >
            <p className="mortgage-p">
              {translations[textKeys.Ours] || "Loading..."}{" "}
            </p>
            <br />
          
            <p className="mortgage-p" style={{fontWeight:"bold"}}>
              {translations[textKeys.whyis] || "Loading..."}
             
            </p> 
            <p className="mortgage-p">
              {translations[textKeys.thep] || "Loading..."}
             
            </p>
            <p className="mortgage-p" style={{fontWeight:"bold"}}>
              {translations[textKeys.p1] 
              || "Loading..."}
             
            </p> <p className="mortgage-p">
              {translations[textKeys.p2] || "Loading..."}
             
            </p> <p className="mortgage-p" style={{fontWeight:"bold"}}>
              {translations[textKeys.p3] || "Loading..."}
             
            </p> <p className="mortgage-p">
              {translations[textKeys.p4] || "Loading..."}
             
            </p> <p className="mortgage-p" style={{fontWeight:"bold"}}>
              {translations[textKeys.p5] || "Loading..."}
             
            </p> <p className="mortgage-p" >
              {translations[textKeys.p6] || "Loading..."}
             
            </p> <p className="mortgage-p" style={{fontWeight:"bold"}}>
              {translations[textKeys.p7] || "Loading..."}
             
            </p> <p className="mortgage-p">
              {translations[textKeys.p8] || "Loading..."}
             
            </p> <p className="mortgage-p" style={{fontWeight:"bold"}}>
              {translations[textKeys.p9] || "Loading..."}
             
            </p> <p className="mortgage-p">
              {translations[textKeys.p10] || "Loading..."}
             
            </p> <p className="mortgage-p" style={{fontWeight:"bold"}}>
              {translations[textKeys.p11] || "Loading..."}
             
            </p> <p className="mortgage-p" >
              {translations[textKeys.p12] || "Loading..."}
             
            </p> <p className="mortgage-p" >
              {translations[textKeys.p13] || "Loading..."}
             
            </p> <p className="mortgage-p" style={{fontWeight:"bold"}}>
              {translations[textKeys.p14] || "Loading..."}
             
            </p> <p className="mortgage-p">
              {translations[textKeys.p15] || "Loading..."}
             
            </p>
            <p className="mortgage-p" style={{fontStyle:"italic"}}>
              {translations[textKeys.p16] || "Loading..."}
             
            </p>
           
      
          </div>

          <div className="col-md-4 col-12 col-sm-12">
            <div className=".img-fluid ">
              <Link to="/Contactus">
                {" "}
                <img
                  src="../img/banner.png"
                  alt="Apartment Ad"
                  className="img-fluid"
                  style={{ cursor: "pointer" }}
                />{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SellerGuide;