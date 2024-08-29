import React, { useState, useEffect } from "react";
import { useCurrency } from "../CurrencyContext";
import { useLocation } from "react-router-dom";
import Footer from "../component/Footer";
import { Helmet } from 'react-helmet';
import "../css/Offplan.css";

import axios from "axios";
import { IoLocationOutline } from "react-icons/io5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HiArrowUpRight } from "react-icons/hi2";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import {
  FaBuilding,
  FaCar,
  FaCheck,
  FaDotCircle,
  FaGlassMartini,
  FaKey,
  FaPhoneSquare,
  FaRunning,
  FaSwimmingPool,
  FaTh,
  FaTree,
  FaSchool,
  FaShieldAlt,
  FaBicycle,
  FaBasketballBall,
  FaChild,
  FaUtensils,
  FaHospital,
  FaGamepad,
  FaDumbbell,
  FaSun,
  FaRoute,
  FaRestroom,
  FaStore,
  FaHeart,
  FaBed,
  FaPalette,
  FaUtensilSpoon,
  FaFish,
  FaExpand,
  FaUmbrellaBeach,
  FaWater,
  FaSkating,
  FaLeaf,
} from "react-icons/fa";
import { FaSquareWhatsapp, FaArrowDown  } from "react-icons/fa6";

import ContactForm from "../component/ContactForm";
import FilterNav from "../component/FilterNav1";
import NavToAll from "../component/NavToAll";
import { useNavigate } from 'react-router-dom';

const Offplan = () => {
  const [visibleParagraphs, setVisibleParagraphs] = useState(1);
  const location = useLocation();
  const [id, setId] = useState(localStorage.getItem('id') || null);
  const [property, setProperty] = useState([]); 

  // const { property } = location.state || {};
  const navigate = useNavigate();
  
  const { currency, convertAmount } = useCurrency();

  const [icons, setIcons] = useState([]);
  const [properties, setProperties] = useState([]);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
console.log("idd",id)



  useEffect(() => {
    if (property) {
      setLat(property.lat);
      setLng(property.log);
    }
  }, [property]);

  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=AIzaSyCXENRI6QU3NowjVqVzhP_2Tv6IyUXVjPc&q=${lat},${lng}&zoom=18`;

  useEffect(() => {
    if (id && (!property || property.length === 0)) {
      fetchProperty();
    }
  }, [id,property]);
  
  const fetchProperty = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/get-offplan/${id}`);
      if (response.status === 200 && Array.isArray(response.data) && response.data.length > 0) {
        setProperty(response.data[0]);
      } else {
        console.error("Failed to fetch property or no data available", response.status);
      }
    } catch (error) {
      console.error("Error fetching property data:", error);
    }
  };
  


  console.log("res",property)
 
  const iconComponents = {
    FaSwimmingPool,
    FaBicycle,
    FaUtensils,
    FaDumbbell,
    FaSun,
    FaRoute,
    FaBed,
    FaFish,
    FaShieldAlt,
    FaUmbrellaBeach,
    FaWater,
    FaSkating,
    FaLeaf
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/icons-all");
        setIcons(response.data);
      } catch (error) {
        console.error("Error fetching properties data:", error);
      }
    };

    fetchProperties();
  
  }, []);

  const iconMapping = {
    school: FaSchool,
    building: FaBuilding,
    car: FaCar,
    check: FaCheck,
    dotCircle: FaDotCircle,
    glassMartini: FaGlassMartini,
    key: FaKey,
    phoneSquare: FaPhoneSquare,
    running: FaRunning,
    swimmingPool: FaSwimmingPool,
    th: FaTh,
    tree: FaTree,
    shieldAlt: FaShieldAlt,
    bicycle: FaBicycle,
    basketballBall: FaBasketballBall,
    child: FaChild,
    utensils: FaUtensils,
    hospital: FaHospital,
    gamepad: FaGamepad,
    dumbbell: FaDumbbell,
    sun: FaSun,
    route: FaRoute,
    restroom: FaRestroom,
    store: FaStore,
    heart: FaHeart,
    bed: FaBed,
    palette: FaPalette,
    utensilSpoon: FaUtensilSpoon,
    fish: FaFish,
    FaUmbrellaBeach:FaUmbrellaBeach,
    FaWater:FaWater,
    FaSkating:FaSkating,
    FaLeaf:FaLeaf,
    
  };

  function getIconForLocation(location) {
    const words = location.split(' ');
    for (let word of words) {
      if (iconMapping[word.toLowerCase()]) {
        return iconMapping[word.toLowerCase()];
      }
    }
    return FaDotCircle;
  }

  // const paragraphs = [
  //   "With a complete focus on spaciousness and magnificence, residents can expect nothing but exceptionally luxurious living areas embellished with state-of-the-art interiors. Diamondz by Danube, nestled in the heart of Jumeirah Lake Towers (JLT), it rewards the residents with a plethora of amenities and marvelous attractions.",
  //   "One of the most important features that make this property a cream of the crop is its wide range of amenities. The area is well-equipped with the best schools, hospitals, shopping centers, fitness areas, landscaped gardens and parks, serene lakes, making sure that the residents get everything within close proximity. From spacious living to present-day interiors, each apartment reflects luxury in a unique way. Whether you want some indoor fun, or want to celebrate your special days or plan a BBQ party with your family and friends, there’s something for everyone to enjoy and love. From wellness centers to spacious gyms, there are endless possibilities for everyone to stay recharged, rejuvenated, and refreshed!",
  //   "One of the most important features that make this property a cream of the crop is its wide range of amenities. The area is well-equipped with the best schools, hospitals, shopping centers, fitness areas, landscaped gardens and parks, serene lakes, making sure that the residents get everything within close proximity. From spacious living to present-day interiors, each apartment reflects luxury in a unique way.",
  //   "For the residents who are craving peaceful ambiance, the rooftop offers an excellent escape well-equipped with Yoga decks, hammock gardens, and even a sky golf course. Whether relaxing with a luxurious spa treatment or enjoying an open cinema beneath the stars with your soulmate, residents are spoiled with luxury treatments.",
  // ];

  // const handleShowMore = () => {
  //   setVisibleParagraphs(visibleParagraphs + 1);
  // };

  // const handleShowLess = () => {
  //   setVisibleParagraphs(1);
  // };

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector(".sticky-section");
      if (section && window.pageYOffset >= section.offsetTop) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  
  
