import React, { useState,useEffect } from "react";
import Footer from '../component/Footer';
import FilterNav from '../component/FilterNav';
import { useCurrency } from '../CurrencyContext'; 
import { Card, Button } from 'react-bootstrap';
import { FiBookmark } from 'react-icons/fi';
import { FiBookmark as FiBookmarkFilled } from 'react-icons/fi'; // Import filled bookmark icon
import { CgBoard, CgLaptop } from "react-icons/cg";
import Carousel from 'react-multi-carousel';
import "../css/Comparison.css";
import NavToAll from "../component/NavToAll";
import { useLanguage } from "../LanguageContext";




const Fav = () => {
  const { currency, convertAmount, convertSqftToSqm, unit, addFavorite, favorites, removeFavorite, addRentComparison, addBuyComparison,rentComparison,
    buyComparison
   } = useCurrency();
   const { language, translations, updateTranslations } = useLanguage();
   const textKeys = {
    Compare: "Compare",
    comparison: "comparison",
    Rent:"Rent",
    Buy:"Buy"

     
   };
 
   useEffect(() => {
     // Update translations for each text key
 
     updateTranslations(
       textKeys.Compare,
       "Compare"
     );
     updateTranslations(
      textKeys.Rent,
      "Rent"
    );
    updateTranslations(
      textKeys.Buy,
      "Buy"
    );
      
      
     updateTranslations(
      textKeys.comparison,
      "No comparison properties added yet."
    );
    

   }, [language, updateTranslations]);
 
 
 
  const handleBookmarkClick = (card) => {
    if (favorites.some(fav => fav.id === card.id)) {
      removeFavorite(card.id);
    } else {
      addFavorite(card);
    }
  };

  const isFavorite = (cardId) => {
    return favorites.some(fav => fav.id === cardId);
  };
  const handleAddComparison = (card) => {
    if (card.status === 'Rent') {
      if (rentComparison.some(property => property.id === card.id)) {
        // alert("Property removed from Rent comparison list");
      } else {
        // alert("Property added to Rent comparison list");
      }
      addRentComparison(card);
    } else if (card.status === 'Buy') {
      if (buyComparison.some(property => property.id === card.id)) {
        // alert("Property removed from Buy comparison list");
      } else {
        // alert("Property added to Buy comparison list");
      }
      addBuyComparison(card);
    }
  };

  const isInComparison = (card) => {
    return card.status === 'Rent' 
      ? rentComparison.some(property => property.id === card.id) 
      : buyComparison.some(property => property.id === card.id);
  };

  const [filter, setFilter] = useState('Buy'); // Default filter

  const headers = ["Image", "Price", "Area", "Bedrooms", "Bathroom","Property Type"];
  const properties = filter === 'Buy' ? buyComparison : rentComparison;

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  let carouselRef = React.createRef();

  console.log("fg",rentComparison,buyComparison)

  
  return (
    <div>
     <NavToAll/>
      <div style={{ padding: "30px" }}>
        <div className='row mt-5'>
          <div className='col-md-1'></div>
          <div className='col-md-10'>
            <h1 className='text-center'> {translations[textKeys.Compare] || "Loading..."}</h1>
          </div>
          <div className='col-md-1'></div>
        </div>
        <div className="property-comparison">
      <div className="filter-buttons">
        <button onClick={() => setFilter('Buy')} className={filter === 'Buy' ? 'active' : ''}> {translations[textKeys.Buy] || "Loading..."}</button>
        <button onClick={() => setFilter('Rent')} className={filter === 'Rent' ? 'active' : ''}> {translations[textKeys.Rent] || "Loading..."}</button>
      </div>
      {properties.length === 0 ? (
  <p>{translations[textKeys.comparison] || "Loading..."}</p>
) : (
  <>
  {/* for laptop */}
  <div className="table-container">
  <table className="comparison-table">
    <thead>
      <tr>
        <th>Features</th>
        {properties.map((property, index) => (
          <th key={index}>Property {index + 1}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {headers.map((header, index) => (
        <tr key={index}>
          <td className="header-cell">{header}</td>
          {properties.map((property, propertyIndex) => (
            <td key={propertyIndex} data-label={header}>
              {header === "Image" ? (
                 <div style={{ position: 'relative', display: 'inline-block' }}>
                 <img
                   src={property.feature_image}
                   alt={`Property ${propertyIndex + 1}`}
                   className="property-image"
                 />
                 <CgBoard
                   className={`card-button card-buttons2 ${isInComparison(property) ? 'in-comparison' : ''}`}
                   onClick={(e) => {
                     e.stopPropagation();
                     handleAddComparison(property);
                   }}
                   style={{
                     position: 'absolute',
                     top: '5px',
                     right: '5px', // adjust position as needed
                     cursor: 'pointer',
                     size:"5px"
                   }}
                 />
               </div>
                
              ) : header === "Property Type" ? (
                property.propertyType
              ) : (
                property[header.toLowerCase()]
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
</div>

{/* for mobile */}
<div className="table-containerm">
      <table className="comparison-tablem">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {properties.map((property, propertyIndex) => (
            <tr key={propertyIndex}>
              {headers.map((header, index) => (
                <td key={index} data-label={header}>
                  {header === "Image" ? (
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                  <img
                    src={property.feature_image}
                    alt={`Property ${propertyIndex + 1}`}
                    className="property-image"
                  />
                  <CgBoard
                    className={`card-button card-buttons2 ${isInComparison(property) ? 'in-comparison' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddComparison(property);
                    }}
                    style={{
                      position: 'absolute',
                      top: '5px',
                      right: '5px', // adjust position as needed
                      cursor: 'pointer',
                    }}
                  />
                </div>

                  ) : header === "Property Type" ? (
                    property.propertyType
                  ) : (
                    property[header.toLowerCase()]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
</>
)}


    </div>
   
      </div>
      <Footer/>
    </div>
  );
};

export default Fav;
