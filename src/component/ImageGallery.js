import React, { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const ImageGallery = ({ images }) => {
  const navigate = useNavigate();
  // const [activeImage, setActiveImage] = useState(images[0]);
  const [activeImage, setActiveImage] = useState(images[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const Show = () => {
    alert("hellow");
    navigate("/areaguide");
  };
  // slider
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
          background: "black", // Change this to your desired color
          borderRadius: "0%",
          padding: "5px",
          right: "10px",
          zIndex: 1,
          width: "30px", // Set a fixed width
          height: "30px", // Set a fixed height
        }}
        onClick={onClick}
      >
        <IoIosArrowForward color="#fff" style={{ fontSize: "40px" }} />
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
          background: "black", // Change this to your desired color
          borderRadius: "0%",
          padding: "5px",
          left: "10px",
          zIndex: 1,
          width: "30px", // Set a fixed width
          height: "30px", // Set a fixed height
        }}
        onClick={onClick}
      >
        <IoIosArrowBack color="#fff" style={{ fontSize: "40px" }} />
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,

    autoplaySpeed: 3000, // Adjust autoplay speed if needed
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
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
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="image-gallery">
      <div className="active-image">
        <img src={activeImage} alt="Active" />
      </div>
      <div className="imggal ">
        <Slider {...settings}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index}`}
              className={`thumbnail ${image === activeImage ? "active" : ""}`}
              onClick={() => setActiveImage(image)}
            />
          ))}
        </Slider>
      </div>
    </div>

    //     <div className="image-gallery">
    //     <div className="active-image">
    //       <img src={activeImage} alt="Active" />
    //     </div>
    //     <div className="thumbnail-container">
    //       <button onClick={prevImage} className="nav-button left">{"<"}</button>
    //       {images.map((image, index) => (
    //         <img
    //           key={index}
    //           src={image}
    //           alt={`Thumbnail ${index}`}
    //           className={`thumbnail ${image === activeImage ? 'active' : ''}`}
    //           onClick={() => {
    //             setActiveImage(image);
    //             setCurrentIndex(index);
    //           }}
    //         />
    //       ))}
    //       <button onClick={nextImage} className="nav-button right">{">"}</button>
    //     </div>
    //   </div>
  );
};

export default ImageGallery;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const ImageGallery = ({ images }) => {
//     const navigate = useNavigate();
//     const [activeImage, setActiveImage] = useState(images[0]);
//     const [currentIndex, setCurrentIndex] = useState(0);

//     const nextImage = () => {
//         const nextIndex = (currentIndex + 1) % images.length;
//         setActiveImage(images[nextIndex]);
//         setCurrentIndex(nextIndex);
//     };

//     const prevImage = () => {
//         const prevIndex = (currentIndex - 1 + images.length) % images.length;
//         setActiveImage(images[prevIndex]);
//         setCurrentIndex(prevIndex);
//     };

//     const Show = () => {
//         alert("hello");
//         navigate("/areaguide");
//     };

//     return (
//         <div className="hj-realstate-image-gallery">
//             <div className="hj-realstate-active-image-container">
//                 <button className="hj-realstate-nav-button hj-realstate-left" onClick={prevImage}>‹</button>
//                 <img src={activeImage} alt="Active" className="hj-realstate-active-image" />
//                 <button className="hj-realstate-nav-button hj-realstate-right" onClick={nextImage}>›</button>
//             </div>
//             <div className="hj-realstate-thumbnail-container">
//                 {images.map((image, index) => (
//                     <img
//                         key={index}
//                         src={image}
//                         alt={`Thumbnail ${index}`}
//                         className={`hj-realstate-thumbnail ${image === activeImage ? 'hj-realstate-active' : ''}`}
//                         onClick={() => {
//                             setActiveImage(image);
//                             setCurrentIndex(index);
//                         }}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ImageGallery;
