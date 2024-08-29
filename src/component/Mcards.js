import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import { useCurrency } from '../CurrencyContext';
import { FiBookmark } from 'react-icons/fi';
import { FiBookmark as FiBookmarkFilled } from 'react-icons/fi';
import { CgBoard } from "react-icons/cg";
import { FaBed, FaShower, FaExpand } from 'react-icons/fa';
import '../App.css';
import { useLanguage } from '../LanguageContext';

const Mcards = () => {
  const navigate = useNavigate();
  const { currency, convertAmount, convertSqftToSqm, unit, addFavorite, favorites, removeFavorite, addRentComparison, addBuyComparison, rentComparison, buyComparison } = useCurrency();
  const { language, translations, updateTranslations } = useLanguage();

  const handleCardClick = (property) => {
    navigate(`/RentProperty/${property.slug}`, { state: { property, id: property.id } });
    localStorage.setItem('id', property.id);
  };

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/latest-rent');
        const fetchedProperties = response.data;

        // Update translations for dynamic data
        fetchedProperties.forEach(property => {
          updateTranslations(`shortTitle_${property.id}`, property.shortTitle);
        });

        setProperties(fetchedProperties);
      } catch (error) {
        console.error('Error fetching properties data:', error);
      }
    };

    fetchProperties();
  }, [language, updateTranslations]);

  console.log("hjfg",properties)
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

  const textKeys = {
    Rentcardsheading: 'Rentcardsheading',

 
      // quote: 'quote',
      
  };
  useEffect(() => {
    // Update translations for each text key
 
    updateTranslations(textKeys.Rentcardsheading, 'Properties for Rent in Dubai'); 


    // updateTranslations(textKeys.founderTitle, 'Founder of HJ Real Estates');
}, [language, updateTranslations]);

  return (
    <div className='container'>
      <div className='d-flex justify-content-between align-items-center mb-2'>
        <h4 className='cardtextf'>{translations.Rentcardsheading || 'Loading...'}</h4>
        <h4 className='cardtextf'></h4>
        <div id='offarrow'>
          <button onClick={goToPrevious} style={{ marginRight: "10px" }} className='button-mycards btn'>
            <i className="fas fa-arrow-left"></i>
          </button>
          <button onClick={goToNext} className='button-mycards btn'>
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
      <Carousel ref={(el) => (carouselRef = el)} responsive={responsive}>
        {properties.map((card, index) => (
          <div key={index} className='p-2 card-container'>
            <Card className="shadow mb-2" style={{ borderRadius: "30px", border: "none", cursor: "pointer" }} onClick={() => handleCardClick(card)} id="#offplancard">
              <div className="card-img-container">
                <Card.Img variant="top" src={card.feature_image} className="Cardsimg" style={{ borderRadius: "35px", height: "300px" }} />
                <div className="">
                  {isFavorite(card.id) ? (
                    <FiBookmarkFilled
                      className="card-button filled card-buttons"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookmarkClick(card);
                      }}
                    />
                  ) : (
                    <FiBookmark
                      className="card-button card-buttons"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookmarkClick(card);
                      }}
                    />
                  )}
                  <CgBoard
                    className={`card-button card-buttons2 ${isInComparison(card) ? 'in-comparison' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddComparison(card);
                    }}
                  />
                </div>
              </div>
              <Card.Body>
                <Card.Title style={{ color: "black" }}>{currency} {convertAmount(card.price)}</Card.Title>
                <Card.Text style={styles.cardText}>
                  <div style={styles.iconTextContainer}>
                    <FaBed size={20} style={styles.icon} />
                    <p style={styles.text}>{card.bedrooms}</p>
                  </div>
                  <div style={styles.iconTextContainer}>
                    <FaShower size={20} style={styles.icon} />
                    <p style={styles.text}>{card.bathroom}</p>
                  </div>
                  <div style={styles.iconTextContainer}>
                    <FaExpand size={20} style={styles.icon} />
                    <p style={styles.text}>
                      {unit === 'sqft' ? `${card.area} sqft` : `${convertSqftToSqm(card.area).toFixed(2)} sqm`}
                    </p>
                  </div>
                </Card.Text>
                <Card.Text style={{ color: "black" }}>
                  {translations[`shortTitle_${card.id}`] || card.shortTitle}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

const styles = {
  cardText: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconTextContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '5px 5px',
  },
  icon: {
    marginRight: '5px',
  },
  text: {
    margin: 0,
  },
  '@media (max-width: 768px)': { // Tablet and below
    cardText: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    iconTextContainer: {
      marginBottom: '10px',
    },
  },
  '@media (min-width: 769px) and (max-width: 1024px)': { // Tablet landscape
    cardText: {
      justifyContent: 'space-around',
    },
  },
  '@media (min-width: 1025px)': { // Laptop and above
    cardText: {
      justifyContent: 'space-between',
    },
  },
};

export default Mcards;
