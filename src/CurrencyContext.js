import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD');
  const [unit, setUnit] = useState('sqft');
  const [favorites, setFavorites] = useState([]);
  const [rentComparison, setRentComparison] = useState([]);
  const [buyComparison, setBuyComparison] = useState([]);

  const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    INR: '₹',
    AED: 'د.إ',
  };

  const conversionRates = {
    USD: 1,
    EUR: 0.93,
    GBP: 0.80,
    JPY: 156.23,
    INR: 83.49,
    AED: 3.673,
  };

  useEffect(() => {
    const savedFavorites = Cookies.get('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    Cookies.set('favorites', JSON.stringify(favorites), { expires: 7, sameSite: 'Lax' });
  }, [favorites]);

  const handleChangeCurrency = (currencyCode) => {
    setCurrency(currencyCode);
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + 'K';
    }
    return num.toFixed(2);
  };

  const convertAmount = (amount) => {
    if (amount === null || amount === undefined) return amount;
    const amountStr = amount.toString().replace(/,/g, '');
    const numericAmount = parseFloat(amountStr) * conversionRates[currency];
    if (isNaN(numericAmount)) {
      return amount;
    }
    return formatNumber(numericAmount).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const convertSqftToSqm = (sqft) => {
    return sqft * 0.092903;
  };

  const convertSqmToSqft = (sqm) => {
    return sqm / 0.092903;
  };

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
  };

  const addFavorite = (property) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some(fav => fav.id === property.id)) {
        alert("Property already exists in favorites");
        return prevFavorites;
      }
      return [...prevFavorites, property];
    });
  };

  const removeFavorite = (propertyId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((property) => property.id !== propertyId)
    );
  };
  const addRentComparison = (card) => {
    setRentComparison(prev => {
      if (prev.some(property => property.id === card.id)) {
        return prev.filter(property => property.id !== card.id);
      }
      return [...prev, card];
    });
  };

  const addBuyComparison = (card) => {
    setBuyComparison(prev => {
      if (prev.some(property => property.id === card.id)) {
        return prev.filter(property => property.id !== card.id);
      }
      return [...prev, card];
    });
  };
console.log("comp",rentComparison,buyComparison)
  return (
    <CurrencyContext.Provider
      value={{
        currency,
        handleChangeCurrency,
        currencySymbols,
        convertAmount,
        convertSqftToSqm,
        convertSqmToSqft,
        unit,
        handleUnitChange,
        favorites,
        addFavorite,
        removeFavorite,
        rentComparison,
        buyComparison,
        addRentComparison,
        addBuyComparison,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
