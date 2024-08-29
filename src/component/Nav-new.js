import React, { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "../css/Newnav.css";
import { FaPlus, FaMinus } from "react-icons/fa";
import { MdLanguage, MdTurnedInNot } from "react-icons/md";
import { CiSettings, CiSearch } from "react-icons/ci";
import { MdOutlineMenuOpen } from "react-icons/md";
import { Button, Popover, OverlayTrigger } from "react-bootstrap";
import "../css/HomeSearch.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlay, FaPause } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { BsList } from "react-icons/bs";
import PreferencesSidebar from "../component/PreferencesSidebar";
import Fav from "../pages/Fav";
import { useCurrency } from "../CurrencyContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaSearch, FaArrowRight, FaTimes } from "react-icons/fa";
import HomeSearch from "./HomeSearch";
import { useLanguage } from '../LanguageContext';

const videoData = [
  {
    src: "./img/hj-real-estates-home-banner.mp4",
    title: "Newport Beach, CA",
    description: "United States - $35,000,000",
  },
  {
    src: "./img/hj-real-estates-home-banner.mp4",
    title: "Newport Beach, CA",
    description: "United States - $35,000,000",
  },
  {
    src: "./img/hj-real-estates-home-banner.mp4",
    title: "Newport Beach, CA",
    description: "United States - $35,000,000",
  },
  {
    src: "./img/hj-real-estates-home-banner.mp4",
    title: "Newport Beach, CA",
    description: "United States - $35,000,000",
  },
  {
    src: "./img/hj-real-estates-home-banner.mp4",
    title: "Newport Beach, CA",
    description: "United States - $35,000,000",
  },
];

const Nawnew = () => {
  const [showPopover, setShowPopover] = useState(false);
  const { language, translations, updateTranslations } = useLanguage();
  const {
    currency,
    convertAmount,
    convertSqftToSqm,
    unit,
    addFavorite,
    favorites,
    removeFavorite,
    addRentComparison,
    addBuyComparison,
    rentComparison,
    buyComparison,
  } = useCurrency();
  const navigate = useNavigate();

  const handleIconClick = (favorites) => {
    navigate("/Fav");
  };
  const handleClick = (favorites) => {
    navigate("/contactus");
  };

  const handleCompClick = (rentComparison, buyComparison) => {
    navigate("/Comparison");
  };

   // for popup  

   const handleCardClick = (property) => {
    console.log("next",property)
    navigate(`/RentProperty/${property.slug}`, { state: { property } });
   
  };

  //   const [selectedCurrency, setSelectedCurrency] = useState('USD');
  // console.log("G",selectedCurrency)
  //   const handleChangeCurrency = (currencyCode) => {
  //     setSelectedCurrency(currencyCode);
  //   };

  const popover = (
    <Popover
      id="popover-basic"
      className="custom-popover7"
      style={{ border: "none" }}
    >
      <Popover.Body className="popover-body">
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <FaTimes
            style={{ cursor: "pointer", color: "white" }}
            onClick={() => setShowPopover(false)}
          />
        </div>
        <HomeSearch
          onApply={(filters) => {
         
            setShowPopover(false);
          }}
          onClear={() => {
            console.log("Cleared");
          }}
        />
      </Popover.Body>
    </Popover>
  );

  const [playing, setPlaying] = useState(true);
  const videoRefs = useRef([]);



  const handlePlayPause = () => {
    videoRefs.current.forEach((video) => {
      if (playing) {
        video.pause();
      } else {
        video.play();
      }
    });
    setPlaying(!playing);
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar12 = () => {
    setIsOpen(!isOpen);
  };

  // filetr
  const [properties, setProperties] = useState([]);
  const [properties1, setProperties1] = useState([]);
  const [offplan, setOffplan] = useState([]);
  const [filteredPropertiess, setFilteredProperties] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Buy");
  const [location, setLocation] = useState('');
  const [searchInput, setSearchInput] = useState('');
  console.log("m",searchInput)
  const [error, setError] = useState('');
  const inputRef = useRef(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleFocus = () => {
    setDropdownVisible(true);
  };

  const handleBlur = () => {
    // Use a timeout to allow the click event on the dropdown option to fire
    setTimeout(() => {
      setDropdownVisible(false);
    }, 200);
  };

 
  const fetchAddress = async (latitude, longitude) => {
    const apiKey = 'AIzaSyCXENRI6QU3NowjVqVzhP_2Tv6IyUXVjPc'; // Replace with your API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      if (response.data.results && response.data.results.length > 0) {
        setLocation(response.data.results[0].address_components[7].long_name);
        console.log(response.data.results[0].address_components[7].long_name
        )
      } else {
        setLocation('Address not found');
      }
    } catch (error) {
      console.error('Error fetching the address:', error);
      setLocation('Error fetching address');
    }
  };

  const handleSearchByCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // setLocation(`Lat: ${latitude}, Lon: ${longitude}`);
          setError(''); // Clear any previous errors
          
          // Fetch address using the latitude and longitude
          fetchAddress(latitude, longitude);

          // Call a function here to search properties based on the location
          setDropdownVisible(false); // Hide the dropdown
          if (inputRef.current) {
            inputRef.current.blur(); // Remove focus from the input box
          }
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setError('User denied the request for Geolocation.');
              break;
            case error.POSITION_UNAVAILABLE:
              setError('Location information is unavailable.');
              break;
            case error.TIMEOUT:
              setError('The request to get user location timed out.');
              break;
            case error.UNKNOWN_ERROR:
              setError('An unknown error occurred.');
              break;
            default:
              setError('An error occurred while fetching location.');
              break;
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000, // 10 seconds
          maximumAge: 0,
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/latest-rent"
        );
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties data:", error);
      }
    };

    const fetchProperties1 = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/uploads-rent"
        );
        setProperties1(response.data);
      } catch (error) {
        console.error("Error fetching properties data:", error);
      }
    };

    const fetchProperties2 = async () => {
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
    fetchProperties1();
    fetchProperties2();
  }, []);

  
  let filtered = properties1;

  const filterProperties = () => {
    let filtered = properties;

    // Filter by status
    if (selectedOption && selectedOption !== "OFFPLAN") {
      filtered = filtered.filter(
        (property) => property.status === selectedOption
      );
    } else if (selectedOption === "OFFPLAN") {
      filtered = offplan; // Use offplan data instead of properties
    }
    if (searchInput) {
      if (selectedOption === "OFFPLAN") {
        // Use exactLocation for OFFPLAN
        filtered = filtered.filter(
          (property) =>
            (property.exactLocation && 
             property.exactLocation.toLowerCase().includes(searchInput.toLowerCase())) ||
            (property.propertyType && 
             property.propertyType.toLowerCase().includes(searchInput.toLowerCase()))
        );
      } else {
        // Use location for other options
        filtered = filtered.filter(
          (property) =>
            (property.location && 
             property.location.toLowerCase().includes(searchInput.toLowerCase())) ||
            (property.propertyType && 
             property.propertyType.toLowerCase().includes(searchInput.toLowerCase()))
        );
      }
    }
    

    // // Filter by search input
    // if (searchInput) {
    //   if (selectedOption === "OFFPLAN") {
    //     // Use exactLocation for OFFPLAN
    //     filtered = filtered.filter(
    //       (property) =>
    //         property.exactLocation
    //           .toLowerCase()
    //           .includes(searchInput.toLowerCase()) ||
    //         property.propertyType
    //           .toLowerCase()
    //           .includes(searchInput.toLowerCase())
    //     );
    //   } else {
    //     // Use location for other options
    //     filtered = filtered.filter(
    //       (property) =>
    //         property.location
    //           .toLowerCase()
    //           .includes(searchInput.toLowerCase()) ||
    //         property.propertyType
    //           .toLowerCase()
    //           .includes(searchInput.toLowerCase())
    //     );
    //   }
    // }

    setFilteredProperties(filtered);

    if (selectedOption === "OFFPLAN") {
      navigate("/NewRoffplan", { state: { filteredPropertiess: filtered } });
    } else if(selectedOption ==="Buy") {
      navigate("/NewBuy", { state: { filteredPropertiess: filtered } });
    }
    else {
      navigate("/NewRent", { state: { filteredPropertiess: filtered } });
    }
  };