// }, []);

const amenities = typeof property.amenitiesAll === "string"
? property.amenitiesAll.split(",")
: [];
console.log("guri",property.amenitiesAll)

const locationsF = typeof property.locationAll === "string"
? property.locationAll.split(",")
: [];

const locationTM = typeof property.tm === "string" 
? property.tm.split(",") 
: [];

const qust = typeof property.qusList === "string" 
? property.qusList.split(",") 
: [];

const ans = typeof property.ansList === "string" 
? property.ansList.split(",") 
: [];

const planimages = typeof property.plansImg === "string" 
? property.plansImg.split(",") 
: [];

console.log("images",planimages)

const planss = typeof property.plansAll === "string" 
? property.plansAll.split(",") 
: [];

const Gimages = typeof property.images === "string" 
? property.images.split(",") 
: [];

const filteredIcons = icons.filter((icon) =>
amenities.includes(icon.iconDsc)
);
 
const [activeButton, setActiveButton] = useState(planss[0]);

const handleButtonClick = (bhk) => {
  setActiveButton(bhk);
};

const Contactus = () => {
  navigate("/contactus");
};
  return (
    <div>
         <Helmet>
      <title>{property.PageName}</title>
      <meta name="title" content={property.seoTitle} />
        <meta name="description" content={property.seoDesc} />
        <meta name="keywords" content={property.seoKeyword} />
   

        <meta name="robots" content="index, follow" />
      </Helmet>
      <NavToAll />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 position-relative d-flex justify-content-center align-items-center">
            <div className="image-container">
              <img
                src={property.aboveBg}
                className="offp-imgg"
                alt="Sell Hero"
              />
              <div className="overlayss">
                <img src="https://hjrealestates.com/wp-content/uploads/2024/05/hj-real-estates-diamondz-by-danube-logo.png" />
              </div>
            </div>

            <h1 className="offp-h position-absolute text-center mb-5" style={{color:"black"}}>
              {property.builder} {/* Diamondz by Danube */}
            </h1>
            <p className="exect-p position-absolute text-center ">
              <br />
              <IoLocationOutline /> {property.exectLocation}
              {/* //Jumeirah Lake Towers */}
            </p>
            <div className="position-absolute">
              <div className="offdiv">
                <div className="div-offplan">
                  <div className="row text-center mt-0 mt-md-4">
                    <div className="col-md-4">
                      <i
                        className=""
                        style={{ color: "#2C378F", fontSize: "35px" }}
                      >
                        <FaBuilding />
                      </i>
                      <h4 id="ddi" style={{ fontWeight:"bold"}}>
                        {property.community} | {property.propertyType}{" "}
                      </h4>
                    </div>
                    <div className="col-md-4">
                      <p id="pleft">Price ({currency})</p>
                      <h4 style={{ fontWeight:"bold"}}> {convertAmount(property.price)}</h4>
                      <button
                        className="btn btn-primary"
                        style={{ backgroundColor: "#2C378F", fontSize: "15px" }}
                      >
                        Enquire Now <HiArrowUpRight />
                      </button>
                    </div>
                    <div className="col-md-4">
                      <i
                        className="fr"
                        style={{ color: "#2C378F", fontSize: "35px" }}
                      >
                        <FaCheck />
                      </i>
                      <h4 id="ddi" style={{ fontWeight:"bold"}}>Direct Sales & 0% Commission</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
  className={`row pt-3 px-3 ${isSticky ? "position-fixed bg-white" : ""}`}
  id="sticky"
>
  <div className="col-6 col-md-4 mb-2 mb-md-0">
    <h5 className="text-black font-weight-bold" id="ddi"> {property.builder}</h5>
    <p id="ddii">
      
      <FaBed/>
      &nbsp; {property.community}{" "}
      <span>    &nbsp; &nbsp; 
      <FaExpand />
      &nbsp;
        {property.sizeStart} – {property.sizeEnd}
      </span>
    </p>
  </div>
  <div className="col-6 col-md-2 mb-2 mb-md-0">
    <p>Price ({currency})</p>
    <h6 className="text-black font-weight-bold" id="ddip">
      {convertAmount(property.price)}
    </h6>
  </div>
  <div className="col-12 col-md-3 d-none d-md-block mb-2 mb-md-0">
    <h5 className="text-black font-weight-bold" id="phn">
      <FaPhoneSquare style={{ color: "#43a823",fontWeight:"bold" }} /> +971 4326 2191
    </h5>
  </div>
  <div className="col-12 col-md-3 d-none d-md-block mb-2 mb-md-0">
    <h4 style={{ color: "#43a823" }}>
      <FaSquareWhatsapp /> Whatsapp
    </h4>
  </div>
</div>


        <hr id="mhide" />
        <div className="sticky-section mt-5">
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <section className="">
                <section className="">
                  <div className="row">
                  {Gimages.map((url, index) => (
        <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
          <div className="bg-image hover-overlay ripple shadow-1-strong rounded imgage-offplans" data-ripple-color="light">
            <img src={url} className="w-100 h-100" />
            <a href="#!" data-mdb-modal-init data-mdb-target="#exampleModal1">
              <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}></div>
            </a>
          </div>
        </div>
      ))}


                  
                  </div>
                  <br />
                
              
                </section>

                <section className="">
                  <div
                    className="modal fade"
                    id="exampleModal1"
                    tabindex="-1"
                    aria-labelledby="exampleModal1Label"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-lg">
                      <div className="modal-content">
                        <div className="ratio ratio-16x9">
                          <iframe
                            src="https://www.youtube.com/embed/A3PDXmYoF5U"
                            title="YouTube video"
                            allowfullscreen
                          ></iframe>
                        </div>

                        <div className="text-center py-3">
                          <button
                            type="button"
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-secondary"
                            data-mdb-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="modal fade"
                    id="exampleModal2"
                    tabindex="-1"
                    aria-labelledby="exampleModal2Label"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-lg">
                      <div className="modal-content">
                        <div className="ratio ratio-16x9">
                          <iframe
                            src="https://www.youtube.com/embed/wTcNtgA6gHs"
                            title="YouTube video"
                            allowfullscreen
                          ></iframe>
                        </div>

                        <div className="text-center py-3">
                          <button
                            type="button"
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-secondary"
                            data-mdb-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="modal fade"
                    id="exampleModal3"
                    tabindex="-1"
                    aria-labelledby="exampleModal3Label"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-lg">
                      <div className="modal-content">
                        <div className="ratio ratio-16x9">
                          <iframe
                            src="https://www.youtube.com/embed/vlDzYIIOYmM"
                            title="YouTube video"
                            allowfullscreen
                          ></iframe>
                        </div>

                        <div className="text-center py-3">
                          <button
                            type="button"
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-secondary"
                            data-mdb-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </section>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-8 mt-4" id="oasis">
                    <h2 id="diamond">{property.title}</h2>
                    <p className="mt-4 diamondpara">{property.description}</p>
               
      <img src= {property.qr} style={{height:"100px",width:"100px"}} className="mb-4 mt-2"></img>
      

                  </div>
             
                  <div className="col-12 col-md-4">
                    <button
                      className="btn btn-primary"
                      style={{ backgroundColor: "#2C378F", fontSize: "15px" }}
                      id="bb1"
                      onClick={Contactus}
                    >
                      <FaArrowDown/> e-Brochure
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid" id="office1">
            <div className="row ">
              <div className="col-md-4" id="col1">
                <center>
                  <FaTh
                    style={{ fontSize: "25px", color: "#2C378F" }}
                    className="mtop"
                  />
                  <h6 style={{color:"black",marginTop:"5px"}} className="office2">Sizes (Sq. Ft.)</h6>
                  <h3 style={{color: "#2C378F",fontWeight:"bold"  }}>
                    {property.sizeStart} – {property.sizeEnd}
                  </h3>
                </center>
              </div>
              <div className="col-md-4" id="col1">
                <center>
                  <FaKey style={{ fontSize: "25px", color: "#2C378F" }} />
                  <h6 style={{color:"black",marginTop:"5px"}} className="office2">Possession</h6>
                  <h3 style={{color: "#2C378F",fontWeight:"bold" }}>{property.pos}</h3>
                </center>
              </div>
              <div className="col-md-4" id="col1">
                <center>
                  <FaDotCircle style={{ fontSize: "25px", color: "#2C378F" }} />
                  <h6 style={{color:"black",marginTop:"5px"}} className="office2">Payment Plan</h6>
                  <h3 style={{color: "#2C378F",fontWeight:"bold"  }}>90:10</h3>
                </center>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <p className="text-center">Overview</p>
              <h2 className="text-center headfont" style={{color:"black"}}>
                {property.builder} – To Experience Luxury like never before
              </h2>
              <div
                className="rent-pp"
                dangerouslySetInnerHTML={{ __html: property.editor }}
              />
            </div>
            <div className="col-md-1"></div>
          </div>
          <br />
          <br />
          <div className="container-fluid" id="c2">
            <br />
            <div className="row" style={{ textAlign: "center" }}>
              <span>Payment Plan of</span>
              <br />
              <h3 style={{fontWeight:"bold",color:"black"}}>{property.builder}</h3>
            </div>
            <div className="row">

              <div className="col-md-4" id="col1">
                <center>
                  <h2>{property.booking}%</h2>
                  <div className="percentdiv">
                    <br />
                    <span>On Booking</span>
                  </div>
                </center>
              </div>
              <div className="col-md-4" id="col1">
                <center>
                  <h2>{property.construction}%</h2>
                  <div className="percentdiv">
                    <br />
                    <span>During Construction</span>
                  </div>
                </center>
              </div>
              <div className="col-md-4" id="col1">
                <center>
                  <h2>{property.handover}%</h2>
                  <div className="percentdiv">
                    <br />
                    <span>On Handover</span>
                  </div>
                </center>
              </div>
            </div>
          </div>
          <br />
          <br />

          <div className="row mt-md-5 pt-md-4">
            <div className="col-md-1"> </div>
            <div className="col-md-10">
              <p className="text-center">Amenities of</p>
              <h2 className="text-center" style={{fontWeight:"bold",color:"black"}}>{property.amenitiesTitle}</h2>
              <p className="text-center mt-4 mb-5">{property.amenitiesDsc}</p>

              <div className="mb-5"></div>
            </div>
            <div className="col-md-1"> </div>
          </div>
          <div className="container">
            <div className="row">
              {filteredIcons.map((item) => (
                <div key={item.id} className="col-md-3 swim" id="col1">
                  <center>
                    <br />
                    <h2 id="swimi">{renderIcon(item.iconName)}</h2>
                    <div className="">
                      <span>{item.iconDsc}</span>
                    </div>
                  </center>
                </div>
              ))}
            </div>
          </div>
          <br />
          <br />
          <div className="row mt-5 pt-5" style={{ backgroundColor: "#f0f2ff" }}>
            <div className="col-md-1"> </div>
            <div className="col-md-10">
              <p className="text-center">Location of</p>
              <h2 className="text-center" style={{fontWeight:"bold",color:"black"}}> {property.locationTitle}</h2>
              <p className="text-center mt-4 mb-5">{property.locationDsc}</p>
              <div className="row">
                {/* {locationsF.map((property, index) => (
                  <div className="col-md-3" key={index}>
                    <center>
                      <div className="l1">
                        <div className="row row1">
                          <div className="col-md-2 ii1">
                            <FaSchool />
                          </div>
                          <div className="col-md-10">
                            <h6>{locationTM[index]} Min.</h6>
                            <p>{property}</p>
                          </div>
                        </div>
                      </div>
                    </center>
                  </div>
                ))} */}
                {locationsF.map((property, index) => {
  const IconComponent = getIconForLocation(property);
  return (
    <div className="col-md-3" key={index}>
      <center>
        <div className="l1">
          <div className="row row1">
            <div className="col-md-2 ii1">
              <IconComponent />
            </div>
            <div className="col-md-10">
              <h6>{locationTM[index]} Min.</h6>
              <p>{property}</p>
            </div>
          </div>
        </div>
      </center>
    </div>
  );
})}
             
              </div>
              <br />
              <br />
              <iframe
            src={mapSrc}
            className="col-md-12 col-12"
            height="300"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
              <br /> <br />
            </div>
            <div className="col-md-1"> </div>
            <br />
          </div>

          <div className="row mt-5 pt-5 mb-5">
            <div className="col-md-1"> </div>
            <div className="col-md-10">
              <p className="text-center">Floor Plans of</p>
              <h2 className="text-center" style={{color:"black",fontWeight:"bold"}}>{property.plansTitle}</h2>
              <p className="text-center mt-4 mb-5">{property.plansDsc}</p>
              {/* {planss.map((bhk, index) => (
        <button
          key={bhk}
          type="button"
          className={`bhk ${activeButton === bhk ? 'active-button' : ''}`}
          data-mdb-ripple-init
          data-mdb-ripple-color="dark"
          onClick={() => handleButtonClick(bhk)}
        >
          {bhk}
        </button>
      ))}
      <div className="col-md-8">
        <img src={planimages[planss.indexOf(activeButton)]} className="bhkimg" alt={`${activeButton} floor plan`} />
      </div> */}
              <div className="row">
                <div className="col-md-4">
                  <div className="d-grid gap-2 mx-auto">
                    {planss.map((bhk, index) => (
                      <button
                        key={bhk}
                        type="button"
                        className={`bhk ${
                          activeButton === bhk ? "active-button" : ""
                        }`}
                        data-mdb-ripple-init
                        data-mdb-ripple-color="dark"
                        onClick={() => handleButtonClick(bhk)}
                      >
                        {bhk}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="col-md-8">
                  <center>
                  <img
                    src={planimages[planss.indexOf(activeButton)]}
                    className="bhkimg"
                    alt={`${activeButton} floor plan`}
                  ></img></center>
                </div>
              </div>
            </div>
            <div className="col-md-1"> </div>
          </div>

          <div className="row mt-5 pt-5 mb-5">
            <div className="col-md-1"> </div>
            <div className="col-md-10 mt-5">
              <h2 className="text-center" style={{color:"black",fontWeight:"bold"}}>Have a question?</h2>
              <p className="text-center mt-4 mb-5">
                To answer your queries {property.builder},{" "}
                {property.exectLocation}
              </p>

              <div className="row mb-5 mt-5">
                <div className="col-md-12 mb-5">
                  <div className="accordion sell-accon" id="accordionExample">
                    {qust.map((property, index) => (
                      <div className="accordion-item" key={index}>
                        <h2 className="accordion-header" id={`heading${index}`}>
                          <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse${index}`}
                            aria-expanded={index === 0 ? "true" : "false"}
                            aria-controls={`collapse${index}`}
                          >
                            {property}
                          </button>
                        </h2>
                        <div
                          id={`collapse${index}`}
                          className={`accordion-collapse collapse ${
                            index === 0 ? "show" : ""
                          }`}
                          aria-labelledby={`heading${index}`}
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">{ans[index]}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-1"> </div>
          </div>
        </div>
      </div>
      <ContactForm title={property.title} />
      <br />
    
      <Footer />
    </div>
  );
};
// Function to render icons based on iconName
const renderIcon = (iconName) => {
  switch (iconName) {
    case "FaBuilding":
      return <FaBuilding />;
    case "FaCar":
      return <FaCar />;
    case "FaCheck":
      return <FaCheck />;
    case "FaDotCircle":
      return <FaDotCircle />;
    case "FaGlassMartini":
      return <FaGlassMartini />;
    case "FaKey":
      return <FaKey />;
    case "FaPhoneSquare":
      return <FaPhoneSquare />;
    case "FaRunning":
      return <FaRunning />;
    case "FaSwimmingPool":
      return <FaSwimmingPool />;
    case "FaTh":
      return <FaTh />;
    case "FaTree":
      return <FaTree />;
    case "FaSchool":
      return <FaSchool />;
    case "FaShieldAlt":
      return <FaShieldAlt />;
    case "FaBicycle":
      return <FaBicycle />;
    case "FaBasketballBall":
      return <FaBasketballBall />;
    case "FaChild":
      return <FaChild />;
    case "FaUtensils":
      return <FaUtensils />;
    case "FaHospital":
      return <FaHospital />;
    case "FaGamepad":
      return <FaGamepad />;
    case "FaDumbbell":
      return <FaDumbbell />;
    case "FaSun":
      return <FaSun />;
    case "FaRoute":
      return <FaRoute />;
    case "FaRestroom":
      return <FaRestroom />;
    case "FaStore":
      return <FaStore />;
    case "FaHeart":
      return <FaHeart />;
    case "FaBed":
      return <FaBed />;
    case "FaPalette":
      return <FaPalette />;
    case "FaUtensilSpoon":
      return <FaUtensilSpoon />; 
      case "FaUmbrellaBeach":
        return <FaUmbrellaBeach />;
    case "FaFish":
      return <FaFish />; 
      case "FaSkating":
        return <FaSkating />;
        case "FaWater":
          return <FaWater />;
          case "FaLeaf":
            return <FaLeaf />;   
          
    default:
      return null;
  }
};
export default Offplan;
