import React, { useState, useEffect } from "react";

import Footer from "../component/Footer";

import NavToAll from "../component/NavToAll";

import { Link } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import { Helmet } from "react-helmet";


const BuyerGuide= () => {

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
    p17:"p17",
    p18:"p18",
    p19:"p19",
    p20:"p20",
    p21:"p21",
    p22:"p22",
  
  
    
  };

  useEffect(() => {
    // Update translations for each text key

    updateTranslations(
      textKeys.Ours,
      "A renowned real estate buyers’ guide can help navigate the complex Dubai real estate landscape. From addressing common challenges to emphasizing crucial considerations, HJ Real Estates is your trusted partner to offer professional advice about investing in Dubai’s real estate and to help you buy property in Dubai."
    );
    
    updateTranslations(
        textKeys.whyis,
        "Check our Home Buyers Guide"
      );
      updateTranslations(
        textKeys.thep,
        "Here you can know the points help you Buy Property in Dubai:"
      );
  
      updateTranslations(
        textKeys.p1,
        "1. Detail budget Discussion"
      );
      updateTranslations(
        textKeys.p2,
        "When you buy a home in Dubai, consider your budgetary limits. Beyond the property’s cost, it’s essential to factor in all associated fees to avoid surprises."
      );
      updateTranslations(
        textKeys.p3,
        "2. Evaluate Means of Financing"
      );
      updateTranslations(
        textKeys.p4,
        "Various financing options are available for purchasing a house in Dubai, with one famous avenue being mortgages. A mortgage would mandate a minimum down payment of 25% for property financing. We help you contact the advisor to know everything beforehand"
      ); updateTranslations(
        textKeys.p5,
        "3. Finding the right property"
      ); updateTranslations(
        textKeys.p6,
        "Explore a selection of properties tailored to your criteria. Whether you want to buy a house in Dubai or are looking to invest in the best Off Plan Projects in Dubai, our diverse portfolio helps you find the right properties in Dubai."
      ); updateTranslations(
        textKeys.p7,
        "4. Consideration of Key Factors"
      ); updateTranslations(
        textKeys.p8,
        "Dubai offers an abundance of choices for homebuyers who are interested in buying Dubai Properties. Together, we will check all the possible locations, amenities, current market trends, and future growth potential for your budget and preferences. We can help a great deal here!"
      ); updateTranslations(
        textKeys.p9,
        "5. Thoughtful Inspection"
      ); updateTranslations(
        textKeys.p10,
        "We suggest maintaining an open mind and keen observation while inspecting properties in any off-plan projects in Dubai. We recommend considering various reasons for and against the purchase, overlooking replaceable furnishings. Remember, buying a property is a significant investment."
      );
      updateTranslations(
        textKeys.p11,
        "6. Great Negotiations"
      ); updateTranslations(
        textKeys.p12,
        "Our adept and professional negotiators help you secure the best deal on Dubai properties. From price negotiations to favorable terms, we advocate on your behalf. We aim to get you the best deal!"
      ); updateTranslations(
        textKeys.p13,
        "7. Dealing with the Legalities"
      ); updateTranslations(
        textKeys.p14,
        "With us, you can be assured of compliance with all legal requirements associated with the acquisition of Dubai properties. We assist you, starting right from the documentation to adhering to the regulatory norms, and keep you well informed about the regulatory updates, making your journey hassle-free."
      );
      updateTranslations(
        textKeys.p15,
        "8. Securing the Offer"
      ); updateTranslations(
        textKeys.p16,
        "Upon acceptance of the offer, sign a legally binding Memorandum of Understanding. Provide a passport copy to the broker, a 10% deposit to the agency (never directly to the seller), and issue a post-dated check to the broker’s company for the agreed-upon commission. These steps ensure a secure and transparent property transaction process. We can guide you through all the requirements before and after closing the deal."
      ); updateTranslations(
        textKeys.p17,
        "9. Post Sale Support"
      ); updateTranslations(
        textKeys.p18,
        "After you buy a home in Dubai, post-sale support is available at HJ Real Estates. Our commitment extends beyond the sale of property maintenance services, which includes any matters relating to Dubai real estate."
      ); updateTranslations(
        textKeys.p19,
        "10. Expert Advice Required"
      ); updateTranslations(
        textKeys.p20,
        "This Dubai property buyer’s guide is quite vital to your real estate journey, as it is no less than a property expert that turns every decision of yours fruitful."
      );
      updateTranslations(
        textKeys.p21,
        "Every step outlined in this buyer’s guide is crucial to the real estate journey. Make the indispensable choice of having expert advice at every turn."
      );updateTranslations(
        textKeys.p22,
        "You can always rely on the reliable Dubai real estate channel partner, HJ Real Estates for quality property management services in Dubai."
      );
  }, [language, updateTranslations]);



  return (
    <div>
      <Helmet>
        <title>Buyers Guide</title>
        <meta
          name="title"
          content="Buy Property in Dubai | Best points to help you get started
"
        />
        <meta
          name="description"
          content=" Are you looking to buy property in Dubai? Follow the Dubai’s home buying guide and turn your dream home into reality. Navigate Dubai real estate market with confidence with HJ Real Estates."
        />
        <meta name="keywords" content="Buy Property in Dubai
" />
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
             
            </p> <p className="mortgage-p">
              {translations[textKeys.p12] || "Loading..."}
             
            </p> <p className="mortgage-p" style={{fontWeight:"bold"}}>
              {translations[textKeys.p13] || "Loading..."}
             
            </p> <p className="mortgage-p">
              {translations[textKeys.p14] || "Loading..."}
             
            </p> <p className="mortgage-p"style={{fontWeight:"bold"}}>
              {translations[textKeys.p15] || "Loading..."}
             
            </p>
            <p className="mortgage-p">
              {translations[textKeys.p16] || "Loading..."}
             
            </p>
            <p className="mortgage-p" style={{fontWeight:"bold"}}>
              {translations[textKeys.p17] || "Loading..."}
             
            </p> <p className="mortgage-p">
              {translations[textKeys.p18] || "Loading..."}
             
            </p> <p className="mortgage-p" style={{fontWeight:"bold"}}>
              {translations[textKeys.p19] || "Loading..."}
             
            </p> <p className="mortgage-p">
              {translations[textKeys.p20] || "Loading..."}
             
            </p> <p className="mortgage-p">
              {translations[textKeys.p21] || "Loading..."}
             
            </p><p className="mortgage-p">
              {translations[textKeys.p22] || "Loading..."}
             
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

export default BuyerGuide;
