import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Footer from "../component/Footer";
import { Helmet } from 'react-helmet';
import NavToAll from '../component/NavToAll';
import { FiPhone } from 'react-icons/fi';
import { MdArrowRightAlt, MdOutlineEmail } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '../LanguageContext';

const Areaguide = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [properties, setProperties] = useState([]);
  const propertiesPerPage = 8; // Number of properties to display per page
  const { language, translations, updateTranslations } = useLanguage();


  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/get-areaguide');
        const fetchedProperties = response.data;

        // Update translations for dynamic data
        fetchedProperties.forEach(property => {
          updateTranslations(`shortTitle_${property.id}`, property.shortTitle);
        });

        setProperties(fetchedProperties);
        // setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties data:', error);
      }
    };

    fetchProperties();
  }, [updateTranslations]);

  if (!properties) {
    return <div>No areaguide data available.</div>;
  }

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);

  const handleCardClick = (property) => {

    navigate(`/guide/${property.slug}`, { state: { property, id: property.id } });
    localStorage.setItem('id', property.id);
 // Navigate to /guide and pass property data
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const phoneNumber = '1234567890'; // Replace with the actual number
  const email = 'example@gmail.com'; // Replace with the actual email
  const message = 'Hello, I would like to inquire about...'; // Replace with your message
  const subject = 'Inquiry about...'; // Replace with your subject

  
  const textKeys = {
    GudieHeading: 'GudieHeading',
    GudieButton: 'GudieButton',
    GudieRequest:'GudieRequest',
    GudieWhatsapp:'GudieWhatsapp',
    
 
      // quote: 'quote',
      
  };

  useEffect(() => {
    // Update translations for each text key
 
    updateTranslations(textKeys.GudieHeading, 'Areas in Dubai'); 
    updateTranslations(textKeys.GudieButton, 'EXPLORE');
    updateTranslations(textKeys.GudieRequest, ' Request Details');

    updateTranslations(textKeys.GudieWhatsapp, 'Click to WhatsApp');


    // updateTranslations(textKeys.founderTitle, 'Founder of HJ Real Estates');
}, [language, updateTranslations]);

  return (
    <div>
        <Helmet>
      <title>Area Guide </title>
      <meta name="title" content="Area Guide" />
      {/* need to chng desc */}
        <meta name="description" content="We understand the needs of investors also guide our investors well and provide latest information about real estate. " />
        <meta name="keywords" content="Area Guide" />
        {/* <link rel="canonical" href="https://www.omkatech.com/services/designing"></link> */}

        <meta name="robots" content="index, follow" />
      </Helmet>
      <NavToAll/>
      <div className="body">
      <div className="container">
        <div className="row mt-5">
          <div className="col-12">
            <h1 className="areag-h1">  {translations[textKeys.GudieHeading] || 'Loading...'}</h1>
          </div>
        </div>
        <div className="container" style={{marginTop:"70px"}}>
  <div className="row g-3">
    <div className="col-md-12 col-12 col-lg-8 g1 hide-scrollbar">
      <div className="row">
        {currentProperties.map((property) => (
          <div className="col-lg-6 col-md-12 mb-4" key={property.id}>
            <div className="" style={{ border: "none" }} onClick={() => handleCardClick(property)}>
              <img src={property.featureImage} className="card-img-areaguide img-fluid" alt={property.title} />
              <div className="card-body mt-3">
                <h4  id='ghover'>     {translations[`shortTitle_${property.id}`] || property.shortTitle}</h4>
                <h6 className="mt-3 " id='ghover1' style={{fontSize:"13px",fontWeight:"bold"}}>{translations[textKeys.GudieButton] || 'Loading...'} <MdArrowRightAlt /></h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="col-lg-4 col-12 col-md-12  g2">
      <div className="banner2 img-fluid">
        <div className="contact-info">
          <button className="  text" onClick={() => { window.open(`tel:${phoneNumber}`, '_self'); }}>
          <FiPhone style={{fontSize:"22px"}} /> +971 4326 2191
          </button>
          <button className=" request-details" onClick={() => { window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`, '_blank'); }}>
          <MdOutlineEmail style={{fontSize:"22px"}} /> {translations[textKeys.GudieRequest] || 'Loading...'}
          </button>
          <button className=" whatsapp" onClick={() => { window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank'); }}>
          <FaWhatsapp style={{fontSize:"22px"}}  />{translations[textKeys.GudieWhatsapp] || 'Loading...'} 
          </button>
        </div>
      </div>
    </div>
  </div>

  {/* Pagination */}
  <div className="row mt-4">
    <div className="col-md-12">
      <ul className="pagination justify-content-center">
        {[...Array(Math.ceil(properties.length / propertiesPerPage)).keys()].map((number) => (
          <li key={number} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
            <button onClick={() => paginate(number + 1)} className="page-link">
              {number + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
</div>

      </div></div>
      <Footer />
    </div>
  );
};

export default Areaguide;
