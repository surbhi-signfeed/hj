
import React, { useState, useEffect } from "react";
import { useLocation,useNavigate } from 'react-router-dom';
import { Popover, OverlayTrigger } from "react-bootstrap";
import axios from "axios";
import Footer from "../component/Footer";
import { Helmet } from 'react-helmet';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/NewrentFilter.css';
import Sidebar from '../component/Sidebar';
import PriceFilter from "../component/PriceFilter";
import { FaTimes } from 'react-icons/fa';
import BathroomFilter from "../component/BathroomFilter";
import HomeType from "../component/Hometype"; // Corrected import path
import { useCurrency } from '../CurrencyContext';
import NavToAll from "../component/NavToAll";
import SqftFilter from "../component/SqftFilter";
import BRoffplan from "../component/BRoffplan";
import Community from "../component/Community";
import { useLanguage } from '../LanguageContext';


function NewR() {
          const navigate = useNavigate();
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [sortedProperties, setSortedProperties] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [propertyType, setPropertyType] = useState([]);
  const [bcommunity, setBcomunity] = useState([]);
  const [community, setCommunity] = useState([]);
  const [propertyLocation, setPropertyLocation] = useState("");
  const [activeButton, setActiveButton] = useState('ALL');
  const [priceRange, setPriceRange] = useState({ minPrice: 0, maxPrice: 1000000 });
  const [bedRange, setBedRange] = useState({ min: 0, max: 10 });
  const [bathRange, setBathRange] = useState({ min: 0, max: 10 });
  const [sqftRange, setSqftRange] = useState({ minSqft: 0, maxSqft: 10000 });
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(3); // Number of properties to display per page
  const location = useLocation();
  const { language, translations, updateTranslations } = useLanguage();

  const { filteredPropertiess } = location.state || [];

  const { currency, convertAmount, convertSqftToSqm, unit, addFavorite, favorites, removeFavorite, addRentComparison, addBuyComparison,rentComparison,
    buyComparison } = useCurrency();

  console.log("filteredProperties received", filteredPropertiess);
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = filteredPropertiess;
        const propertiesData = response.map(property => ({
          ...property,
          price: Number(property.price.replace(/[^0-9.-]+/g, "")),
          // bedrooms: Number(property.bedrooms.replace(/[^0-9.-]+/g, "")),
          // bathroom: Number(property.bathroom.replace(/[^0-9.-]+/g, ""))
        }));
        setProperties(propertiesData);
        setFilteredProperties(propertiesData);
        setSortedProperties(propertiesData);
      } catch (error) {
        console.error('Error fetching properties data:', error);
      }
    };

    fetchProperties();
  }, []);

  const Map = () => {
    navigate("/Map")
  }

  console.log("pto",properties)

  useEffect(() => {
    handleFilter();
  }, [properties, searchTitle, propertyType, propertyLocation, activeButton, priceRange, bedRange, bathRange,bcommunity,community]);


  const filterProperties = (range) => {
    const filtered = properties.filter(property => 
      property.sizeEnd >= range.minSqft && property.sizeEnd <= range.maxSqft
    );
    setFilteredProperties(filtered);
  };
  const handleFilter = () => {
    let tempProperties = [...properties];

    if (searchTitle.trim() !== "") {
      tempProperties = tempProperties.filter((property) =>
        property.title.toLowerCase().includes(searchTitle.toLowerCase().trim())
      );
    }
    if (propertyType.length > 0) {
      tempProperties = tempProperties.filter((property) => {
        if (property.propertyType) {
          const typeUpperCase = property.propertyType.trim().toUpperCase();
          console.log("ss",typeUpperCase)
          const match = propertyType.some(type => type.trim().toUpperCase() === typeUpperCase);
          return match;
        } else {
          console.warn("Property type is undefined or null:", property);
          return false;
        }
      });
    }
    if (bcommunity.length > 0) {
      tempProperties = tempProperties.filter((property) => {
       
        if (property.bcommunity) {
          const typeUpperCase = property.bcommunity.trim().toUpperCase();
       
          const match = bcommunity.some(type => type.trim().toUpperCase() === typeUpperCase);
       
          return match;
        
        } else {
          console.warn("Property is undefined or null:", property);
          return false;
        }
      });
    }
    if (community.length > 0) {
      tempProperties = tempProperties.filter((property) => {
        console.log("l", property);
        if (property.community) {
          const communityTypes = property.community.split(',').map(type => type.trim().toUpperCase());
          
          // Check if any of the community types match the selected community filters
          const match = community.some(selectedType => communityTypes.includes(selectedType.trim().toUpperCase()));
    
          return match;
        } else {
          console.warn("Property is undefined or null:", property);
          return false;
        }
      });
    }
    
    console.log("match",community)
    
    if (propertyLocation !== "") {
      tempProperties = tempProperties.filter(
        (property) => property.location.toLowerCase() === propertyLocation.toLowerCase()
      );
    }

    if (activeButton !== 'ALL') {
      tempProperties = tempProperties.filter(
        (property) => property.status.toUpperCase() === activeButton
      );
    }

    tempProperties = tempProperties.filter(
      (property) => property.price >= priceRange.minPrice && property.price <= priceRange.maxPrice
    );

//     tempProperties = tempProperties.filter(
//       (property) => property.bedrooms >= bedRange.min && property.bedrooms <= bedRange.max
//     );

//     tempProperties = tempProperties.filter(
//       (property) => property.bathroom >= bathRange.min && property.bathroom <= bathRange.max
//     );

    setFilteredProperties(tempProperties);
  
    setCurrentPage(1); // Reset to first page after filtering
  };

 

  const handleReset = () => {
    setSearchTitle("");
    setPropertyType([]);
    setPropertyLocation("");
    setPriceRange({ minPrice: 0, maxPrice: 1000000 });
    setBedRange({ min: 0, max: 10 });
    setBathRange({ min: 0, max: 10 });
    setFilteredProperties(properties);
    setCurrentPage(1); // Reset to first page after resetting filters
  };


  const handleCardClick = (property) => {
    navigate(`/offplan/${property.slug}`, { state: { property } });
  };


  const Card = ({ type, price, title, location, image, status, property, onClick}) => {
    return (
      <div className="rentcard" onClick={() => onClick(property)}>
        <div className="rentcard-type">{type}</div>
        <img src={image} alt={title} className="rentcard-image" />
        <div className="rentcard-content">
          <div className="rentcard-price">{currency} {convertAmount(price)}</div>
          <div className="rentcard-title">
            {title} {location}
          </div>
          <div className="rentcard-actions">
            <a href="#" className="rentcard-action">
              <i className="fa fa-envelope" /> Email
            </a>
            <a href="#" className="rentcard-action">
              <i className="fa fa-phone" /> Phone
            </a>
            <a href="#" className="rentcard-action">
              <i className="fa fa-whatsapp" /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    );
  };

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const [showPopover, setShowPopover] = useState(false);
  const popover = (
    <Popover id="popover-basic" className="custom-popoverprice">
      <Popover.Body>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <FaTimes style={{ cursor: "pointer", color: "white" }} onClick={() => setShowPopover(false)} />
        </div>
        <PriceFilter
          initialRange={priceRange}
          onApply={(filters) => {
            setPriceRange(filters);
            setShowPopover(false);
          }}
          onClear={() => {
            setPriceRange({ minPrice: 0, maxPrice: 1000000 });
            setShowPopover(false);
          }}
        />
      </Popover.Body>
    </Popover>
  );

  const [showPopover1, setShowPopover1] = useState(false);
  const popover1 = (
    <Popover id="popover-basic" className="custom-popoverbed">
      <Popover.Body>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <FaTimes style={{ cursor: "pointer", color: "white" }} onClick={() => setShowPopover1(false)} />
        </div>
        <BathroomFilter
     initialRange={{ bathrooms: bathRange, bedrooms: bedRange }}
          onApply={(filters) => {
            setBathRange(filters.bathrooms);
            setBedRange(filters.bedrooms);
            setShowPopover1(false);
          }}
          onClear={() => {
            setBedRange({ min: 0, max: 10 });
            setBathRange({ min: 0, max: 10 });
            setShowPopover1(false);
          }}
        />
      </Popover.Body>
    </Popover>
  );

  const [showPopover2, setShowPopover2] = useState(false);

  const popover2 = (
    <Popover id="popover-basic" className="custom-popoverHome">
      <Popover.Body>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <FaTimes style={{ cursor: "pointer", color: "white" }} onClick={() => setShowPopover2(false)} />
        </div>
        <HomeType
          initialSelectedHomeTypes={propertyType} // Pass the current selected types as initial values
          onApply={(selectedTypes) => {
            setPropertyType(selectedTypes);
            setShowPopover2(false);
          }}
          onClear={() => {
            setPropertyType([]);
          }}
        />
      </Popover.Body>
    </Popover>
  );

