import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLanguage } from '../LanguageContext';

const YourComponent = () => {
  const responsiveConfig = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1
    }
  };

  const { language, translations, updateTranslations } = useLanguage();
  const navigate = useNavigate();
  
  const handleCardClick = (property) => {
    navigate('/areaguide', { state: { property } });
  };

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchAndTranslateProperties = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/get-areaguide');
        const fetchedProperties = response.data;

        // Wait for all translations to complete
        const translationPromises = fetchedProperties.map(async property => {
          await updateTranslations(`shortTitle_${property.id}`, property.shortTitle);
        });

        await Promise.all(translationPromises);

        setProperties(fetchedProperties);
      } catch (error) {
        console.error('Error fetching properties data:', error);
      }
    };

    fetchAndTranslateProperties();
  }, [language, updateTranslations]);

  const textKeys = {
    PopularHeading: 'PopularHeading',
    LoopHeading1: 'LoopHeading1',
  };

  useEffect(() => {
    updateTranslations(textKeys.PopularHeading, 'Popular Communities');
    updateTranslations(textKeys.LoopHeading1, 'Popular Searches');
  }, [language, updateTranslations]);

  return (
    <div>
      <style jsx>{`
        .carousel-container {
          margin: 20px 0;
          position: relative;
          padding-bottom: 40px;
        }
        .carousel-item-padding-40-px {
          padding: 0 20px;
        }
        .custom-dot-list-style {
          text-align: center;
          padding: 10px 0;
          position: absolute;
          bottom: 0;
          width: 100%;
        }
        .card {
          border-radius: 10px;
          overflow: hidden;
          border: none;
        }
        .card-img-top {
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          object-fit: cover;
          width: 100%;
          height: 200px;
        }
        @media (max-width: 768px) {
          .carousel-item-padding-40-px {
            padding: 0 10px;
          }
          .card-img-top {
            height: 150px;
          }
        }
      `}</style>
      
      <div className="container">
        <h2 id='popularCom'>{translations[textKeys.PopularHeading] || 'Loading...'}</h2>
        <Carousel
          responsive={responsiveConfig}
          swipeable={true}
          draggable={true}
          showDots={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {properties.map((card) => (
            <div key={card.id} onClick={() => handleCardClick(card)} style={{cursor:"pointer", color:"black"}}>
              <img src={card.featureImage} alt={card.title} className="card-img-top" />
              <div className="card-body pt-3">
                <h5 className="card-title">{translations[`shortTitle_${card.id}`] || card.shortTitle}</h5>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default YourComponent;
