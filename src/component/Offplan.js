import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
import { useCurrency } from '../CurrencyContext';
import '../App.css';
import axios from "axios";
import { FiBookmark } from 'react-icons/fi';
import { FiBookmark as FiBookmarkFilled } from 'react-icons/fi'; 
import { useLanguage } from '../LanguageContext';

const Offplan = () => {
  const navigate = useNavigate();
  const { language, translations, updateTranslations } = useLanguage();
  const { currency, convertAmount, addFavorite, favorites, removeFavorite } = useCurrency();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/get-offplan');
        const fetchedProperties = response.data;

        const translationPromises = fetchedProperties.map(async (property) => {
          await updateTranslations(`builder${property.id}`, property.builder);
          await updateTranslations(`propertyType${property.id}`, property.propertyType);
        });

        await Promise.all(translationPromises);

        setProperties(fetchedProperties);
      } catch (error) {
        console.error('Error fetching properties data:', error);
      }
    };

    fetchProperties();
  }, [language, updateTranslations]);

  const handleCardClick = (property) => {
    navigate(`/offplan/${property.slug}`, { state: { property, id: property.id } });
    localStorage.setItem('id', property.id);

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

  const goToPrevious = () => {
    carouselRef.previous();
  };

  const goToNext = () => {
    carouselRef.next();
  };

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

  const textKeys = {
    offPlan: 'offPlan',
    LoopHeading1: 'LoopHeading1',
  };

  useEffect(() => {
    updateTranslations(textKeys.offPlan, 'Latest Off Plan Projects in Dubai');
    updateTranslations(textKeys.LoopHeading1, 'Popular Searches');
  }, [language, updateTranslations]);

  return (
    <div className='container'>
      <div className='d-flex justify-content-between align-items-center mb-2'>
        <h4 className='cardtextf'>{translations[textKeys.offPlan] || 'Loading...'}</h4>
        <div id="offarrow">
          <button variant="light" onClick={goToPrevious} style={{ marginRight: "10px" }} className='button-mycards btn'>
            <i className="fas fa-arrow-left"></i>
          </button>
          <button variant="light" onClick={goToNext} className='button-mycards btn'>
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
      <Carousel ref={(el) => (carouselRef = el)} responsive={responsive}>
        {properties.map((card, index) => (
          <div key={index} className='p-2' style={{ cursor: "pointer" }}>
            <Card className="shadow mb-2" style={{ borderRadius: "30px", border: "none" }} onClick={() => handleCardClick(card)}>
              <Button type="button" className="btn btn-light" style={{ position: "absolute", top: "20px", left: "20px", color: "#16248c", borderRadius: "20px" }}>
                {translations[`propertyType${card.id}`] || card.propertyType}
              </Button>
              <Card.Img variant="top" src={card.feature_image} className="Cardsimg" alt="..." style={{ borderRadius: "35px", height: "300px" }} />
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
              <Card.Body style={{ color: "black" }}>
                <Card.Text>{translations[`builder${card.id}`] || card.builder}</Card.Text>
                <Card.Title>{convertAmount(card.price)} {currency}</Card.Title>
              </Card.Body>
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Offplan;
