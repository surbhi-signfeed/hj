import React, { useState, useEffect } from "react";
import "../css/filtersidebars.css";
import { FaTimes, FaPlus, FaMinus, FaSearch } from "react-icons/fa";
import Slider from "rc-slider";
import { SlArrowLeft } from "react-icons/sl";
import "rc-slider/assets/index.css";
import InputRange from 'react-input-range';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, toggle,filteredSqrsProperties, initialRange = { minPrice: 0, maxPrice: 1000000 }, onApply, onClear }) => {
  const [priceRange, setPriceRange] = useState({ min: initialRange.minPrice, max: initialRange.maxPrice });
  const [show, setShow] = useState(true);
  const [listingTypeOpen, setListingTypeOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(false);
  const [squareFeetOpen, setSquareFeetOpen] = useState(false);
  const [acreageOpen, setAcreageOpen] = useState(false);
  const [lotOpen, setLotOpen] = useState(false);
  const [lifeOpen, setLifeOpen] = useState(false);
  const [filteredSqrProperties, setFilteredProperties] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const { filteredPropertiess } = location.state || [];
  console.log("filteredProperties received:", filteredPropertiess);

  useEffect(() => {
    filterProperties();
  }, [priceRange]);

  const filterProperties = () => {
    const filtered = filteredPropertiess.filter(property => {
      const area = parseInt(property.area, 10);
      return area >= priceRange.min && area <= priceRange.max;
    });
    setFilteredProperties(filtered);
  };
console.log("guri",filteredSqrProperties)

const handleClear = () => {
  setPriceRange({ min: 0, max: 1000000 }); // Reset to default range

};
  // const handleClear = () => {
  
  //   navigate("/N", { state: { filteredPropertiess: filteredSqrProperties } });
  // };

  const handleChange = (value) => {
    setPriceRange(value);
  };

  const handleApply = () => {
    //  onApply(filteredSqrProperties);
    navigate("/N", { state: { filteredPropertiess: filteredSqrProperties } });
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className={`filter-sidebar ${isOpen ? "open" : ""}`}>
        <div className="filter-sidebar-header">
          <h5>Filters</h5>
          <FaTimes className="close-icon" onClick={toggle} />
        </div>
        {show && (
          <>
            <div>
              <div style={{ borderBottom: "1px solid white" }}></div>
              <div className="filter-section">
                <div
                  className="filter-title"
                  onClick={() => {setSquareFeetOpen(!squareFeetOpen),setLotOpen(false),setLifeOpen(false),setAcreageOpen(false),setPriceOpen(false),setListingTypeOpen(false)}}
                >
                  Square Feet
                  <span className="icon-container">
                    <span className="icon-text">Any</span>&nbsp;
                    {squareFeetOpen ? <FaMinus /> : <FaPlus />}
                  </span>
                </div>
                {squareFeetOpen && (
                  <div className="filter-content">
                    <div className="slider-container" style={{ width: "90%" }}>
                      <InputRange
                        minValue={0}
                        maxValue={10000}
                        value={priceRange}
                        onChange={handleChange}
                        formatLabel={(value) => `${value} sqft`}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div style={{ borderBottom: "1px solid white" }}></div>
              <div className="filter-section">
                <div
                  className="filter-title"
                  onClick={() => {
                    setLifeOpen(!lifeOpen);
                    setShow(false);
                  }}
                >
                  Lifestyle
                  <span className="icon-container">
                    <span className="icon-text">Select</span>&nbsp;
                    {lifeOpen ? <FaMinus /> : <FaPlus />}
                  </span>
                </div>
              </div>{" "}
              <div style={{ borderBottom: "1px solid white" }}></div>
            </div>
          </>
        )}

        {lotOpen && (
          <div className="filter-popup6">
            <div className="filter-section1">
              <label className="filter-label">HomeType</label>
              <span
                onClick={() => {
                  setShow(true);
                  setLotOpen(false);
                }}
                style={{
                  cursor: "pointer",
                  fontWeight: "normal",
                  fontSize: "12px",
                }}
              >
                <SlArrowLeft /> BACK / CONTINUE
              </span>
              <div className="slider-container">
                <div className="search-container1">
                  <div className="search-input-container">
                    <FaSearch className="search-icon" />
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Enter Property Type"
                    />
                  </div>
                </div>
                <div className="check2">
                  <input type="checkbox"></input> Apartment
                  <br />
                  <input type="checkbox"></input> Bed and Breakfast Home
                  <br />
                  <input type="checkbox"></input> Condominius
                  <br />
                  <input type="checkbox"></input> Co-op properties
                  <br />
                  <input type="checkbox"></input> Duplex Home
                  <br />
                  <input type="checkbox"></input> Apartment
                  <br />
                  <input type="checkbox"></input> Bed and Breakfast Home
                  <br />
                  <input type="checkbox"></input> Condominius
                  <br />
                  <input type="checkbox"></input> Co-op properties
                  <br />
                  <input type="checkbox"></input> Duplex Home
                  <br />
                </div>
              </div>
            </div>
            <br />
          </div>
        )}
        {lifeOpen && (
          <div className="filter-popup6">
            <div className="filter-section1">
              <label className="filter-label">Lifestyle</label>
              <span
                onClick={() => {
                  setShow(true);
                  setLotOpen(false);
                  setLifeOpen(false);
                }}
                style={{
                  cursor: "pointer",
                  fontWeight: "normal",
                  fontSize: "12px",
                }}
              >
                <SlArrowLeft /> BACK / CONTINUE
              </span>
              <div className="slider-container">
                <div className="search-container1">
                  <div className="search-input-container">
                    <FaSearch className="search-icon" />
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Enter Lifestyle"
                    />
                  </div>
                </div>
                <div className="check2">
                  <input type="checkbox"></input> Apartment
                  <br />
                  <input type="checkbox"></input> Bed and Breakfast Home
                  <br />
                  <input type="checkbox"></input> Condominius
                  <br />
                  <input type="checkbox"></input> Co-op properties
                  <br />
                  <input type="checkbox"></input> Duplex Home
                  <br />
                  <input type="checkbox"></input> Apartment
                  <br />
                  <input type="checkbox"></input> Bed and Breakfast Home
                  <br />
                  <input type="checkbox"></input> Condominius
                  <br />
                  <input type="checkbox"></input> Co-op properties
                  <br />
                  <input type="checkbox"></input> Duplex Home
                  <br />
                </div>
              </div>
            </div>
            <br />
          </div>
        )}
        <br />
        <div className="button-container">
          <button className="clear-button" onClick={handleClear}>
            CLEAR
          </button>
          <button className="apply-button" onClick={handleApply}>APPLY</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;



