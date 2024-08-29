import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import Footer from "../component/Footer";
import { Helmet } from 'react-helmet';
import "../css/Guide.css";
import { GoArrowUpRight } from "react-icons/go";
import NavToAll from "../component/NavToAll";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { useLanguage } from '../LanguageContext';

const Guide = () => {
  // const { id } = useParams();
 
  const location = useLocation();
 
  const [id, setId] = useState(location.state?.id || localStorage.getItem('id') || null);
  const [property, setProperty] = useState(location.state?.property || null);
  const { language, translations, updateTranslations } = useLanguage();
  const [translatedEditorContent, setTranslatedEditorContent] = useState('');

  console.log("iddd",id)
  const fetchProperty = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/areaguide/${id}`);
      const fetchedProperty = response.data;
      setProperty(fetchedProperty);
    } catch (error) {
      console.error("Error fetching property data:", error);
    }
  };
  
  const textKeys = {
    GudieHeading: 'GudieHeading',
    Properties: 'Properties',
    GudieRequest: 'GudieRequest',
    GudieWhatsapp: 'GudieWhatsapp',
    Location:'Location',
    why:'why',
    find:'find',
    you:'you',
    areas:'areas',
    View:'View'
  };

  useEffect(() => {
    // Update translations for each text key
    updateTranslations(textKeys.GudieHeading, 'Areas in Dubai');
    updateTranslations(textKeys.Properties, 'Properties');
    updateTranslations(textKeys.GudieRequest, 'Request Details');
    updateTranslations(textKeys.GudieWhatsapp, 'Click to WhatsApp'); 
    updateTranslations(textKeys.Location, 'Location'); 
    updateTranslations(textKeys.areas, 'don’t worry. There are other areas to explore.');    
    updateTranslations(textKeys.why, ' Why Invest in'); 
    updateTranslations(textKeys.View, 'View All Areas'); 
    updateTranslations(textKeys.you, 'If you couldn’t find what you were looking for,');
    updateTranslations(textKeys.find, ' Didn t Find What You Were Searching For?');
   
  }, [language, updateTranslations]);
  

  useEffect(() => {
    if (!property) {
      fetchProperty();
    }
  }, [id]);

  useEffect(() => {
    if (property) {
      // Update translations for dynamic data when language changes
      updateTranslations(`title${property.id}`, property.title);
      updateTranslations(`description${property.id}`, property.description); 
    }
  }, [language, property, updateTranslations]);

  if (!property) {
    return <div>No guides data available.</div>;
  }

  const phoneNumber = '1234567890'; // Replace with the actual number
  const email = 'example@gmail.com'; // Replace with the actual email
  const message = 'Hello, I would like to inquire about...'; // Replace with your message
  const subject = 'Inquiry about...'; // Replace with your subject


  const items = [
    { icon: "fa fa-credit-card", text: "Community is known for buying affordable villas" },
    { icon: "fa fa-tree", text: "Gardens and Parks" },
    { icon: "fa fa-chart-line", text: "Enjoy the guaranteed ROI" },
    { icon: "fa fa-building", text: "Better amenities and social infrastructures" },
    { icon: "fa fa-futbol", text: "Outdoor & Indoor Sports Facilities" },
    { icon: "fa fa-shopping-cart", text: "Retail & Dining Options" },
    { icon: "fa fa-hospital", text: "Near Hospital" },
    { icon: "fa fa-dumbbell", text: "Fitness Centre" },
  ];

  // useEffect(() => {
  //   // Update translations for each item dynamically
  //   items.forEach((item, index) => {
  //     updateTranslations(`itemText${index}`, item.text);
  //   });
  // }, [language, updateTranslations, items]);

  // useEffect(() => {
  //   // Replace placeholders in the editor content with translated text
  //   if (property) {
  //     let content = property.editor;
  //     items.forEach((item, index) => {
  //       content = content.replace(`{{itemText${index}}}`, translations[`itemText${index}`] || item.text);
  //     });
  //     setTranslatedEditorContent(content);
  //   }
  // }, [language, property, translations]);
  return (
    <div>
          <Helmet>
      <title>{property.PageName} </title>
      <meta name="title" content={property.seoTitle} />
      {/* need to chng desc */}
        <meta name="description" content={property.seoDesc}  />
        <meta name="keywords" content={property.seoKeyword}  />
        {/* <link rel="canonical" href="https://www.omkatech.com/services/designing"></link> */}

        <meta name="robots" content="index, follow" />
      </Helmet>
      <NavToAll />
      <br /><br />
      <div className="body">
        <div className="container">
          <div className="row g ">
            <div className="col-12 col-md-12 col-lg-8 g1 hide-scrollbar">
              <div className="banner">
                <img
                  src={property.featureImage}
                  className="img"
                  alt="Arjan Dubai Community"
                />
                <div className="overlayGuide"></div>
              </div>
              <div className="banner-content">
                <h1>
                  {translations[`title${property.id}`] || property.title}
                </h1>
              </div>
              <br />
              <p>
              {translations[`description${property.id}`] || property.description} 
                <br />
                <div className="breakpoint"></div>
              </p>
              <br /> 
              <h2 style={{ color: "#333538" }}>{translations[textKeys.Properties] || 'Loading...'}</h2>
              <div
                className="rent-pp"
                 dangerouslySetInnerHTML={{ __html: property.editor || property.editor }} />
              
              <br />
              <div className="breakpoint"></div>
              <br />
              <h2 style={{ fontWeight: "600px", color: "#333538" }}>{translations[textKeys.Location] || 'Loading...'}</h2><br />
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7228.427936398969!2d55.238993!3d25.060736!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6e62bc9cf949%3A0x643f68939c298463!2sArjan-Dubailand%20-%20Al%20Barsha%20South%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sus!4v1716182434337!5m2!1sen!2sus"
                className="col-md-12 col-12"
                height="300px"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
              <br /><br />
              <h2>{translations[textKeys.why] || 'Loading...'} {property.shortTitle}?</h2>
              <div className="item-list">
              {items.map((item, index) => (
                  <div key={index} className="item-card">
                    <div className="text1">
                      <i
                        className={item.icon}
                        style={{ color: "#16248c" }}
                        id="iconsize"
                      ></i>
                      <br />
                      {translations[`itemText${index}`] || item.text}
                    </div>
                  </div>
                ))}
              </div>
              <br />
              <div className="breakpoint"></div>
              <br />
              <div className="cta-section">
                <div className="cta-content">
                  <h3>{translations[textKeys.find] || 'Loading...'}</h3>
                  <p>
                  {translations[textKeys.you] || 'Loading...'}    <br /> 
                  {translations[textKeys.areas] || 'Loading...'} 
                
                  </p>
                  <button className="cta-button">
                  {translations[textKeys.View] || 'Loading...'}     &nbsp;<GoArrowUpRight style={{ fontSize: "15px" }} />
                  </button>
                </div>
                <div className="cta-image">
                  <img src="../img/build.png" alt="Dubai Skyline" />
                </div>
              </div>
            </div>
            <div className="col-12 col-md-12 col-lg-4 g2">
              <div className="banner2 img-fluid">
                <div className="contact-info">
                  <button className="text" onClick={() => { window.open(`tel:${phoneNumber}`, '_self'); }}>
                    <FiPhone style={{ fontSize: "22px" }} /> +971 4326 2191
                  </button>
                  <button className="request-details" onClick={() => { window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`, '_blank'); }}>
                    <MdOutlineEmail style={{ fontSize: "22px" }} /> {translations[textKeys.GudieRequest] || 'Loading...'}
                  </button>
                  <button className="whatsapp" onClick={() => { window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank'); }}>
                    <FaWhatsapp style={{ fontSize: "22px" }} /> {translations[textKeys.GudieWhatsapp] || 'Loading...'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div><br />
      <Footer />
    </div>
  );
};

export default Guide;
