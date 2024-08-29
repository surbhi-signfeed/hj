import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from '../component/Footer';
import { IoIosArrowForward, IoIosArrowBack  } from "react-icons/io";
import { useCurrency } from '../CurrencyContext'; 
import { useLocation, useParams } from "react-router-dom";
import NavToAll from '../component/NavToAll';
import { Helmet } from "react-helmet";
import { useLanguage } from "../LanguageContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const extractTextFromHtml = (html) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.innerText;
};

const Fav = () => {
  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ 
          ...style, 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          background: "#001F80", // Change this to your desired color
          borderRadius: "50%", 
          padding: "5px", 
          right: "10px", 
          zIndex: 1,
          width: "30px", // Set a fixed width
          height: "30px", // Set a fixed height
        }}
        onClick={onClick}
      >
         <IoIosArrowForward  color="#fff" style={{fontSize:"40px"}} />
      </div>
    );
  };
  
  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ 
          ...style, 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          background: "#001F80", // Change this to your desired color
          borderRadius: "50%", 
          padding: "5px", 
          left: "10px", 
          zIndex: 1,
          width: "30px", // Set a fixed width
          height: "30px", // Set a fixed height
        }}
        onClick={onClick}
      >
         <IoIosArrowBack  color="#fff" style={{fontSize:"40px"}} />
      </div>
    );
  };
  
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay:true,
   
    autoplaySpeed: 3000, // Adjust autoplay speed if needed
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const { favorites } = useCurrency();
  const location = useLocation();
  const [id, setId] = useState(location.state?.id || localStorage.getItem('id') || null);

  const [blogs, setBlogs] = useState(); 
  const [blogsall, setBlogsall] = useState([]);
  const { language, translations, updateTranslations } = useLanguage();

  const fetchProperty = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/blog/${id}`);
      const fetchedProperty = response.data;
      setBlogs(fetchedProperty);
    } catch (error) {
      console.error("Error fetching property data:", error);
    }
  };

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/blogs-all');
        const fetchedProperties = response.data;
        const translationPromises = fetchedProperties.map(async (property) => {
          await updateTranslations(`type${property.id}`, property.type); 
          await updateTranslations(`title${property.id}`, property.title);
        });
        await Promise.all(translationPromises);
        setBlogsall(response.data);
      } catch (error) {
        console.error('Error fetching properties data:', error);
      }
    };

    fetchProperties();
  }, [language, updateTranslations]);

  useEffect(() => {
    if (id) {
      localStorage.setItem('id', id);
      if (!blogs) {
        fetchProperty();
      }
    }
  }, [id, blogs]);

  useEffect(() => {
    if (blogs) {
      updateTranslations(`title${blogs.id}`, blogs.title);
    }
  }, [language, blogs, updateTranslations]);

  if (!blogs) {
    return <div>No blogs data available.</div>;
  }

  return (
    <div>
      <Helmet>
        <title>{blogs.PageName}</title>
        <meta name="title" content={blogs.seoTitle} />
        <meta name="description" content={blogs.seoDesc} />
        <meta name="keywords" content={blogs.seoKeyword} />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <NavToAll />
      <div style={{ padding: "30px" }}>
        <div className='row mt-5'>
          <hr />
          <div className='col-md-2 col-1'></div>
          <div className='col-md-8 col-10'>
            <h1 className='blogDsc-h1'>
              {translations[`title${blogs.id}`] || blogs.title}
            </h1>
            <p className="mt-3 mb-3" style={{ fontSize: "80%" }}>{blogs.date}</p>
          </div>
          <div className='col-md-2 col-1'></div>
          <hr />
        </div>
        <div className='row'>
          <div className='col-md-2 col-0'></div>
          <div className='col-md-8 col-12'>
            <img src={blogs.featureImage} className="responsive-blog-image" alt="Blog Feature" />
          </div>
          <div className='col-md-2 col-0'></div>
        </div>
        <br />
        <div className='row'>
          <div className='col-md-2 col-0'></div>
          <div className='col-md-8 col-12'>
            <div dangerouslySetInnerHTML={{ __html: blogs.translatedContent || blogs.content }} />
          </div>
          <div className='col-md-2 col-0'></div>
        </div>
        <div className='mt-4 events-cards'>
        <Slider {...settings}>
  {blogsall.map((property, index) => (
    <div className='px-2' key={index}> {/* Add padding here */}
      <div className="card mx-2" style={{ border: "none" }}> {/* Add margin here */}
        <img src={property.featureImage} className="card-img-events" alt={property.title} />
        <div className="card-body">
          <h5 className="card-title">{property.title}</h5>
          <p>{property.text}</p>
          <a href={property.link}>Enquire Now</a>
        </div>
      </div>
    </div>
  ))}
</Slider>

    </div>
      </div>
      <Footer />
    </div>
  );
};

export default Fav;
