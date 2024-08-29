import React, { useState,useEffect } from "react";
import Footer from '../component/Footer';
import FilterNav from '../component/FilterNav';
import { useCurrency } from '../CurrencyContext'; 
import { Card, Button } from 'react-bootstrap';
import { FiBookmark } from 'react-icons/fi';
import { FiBookmark as FiBookmarkFilled } from 'react-icons/fi'; // Import filled bookmark icon
import { CgBoard } from "react-icons/cg";
import Carousel from 'react-multi-carousel';
import '../App.css';
import NavToAll from '../component/NavToAll';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from "../LanguageContext";


const Fav = () => {
  const navigate = useNavigate();

  const { currency, convertAmount, convertSqftToSqm, unit, addFavorite, favorites, removeFavorite, addRentComparison, addBuyComparison,rentComparison,
    buyComparison } = useCurrency();
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
        alert("Property removed from Rent comparison list");
      } else {
        alert("Property added to Rent comparison list");
      }
      addRentComparison(card);
    } else if (card.status === 'Buy') {
      if (buyComparison.some(property => property.id === card.id)) {
        alert("Property removed from Buy comparison list");
      } else {
        alert("Property added to Buy comparison list");
      }
      addBuyComparison(card);
    }
  };

  
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
  // const handleCardClick = (property) => {
  //   navigate(`/RentProperty/${property.slug}`, { state: { property } });
  // };

  const handleCardClick = (property) => {
    if (property.status) {
      navigate(`/RentProperty/${property.slug}`, { state: { property } });
    } else {
      navigate(`/offplan/${property.slug}`, { state: { property } });
    }
  };

  const { language, translations, updateTranslations } = useLanguage();
  const textKeys = {
    FAVORITES: "FAVORITES",
   comparison: "comparison",


    
  };

  useEffect(() => {
    // Update translations for each text key

    updateTranslations(
      textKeys.FAVORITES,
      "YOUR FAVORITES"
    );
 
     
    updateTranslations(
     textKeys.comparison,
     "No comparison properties added yet."
   );
   

  }, [language, updateTranslations]);

  
  return (
    <div>
     <NavToAll/>
      <div style={{ padding: "30px" }}>
        <div className='row mt-5'>
          <div className='col-md-1'></div>
          <div className='col-md-10'>
            <h1 className='text-center'>{translations[textKeys.FAVORITES] || "Loading..."}</h1>
          </div>
          <div className='col-md-1'></div>
        </div>
    
        <div className='container'>


        <Carousel ref={(el) => (carouselRef = el)} responsive={responsive}>
        {favorites.length === 0 ? (
            <p> {translations[textKeys.comparison] || "Loading..."}</p>
          ) : (
        favorites.map((card, index) => (
          <div key={index} className='p-2 card-container'  >
            <Card className="shadow mb-2" style={{ borderRadius: "30px", border: "none" }} onClick={() => handleCardClick(card)} >
              <div className="card-img-container">
                <Card.Img variant="top" src={card.feature_image} className="Cardsimg" style={{ borderRadius: "35px", height: "300px" }} />
                <div className="">
                {isFavorite(card.id) ? (
                  <FiBookmarkFilled
                    className="card-button filled card-buttons2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookmarkClick(card);
                    }}
                  />
                ) : (
                  <FiBookmark
                    className="card-button card-buttons2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookmarkClick(card);
                    }}
                  />
                )}
                                     {/* <CgBoard
                        className={`card-button card-buttons2 ${isInComparison(card) ? 'in-comparison' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddComparison(card);
                        }}
                      /> */}
                </div>
              
              </div>
              <Card.Body>
              <Card.Title>{convertAmount(card.price)} {currency}</Card.Title>

                {/* <Card.Title>{convertAmount(card.price)} {currency}</Card.Title> */}
                <Card.Text style={{ color: "black" }}>{card.title}</Card.Text>
                <Card.Text style={{ color: "black" }}>
                  Size: {unit === 'sqft' ? `${card.area} sqft` : `${convertSqftToSqm(card.area).toFixed(2)} sqm`}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        )))}
      </Carousel>
      </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Fav;
