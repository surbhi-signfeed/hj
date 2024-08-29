import React from 'react';
import { useCurrency } from '../CurrencyContext';

const UnitToggle = () => {
  const { unit, handleUnitChange } = useCurrency();

  const handleToggle = (event) => {
    handleUnitChange(event.target.value);
  };

  return (
    <div className="buttons">
    <label className={`buttonss ${unit === 'sqft' ? 'active' : ''}`}>
      <input 
        type="radio" 
        value="sqft" 
        checked={unit === 'sqft'} 
        onChange={handleToggle} 
      />
      Sqft
    </label>
    <label className={`buttonss ${unit === 'sqm' ? 'active' : ''}`}>
      <input 
        type="radio" 
        value="sqm" 
        checked={unit === 'sqm'} 
        onChange={handleToggle} 
      />
      Sqm
    </label>
  </div>
  );
};

export default UnitToggle;
