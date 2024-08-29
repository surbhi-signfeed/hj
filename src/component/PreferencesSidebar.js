import React, { useState,useEffect } from "react";
import "../css/filtersidebars.css";
import { FaTimes, FaPlus, FaMinus } from "react-icons/fa";
import { useCurrency } from "../CurrencyContext";
import UnitToggle from "./UnitToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "../LanguageContext";

const PreferenceSidebar = ({ isOpen, toggle, onClearAll }) => {
  const [listingTypeOpen, setListingTypeOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(false);
  const [squareFeetOpen, setSquareFeetOpen] = useState(false);
  const { language, setLanguage } = useLanguage("en");
  const {  translations, updateTranslations } = useLanguage();

  const { currency, handleChangeCurrency, currencySymbols } = useCurrency();

  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleChangeCurrency1 = (code) => {
    setSelectedCurrency(code);
  };

  // const handleChangeCurrency1 = (code) => {
  //   setSelectedCurrency(code);
  // };

  const handleCurrencyChange = (code) => {
    handleChangeCurrency1(code);
    handleChangeCurrency(code);
  };

  
  const textKeys = {
    Language: 'Language',
    Any:'Any',
    Currency:'Currency',
    Preferences:'Preferences', 
    Square:'Square',
   };

  useEffect(() => {
    // Update translations for each text key
 
    updateTranslations(textKeys.Language, 'Language');  
    updateTranslations(textKeys.Any, 'Any'); 
    updateTranslations(textKeys.Currency, 'Currency'); 
    updateTranslations(textKeys.Preferences, 'Preferences');  
    updateTranslations(textKeys.Square, '    Square Feet');  

    


}, [language, updateTranslations]);

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className={`filter-sidebar ${isOpen ? "open" : ""}`}>
        <div className="filter-sidebar-header">
          <h5>{translations[textKeys.Preferences] || 'Loading...'}</h5>
          <FaTimes
            className="close-icon"
            onClick={toggle}
            style={{ fontSize: "20px" }}
          />
        </div>
        <div>
          <div className="filter-section">
        
              <div
                className="filter-title"
                onClick={() => setListingTypeOpen(!listingTypeOpen)}
              >
                {translations[textKeys.Language] || 'Loading...'}
                <span className="icon-container">
                  <span className="icon-text">   {translations[textKeys.Any] || 'Loading...'}</span>&nbsp;
                  {listingTypeOpen ? <FaMinus /> : <FaPlus />}
                </span>
              </div>
              {listingTypeOpen && (
                <div className="language-options">
                  <button
                    className={`language-option ${
                      language === "en" ? "selected" : ""
                    }`}
                    onClick={() => setLanguage("en")}
                  >
                    English
                  </button>
                  <button
                    className={`language-option ${
                      language === "es" ? "selected" : ""
                    }`}
                    onClick={() => setLanguage("es")}
                  >
                    Spanish
                  </button>
                  <button
                    className={`language-option ${
                      language === "fr" ? "selected" : ""
                    }`}
                    onClick={() => setLanguage("fr")}
                  >
                    French
                  </button>
                  <button
                    className={`language-option ${
                      language === "de" ? "selected" : ""
                    }`}
                    onClick={() => setLanguage("de")}
                  >
                    German
                  </button>
                  {/* Add more languages as needed */}
                </div>
              )}
             </div>
          <div style={{ borderBottom: "1px solid white" }}></div>
          <div className="filter-section">
            <div
              className="filter-title"
              onClick={() => setPriceOpen(!priceOpen)}
            >
             {translations[textKeys.Currency] || 'Loading...'} 
              <span className="icon-container">
                <span className="icon-text">
                  {currencySymbols[currency]} {currency}
                </span>
                &nbsp;
                {priceOpen ? <FaMinus /> : <FaPlus />}
              </span>
            </div>
            {priceOpen && (
              <div className="filter-content">
                <ul>
                  <ul className="currency-list">
                    {Object.keys(currencySymbols).map((code) => (
                      <li
                        key={code}
                        className={`currency-item ${
                          selectedCurrency === code ? "active" : ""
                        }`}
                        onClick={() => handleCurrencyChange(code)}
                      >
                        {code} - {currencySymbols[code]}
                      </li>
                    ))}
                  </ul>
                  {/* <button className="apply-button">Apply</button><br/> */}
                </ul>
              </div>
            )}
          </div>
          <div
            style={{ borderBottom: "1px solid white" }}
            
          ></div>
          <div className="filter-section">
            <div
              className="filter-title"
              onClick={() => setSquareFeetOpen(!squareFeetOpen)}
            >
                {translations[textKeys.Square] || 'Loading...'}   
              <span className="icon-container">
                <span className="icon-text"> {translations[textKeys.Any] || 'Loading...'}</span>&nbsp;
                {squareFeetOpen ? <FaMinus /> : <FaPlus />}
              </span>
            </div>
            {squareFeetOpen && (
              <div className="filter-content">
                <UnitToggle />
              </div>
            )}
          </div>
          <div
            style={{ borderBottom: "1px solid white" }}
            className="leftline"
          ></div>
        </div>
        {/* <div className="button-container">
          <button className="clear-button" onClick={handleClear}>
            CLEAR
          </button>
          <button className="apply-button">APPLY</button>
        </div> */}
      </div>
    </div>
  );
};

export default PreferenceSidebar;
