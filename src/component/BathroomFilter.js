// BathroomFilter.js
import React, { useState, useEffect } from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import '../css/BathroomFilter.css';

const BathroomFilter = ({ initialRange, onApply, onClear }) => {
  const [bedrooms, setBedrooms] = useState({ min: 0, max: 10 });
  const [bathrooms, setBathrooms] = useState({ min: 0, max: 10 });

  useEffect(() => {
    if (initialRange) {
      setBedrooms(initialRange.bedrooms || { min: 0, max: 10 });
      setBathrooms(initialRange.bathrooms || { min: 0, max: 10 });
    }
  }, [initialRange]);

  const handleClear = () => {
    setBedrooms({ min: 0, max: 10 });
    setBathrooms({ min: 0, max: 10 });
    onClear();
  };

  return (
    <div className="filter-popup">
      <div className="filter-section">
        <label className="filter-label">Bedrooms</label>
        <div className="slider-container">
          <InputRange
            maxValue={10}
            minValue={0}
            value={bedrooms}
            onChange={value => setBedrooms(value)}
          />
        </div>
      </div>
      <div className="filter-section">
        <label className="filter-label">Bathrooms</label>
        <div className="slider-container">
          <InputRange
            maxValue={10}
            minValue={0}
            value={bathrooms}
            onChange={value => setBathrooms(value)}
          />
        </div>
      </div>
      <br />
      <div className="button-container">
        <button className="clear-button" onClick={handleClear}>
          CLEAR
        </button>
        <button className="apply-button" onClick={() => onApply({ bedrooms, bathrooms })}>
          APPLY
        </button>
      </div>
    </div>
  );
};

export default BathroomFilter;
