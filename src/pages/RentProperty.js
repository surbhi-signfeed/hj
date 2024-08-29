


import React, { useState, useEffect ,useRef} from "react";
import PhoneInput from "react-phone-input-2";
import axios from "axios";
import Footer from "../component/Footer";
import { Helmet } from 'react-helmet';
import ImageGallery from "../component/ImageGallery";
import "../App.css";
import { useLocation, useParams } from "react-router-dom";
import { useCurrency } from "../CurrencyContext";
import Swal from "sweetalert2";
import NavToAll from "../component/NavToAll";
import Calculator from "./Calculator";
import { useLanguage } from '../LanguageContext';
import { FaBed, FaShower, FaExpand } from 'react-icons/fa';
const RentProperty = () => {
  const {
    currency,
    convertAmount,
    convertSqftToSqm,
    unit,
  } = useCurrency();

  const location = useLocation();
  const [id, setId] = useState(localStorage.getItem('id') || null);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [propertyName, setPropertyName] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [property, setProperty] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const { language, translations, updateTranslations } = useLanguage();
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [seoTitle, setseoTitle] = useState("");
  const [seoDes, setseoDes] = useState("");
  const [seoKeyword, setseoKeyword] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  //   // Fetch property data when the id or location changes

  console.log("idd",id)
    useEffect(() => {
      const fetchProperty = async () => {
        setIsFetching(true);
        
        try {
          const response = await axios.get(`http://localhost:4000/api/uploads-rent/${id}`);
          setProperty(response.data[0]);
          setPropertyName(response.data.title);
          setPropertyType(response.data.status);

          setPrice(response.data.price);
          setLat(response.data.lat);
          setLng(response.data.log);
     
        } catch (error) {
          console.error("Error fetching property data:", error);
        }
        setIsFetching(false);
      };
  
      fetchProperty();
    }, [id]);    //for here if language switcher not working === [location,property]
  console.log("ko",lat,lng)
    // Set property state if location.state is available
    useEffect(() => {
      if (location.state?.property) {
        setProperty(location.state.property);
      }
    }, [location]);
  useEffect(() => {
    console.log("Property received:", property); // Check if property is received
    if (property) {
      setPropertyName(property.title);
      setPropertyType(property.status);
      setPrice(property.price);
      setLat(property.lat);
      setLng(property.log);
      setseoTitle(property.title)
      setseoDes(property.seoDes);
      setseoKeyword(property.seoKeyword);
    }
  }, [property]);
  
  const textKeys = {
  
    KEY:'KEY',
    PropertyType:'PropertyType',
    FOR:'FOR',
    Purpose:'Purpose',
    Area:'Area',
    Room:'Room',
    Bathroom:'Bathroom',
    DESCRIPTION:'DESCRIPTION',
    Contact:'Contact',
    FACILITIES:'FACILITIES',
    Submit:'Submit',
    Location:'Location',

  
   };
  // / Update translations for each text key
  useEffect(() => {
    updateTranslations(textKeys.KEY, 'KEY INFORMATION');
    updateTranslations(textKeys.PropertyType, 'Property Type');
    updateTranslations(textKeys.FOR, 'FOR'); 
    updateTranslations(textKeys.Purpose, 'Purpose'); 
    updateTranslations(textKeys.Area, 'Area/Size');
    updateTranslations(textKeys.Room, 'Room'); 
    updateTranslations(textKeys.Submit, 'Submit');  
    updateTranslations(textKeys.Contact, ' Contact us for a visit'); 
    updateTranslations(textKeys.Location, 'Location'); 
    updateTranslations(textKeys.FACILITIES, ' PROPERTY FACILITIES & AMENITIES'); 
    updateTranslations(textKeys.Bathroom, 'Bathroom(s)');    
    updateTranslations(textKeys.DESCRIPTION, 'PROPERTY DESCRIPTION');   
   

  }, [language, updateTranslations]);

  if (isFetching || !property) {
    return <div>Loading property data...</div>;
  }
 
  // Split features string into an array if it's a string
  const features =
    typeof property.features === "string" ? property.features.split(",") : [];

  // Split images string into an array
  const images =
    typeof property.images === "string" ? property.images.split(",") : [];

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Show loading spinner/logo

    // Ensure all fields are filled
    if (!name || !phone || !propertyName || !propertyType) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "All fields are required",
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/send-rentfrom", {
        phone,
        name,
        propertyName,
        propertyType,
      });
      Swal.fire({
        icon: "success",
        title: "Thank you!",
        text: "Thanks for reaching out. We will get back to you soon.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An unexpected error occurred",
      });
    }finally {
      setLoading(false); // Hide loading spinner/logo
    }
  };



  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=AIzaSyCXENRI6QU3NowjVqVzhP_2Tv6IyUXVjPc&q=${lat},${lng}&zoom=18`;

  


  return (
    <div>


      {/* start seo */}
   
      <Helmet>
      <title>{property.PageName}</title>
      <meta name="title" content={property.seoTitle} />
        <meta name="description" content={property.seoDes} />
        <meta name="keywords" content={property.seoKeyword} />
        {/* <link rel="canonical" href="https://www.omkatech.com/services/designing"></link> */}

        <meta name="robots" content="index, follow" />
      </Helmet>
      {/* end seo */}
      <NavToAll />
      <div className="container-fluid">
        <div className="container" style={{ marginTop: "80px", width: "100%" }}>
          <div className="row">
            <div className="col-md-8">
              <h1 className="r2">{property.title}</h1>
              <br /> <br />
              <p className="r3">{property.description}</p>
            </div>
            <div className="col-md-4">
              <div className="scard">
                <button className="scard-button">{translations[textKeys.FOR] || 'Loading...'} {property.status}</button>
                <h2 className="scard-price">
                  {currency} {convertAmount(price)}
                </h2>
                <div className="scard-icons">
                  <div className="scard-icon">
                    <i className="fa fa-camera" style={{ color: "#006" }}></i>{" "}
                    <p>CCTV</p>
                  </div>
                  <div className="scard-icon">
                    <i className="fa fa-car" style={{ color: "#006" }}></i>{" "}
                    <p>Parking</p>
                  </div>
                  <div className="scard-icon">
                  <FaExpand style={{ color: "#006" }}/> 
                  {/* <i className="fa fa-camera" style={{ color: "#006" }}></i>{" "} */}
                    <p>
                      {unit === 'sqft' ? `${property.area} sqft` : `${convertSqftToSqm(property.area).toFixed(2)} sqm`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <ImageGallery images={images} />
        </div>
        <div className="container mt-5">
          <div className="row" style={{ height: "600px" }}>
            <div
              className="col-md-8 hide-scrollbar"
              style={{ height: "600px", overflowY: "scroll" }}
            >
              <div className="container">
                <h6 className="rent-h6"> {translations[textKeys.KEY] || 'Loading...'}</h6>
                <br />
                <div className="row">
                  <div className="col-sm">
                    <h6> {translations[textKeys.PropertyType] || 'Loading...'}</h6>
                    <span className="rent-pp">{property.propertyType}</span>
                  </div>
                  <div className="col-sm">
                    <h6
                      style={{
                        fontSize: "14px",
                        fontWeight: "600px",
                        color:"black"
                      }}
                    >
                     {translations[textKeys.Purpose] || 'Loading...'} 
                    </h6>
                    <span className="rent-pp">                    
                       {/* {translations[textKeys.FOR] || 'Loading...'}  */}
                     {property.status}</span>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm">
                    <h6>{translations[textKeys.Area] || 'Loading...'}</h6>
                    <span className="rent-pp">
                      {" "}
                      {unit === "sqft"
                        ? `${property.area} sqft`
                        : `${convertSqftToSqm(property.area)} sqm`}
                    </span>
                  </div>
                  {property.bedrooms && (
                  <div className="col-sm">
                    <h6
                      style={{
                        fontSize: "14px",
                        fontWeight: "300px",
                      }}
                    >
                     {translations[textKeys.Room] || 'Loading...'}   
                    </h6>
                    <span className="rent-pp"> {property.bathroom}</span>
                  </div>
                  )}
                </div>
                <hr></hr>

              {property.bedrooms && (
  <div className="row">
    <div className="col-sm">
      <h6>{translations[textKeys.Bathroom] || 'Loading...'}</h6>
      <span className="rent-pp">
        {translations[textKeys.FOR] || 'Loading...'} {property.bedrooms}
      </span>
    </div>
  </div>
  
)}

{property.bedrooms && (
 <hr />
)}
               
                <br />
                <h6 className="rent-pp">{translations[textKeys.DESCRIPTION] || 'Loading...'}  </h6>
                <div
                  className="rent-pp"
                  dangerouslySetInnerHTML={{ __html: property.editor }}
                />
                <h6 className="rent-pp mt-5">  {translations[textKeys.FACILITIES] || 'Loading...'} </h6>
                <div className="container rent-pp">
                  <div className="row ">
                    {features.map((feature, index) => (
                      <div className="col-sm-6 mb-2" key={index}>
                        <i className="fa fa-check-circle" style={{color:"#2c378f"}}></i> {feature.trim()}
                        <br />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <br />
              <div className="calculator-rent">
                <Calculator fprice={price}/>
              </div>
              <hr/>
              <br /><br />
              <h6>   {translations[textKeys.Location] || 'Loading...'} </h6>
              {isFetching ? (
        <p>Loading...</p>
      ) : (
        <div>
         
          <iframe
            src={mapSrc}
            className="col-md-12 col-12"
            height="300"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      )}
      <hr/>
      <img src= {property.qr} style={{height:"100px",width:"100px"}} className="mb-4 mt-2"></img>
      
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-3" style={{ height: "600px" }}>
              <br />
              <h4 style={{ margin: "5px", fontWeight: "600px",color:"black" }}>
              {translations[textKeys.Contact] || 'Loading...'} 
              </h4>{" "}
              <br />
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <br />
                <div className="form-group">
                  <PhoneInput
                    className="phone-input"
                    country={"us"}
                    value={phone}
                    onChange={(phone) => setPhone(phone)}
                  />
                </div>
                <br />
                <button
                  type="submit"
                  className="btn btn-primary form-submit"
                  style={{ backgroundColor: "#2c378f",height:"44px" }}
                >
                               {translations[textKeys.Submit] || 'Loading...'} 
                               
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {loading && (
        <div style={styles.loadingOverlay}>
          <div >
            <img src="../img/with-background.gif" alt="Loading..." style={styles.loadingLogo} />
          </div>
        </div>
      )}
      <div id="rentf">
        <Footer />
      </div>
    </div>
  );
};

export default RentProperty;

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