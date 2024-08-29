import React, { useState, useEffect } from "react";
import axios from "axios";

import { useLocation, useParams,Link } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import Footer from "../component/Footer";
import { Helmet } from 'react-helmet';
import { PiArrowCircleDownLeftFill } from "react-icons/pi";
import PhoneInput from "react-phone-input-2";
import NavToAll from "../component/NavToAll";
import "../css/eventDsc.css";
import { SlCalender } from "react-icons/sl";
import { CiClock2 } from "react-icons/ci";
import { GrLocationPin } from "react-icons/gr";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { HiArrowUpRight } from "react-icons/hi2";
import styled from 'styled-components';
import TimePicker from 'react-time-picker';
import { useLanguage } from '../LanguageContext';


const StyledPhoneInput = styled(PhoneInput)`
  height: 44px;
  background-color: transparent;
  border:none;

  .form-control {
    background-color: transparent; /* Ensure higher specificity */
    color: white !important;
      border:none;
      border-radius:0px;
    border-bottom: 1px solid white;
  }
  
`;
const EventsDsc = () => {

  const location = useLocation();
  const [id, setId] = useState(localStorage.getItem('id') || null);
  console.log("id",id)
  // const { event } = location.state || {};

  const [event, setEvents] = useState([]);
  const [time, setTime] = useState('10:00');
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // const [minutes, setMinutes] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

 
  const { language, translations, updateTranslations } = useLanguage();


  // const handleChange = (event) => {
  //   setTime(event.target.value);
  // };
  
  // by suru
  useEffect(() => {
    if (id && (!event || event.length === 0)) {
      fetchEvent();
    }
  }, [id,event]);
  
  const fetchEvent = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/eventsDsc/${id}`);
      console.log("kl",response.data)
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching property data:", error);
    }
  };
  



console.log("suru event",event)

  // by suru

  // comment by suru
  // useEffect(() => {
  //   const fetchProperty = async () => {
  //     try {
        
  //       const response = await axios.get(`http://localhost:4000/api/eventsDsc/${id}`);
  //       console.log("eee",response)
  //       const fetchedProperties = response.data;

  //       const translationPromises = fetchedProperties.map(async (property) => {
  //         await updateTranslations(`title${property.id}`, property.title);
  //         await updateTranslations(`Venue12${property.id}`, property.Venue12);
  //         await updateTranslations(`organiser${property.id}`, property.organiser); 
  //       });

  //       await Promise.all(translationPromises);

  //       // setEvents(response.data);
       
  //     } catch (error) {
  //       console.error("Error fetching property data:", error);
  //     }
  //   };

  //   if (!event) {
  //     fetchProperty();
  //   }
  // }, [id,language, updateTranslations]);
// comment by suru




  
  const organiserData = {
    'Sathbir Siingh Sachdeva': {
      image: '/img/sathbir-siingh-sachdeva.webp',
      title: 'CEO'
    },
    'jasbir siingh sachdeva': {
      image: '/img/jasbir-siingh-sachdeva.webp',
      title: 'Director'
    }
  };

// Get the data based on the organiser's name
const organiserInfo = organiserData[event.organiser] || { 
  image: '/img/default-image.webp', 
  title: 'Unknown'
};

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Show loading spinner/logo

    // Ensure all fields are filled
    if (!name || !phone || !time || !date || !email || !msg) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "All fields are required",
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/event-form", {
        phone,
        name,
        time,
        date,
        email,
        msg
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

  const settings = {
    dots: true,

    infinite: true,
    speed: 500,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: "0px",
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  if (!event) {
    return <div>No events data available.</div>;
  }

  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=AIzaSyCXENRI6QU3NowjVqVzhP_2Tv6IyUXVjPc&q=${event.lat},${event.lng}&zoom=18`;


  const textKeys = {
   
    All:'All',
    join:'join', 
    Dubai:'Dubai',
    Expo:'Expo',
    Register:'Register',
    When:'When',
    SUBMIT:'SUBMIT', 
    Organisers:'Organisers', 
    call:'call',
    visit:'visit',
    Wide:'Wide',
    Learn:'Learn',
    Face:'Face',
    Take:'Take',
    Those:'Those',
    Attend:'Attend',
    Find:'Find', 
    Minutes:'Minutes', 
    Name:'Name',
    Venue:'Venue', 
    email:'email',
    Message:'Message', 
    Direction:'Direction',
    residences:'residences',
   };

  useEffect(() => {
    // Update translations for each text key
 
    updateTranslations(textKeys.All,'All Events')
      updateTranslations(textKeys.join,' Join us at the') 
      updateTranslations(textKeys.Dubai,'  Dubai Property')  
      updateTranslations(textKeys.Expo,'Expo in Mauritius! .')  
      updateTranslations(textKeys.Register,'Register Now')
      updateTranslations(textKeys.When,'When will you come')
      updateTranslations(textKeys.SUBMIT,'SUBMIT')
      updateTranslations(textKeys.Message,'Your Message')
      updateTranslations(textKeys.Organisers,'Organisers') 
      updateTranslations(textKeys.Direction,'Get Direction')  
      updateTranslations(textKeys.Venue,'Venue') 
      updateTranslations(textKeys.Name, 'Your Name') 
      updateTranslations(textKeys.Minutes,'Minutes')  
      updateTranslations(textKeys.email,' Your email address')  
      updateTranslations(textKeys.call, '   Or call');
      updateTranslations(textKeys.visit, '  Reasons You Must Visit');
      updateTranslations(textKeys.Wide,' A Wide Range of Real Estate Options for You to Choose From');
      updateTranslations(textKeys.Learn, 'Learn important details regarding recent advancements');
      updateTranslations(textKeys.Find, ' Find more about the requirements for purchasing a property in Dubai'); 
      updateTranslations(textKeys.Face, ' Face to face meeting with real estate professionals');
      updateTranslations(textKeys.Take, ' Take pleasure in having complete possession of your property');  
      updateTranslations(textKeys.Attend, '   Who Can Attend This Property Expo?');  
      updateTranslations(textKeys.Those, 'Those contemplating relocating to the United Arab Emirates’ unique culture.');  
      updateTranslations(textKeys.residences, 'This event will feature residences held by expats hoping to secure Dubai residency visas for their family, as well as a range of upcoming special properties. Visitors hoping to live in a tax-friendly environment.'); 
}, [language, updateTranslations]);

  return (
    <div>
        <Helmet>
      <title>{event.PageName}</title>
      <meta name="title" content={event.seoTitle} />
  
        <meta name="description" content={event.seoDesc}  />
        <meta name="keywords" content={event.seoKeyword}  />
     

        <meta name="robots" content="index, follow" />
      </Helmet>
      <NavToAll />
      <br />
      <br />
      <div className="container-fluid">
        <div className="row">
          <div className="col-1 col-md-1"></div>
          <div className="col-12 col-md-3">
            <Link to="/" className="back-link">
            « {translations[textKeys.All] || 'Loading...'}  
            </Link>
            <div className="contacts-form">
              <h2 className="form-title">
              {translations[textKeys.join] || 'Loading...'}    <br />
              {translations[textKeys.Dubai] || 'Loading...'}
                <br />   {translations[textKeys.Expo] || 'Loading...'}
              </h2>
              <div className="register-button-container">
                <button className="register-button"> {translations[textKeys.Register] || 'Loading...'} <PiArrowCircleDownLeftFill style={{color:"#080E58"}}/></button>
              </div>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="form-input"
                  placeholder={translations[textKeys.Name] || 'Loading...'}
                  value={name} 
                  onChange={(e) => setName(e.target.value)}

                />
                {/* <label className="form-label">When will you come?</label> */}
               
         
    <label htmlFor="time" style={{color:"white"}}>{translations[textKeys.When] || 'Loading...'}?</label>
    <input type="time" class="form-input"           value={time} 
                  onChange={(e) => setTime(e.target.value)} />


                <input
                  type="date"
                  className="form-input"
                  placeholder={translations[textKeys.Minutes] || 'Loading...'}
                
                  value={date} 
                  onChange={(e) => setDate(e.target.value)}
                />
                {/* <select className="form-input">
                  <option style={{ color: "white" }}>AM</option>
                  <option style={{ color: "white" }}>PM</option>
                </select> */}
                <br /> 
                <input
                  type="email"
                  className="form-input"
                  placeholder={translations[textKeys.email] || 'Loading...'}
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                />

                <div className="form-groups">
                <StyledPhoneInput
        country={"us"}
        value={phone}
        onChange={(phone) => setPhone(phone)}
      />
                </div>

                <textarea
                  className="form-input"
                  rows="3"
                  placeholder={translations[textKeys.Message] || 'Loading...'}
                  value={msg} 
                  onChange={(e) => setMsg(e.target.value)}
                ></textarea>
                <button type="submit" className="submit-button">
                {translations[textKeys.SUBMIT] || 'Loading...'}  
                </button>
              </form>
              <p className="contacts-info">
              {translations[textKeys.call] || 'Loading...'}  +91 78543 21086 or +971 54 378 1770
              </p>
            </div>
          </div>
          <div className="col-12 col-md-7 p-4">
            <img
              src={event.image}
              alt=""
              className="eventdsc-img"
            ></img>
            <br />
            <h1 className="text-left text-black" id="dsch1">
            {translations[`title${event.id}`] || event.title}
            </h1>
            <br />
            <div className="row">
              <div className="col-md-6" id="dsc">
                <h2>
                  {" "}
                  <SlCalender style={{ fontWeight: "bold" }} /> {event.stdate} & {event.eddate} 
              
                </h2>
                <h2>
                  <GrLocationPin style={{ fontWeight: "bold" }} />  {translations[`Venue12${event.id}`] || event.Venue12}
                  {/* {event.venue} */}
                  {" "}
                </h2>
              </div>
              <div className="col-md-6" id="dsc">
                <h2>
                  {" "}
                  <CiClock2 style={{ fontWeight: "bold" }} /> {event.time} – {event.endtime}
                </h2>
              </div>
            </div>
            <br />
            <div className="event-details">
              <p style={{color:"#333538"}}>
              {translations[`description${event.id}`] || event.description} 
              {/* {event.description} */}
              </p>
  <h5 style={{ color: "black", marginBottom: "10px" }} className="mt-2 mb-3">
  {translations[textKeys.visit] || 'Loading...'}  {event.title}
  </h5>
  <ul id="dscul" style={{ marginBottom: "20px",color:"#333538" }}>
    <li style={{ listStyle: "none", marginBottom: "10px" }}>
      <FaCheckCircle style={{ color: "#16248C", fontSize: "30px" }} />{translations[textKeys.Wide] || 'Loading...'} 
    </li>
    <li style={{ listStyle: "none", marginBottom: "10px"  }}>
      <FaCheckCircle style={{ color: "#16248C", fontSize: "30px"}} /> {translations[textKeys.Learn] || 'Loading...'}  
    </li>
    <li style={{ listStyle: "none", marginBottom: "10px" }}>
      <FaCheckCircle style={{ color: "#16248C", fontSize: "30px" }} /> {translations[textKeys.Find] || 'Loading...'}  
    </li>
    <li style={{ listStyle: "none", marginBottom: "10px" }}>
      <FaCheckCircle style={{ color: "#16248C", fontSize: "30px" }} /> 
      {translations[textKeys.Face] || 'Loading...'} 
    </li>
    <li style={{ listStyle: "none", marginBottom: "10px" }}>
      <FaCheckCircle style={{ color: "#16248C", fontSize: "30px" }} />
      {translations[textKeys.Take] || 'Loading...'}    
    </li>
  </ul>
  <br />
  <h5 style={{ color: "black", marginBottom: "10px" }}>
  {translations[textKeys.Attend] || 'Loading...'}
  </h5>
  <p style={{ marginBottom: "20px",color:"#333538" }}>
  {translations[textKeys.residences] || 'Loading...'}    
    <br />
    {translations[textKeys.Those] || 'Loading...'}     
  </p>
</div>

            <div className="row mb-5">
             <div  className="col-12 col-md-12">
                <h2 className="mb-5" style={{ color: "black" }}>
                {translations[textKeys.Venue] || 'Loading...'}    
                </h2>
                </div>
                <div className="col-12 col-md-6">
                <iframe
            src={mapSrc}
      
          height="240"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
              </div>
              <div className="col-12 col-md-6" id="dscvenue">
                <h4 style={{color:"black"}}> {event.venue}</h4>
                <p style={{color:"#333538"}}>
                {event.locationdsc}
                {/* {event.country} */}
                </p>

                <button className="eventsdsc">  {translations[textKeys.Direction] || 'Loading...'}    &nbsp; <HiArrowUpRight /></button>
                <br />
              </div>
            </div>
            <h2 className="mb-5" style={{ color: "black" }}>
            {translations[textKeys.Organisers] || 'Loading...'}    <br />
              <div className="row align-items-center">
    <div className="col-12 col-md-2 text-center text-md-left">
      <img
        src={organiserInfo.image}
        style={{ borderRadius: "200px", marginTop: "25px" }}
        id="org"
        alt={event.organiser}
      />
    </div>
    <div className="col-12 col-md-10 mt-3 mt-md-0">
      <h4 className="" id="jas">              {translations[`organiser${event.id}`] || event.organiser} </h4>
      {/* {event.organiser}</h4> */}
      <h6>{organiserInfo.title}, HJ Real Estates</h6>
    </div>
  </div>

            </h2>
          </div>
          <div className="col-1 col-md-1"></div>
        </div>
      </div>

      <div className="container-fluid">
      

        <div className="row mt-2">
       
        <div className=" col-1 col-md-2"></div>
          <div className="col-10 col-md-8">
            <div className="slider-container">
              <Slider {...settings}>
                <div className="slider-item small">
                  <img
                    src="https://hjrealestates.com/promotions/wp-content/uploads/2024/06/WhatsApp-Image-2024-05-26-at-8.31.50-AM-1024x463.webp"
                    alt="Slide 1"
                  />
                </div>
                <div className="slider-item large">
                  <img
                    src="https://hjrealestates.com/promotions/wp-content/uploads/2024/06/WhatsApp-Image-2024-05-26-at-8.31.45-AM-1-1024x463.webp"
                    alt="Slide 2"
                  />
                </div>
                <div className="slider-item small">
                  <img
                    src="https://hjrealestates.com/promotions/wp-content/uploads/2024/06/WhatsApp-Image-2024-06-02-at-7.59.39-PM-1024x768.webp"
                    alt="Slide 3"
                  />
                </div>
                <div className="slider-item small">
                  <img
                    src="https://hjrealestates.com/promotions/wp-content/uploads/2024/06/WhatsApp-Image-2024-05-26-at-8.31.50-AM-1024x463.webp"
                    alt="Slide 1"
                  />
                </div>
                <div className="slider-item large">
                  <img
                    src="https://hjrealestates.com/promotions/wp-content/uploads/2024/06/WhatsApp-Image-2024-05-26-at-8.31.45-AM-1-1024x463.webp"
                    alt="Slide 2"
                  />
                </div>
              </Slider>
            </div>
          </div>
          
        <div className="col-1 col-md-2"></div>
        </div>
        {loading && (
        <div style={styles.loadingOverlay}>
          <div >
            <img src="../img/with-background.gif" alt="Loading..." style={styles.loadingLogo} />
          </div>
        </div>
      )}
      </div>
      <Footer />
    </div>
  );
};

export default EventsDsc;

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