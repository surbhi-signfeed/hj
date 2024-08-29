// PriceFilter.js
import React, { useState,useEffect, useRef } from "react";
import '../css/HomeSearch.css'
import { FaArrowRight,FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import axios from "axios";
import {
 
  useNavigate,
} from "react-router-dom";

const HomeSearch = () => {
  const [properties, setProperties] = useState([]);
  const [properties1, setProperties1] = useState([]);
  const [offplan, setOffplan] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Buy");
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
   const [filteredPropertiess, setFilteredProperties] = useState([]);
   const { language, translations, updateTranslations } = useLanguage();
  
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

  const filterProperties = () => {
    let filtered = properties;
  
    // Filter by status
    if (selectedOption && selectedOption !== "OFFPLAN") {
      filtered = filtered.filter((property) => property.status === selectedOption);
    } else if (selectedOption === "OFFPLAN") {
      filtered = offplan; // Use offplan data instead of properties
    }
  
    // Filter by search input
    if (searchInput) {
      if (selectedOption === "OFFPLAN") {
        // Use exactLocation for OFFPLAN
        filtered = filtered.filter(
          (property) =>
            property.exactLocation.toLowerCase().includes(searchInput.toLowerCase()) ||
            property.propertyType.toLowerCase().includes(searchInput.toLowerCase())
        );
      } else {
        // Use location for other options
        filtered = filtered.filter(
          (property) =>
            property.location.toLowerCase().includes(searchInput.toLowerCase()) ||
            property.propertyType.toLowerCase().includes(searchInput.toLowerCase())
        );
      }
    }
  
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



  const Sell = () =>{
    navigate("/sell-your-property-with-us");
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      filterProperties();
    }
  };

  
  const textKeys = {

    BUY:'BUY',
    RENT:'RENT',
    SELL:'SELL',
    OFFPLAN:'OFFPLAN',
    placeholder:'placeholder'
   };

  useEffect(() => {
    // Update translations for each text key
 
    
    updateTranslations(textKeys.BUY, 'BUY'); 
    updateTranslations(textKeys.RENT, 'RENT'); 
    updateTranslations(textKeys.SELL, 'SELL');
    updateTranslations(textKeys.OFFPLAN, 'OFFPLAN'); 
    updateTranslations(textKeys.placeholder, 'Country, City, Address, Postal Code or ID');


}, [language, updateTranslations]);

  return (
<>
{/* lappy */}
    <div className="filter-popup7">
      <div className="filter-section7">
       
        <div className="slider-container7">
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
                  <FaSearch className="search-icon"     onClick={filterProperties}/>
                  <input
                    type="text"
                    className="search-input"
                    placeholder=       {translations[textKeys.placeholder] || 'Loading...'} 
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <FaArrowRight className="arrow-icon"
                      onClick={filterProperties} />
                </div>
              </div>
        </div>
      </div>
    
      <br/>
     
    </div>



    
    </>
  );
};

export default HomeSearch;
