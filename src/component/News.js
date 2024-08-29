import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLanguage } from '../LanguageContext';

const News = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [properties, setProperties] = useState([]);
  const { language, translations, updateTranslations } = useLanguage();
  const navigate = useNavigate();

  const handleCardClick = (property) => {
    navigate('/blogs', { state: { property } });
  };

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/blogs-all');
        const fetchedProperties = response.data;

        const translationPromises = fetchedProperties.map(async (property) => {
          await updateTranslations(`title${property.id}`, property.title);
          await updateTranslations(`type${property.id}`, property.type);
        });

        await Promise.all(translationPromises);

        setProperties(fetchedProperties);
      } catch (error) {
        console.error('Error fetching properties data:', error);
      }
    };

    fetchProperties();
  }, [language, updateTranslations]);

  const filterCards = () => {
    if (selectedCategory === "All") {
      return properties.slice(0, 6);
    }
    return properties.filter((property) => property.type === selectedCategory).slice(0, 6);
  };

  const responsiveConfig = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3 // Number of slides to move on arrow click
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
      slidesToSlide: 2
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

  const textKeys = {
    News: 'News',
    NewsAll: 'NewsAll',
    NewsCommunity: 'NewsCommunity',
    NewsNews: 'NewsNews',
    NewsDeveloper: 'NewsDeveloper',
    NewsButton: 'NewsButton',
    Explore:'Explore',
  };

  useEffect(() => {
    // Update translations for each text key
    updateTranslations(textKeys.News, 'News & Articles');
    updateTranslations(textKeys.NewsAll, 'All');
    updateTranslations(textKeys.NewsCommunity, 'Community');
    updateTranslations(textKeys.NewsNews, 'News');
    updateTranslations(textKeys.NewsDeveloper, 'Developer');
    updateTranslations(textKeys.NewsButton, 'View All');
    updateTranslations(textKeys.Explore, 'Explore');
    
  }, [language, updateTranslations]);

  return (
    <div>
      <div className="container">
        <div className="footerloop">
          <h2 id="newshead"> {translations[textKeys.News] || 'Loading...'}</h2>
          <div className="filter">
            <span
              className={selectedCategory === "All" ? "active" : ""}
              onClick={() => setSelectedCategory("All")}
            >
              {translations[textKeys.NewsAll] || 'Loading...'}
            </span>
            <span
              className={selectedCategory === "Community" ? "active" : ""}
              onClick={() => setSelectedCategory("Community")}
            >
              {translations[textKeys.NewsCommunity] || 'Loading...'}
            </span>
            <span
              className={selectedCategory === "News" ? "active" : ""}
              onClick={() => setSelectedCategory("News")}
            >
              {translations[textKeys.NewsNews] || 'Loading...'}
            </span>
            <span
              className={selectedCategory === "Developer" ? "active" : ""}
              onClick={() => setSelectedCategory("Developer")}
            >
              {translations[textKeys.NewsDeveloper] || 'Loading...'}
            </span>
          </div>
          <div className="row">
            <div className="col-md-9 col-sm-12 col-12">
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
                removeArrowOnDeviceType={["tablet", "mobile"]}
              >
                {filterCards().map((card) => (
                  <div key={card.id} className="p-2 card-container">
                    <div className="card shadow" style={{ borderRadius: "30px", border: "none" }} id="newscards">
                      <img src={card.featureImage} alt={card.title} className="card-img-top img-fluid" style={{ borderRadius: "30px 30px 0 0", height: "200px", objectFit: "cover" }} />
                      <div className="card-content p-3">
                        <h3 className="news-title">{translations[`title${card.id}`] || card.title}</h3>
                        <p>{translations[`type${card.id}`] || card.type}</p>
                        <button className="explore-button" onClick={() => handleCardClick(card)}>{translations[textKeys.NewsButton] || 'Loading...'}</button>
                      </div>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
            <div className="col-md-3">
              <div className="footerloop-column ad-column">
                <Link to="/Contactus"><img src="../img/banner.png" alt="Apartment Ad" style={{ cursor: "pointer" }} /></Link>
              </div>
            </div>
          </div>
          <br /><br />
          <Link to="/blogs" className="viewall">
            <b>{translations[textKeys.NewsButton] || 'Loading...'} <i className="fa fa-arrow-right"></i></b>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default News;
