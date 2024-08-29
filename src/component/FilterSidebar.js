
import React, { useState } from 'react';
import { FaTimes, FaPlus, FaMinus } from 'react-icons/fa';

import  '../css/filtersidebars.css'

const FilterSidebar = ({ isOpen, toggleSidebar, onClearAll }) => {
  const [listingTypeOpen, setListingTypeOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [squareFeetOpen, setSquareFeetOpen] = useState(false);
  const [acreageOpen, setAcreageOpen] = useState(false);

  return (
    <div className={`filter-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="filter-sidebar-header">
        <h5>Filters</h5>
        <FaTimes className="close-icon" onClick={toggleSidebar} />
      </div>
      <div className="filter-section">
        <div className="filter-title" onClick={() => setListingTypeOpen(!listingTypeOpen)}>
          Listing Type {listingTypeOpen ? <FaMinus /> : <FaPlus />}
        </div>
        {listingTypeOpen && (
          <div className="filter-content">
            <button>For Sale</button>
            <button>For Rent</button>
            <label>
              <input type="checkbox" /> Sotheby's International Realty Exclusive Only
            </label>
            <label>
              <input type="checkbox" /> Open Houses Only
            </label>
            <label>
              <input type="checkbox" /> Virtual
            </label>
            <label>
              <input type="checkbox" /> In Person
            </label>
          </div>
        )}
      </div>
      <div className="filter-section">
        <div className="filter-title" onClick={() => setPriceOpen(!priceOpen)}>
          Price {priceOpen ? <FaMinus /> : <FaPlus />}
        </div>
        {priceOpen && (
          <div className="filter-content">
            {/* Add your price filter content here */}
          </div>
        )}
      </div>
      <div className="filter-section">
        <div className="filter-title" onClick={() => setSquareFeetOpen(!squareFeetOpen)}>
          Square Feet {squareFeetOpen ? <FaMinus /> : <FaPlus />}
        </div>
        {squareFeetOpen && (
          <div className="filter-content">
            {/* Add your square feet filter content here */}
          </div>
        )}
      </div>
      <div className="filter-section">
        <div className="filter-title" onClick={() => setAcreageOpen(!acreageOpen)}>
          Acreage {acreageOpen ? <FaMinus /> : <FaPlus />}
        </div>
        {acreageOpen && (
          <div className="filter-content">
            {/* Add your acreage filter content here */}
          </div>
        )}
      </div>
      <div className="filter-actions">
        <button className="clear-btn" onClick={onClearAll}>CLEAR ALL</button>
        <button className="apply-btn">APPLY</button>
      </div>
    </div>
  );
};

export default FilterSidebar;