console.log("filteredPropertiess",filtered)

  const Sell = () => {
    navigate("/sell-your-property-with-us");
  };
  const Events = () => {
    navigate("/events");
  };
  const Home = () => {
    navigate("/");
  };


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      filterProperties();
    }
  };
  // li popover
  const [activePopover, setActivePopover] = useState(null);

  const handleTogglePopover = (popover) => {
    setActivePopover(activePopover === popover ? null : popover);
  };

  // Function to filter properties based on buy or rent status
  const filterPropertiesByStatus = (properties, status) => {
    return properties.filter(
      (property) => property.status.toLowerCase() === status.toLowerCase()
    );
  };

  // Function to get the latest added properties with a limit
  const getLatestAddedProperties = (properties, limit) => {
    // Sort properties by date in descending order
    const sortedProperties = properties.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    // Return up to 'limit' number of properties
    return sortedProperties.slice(0, limit);
  };

  // Example usage:
  // Filter properties by 'Rent'
  const rentProperties = filterPropertiesByStatus(properties, "Rent");

  // Get the latest 4 'Rent' properties
  const latestRentProperties = getLatestAddedProperties(rentProperties, 4);

  // Filter properties by 'Buy'
  const buyProperties = filterPropertiesByStatus(properties, "Buy");

  // Get the latest 4 'Buy' properties if needed
  const latestBuyProperties = getLatestAddedProperties(buyProperties, 4);
  // Ensure there is at least one property
  const firstPropertyImageUrl = latestBuyProperties.length > 0 
    ? latestBuyProperties[0].feature_image 
    : 'https://img-v2.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fapi.sothebysrealty.com%2Fresources%2Fsiteresources%2FMy%20Folder%2Fstatic-pages%2Freside-magazine%2Freside-june2022%2Fwhats-new-in-art-architecture-and-design%2Fimage2.jpg%26option%3DN%26w%3D200&option=N&h=132&permitphotoenlargement=false';

    const rentPropertyImageUrl = latestRentProperties.length > 0 
    ? latestRentProperties[0].feature_image 
    : 'https://img-v2.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fapi.sothebysrealty.com%2Fresources%2Fsiteresources%2FMy%20Folder%2Fstatic-pages%2Freside-magazine%2Freside-june2022%2Fwhats-new-in-art-architecture-and-design%2Fimage2.jpg%26option%3DN%26w%3D200&option=N&h=132&permitphotoenlargement=false';


    const textKeys = {
      RESOURCES: 'RESOURCES',
      Rent:'Rent',
      Offplan:'Offplan',
      Preferences:'Preferences',
      PROPERTIES:'PROPERTIES',
      SERVICES:'SERVICES', 
      EVENTS:'EVENTS',
      Sell:'Sell',
      find:'find',
      RESOURCES:'RESOURCES',
      BUY:'BUY',
      RENT:'RENT',
      SELL:'SELL',
      OFFPLAN:'OFFPLAN',
      placeholder:'placeholder',
      Search:'Search', 
      forsell:'forsell', 
      Mortgage:'Mortgage',
      Property:'Property',
      Guide:'Guide',
      SellersGuide:"SellersGuide",
      DailyNews:'DailyNews',
      Blogs:'Blogs',
      ContactUs:'ContactUs',



     };
  
    useEffect(() => {
      // Update translations for each text key
   
      updateTranslations(textKeys.RESOURCES, 'Property');  
      updateTranslations(textKeys.Rent, 'Rent'); 
      updateTranslations(textKeys.Offplan, 'Offplan'); 
      updateTranslations(textKeys.Preferences, 'Preferences');  
      updateTranslations(textKeys.PROPERTIES, 'PROPERTIES');  
      updateTranslations(textKeys.SERVICES, 'SERVICES'); 
      updateTranslations(textKeys.EVENTS, 'EVENTS'); 
      updateTranslations(textKeys.Sell, 'Sell With us'); 
      updateTranslations(textKeys.RESOURCES, 'RESOURCES');
      updateTranslations(textKeys.BUY, 'BUY'); 
      updateTranslations(textKeys.RENT, 'RENT'); 
      updateTranslations(textKeys.SELL, 'SELL');
      updateTranslations(textKeys.OFFPLAN, 'OFFPLAN'); 
        updateTranslations(textKeys.forsell, '      Property for sell');

      updateTranslations(textKeys.find, 'Find The Best Dubai Real Estate Property');
      updateTranslations(textKeys.placeholder, 'Country, City, Address, Postal Code or ID');
      updateTranslations(textKeys.Search, '  Search My Current Location'); 
      updateTranslations(textKeys.Mortgage, 'Mortgage');  
      updateTranslations(textKeys.Property, 'Property'); 
      updateTranslations(textKeys.Guide, 'Buyers Guide');
      updateTranslations(textKeys.SellersGuide, 'Sellers Guide');
      updateTranslations(textKeys.DailyNews, 'Daily News'); 
      updateTranslations(textKeys.Blogs, 'Blogs');
      updateTranslations(textKeys. ContactUs, ' Contact-Us');

  }, [language, updateTranslations]);
  

  const popovers = {
    RESOURCES: (
      <Popover id="popover-properties">
        <Popover.Body className="popover-body1">
          <div className="popover-column1">
            <h4>    {translations[textKeys.RESOURCES] || 'Loading...'} </h4>
            <ul>
              {latestBuyProperties.map((property) => (
                <li key={property.id}>
                   <Link   to={`/RentProperty/${property.slug}`}
      state={{ property }}
      > {property.shortTitle}</Link>
                </li>
              ))}
            </ul>
            {/* <ul>
           <li><Link to="/properties-near-me">Properties Near Me</Link></li>
           <li><Link to="/properties-near-me">Properties Near Me</Link></li>
           <li><Link to="/properties-near-me">Properties Near Me</Link></li>
           <li><Link to="/properties-near-me">Properties Near Me</Link></li>
         </ul> */}
          </div>
          <div className="popover-column1">
            <h4> {translations[textKeys.Rent] || 'Loading...'}</h4>
            <ul>
              {latestRentProperties.map((property) => (
                <li key={property.id} >
                 <Link   to={`/RentProperty/${property.slug}`}
      state={{ property }}
      > {property.shortTitle}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="popover-column1">
            <h4> {translations[textKeys.Offplan] || 'Loading...'}</h4>
            <ul>
              <li>
                <Link to="/new-york">New York</Link>
              </li>
              <li>
                <Link to="/los-angeles">Los Angeles</Link>
              </li>
              <li>
                <Link to="/the-hamptons">The Hamptons</Link>
              </li>
              <li>
                <Link to="/london">London</Link>
              </li>
              <li>
                <Link to="/dubai">Dubai</Link>
              </li>
              <li>
                <Link to="/paris">Paris</Link>
              </li>
            </ul>
          </div>
        </Popover.Body>
      </Popover>
    ),
    SERVICES: (
      <Popover id="popover-properties">
        <Popover.Body className="popover-body3">
          <div className="popover-column1">
            <h4>{translations[textKeys.SERVICES] || 'Loading...'}</h4>
            <ul>
              <li>
                <Link to="/Mortgage">{translations[textKeys.Mortgage] || 'Loading...'}</Link>
              </li>
              <li>
                <Link to="/Property">{translations[textKeys.Property] || 'Loading...'}</Link>
              </li>
              <li>
                <Link to="/BuyersGuide">{translations[textKeys.Guide] || 'Loading...'} </Link>
              </li>
              <li>
                <Link to="/SellersGuide">{translations[textKeys.SellersGuide] || 'Loading...'}</Link>
              </li>
              <li>
              <a href="https://news.hjrealestates.com/" target="_blank" rel="noopener noreferrer">{translations[textKeys.DailyNews] || 'Loading...'}</a>

              </li>
              <li>
                <Link to="/blogs">{translations[textKeys.Blogs] || 'Loading...'}</Link>
              </li>
              <li>
                <Link to="/Contactus">{translations[textKeys.ContactUs] || 'Loading...'}</Link>
              </li>
            </ul>
          </div>
        </Popover.Body>
      </Popover>
    ),

    //  SERVICES: (
    //    <Popover id="popover-services">
    //      <Popover.Header as="h3" style={{ backgroundColor: 'blue', color: 'white' }}>Services</Popover.Header>
    //      <Popover.Body><Link to="/Mortgage">Mortgage</Link></Popover.Body>
    //      <Popover.Body><Link to="/web-site-url">Daily News</Link></Popover.Body>
    //      <Popover.Body><Link to="/blogs">Blogs</Link></Popover.Body>
    //      <Popover.Body><Link to="/Contactus">Contact-Us</Link></Popover.Body>
    //    </Popover>
    //  ),
    PROPERTIES: (
      <Popover id="popover-resources">
        <Popover.Body className="popover-body2">
          <div className="popover-column2">
            <div className="column-header2">
         
            <img src={firstPropertyImageUrl} alt="Property" style={{height:"132px", width:"196px"}}/>
            </div>
            <ul>
              <li>
                <Link to="/properties-near-me">
                  <h4>{translations[textKeys.Property] || 'Loading...'}</h4>
                </Link>
              </li>

              <li 
            >
              {latestBuyProperties.map((property) => (
                <li key={property.id}>
                     <Link   to={`/RentProperty/${property.slug}`}
      state={{ property }}
      > {property.shortTitle}</Link>
                </li>
              ))}
              </li>
          
            </ul>
            <div className="explore-more">
              Explore more <FaArrowRight />
            </div>
          </div>
          <div className="popover-column2">
            <div className="column-header2">
              <img src={rentPropertyImageUrl} alt="Rent" style={{height:"132px", width:"196px"}}/>
            </div>
            <ul>
              <li>
                <Link to="/view-properties-globally">
                  {" "}
                  <h4>{translations[textKeys.Rent] || 'Loading...'}</h4>
                </Link>
              </li>
              <li>
              {latestRentProperties.map((property) => (
                <li key={property.id}>
                     <Link   to={`/RentProperty/${property.slug}`}
      state={{ property }}
      > {property.shortTitle}</Link>
                </li>
              ))}
              </li>
            
            </ul>
            <div className="explore-more">
              Explore more <FaArrowRight />
            </div>
          </div>
          <div className="popover-column2">
            <div className="column-header2">
              <img
                src="https://img-v2.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fapi.sothebysrealty.com%2Fresources%2Fsiteresources%2FMy%20Folder%2Fstatic-pages%2Fluxury-outlook%2Fluxury-outlook-2023%2Fcover%2Fheader_luxoutlook.jpg%26option%3DN%26w%3D200&option=N&h=132&permitphotoenlargement=false"
                alt="Offplan"
              />
            </div>
            <ul>
              <li>
                <Link to="/new-york">
                  {" "}
                  <h4>{translations[textKeys.Offplan] || 'Loading...'}</h4>
                </Link>
              </li>
              <li>
                <Link to="/los-angeles">Los Angeles</Link>
              </li>
              <li>
                <Link to="/the-hamptons">The Hamptons</Link>
              </li>
              <li>
                <Link to="/london">London</Link>
              </li>
              <li>
                <Link to="/dubai">Dubai</Link>
              </li>
              <li>
                <Link to="/paris">Paris</Link>
              </li>
            </ul>
            <div className="explore-more">
              Explore more <FaArrowRight />
            </div>
          </div>
        </Popover.Body>
      </Popover>
    ),
    EVENTS: (
      <Popover id="popover-events">
        <Popover.Header
          as="h3"
          style={{ backgroundColor: "blue", color: "white" }}
        >
         {translations[textKeys.Events] || 'Loading...'} 
        </Popover.Header>
        <Popover.Body>Content for Events</Popover.Body>
      </Popover>
    ),
  };

  //  gurdeep addition
  const [listingTypeOpen, setListingTypeOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [squareFeetOpen, setSquareFeetOpen] = useState(false);

  return (
    <>
      {/* lappy */}
      <div className="container-fluid" id="navshow">
        <div>
          <div className="row head-icons">
            <div className="col-md-9 col-sm-6"></div>
            <div className="col-md-3 col-sm-6 ">
              <span className="sp-actual">
                <MdTurnedInNot
                  onClick={handleIconClick}
                  style={{ color: favorites.length > 0 ? " #007bff" : "white" }}
                />
                {" | "}
                <MdOutlineMenuOpen
                  onClick={handleCompClick}
                  style={{
                    color:
                      rentComparison.length || buyComparison.length > 0
                        ? " #007bff"
                        : "white",
                  }}
                />  {" | "}
              <CiSettings onClick={toggleSidebar12} style={{cursor:"pointer"}} />
                <PreferencesSidebar isOpen={isOpen} toggle={toggleSidebar12}  />
                <p className="p-actual" onClick={toggleSidebar12} >    {translations[textKeys.Preferences] || 'Loading...'} </p>
              </span>
            </div>
          </div>
          <div className="row sec-head">
            <div className="col-md-3 ">
              <img
                src="../img/blogo.svg"
                className="logoicon"
                onClick={Home}
              ></img>
            </div>

            <div className="col-md-9 ">
              <ul className="actual-head2">
                <li>
                  <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    overlay={popovers.PROPERTIES}
                    show={activePopover === "PROPERTIES"}
                    onToggle={() => handleTogglePopover("PROPERTIES")}
                  >
                    <button className="bg-transparent border-0 text-white">
                    {translations[textKeys.PROPERTIES] || 'Loading...'}  
                    </button>
                  </OverlayTrigger>
                </li>

                <li>
                  <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    overlay={popovers.SERVICES}
                    show={activePopover === "SERVICES"}
                    onToggle={() => handleTogglePopover("SERVICES")}
                  >
                    <button className="bg-transparent border-0 text-white">
                    {translations[textKeys.SERVICES] || 'Loading...'}   
                    </button>
                  </OverlayTrigger>
                </li>
                <li>
                  <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    overlay={popovers.RESOURCES}
                    show={activePopover === "RESOURCES"}
                    onToggle={() => handleTogglePopover("RESOURCES")}
                  >
                    <button className="bg-transparent border-0 text-white">
                    {translations[textKeys.RESOURCES] || 'Loading...'}  
                    </button>
                  </OverlayTrigger>
                </li>
                <li onClick={Events} style={{cursor:"pointer"}}>  {translations[textKeys.EVENTS] || 'Loading...'}  </li>
                <li>
                  <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    overlay={popover}
                    show={showPopover}
                    onToggle={() => {
                      setShowPopover(!showPopover);
                    }}
                  >
                    <button
                      className=""
                      style={{ backgroundColor: "transparent", border: "none" }}
                    >
                      {" "}
                      <CiSearch style={{ fontSize: "27px", color: "white" }} />
                    </button>
                  </OverlayTrigger>
                </li>
                <li>
                  <button
                    type="button"
                    className="btn btn-lg searchbtn sell"
                    style={{
                      border: "1px solid white",

                      marginTop: "-10px",
                      borderRadius: "50px",
                    }}
                    onClick={handleClick}
                  >
                     {translations[textKeys.Sell] || 'Loading...'} 
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <hr style={{ color: "white", margin: "0rem" }} />
          <div className="row sec-head2">
            <div className="col-md-7 px-5">
              <h1 className="px-5  pt-0  r1" style={{ color: "white" }}>
              {translations[textKeys.find] || 'Loading...'}  
              </h1>
            </div>
            <div className="col-md-5 ">
            <ul className="mt-0 pt-0 actual-head3">
        <li className={selectedOption === "Buy" ? "active" : ""}>
          <Link to="#" onClick={() => setSelectedOption("Buy")}>{translations[textKeys.BUY] || 'Loading...'}</Link>
        </li>
        <li className={selectedOption === "Rent" ? "active" : ""}>
          <Link to="#" onClick={() => setSelectedOption("Rent")}>{translations[textKeys.RENT] || 'Loading...'} </Link>
        </li>
        <li>
          <Link to="/sell-your-property-with-us" > {translations[textKeys.SELL] || 'Loading...'} </Link>
        </li>
        <li className={selectedOption === "OFFPLAN" ? "active" : ""}>
          <Link to="#" onClick={() => setSelectedOption("OFFPLAN")}>{translations[textKeys.OFFPLAN] || 'Loading...'} </Link>
        </li>
      </ul> {/* Conditionally render the line */}
    
              <div className="search-container">
                <div className="search-input-container">
                  <FaSearch
                    className="search-icon"
                    onClick={filterProperties}
                  />
                  <input
                     ref={inputRef}
                    type="text"
                    className="search-input"
                    placeholder=   {translations[textKeys.placeholder] || 'Loading...'} 
                    value={searchInput || location}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyPress={handleKeyPress}
                  />

    
      {location && <p> {location}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
                  <FaArrowRight
                    className="arrow-icon"
                    onClick={filterProperties}
                  />
                </div>
              </div>
              {dropdownVisible && (
        <div className="dropdown">
          <button onClick={handleSearchByCurrentLocation}>
            <span role="img" aria-label="location">
              📍  {translations[textKeys.Search] || 'Loading...'}  
            </span>{' '}
          
          </button>
        </div>
      )}
            </div>
          </div>
    
        </div>
        
      </div>
      
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredProperties.map((property) => (
          <div key={property.id} className="border p-4">
            <h2>{property.title}</h2>
            <p>{property.location}</p>
            <p>{property.propertyType}</p>
          </div>
        ))}
      </div> */}
      {/* phone */}
      <div className="container-fluid" id="navhide">
        
          <div className="row" style={{backgroundColor:"#080e50",height:"60px"}}>
            <div className="col-md-1 col-1">
              <CiSearch
                style={{ fontSize: "30px", color: "white" }}
                onClick={toggleSearch}
                id="searchi"
              />
            </div>
            <div className="col-md-10 col-10">
              <center>
                {" "}
                <img
                  src="../img/blogo.svg"
                  id="mobilelogo1"
                  onClick={Home}
                ></img>
              </center>
            </div>
            <div className="col-md-1 col-1">
              {" "}
              <BsList
                onClick={toggleSidebar}
                style={{
                  cursor: "pointer",

                  fontSize: "30px",
                  color: "white",
                }}
                id="togglei"
              />
            </div>
          </div>

          {isSidebarOpen && (
            <div className="sidebarss">
              <br />
              &nbsp; &nbsp; &nbsp;
              <img
                src="../img/blogo.svg"
                style={{ height: "40px" }}
                onClick={Home}
              ></img>
              <RxCross2
                onClick={toggleSidebar}
                style={{
                  cursor: "pointer",
                  float: "right",
                  color: "white",
                  fontSize: "30px",
                  marginRight: "16px",
                }}
              />
              <div className="sidebar-content">
                <ul className="actual-head5">
                  <li>
                    <span className="sp-actual">
                      <MdTurnedInNot
                        onClick={handleIconClick}
                        style={{
                          color: favorites.length > 0 ? "#007bff" : "white",
                        }}
                      />
                      {" | "}
                      <MdOutlineMenuOpen
                        onClick={handleCompClick}
                        style={{
                          color:
                            rentComparison.length || buyComparison.length > 0
                              ? " #007bff"
                              : "white",
                        }}
                      />
                     <CiSettings onClick={toggleSidebar12} style={{cursor:"pointer"}} />
                      <PreferencesSidebar
                        isOpen={isOpen}
                        toggle={toggleSidebar12}
                      />
                    </span>
                  </li>

                  <div className="">
                    <div style={{ borderBottom: "1px solid white" }}></div>
                    <div
                      className="filter-title"
                      onClick={() => setListingTypeOpen(!listingTypeOpen)}
                    >
                     {translations[textKeys.PROPERTIES] || 'Loading...'}  {" "}
                      <span className="icon-container">
                        <span className="icon-text"> {translations[textKeys.forsell] || 'Loading...'}</span>
                        &nbsp;
                        {listingTypeOpen ? <FaMinus /> : <FaPlus />}
                      </span>
                    </div>
                    {listingTypeOpen && (
                       <div className="filter-content">
                       <span> {translations[textKeys.Buy] || 'Loading...'}</span>
                         <ul>
                         {latestBuyProperties.map(property => (
                 <li key={property.id}>
                   <Link to="/properties-near-me">{property.shortTitle}</Link>
                 </li>
               ))}
                         </ul>
                         <span>{translations[textKeys.Rent] || 'Loading...'}</span>
                         <ul>
                         {latestRentProperties.map(property => (
                 <li key={property.id}>
                   <Link to="/properties-near-me">{property.shortTitle}</Link>
                 </li>
               ))}
                         </ul>
                       </div>
                    )}
                    <div style={{ borderBottom: "1px solid white" }}></div>
                  </div>

                  <div className="">
                    <div
                      className="filter-title"
                      onClick={() => setPriceOpen(!priceOpen)}
                    >
                    {translations[textKeys.SERVICES] || 'Loading...'}  
                      <span className="icon-container">
                        <span className="icon-text"></span>&nbsp;
                        {priceOpen ? <FaMinus /> : <FaPlus />}
                      </span>
                    </div>
                    {priceOpen && (
                      <div className="filter-content">
                        <ul>
                        <li>
                <Link to="/Mortgage">{translations[textKeys.Mortgage] || 'Loading...'} </Link>
              </li>
              <li>
                <Link to="/Property">{translations[textKeys.Property] || 'Loading...'}</Link>
              </li>
              <li>
                <Link to="/BuyersGuide">{translations[textKeys.Guide] || 'Loading...'}</Link>
              </li>
              <li>
                <Link to="/SellersGuide">{translations[textKeys.SellersGuide] || 'Loading...'}</Link>
              </li>
              <li>
              <a href="https://news.hjrealestates.com/" target="_blank" rel="noopener noreferrer">{translations[textKeys.DailyNews] || 'Loading...'}</a>

              </li>
              <li>
                <Link to="/blogs">{translations[textKeys.Blogs] || 'Loading...'}</Link>
              </li>
              <li>
                <Link to="/Contactus">{translations[textKeys.ContactUs] || 'Loading...'}</Link>
              </li>
                        </ul>
                      </div>
                    )}
                    <div style={{ borderBottom: "1px solid white" }}></div>
                  </div>

                  <div className="">
                    <div
                      className="filter-title"
                      onClick={() => setSquareFeetOpen(!squareFeetOpen)}
                    >
                      {translations[textKeys.RESOURCES] || 'Loading...'}    
                      <span className="icon-container">
                        <span className="icon-text"></span>&nbsp;
                        {squareFeetOpen ? <FaMinus /> : <FaPlus />}
                      </span>
                    </div>
                    {squareFeetOpen && (
                      <div className="filter-content">





                        
                        <span>  {translations[textKeys.Buy] || 'Loading...'}    </span>
                        <ul>
                          {latestBuyProperties.map((property) => (
                            <li key={property.id}>
                              <Link to="/properties-near-me">
                                {property.shortTitle}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <span> {translations[textKeys.Rent] || 'Loading...'}</span>
                        <ul>
                          {latestRentProperties.map((property) => (
                            <li key={property.id}>
                              <Link to="/properties-near-me">
                                {property.shortTitle}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div style={{ borderBottom: "1px solid white" }}></div>
                  </div>

                  {/* <li>RESOURCES</li> */}
                  <li onClick={Events} style={{cursor:"pointer"}}>{translations[textKeys.EVENTS] || 'Loading...'}</li>
                  <div style={{ borderBottom: "1px solid white" }}></div>
                  {/* <li>
                    <CiSearch
                      style={{ fontSize: "27px" }}
                      onClick={() => {
                        toggleSearch(true), toggleSidebar(false);
                      }}
                    />
                  </li> */}
                  <li>
                    <button
                      type="button"
                      className="btn btn-lg searchbtn sell"
                      style={{
                        border: "1px solid white",

                        marginTop: "10px",
                        borderRadius: "50px",
                      }}
                      onClick={handleClick}
                    >
                    {translations[textKeys.Sell] || 'Loading...'}  
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}

{isSearchOpen && (
            <div className="searchbar">
              <br />

              <div className="container">
                <div className="row">
                  <div className="col-md-4 col-4">
                    <RxCross2
                      onClick={toggleSearch}
                      style={{
                        cursor: "pointer",
                        float: "left",
                        color: "white",
                        fontSize: "30px",
                      }}
                    />
                  </div>
                  <div className="col-md-4 col-4">
                    <center>
                      {" "}
                      <img
                        src="../img/blogo.svg"
                        style={{ height: "40px" }}
                      ></img>
                    </center>
                  </div>{" "}
                  <div className="col-md-4 col-4"></div>
                </div>
              </div>
              <hr style={{ color: "darkgray", width: "100%" }} />
              <div className="searchbar-content">
              <ul className="mt-0 pt-0 actual-head3">
        <li className={selectedOption === "Buy" ? "active" : ""}>
          <Link to="#" onClick={() => setSelectedOption("Buy")}>{translations[textKeys.BUY] || 'Loading...'}</Link>
        </li>
        <li className={selectedOption === "Rent" ? "active" : ""}>
          <Link to="#" onClick={() => setSelectedOption("Rent")}>{translations[textKeys.RENT] || 'Loading...'} </Link>
        </li>
        <li>
          <Link to="/sell-your-property-with-us" > {translations[textKeys.SELL] || 'Loading...'} </Link>
        </li>
        <li className={selectedOption === "OFFPLAN" ? "active" : ""}>
          <Link to="#" onClick={() => setSelectedOption("OFFPLAN")}>{translations[textKeys.OFFPLAN] || 'Loading...'} </Link>
        </li>
      </ul>
                <div className="search-container">
                  <div className="search-input-container">
                    <FaSearch
                      className="search-icon"
                      onClick={filterProperties}
                    />
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Country, City, Address, Postal Code or ID"
                    />
                    <FaArrowRight
                      className="arrow-icon"
                      onClick={filterProperties}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          <hr style={{ color: "white", margin: "0rem" }} />

          <div className="row sec-head">
            <div className="col-md-7">
              <h1 className="pt-4 r1" style={{ color: "white" }}>
              {translations[textKeys.find] || 'Loading...'}  
              </h1>
            </div>
            <div className="col-md-5">
              <ul className="actual-head3">
              <li className={selectedOption === "Buy" ? "active" : ""}>
          <Link to="#" onClick={() => setSelectedOption("Buy")}>{translations[textKeys.BUY] || 'Loading...'}</Link>
        </li>
        <li className={selectedOption === "Rent" ? "active" : ""}>
          <Link to="#" onClick={() => setSelectedOption("Rent")}>{translations[textKeys.RENT] || 'Loading...'} </Link>
        </li>
        <li>
          <Link to="/sell-your-property-with-us" > {translations[textKeys.SELL] || 'Loading...'} </Link>
        </li>
        <li className={selectedOption === "OFFPLAN" ? "active" : ""}>
          <Link to="#" onClick={() => setSelectedOption("OFFPLAN")}>{translations[textKeys.OFFPLAN] || 'Loading...'} </Link>
        </li>
              </ul>
              <div className="search-container">
                <div className="search-input-container">
                  <FaSearch
                    className="search-icon"
                    onClick={filterProperties}
                  />
                  <input
                     ref={inputRef}
                    type="text"
                    className="search-input"
                    placeholder="Country, City, Address, Postal Code or ID"
                    value={searchInput }
                    onChange={(e) => setSearchInput(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                       {location && <p>{location}</p>}
                       {error && <p style={{ color: 'red' }}>{error}</p>}
                  <FaArrowRight
                    className="arrow-icon"
                    onClick={filterProperties}
                  />
           
                </div>
              </div>
            </div>
          </div>
          {dropdownVisible && (
        <div className="dropdown">
          <button onClick={handleSearchByCurrentLocation}>
            <span role="img" aria-label="location">
              📍
            </span>{' '}
            {translations[textKeys.Search] || 'Loading...'} 
          </button>
        </div>
      )}
      
      </div>
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          {videoData.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
        <div className="carousel-inner">
          {videoData.map((video, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={index}
            >
              <div className="overlay"></div>
              <video
                className="d-block w-100 homevideo"
                autoPlay
                loop
                muted
                playsInline
                ref={(el) => (videoRefs.current[index] = el)}
              >
                <source src={video.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="caption row">
                <div className="col-md-2 ">  </div>
                <div className="col-md-9">
                <h1 id="hometitle">{video.title}</h1>
                <p id="homedesc">{video.description}</p>
                <a href="#" className="details-link">
                  SEE DETAILS
                </a>
                </div>
                <div className="col-md-1">  </div>
              </div>
            </div>
          ))}
        </div>
        <Routes>
          <Route path="/Fav" element={<Fav favorites={favorites} />} />
        </Routes>
        <button className="play-pause-button" onClick={handlePlayPause}>
          {playing ? <FaPause /> : <FaPlay />}
        </button>
      </div>
      <br />
      <br />
    </>
  );
};

export default Nawnew;