// sorting
// State for sorting option
const [sortOption, setSortOption] = useState("most-recent");

// Handler for sorting change
const handleSortChange = (event) => {
  setSortOption(event.target.value);
};

// Sorting logic based on sortOption
useEffect(() => {
  const sortProperties = () => {
    let sorted = [...filteredProperties];
    switch (sortOption) {
      case "title-asc":
        sorted = sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        sorted = sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "date-asc":
        sorted = sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "date-desc":
        sorted = sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      default:
        // Default to most-recent
        sorted = [...filteredProperties];
    }
    setSortedProperties(sorted);
  };

  sortProperties();
}, [sortOption, filteredProperties]);
  // Logic for pagination
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  // const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  const currentProperties = sortedProperties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  const totalPages = Math.ceil(sortedProperties.length / propertiesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  console.log("current",currentProperties)


  const [showPopover3, setShowPopover3] = useState(false);
  const popover3 = (
    <Popover id="popover-basic" className="custom-popoverHome">
      <Popover.Body>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <FaTimes style={{ cursor: "pointer", color: "white" }} onClick={() => setShowPopover3(false)} />
        </div>
        <Community
       initialSelected={bcommunity} 
          onApply={(selectedTypes) => {
            setBcomunity(selectedTypes);
            setShowPopover3(false);
          }}
          onClear={() => {
            setBcomunity([]);
          }}
        />
      </Popover.Body>
    </Popover>
  );

  
  const [showPopover5, setShowPopover5] = useState(false);
  const popover5 = (
    <Popover id="popover-basic" className="custom-popoverHome">
      <Popover.Body>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <FaTimes style={{ cursor: "pointer", color: "white" }} onClick={() => setShowPopover5(false)} />
        </div>
        <BRoffplan
       initialSelected={community} 
          onApply={(selectedTypes) => {
            setCommunity(selectedTypes);
            setShowPopover5(false);
          }}
          onClear={() => {
            setCommunity([]);
          }}
        />
      </Popover.Body>
    </Popover>
  );


  // sqft
