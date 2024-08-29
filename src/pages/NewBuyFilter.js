import React, { useState, useEffect } from "react";
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
import FilterNav from "../component/FilterNav1";
import NavToAll from "../component/NavToAll";

function RentFilter() {
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [sortedProperties, setSortedProperties] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [propertyType, setPropertyType] = useState([]);
  const [propertyLocation, setPropertyLocation] = useState("");
  const [sorthide, setsort] = useState(false);
  const [filterhide, setfilter] = useState(true);
  const [activeButton, setActiveButton] = useState('ALL');
  const [priceRange, setPriceRange] = useState({ minPrice: 0, maxPrice: 1000000 });
  const [bedRange, setBedRange] = useState({ min: 0, max: 10 });
  const [bathRange, setBathRange] = useState({ min: 0, max: 10 });
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/uploads-rent');
        const propertiesData = response.data.map(property => ({
          ...property,
          price: Number(property.price.replace(/[^0-9.-]+/g, "")),
          bedrooms: Number(property.bedrooms.replace(/[^0-9.-]+/g, "")),
          bathroom: Number(property.bathroom.replace(/[^0-9.-]+/g, ""))
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

  useEffect(() => {
    handleFilter();
  }, [properties, searchTitle, propertyType, propertyLocation, activeButton, priceRange, bedRange, bathRange]);

  const handleFilter = () => {
    let tempProperties = [...properties];

    if (searchTitle.trim() !== "") {
      tempProperties = tempProperties.filter((property) =>
        property.title.toLowerCase().includes(searchTitle.toLowerCase().trim())
      );
    }
    if (propertyType.length > 0) {
      console.log("propertyType:", propertyType); // Log propertyType to see its value
      tempProperties = tempProperties.filter((property) => {
        if (property.propertyType) {
          const typeUpperCase = property.propertyType.trim().toUpperCase(); // Trim and convert to uppercase
          const match = propertyType.some(type => type.trim().toUpperCase() === typeUpperCase); // Use some() to find any match
          console.log(`Comparing '${typeUpperCase}' with '${propertyType}':`, match);
          return match;
        } else {
          console.warn("Property type is undefined or null:", property);
          return false; // Filter out properties with undefined or null type
        }
      });
    }
    
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

    tempProperties = tempProperties.filter(
      (property) => property.bedrooms >= bedRange.min && property.bedrooms <= bedRange.max
    );

    tempProperties = tempProperties.filter(
      (property) => property.bathroom >= bathRange.min && property.bathroom <= bathRange.max
    );

    setFilteredProperties(tempProperties);
    setsort(false);
  };

  const handleReset = () => {
    setSearchTitle("");
    setPropertyType([]);
    setPropertyLocation("");
    setPriceRange({ minPrice: 0, maxPrice: 1000000 });
    setBedRange({ min: 0, max: 10 });
    setBathRange({ min: 0, max: 10 });
    setFilteredProperties(properties);
  };

  const handleSort = (sortType) => {
    let sortedArray = [...filteredProperties];
    if (sortType === "title-asc") {
      sortedArray.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortType === "title-desc") {
      sortedArray.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortType === "date-asc") {
      sortedArray.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortType === "date-desc") {
      sortedArray.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    setSortedProperties(sortedArray);
  };

  const handleSortChange = (event) => {
    handleSort(event.target.value);
    setsort(true);
    setfilter(false);
  };

  const Card = ({ type, price, title, location, image }) => {
    return (
      <div className="rentcard">
        <div className="rentcard-type">{type}</div>
        <img src={image} alt={title} className="rentcard-image" />
        <div className="rentcard-content">
          <div className="rentcard-price">AED{price}/Yearly</div>
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

  return (
    <div className="App">
    
   <NavToAll/>
    
      
      <div className="container-fluid">
        <div className="mt-5">
          <div className="row pb-5" style={{ width: "100%" }}>
            <div className="col-md-1"></div>
            <div className="col-md-3">
              <input type="search" className="custom-input" placeholder="Area, Project, Community" />
            </div>
            <div className="col-md-8" id="ffbtn">
              <div className="toggle-button">
                <button
                  className={activeButton === 'BUY' ? 'active' : ''}
                  onClick={() => handleButtonClick('BUY')}
                >
                  BUY
                </button>
                <button
                  className={activeButton === 'RENT' ? 'active' : ''}
                  onClick={() => handleButtonClick('RENT')}
                >
                  RENT
                </button>
              </div>
              &nbsp; &nbsp;

              <OverlayTrigger trigger="click" placement="bottom" overlay={popover} show={showPopover}
                onToggle={() => { setShowPopover(!showPopover); setShowPopover1(false); setShowPopover2(false); setIsOpen(false); }}>
                <button className="buttonnewrent mb-1">Price</button>
              </OverlayTrigger>
              &nbsp; &nbsp;
              <OverlayTrigger trigger="click" placement="bottom" overlay={popover1} show={showPopover1}
                onToggle={() => { setShowPopover1(!showPopover1); setShowPopover(false); setShowPopover2(false); setIsOpen(false); }} >
                <button className="buttonnewrent mb-1">BEDS & BATHS</button>
              </OverlayTrigger>
              &nbsp; &nbsp;
              <OverlayTrigger trigger="click" placement="bottom" overlay={popover2} show={showPopover2}
                onToggle={() => { setShowPopover2(!showPopover2); setShowPopover(false); setShowPopover1(false); setIsOpen(false); }} >
                <button className="buttonnewrent mb-1">HOME TYPE</button>
              </OverlayTrigger>
              &nbsp; &nbsp;
              <button type="button" onClick={() => { toggleSidebar(); setShowPopover2(false); setShowPopover(false); setShowPopover1(false); }}
                className="buttonnewrent mb-1">
                Filters
              </button>
              &nbsp; &nbsp;
              <button type="button" className="buttonnewrent mb-1">
                View on Map
              </button>
            </div>
          </div>
          <Sidebar isOpen={isOpen} toggle={toggleSidebar} />
          <div className="container-xxl">
            <div className="row" style={{ marginLeft: '50px', marginRight: '70px' }}>
              <div className="col-md-4">
                <h5 className="rentp">Properties for Rent in Dubai</h5>
                <p>
                  1-{filteredProperties.length} of {properties.length} results
                </p>
              </div>
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <div className="filter-sort">
                  <select onChange={handleSortChange} id="mostr">
                    <option value="most-recent">Most Recent</option>
                    <option value="title-asc">Sort by title (A-Z)</option>
                    <option value="title-desc">Sort by title (Z-A)</option>
                    <option value="date-asc">Sort by date (oldest)</option>
                    <option value="date-desc">Sort by date (newest)</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row" style={{ marginLeft: '30px' }}>
              <div className="property-list">
                {filterhide && (
                  <>
                    {filteredProperties.map((property, index) => (
                      <Card
                        key={index}
                        type={property.propertyType}
                        price={property.price}
                        title={property.title}
                        location={property.location}
                        image={property.feature_image}
                      />
                    ))}
                  </>
                )}
                {sorthide && (
                  <>
                    {sortedProperties.map((property, index) => (
                      <Card
                        key={index}
                        type={property.type}
                        price={property.price}
                        title={property.title}
                        location={property.location}
                        image={property.feature_image}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RentFilter;
