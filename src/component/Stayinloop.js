import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import Swal from 'sweetalert2';


const Stayinloop = () => {
  const [showPopup, setShowPopup] = useState(false); // State for controlling popup visibility
  const [mail, setMail] = useState("");
  const [offplan, setOffplan] = useState([]);
  const [filteredPropertiess, setFilteredProperties] = useState([]);
  const { language, translations, updateTranslations } = useLanguage();
  const [loading, setLoading] = useState(false); // Add loading state

  const navigate = useNavigate();
    // Define translation keys for the texts
    const textKeys = {
      LoopHeading: 'LoopHeading',
       LoopHeading1: 'LoopHeading1',
        LoopHeading2: 'LoopHeading2', 
        Formloopheading: 'Formloopheading',
        AboutHJ: 'AboutHJ',
        ContactUs: 'ContactUs',
        Blog: 'Blog',
        RealEstate: 'RealEstate',
        PropertyManagement: 'PropertyManagement',
        SellProperty: 'SellProperty',
        ApartmentsForSale: 'ApartmentsForSale',
        VillaForSale: 'VillaForSale',
        StudiosForSale: 'StudiosForSale',
        OffPlanProjects: 'OffPlanProjects',
        TownhouseForSale: 'TownhouseForSale',
        BuyApartment: 'BuyApartment',
        ApartmentsForSaleDubai: 'ApartmentsForSaleDubai',
        DubaiApartmentsForSale: 'DubaiApartmentsForSale',
        MarinaApartments: 'MarinaApartments',
        MBRCityApartments: 'MBRCityApartments',
        Stayinloop: 'Stayinloop',
        Formloopdsc: 'Formloopdsc',
        StayinloopDsc: 'StayinloopDsc',   
        Subbutton: 'Subbutton',  
        // quote: 'quote',
        
    };

  const Visibility = () => {
    setShowPopup(true); // Show popup after calculating payment
  };

  // Function to toggle popup visibility
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };



  const handleEmailChange = (e) => {
    setMail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { mail };
  
    setLoading(true); // Show loading spinner/logo
  
    try {
      const response = await axios.post(
        "http://localhost:4000/api/send-email",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Swal.fire({
        icon: 'success',
        title: 'Thank you!',
        text: 'Thanks for reaching out. We will get back to you soon.'
      });
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
  }
  useEffect(() => {
    if (showPopup) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [showPopup]);

  useEffect(() => {
    // Update translations for each text key
 
    updateTranslations(textKeys.LoopHeading, 'Dubai Properties'); 
    updateTranslations(textKeys.LoopHeading1, 'Popular Searches');
    updateTranslations(textKeys.LoopHeading2, 'Trending Searches');
    updateTranslations(textKeys.Formloopheading, 'Join Our Community!');
    updateTranslations(textKeys.AboutHJ, 'About HJ Real Estates');
    updateTranslations(textKeys.ContactUs, 'Contact Us');
    updateTranslations(textKeys.Blog, 'Dubai Real Estate Blog');
    updateTranslations(textKeys.RealEstate, 'Dubai Real Estate');
    updateTranslations(textKeys.PropertyManagement, 'Property Management Dubai');
    updateTranslations(textKeys.SellProperty, 'Sell Your Property in Dubai');
    updateTranslations(textKeys.ApartmentsForSale, 'Apartments for sale in Dubai');
    updateTranslations(textKeys.VillaForSale, 'Villa for sale in Dubai');
    updateTranslations(textKeys.StudiosForSale, 'Studios for sale in JVT');
    updateTranslations(textKeys.OffPlanProjects, 'Off plan projects in Dubai');
    updateTranslations(textKeys.TownhouseForSale, 'Townhouse for sale in Dubai');
    updateTranslations(textKeys.BuyApartment, 'Buy apartment in Dubai');
    updateTranslations(textKeys.ApartmentsForSaleDubai, 'Apartments for sale Dubai');
    updateTranslations(textKeys.DubaiApartmentsForSale, 'Dubai Apartments for Sale');
    updateTranslations(textKeys.MarinaApartments, 'Apartments for sale in Dubai Marina');
    updateTranslations(textKeys.MBRCityApartments, 'Apartments for sale in MBR City');
    updateTranslations(textKeys.Stayinloop, ' Stay in the loop !'); 
    updateTranslations(textKeys.Formloopdsc, 'We’re committed to your privacy. HJ Real Estates uses the information you provide to us to contact you about our relevantcontent, properties, and services. You may unsubscribe from these communications at any time. For more information, check out ourprivacy policy.'); 
    updateTranslations(textKeys.StayinloopDsc, ' Subscribe now for exclusive real-estate content and  investment opportunities straight to your inbox    '); 
    updateTranslations(textKeys.Subbutton, 'Subscribe');  
    // updateTranslations(textKeys.founderTitle, 'Founder of HJ Real Estates');
}, [language, updateTranslations]);

useEffect(() => {
  // Fetch data from the API when the component mounts
  const fetchProperties = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/get-offplan"
      );
      setOffplan(response.data);
    } catch (error) {
      console.error("Error fetching properties data:", error);
    }
  };

  fetchProperties();

}, []);

