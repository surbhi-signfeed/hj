import React, { useState, useEffect } from "react";
import '../css/HomeType.css';
import { FaSearch } from 'react-icons/fa';

const HomeType = ({ initialSelectedHomeTypes = [], onApply, onClear }) => {
  const [selectedHomeTypes, setSelectedHomeTypes] = useState(initialSelectedHomeTypes);

  useEffect(() => {
    setSelectedHomeTypes(initialSelectedHomeTypes);
  }, [initialSelectedHomeTypes]);

  const handleCheckboxChange = (homeType) => {
    setSelectedHomeTypes((prevSelected) => {
      if (prevSelected.includes(homeType)) {
        return prevSelected.filter((type) => type !== homeType);
      } else {
        return [...prevSelected, homeType];
      }
    });
  };

  const handleClear = () => {
    setSelectedHomeTypes([]);
    onClear();
  };

  const handleApply = () => {
    onApply(selectedHomeTypes);
  };

  return (
    <div className="filter-popup1">
      <div className="filter-section">
        <label className="filter-label">HomeType</label>
        <div className="slider-container">
          <div className="search-container1">
            <div className="search-input-container">
              <FaSearch className="search-icon" />
              <input type="text" className="search-input" placeholder="Enter Property Type" />
            </div>
          </div>
          <div className="check">
            {['Apartment', 'Office', 'Bed and Breakfast Home', 'Condominium', 'Co-op Properties', 'Duplex Home'].map((type) => (
              <div key={type}>
                <input
                  type="checkbox"
                  checked={selectedHomeTypes.includes(type)}
                  onChange={() => handleCheckboxChange(type)}
                />&nbsp;
                {type}
                <br />
              </div>
            ))}
          </div>
        </div>
      </div>

      <br />
      <div className="button-container">
        <button className="clear-button" onClick={handleClear}>
          CLEAR
        </button>
        <button className="apply-button" onClick={handleApply}>
          APPLY
        </button>
      </div>
    </div>
  );
};

export default HomeType;