const [showPopover4, setShowPopover4] = useState(false);
const popover4 = (
  <Popover id="popover-basic" className="custom-popoversqr">
    <Popover.Body>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <FaTimes style={{ cursor: "pointer", color: "white" }} onClick={() => setShowPopover4(false)} />
      </div>
      <SqftFilter
        initialRange={sqftRange}
        onApply={(filters) => {
          setSqftRange(filters);
          filterProperties(filters);
          setShowPopover3(false);
        }}
        onClear={() => {
          setSqftRange({ minSqft: 0, maxSqft: 10000 });
          filterProperties({ minSqft: 0, maxSqft: 10000 });
          setShowPopover3(false);
        }}
      />
    </Popover.Body>
  </Popover>
);
  
const textKeys = {
   
  Price:'Price',
  Community:'Community', 
  HOME:'HOME',
  Sqft:'Sqft',
  View:'View',
  Properties:'Properties',
  Area:'Area', 
  open:'open',
  a:'a',
  z:'z',
  Newest:'Newest',
  Oldest:'Oldest',
  Previous:'Previous',
  Next:'Next',
  Email:'Email',
  Phone:'Phone',
  WhatsApp:'WhatsApp',
  BR:'BR'
 };

useEffect(() => {
  // Update translations for each text key

  updateTranslations(textKeys.Price,'Price')
    updateTranslations(textKeys.Community,'Community') 
    updateTranslations(textKeys.HOME,'HOME TYPE')  
    updateTranslations(textKeys.Sqft,'Sqft & Sqmt.')  
    updateTranslations(textKeys.View,'View on Map')
    updateTranslations(textKeys.Area,'Area, Project, Community')
    updateTranslations(textKeys.Properties,'Properties for Buy in Dubai') 
    updateTranslations(textKeys.open, 'Most Recent');
    updateTranslations(textKeys.a, 'A to Z');
    updateTranslations(textKeys.z, 'Z to A');
    updateTranslations(textKeys.Newest, 'Newest');
    updateTranslations(textKeys.Oldest, 'Oldest'); 
    updateTranslations(textKeys.Next, 'Next');
    updateTranslations(textKeys.Email, 'Email');  
    updateTranslations(textKeys.Phone, 'Phone');  
    updateTranslations(textKeys.WhatsApp, 'WhatsApp');  
    updateTranslations(textKeys.Previous, 'Previous'); 
    updateTranslations(textKeys.BR, 'Select BR'); 

}, [language, updateTranslations]);


  return (
    <div className="App">
       <Helmet>
      <title>Offplan </title>
      <meta name="title" content="offplan" />
      {/*  */}
        <meta name="description" content="Offplan " />
        <meta name="keywords" content="offplan" />
        {/* <link rel="canonical" href="https://www.omkatech.com/services/designing"></link> */}

        <meta name="robots" content="index, follow" />
      </Helmet>
      <NavToAll /><br/><br/>
      <div className="container-fluid">
  <div className="row justify-content-center mb-4 rentfilterow mx-md-4 px-md-4 mx-2">
    <div className="col-md-4">
      <input type="search" className="custom-input" placeholder={translations[textKeys.Area] || 'Loading...'} />
    </div>
    {/* <div className="col-12 d-flex align-items-center justify-content-end" id="ffbtn">
  <div className="flex overflow-x-scroll md:flex-nowrap md:overflow-visible gap-2">
    </div>
</div> */}
    <div className="col-12 col-md-8 d-flex align-items-center justify-content-end" id="ffbtn">
  <div className="flex overflow-x-auto md:flex-nowrap md:overflow-visible gap-2">
  <OverlayTrigger trigger="click" placement="bottom" overlay={popover3} show={showPopover3}
                onToggle={() => { setShowPopover3(!showPopover3); setShowPopover(false); setShowPopover1(false); setIsOpen(false); }} >
                <button className="buttonnewrent mb-1">{translations[textKeys.Community] || 'Loading...'}</button>
              </OverlayTrigger>&nbsp;&nbsp;
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover} show={showPopover}
      onToggle={() => { setShowPopover(!showPopover); setShowPopover1(false); setShowPopover2(false); setIsOpen(false); }}>
      <button className="buttonnewrent mb-1">{translations[textKeys.Price] || 'Loading...'}</button>
    </OverlayTrigger>&nbsp;&nbsp;
   
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover5} show={showPopover5}
                onToggle={() => { setShowPopover5(!showPopover5); setShowPopover(false); setShowPopover1(false); setIsOpen(false); }} >
                <button className="buttonnewrent mb-1">{translations[textKeys.BR] || 'Loading...'}</button>
              </OverlayTrigger>&nbsp;&nbsp;
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover2} show={showPopover2}
      onToggle={() => { setShowPopover2(!showPopover2); setShowPopover(false); setShowPopover1(false); setIsOpen(false); }} >
      <button className="buttonnewrent mb-1">{translations[textKeys.HOME] || 'Loading...'}</button>
    </OverlayTrigger>&nbsp;&nbsp;
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover4} show={showPopover4}
      onToggle={() => { setShowPopover4(!showPopover4);setShowPopover1(false);  setShowPopover(false); setShowPopover2(false); setIsOpen(false); }} >
      <button className="buttonnewrent mb-1">{translations[textKeys.Sqft] || 'Loading...'}</button>
    </OverlayTrigger>&nbsp;&nbsp; 
    {/* <button type="button" onClick={() => { toggleSidebar(); setShowPopover2(false); setShowPopover(false); setShowPopover1(false); }}
      className="buttonnewrent mb-1">
      Filters
    </button>&nbsp;&nbsp; */}
    <button type="button" className="buttonnewrent mb-1" onClick={Map}>
    {translations[textKeys.View] || 'Loading...'}  
    </button>
  </div>

