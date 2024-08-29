import React, { useState, useEffect } from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import '../css/sqr.css';

const SqftFilter = ({ initialRange = { minSqft: 0, maxSqft: 10000 }, onApply, onClear }) => {
  const [sqftRange, setSqftRange] = useState({ min: initialRange.minSqft, max: initialRange.maxSqft });

  useEffect(() => {
    setSqftRange({ min: initialRange.minSqft, max: initialRange.maxSqft });
  }, [initialRange]);

  const handleClear = () => {
    setSqftRange({ min: 0, max: 10000 }); // Reset to default range
    onClear();
  };

  const handleApply = () => {
    onApply({ minSqft: sqftRange.min, maxSqft: sqftRange.max });
  };

  const handleChange = (value) => {
    setSqftRange(value);
  };

  return (
    <div className="filter-popup4">
      <div className="filter-section">
        <label className="filter-label">Sqft</label>
        <div className="slider-container">
          <InputRange
            minValue={0}
            maxValue={10000}
            value={sqftRange}
            onChange={handleChange}
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

export default SqftFilter;
