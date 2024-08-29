import React, { useState, useEffect } from "react";

import Footer from "../component/Footer";

import NavToAll from "../component/NavToAll";

import { Link } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import { Helmet } from "react-helmet";


const Property = () => {

  const { language, translations, updateTranslations } = useLanguage();
  const textKeys = {
    Ours: "Ours",
    We: "We",
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
  
    
  };

  useEffect(() => {
    // Update translations for each text key

    updateTranslations(
      textKeys.Ours,
      "Our dedicated property management service is not a one-size-fits-all approach but a personalized experience crafted by a team of the best real estate professionals."
    );
    updateTranslations(
      textKeys.We,
      "We believe in quality over quantity, emphasizing a commitment to excellence beyond routine management. We have earned a reputation for providing the best Property Management Services in Dubai for safeguarding, optimizing, and caring for your property with a commitment to unparalleled quality."
    );
    updateTranslations(
        textKeys.whyis,
        "Why is HJ Real Estates the best Property Management Company?"
      );
      updateTranslations(
        textKeys.thep,
        "The Property Managers at HJ Real Estates possess a higher level of expertise in real estate services, facilitating peace of mind for investors. As a landlord, be assured that an unbiased third party safeguards your property, deposit, and tenant. Our professional property managers efficiently handle and address the often time-consuming day-to-day challenges that may emerge with property ownership."
      );
  
      updateTranslations(
        textKeys.p1,
        "Our Expertise"
      );
      updateTranslations(
        textKeys.p2,
        "These property management areas we reach:"
      );
      updateTranslations(
        textKeys.p3,
        "1. Comprehensive Property Management"
      );
      updateTranslations(
        textKeys.p4,
        "Being the most reliable property management Dubai company, we provide a comprehensive real estate solution to our clients, starting with tenant screening and documentation, ensuring statutory compliance, and fulfilling the regulatory requirements of the government."
      ); updateTranslations(
        textKeys.p5,
        "We manage all aspects, from tenant check-in to check-out, leaving no loose ends."
      ); updateTranslations(
        textKeys.p6,
        "2. Tenant Check-In"
      ); updateTranslations(
        textKeys.p7,
        "Following all the best practices of efficient property management services in regards to documentation and verification, we go beyond that to serve extended benefits to property investors."
      ); updateTranslations(
        textKeys.p8,
        "Our dedicated property managers carry out a stringent property inspection to check the condition of the premise and record the same before the property is occupied. We ensure a hassle-free transition of tenant check-in after verifying the completion of the rental agreem"
      ); updateTranslations(
        textKeys.p9,
        "3. Maintaining Tenancy"
      ); updateTranslations(
        textKeys.p10,
        "Managing and maintaining tenancy while meeting the desired service quality is the core objective of an efficient property management company in Dubai, and we boast of providing the best property management services. Maintaining long-term relationships is our prime objective."
      );
      updateTranslations(
        textKeys.p11,
        "4. RERA Compliance Assurance"
      ); updateTranslations(
        textKeys.p12,
        "We have a tenured reputation in the real estate sector and are renowned for our property management in Dubai. We have always been compliant with government guidelines and have especially given priority to RERA requirements. Be it Off Plan Projects in Dubai or any Dubai Properties, we have adhered to all the statutory mandates notified by RERA and the Dubai Land Department"
      ); updateTranslations(
        textKeys.p13,
        "5. Resolve Failed Rental Payments"
      ); updateTranslations(
        textKeys.p14,
        "In the dynamic realm of property management companies, we excel at navigating challenges, including managing failed rental payments. Our dedicated team is adept at swiftly addressing and resolving issues related to rental payment discrepancies, ensuring a fair and effective resolution that protects the interests of property owners and maintains positive tenant relationships."
      );

  
  }, [language, updateTranslations]);



  return (
    <div>
      <Helmet>
        <title>Property Management Dubai</title>
        <meta
          name="title"
          content="Property Management Dubai | Top Property management services in Dubai"
        />
        <meta
          name="description"
          content=" Get the property management Dubai, right from safeguarding, optimizing, and caring for your property with a commitment to delivering quality over quantity. ."
        />
        <meta name="keywords" content="Property Management Dubai" />
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
            <p className="mortgage-p">
              {translations[textKeys.We] || "Loading..."}
             
            </p>
          
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
             
            </p> <p className="mortgage-p">
              {translations[textKeys.p5] || "Loading..."}
             
            </p> <p className="mortgage-p" style={{fontWeight:"bold"}}>
              {translations[textKeys.p6] || "Loading..."}
             
            </p> <p className="mortgage-p">
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

export default Property;
