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

import NavToAll from "../component/NavToAll";

function RentFilter() {
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [sortedProperties, setSortedProperties] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [propertyType, setPropertyType] = useState([]);
  const [propertyLocation, setPropertyLocation] = useState("");
  const [activeButton, setActiveButton] = useState('ALL');
  const [priceRange, setPriceRange] = useState({ minPrice: 0, maxPrice: 1000000 });
  const [bedRange, setBedRange] = useState({ min: 0, max: 10 });
  const [bathRange, setBathRange] = useState({ min: 0, max: 10 });
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(3); // Number of properties to display per page

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
      tempProperties = tempProperties.filter((property) => {
        if (property.propertyType) {
          const typeUpperCase = property.propertyType.trim().toUpperCase();
          const match = propertyType.some(type => type.trim().toUpperCase() === typeUpperCase);
          return match;
        } else {
          console.warn("Property type is undefined or null:", property);
          return false;
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

  return (
    <div className="App">
      <NavToAll />
      <br/>
      <div className="container-fluid">
  <div className="row justify-content-left mb-4 rentfilterow mx-md-4 px-md-4 mx-2">
    <div className="col-md-4">
      <input type="search" className="custom-input" placeholder="Area, Project, Community" />
    </div>
    <div className="col-12 col-md-8 d-flex align-items-center justify-content-end" id="ffbtn">
  <div className="flex overflow-x-auto md:flex-nowrap md:overflow-visible gap-2">
    <button
      className={`buttonnewrent mb-1 ${activeButton === 'BUY' ? 'active' : ''}`}
      onClick={() => handleButtonClick('BUY')}
    >
      BUY
    </button>
    <button
      className={`buttonnewrent mb-1 ${activeButton === 'RENT' ? 'active' : ''}`}
      onClick={() => handleButtonClick('RENT')}
    >
      RENT
    </button>&nbsp;&nbsp;
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover} show={showPopover}
      onToggle={() => { setShowPopover(!showPopover); setShowPopover1(false); setShowPopover2(false); setIsOpen(false); }}>
      <button className="buttonnewrent mb-1">Price</button>
    </OverlayTrigger>&nbsp;&nbsp;
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover1} show={showPopover1}
      onToggle={() => { setShowPopover1(!showPopover1); setShowPopover(false); setShowPopover2(false); setIsOpen(false); }} >
      <button className="buttonnewrent mb-1">BEDS & BATHS</button>
    </OverlayTrigger>&nbsp;&nbsp;
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover2} show={showPopover2}
      onToggle={() => { setShowPopover2(!showPopover2); setShowPopover(false); setShowPopover1(false); setIsOpen(false); }} >
      <button className="buttonnewrent mb-1">HOME TYPE</button>
    </OverlayTrigger>&nbsp;&nbsp;
    <button type="button" onClick={() => { toggleSidebar(); setShowPopover2(false); setShowPopover(false); setShowPopover1(false); }}
                className="buttonnewrent mb-1">
                Filters
              </button>&nbsp;&nbsp;
    <button type="button" className="buttonnewrent mb-1">
      View on Map
    </button>
  </div>
</div>
          <Sidebar isOpen={isOpen} toggle={toggleSidebar} />

  </div>

  <div className="row justify-content-between mb-4 rentfilterow mx-md-4 px-md-4 mx-2">
    <div className="col-md-4">
      <h5 className="rentp">Properties for Rent in Dubai</h5>
      <p>
        {indexOfFirstProperty + 1}-{Math.min(indexOfLastProperty, filteredProperties.length)} of {filteredProperties.length} results
      </p>
    </div>
    <div className="col-md-4"></div>
    <div className="col-md-4">
      <div className="filter-sort">
        <select id="mostr" onChange={handleSortChange} value={sortOption} className="form-select">
          <option value="most-recent">Most Recent</option>
          <option value="title-asc">Sort by title (A-Z)</option>
          <option value="title-desc">Sort by title (Z-A)</option>
          <option value="date-asc">Sort by date (oldest)</option>
          <option value="date-desc">Sort by date (newest)</option>
        </select>
      </div>
    </div>
  </div>

  <div className="row justify-content-center rentfilterow mx-md-4 px-md-4 mx-2">
    {currentProperties.map((property, index) => (
      <div key={index} className="col-md-4 mb-4">
        <Card
          type={property.propertyType}
          price={property.price}
          title={property.title}
          location={property.location}
          image={property.feature_image}
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
              Previous
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
              Next
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

export default RentFilter;