const filterProperties = (type) => {
  console.log("apartment", type);
  const filtered = offplan.filter(property => property.propertyType === type);
  setFilteredProperties(filtered);
  console.log("apartment", filtered);
  navigate("/NewRoffplan", { state: { filteredPropertiess: filtered } });
};
  return (
    <div>
      <div className="container">
        {/* stay in loop */}
        <div className="footerloop" style={{marginTop:"10px"}}>
          <div className="row">
            <div className="col-md-9">
              <div className="footerloop-columns">
                <div className="footerloop-column">
                  <h4> {translations[textKeys.LoopHeading] || 'Loading...'}</h4>
                  <ul>
                   <Link to="about"><li>{translations[textKeys.AboutHJ] || 'Loading...'}</li></Link> 
                   <Link to="contactus"> <li>{translations[textKeys.ContactUs] || 'Loading...'}</li></Link> 
                   <Link to="blogs"> <li>{translations[textKeys.Blog] || 'Loading...'}</li></Link> 
                   <Link to="/"> <li>{translations[textKeys.RealEstate] || 'Loading...'}</li></Link> 
                   <Link to="/"> <li>{translations[textKeys.PropertyManagement] || 'Loading...'}</li></Link> 
                   <Link to="sell-your-property-with-us">  <li>{translations[textKeys.SellProperty] || 'Loading...'}</li></Link>
                  </ul>
                </div>
                <div className="footerloop-column">
                  <h4>  {translations[textKeys.LoopHeading1] || 'Loading...'}</h4>
                  <ul>
                  <Link onClick={() => filterProperties('Apartment')}>
          <li>{translations[textKeys.ApartmentsForSale] || 'Loading...'}</li>
        </Link>
        <Link  onClick={() => filterProperties('Villa')}>
          <li>{translations[textKeys.VillaForSale] || 'Loading...'}</li>
        </Link>
        <Link  onClick={() => filterProperties('Studio')}>
          <li>{translations[textKeys.StudiosForSale] || 'Loading...'}</li>
        </Link>
        <Link  onClick={() => filterProperties('OffPlan')}>
          <li>{translations[textKeys.OffPlanProjects] || 'Loading...'}</li>
        </Link>
        <Link  onClick={() => filterProperties('Townhouse')}>
          <li>{translations[textKeys.TownhouseForSale] || 'Loading...'}</li>
        </Link>
                  </ul>
                </div>
                <div className="footerloop-column">
                  <h4> {translations[textKeys.LoopHeading2] || 'Loading...'}</h4>
                  <ul>
                  <li>{translations[textKeys.BuyApartment] || 'Loading...'}</li>
                    <li>{translations[textKeys.ApartmentsForSaleDubai] || 'Loading...'}</li>
                    <li>{translations[textKeys.DubaiApartmentsForSale] || 'Loading...'}</li>
                    <li>{translations[textKeys.MarinaApartments] || 'Loading...'}</li>
                    <li>{translations[textKeys.MBRCityApartments] || 'Loading...'}</li>
                  </ul>
                </div>
              </div>
              <div className="subscribe-section mb-2">
                <i 
                  className="fa fa-envelope-o"
                  style={{ fontSize: "40px", padding: "20px" ,  color: "black"}}
                ></i>
                <p>
                  {" "}
                  <strong style={{color:"black"}}> {translations[textKeys.Stayinloop] || 'Loading...'}</strong>
                  <br/>
                  {translations[textKeys.StayinloopDsc] || 'Loading...'} 
                </p>
                <button className="subscribe-button" onClick={Visibility}>
                  
                  {translations[textKeys.Subbutton] || 'Loading...'} 
                </button>
              </div>
            </div>
            <div className="col-md-3">
              {" "}
              <div className="footerloop-column ad-column">
               <Link to="/Contactus"> <img src="../img/banner.png" alt="Apartment Ad"  style={{cursor:"pointer"}}/></Link>
              </div>
            </div>

          </div>
        </div>
      </div>
      {showPopup && (
        <div className="popup-form">
        <div className="popup-content">
          <button className="close-popup-subscribe" onClick={togglePopup}>
            ×
          </button>
          <div className="row">
            <h4 className="col-md-12">{translations[textKeys.Formloopheading] || 'Loading...'}</h4>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                required
                onChange={handleEmailChange}
                value={mail}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary col-md-12"
              style={{ borderRadius: "6px", backgroundColor: "#2c378f" }}
            >
              Submit
            </button>
            <hr />
            <div className="form-group">
              <p style={{ fontSize: "10px" }}>
              {translations[textKeys.Formloopdsc] || 'Loading...'}
           
              </p>
            </div>
          </form>
        </div>
      </div>
      )}
        {loading && (
        <div style={styles.loadingOverlay}>
          <div >
            <img src="../img/with-background.gif" alt="Loading..." style={styles.loadingLogo} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Stayinloop;
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