</div>
<Sidebar isOpen={isOpen} toggle={toggleSidebar} />
  </div>

  <div className="row justify-content-between mb-4 rentfilterow mx-md-4 px-md-4 mx-2">
    <div className="col-md-4">
      <h5 className="rentp">{translations[textKeys.Properties] || 'Loading...'}</h5>
      <p>
        {indexOfFirstProperty + 1}-{Math.min(indexOfLastProperty, filteredProperties.length)} of {filteredProperties.length} results
      </p>
    </div>
    <div className="col-md-4"></div>
    <div className="col-md-4">
      <div className="filter-sort">
        <select id="mostr" onChange={handleSortChange} value={sortOption} className="form-select">
          <option value="most-recent">{translations[textKeys.open] || 'Loading...'}</option>
          <option value="title-asc">{translations[textKeys.a] || 'Loading...'}</option>
          <option value="title-desc">{translations[textKeys.z] || 'Loading...'}</option>
          <option value="date-asc">{translations[textKeys.Newest] || 'Loading...'}</option>
          <option value="date-desc">{translations[textKeys.Oldest] || 'Loading...'}</option>
        </select>
      </div>
    </div>
  </div>

  <div className="row justify-content-left rentfilterow mx-md-4 px-md-4 mx-2">
    {currentProperties.map((property, index) => (
      <div key={index} className="col-md-4 mb-4">
        <Card
          type={property.propertyType}
          price={property.price}
          title={property.title}
          location={property.location}
          image={property.feature_image}
          status={property.status}
          property={property} // pass the property data
          onClick={handleCardClick} 
        />
      </div>
    ))}
  </div>

  <div className="row justify-content-center mt-4 rentfilterow mx-md-4 mx-2">
    <div className="col-md-12">
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <a className="page-link" onClick={prevPage} href="#">
            {translations[textKeys.Previous] || 'Loading...'} 
            </a>
          </li>
          {[...Array(Math.ceil(filteredProperties.length / propertiesPerPage)).keys()].map((number) => (
            <li key={number} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
              <a className="page-link" onClick={() => setCurrentPage(number + 1)} href="#">
                {number + 1}
              </a>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <a className="page-link" onClick={nextPage} href="#">
            {translations[textKeys.Next] || 'Loading...'} 

            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</div>

      <Footer />
    </div>
  );
}

export default NewR;


