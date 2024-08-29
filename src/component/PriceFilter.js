import React, { useState, useEffect } from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import '../css/pricefilterpop.css';

const PriceFilter = ({ initialRange = { minPrice: 0, maxPrice: 1000000 }, onApply, onClear }) => {
  const [priceRange, setPriceRange] = useState({ min: initialRange.minPrice, max: initialRange.maxPrice });

  useEffect(() => {
    setPriceRange({ min: initialRange.minPrice, max: initialRange.maxPrice });
  }, [initialRange]);

  const handleClear = () => {
    setPriceRange({ min: 0, max: 1000000 }); // Reset to default range
    onClear();
  };

  const handleApply = () => {
    onApply({ minPrice: priceRange.min, maxPrice: priceRange.max });
  };

  const handleChange = (value) => {
    setPriceRange(value);
  };

  return (
    <div className="filter-popup2">
      <div className="filter-section">
        <label className="filter-label">Price</label>
        <div className="slider-container">
          <InputRange
            minValue={0}
            maxValue={1000000}
            value={priceRange} // Use priceRange directly
            onChange={handleChange}
            formatLabel={(value) => `$${value}`} // Ensure this function formats correctly
          />
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

export default PriceFilter;
