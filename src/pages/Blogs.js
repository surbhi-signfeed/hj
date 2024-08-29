import React, { useState,useEffect } from 'react';
import axios from "axios";
import Footer from "../component/Footer";
import { Helmet } from 'react-helmet';
import FilterNav from "../component/FilterNav";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import '../css/Footerm.css'; // Ensure you import the CSS file
import NavToAll from "../component/NavToAll";
import { useLanguage } from "../LanguageContext";


const Blogs = () => {
  const navigate = useNavigate();
  const handleCardClick = (blogs) => {
    navigate(`/BlogsDsc/${blogs.slug}`, { state: { blogs, id: blogs.id } });
    // 
    
  
  };

  const [blogs, setBlogs] = useState([]);
  const { language, translations, updateTranslations } = useLanguage();


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
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching properties data:', error);
      }
    };

    fetchProperties();
  }, [language, updateTranslations]);

  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 12;

  // Calculate the current blogs to display
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


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
         <Helmet>
      <title>Blogs</title>
      <meta name="title" content="Blogs " />
      {/* need to chng */}
        <meta name="description" content="Calculate and know your monthly mortgage amount with the help of HJ’s free mortgage calculator Dubai. Visit our website and calculate now to know your monthly loan repayments." />
        <meta name="keywords" content="Blogs" />
        {/* <link rel="canonical" href="https://www.omkatech.com/services/designing"></link> */}

        <meta name="robots" content="index, follow" />
      </Helmet>
      <NavToAll/>
   {/* <div id="selldiv">
        <FilterNav />
        <h1 id="selltext">
          Welcome to HJ real-Estate
          <br />
          Property Seller !!!
        </h1>
      </div> */}
      <div className="container">
        <h2 id="blogs-heading"></h2>
        <div className="row">
          <div className="col-md-8 col-lg-8 col-12 col-sm-12 hide-scrollbar container" style={{ height: "600px", overflowY: "scroll" }}>
            <div className="row">
              {currentBlogs.map((blog, index) => (
                <div className="col-md-4 col-sm-6 mb-4" key={index} onClick={() => handleCardClick(blog)}>
                  <div className="" style={{ width: "100%", border: "none" }}>
                    <img src={blog.featureImage} className="card-img-toph" alt="..." />
                    <div className="card-body">
                      <p className="mt-3 blogs-p">{translations[`type${blog.id}`] || blog.type}</p>
                      <h5 className=" news-title">{translations[`title${blog.id}`] || blog.title}</h5>
                      <footer className="blockquote-footer mt-3" style={{fontSize: "80%"}}>{blog.date}</footer>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Pagination totalPages={totalPages} paginate={paginate} currentPage={currentPage} />
          </div>
          <div className="col-md-4 col-sm-12 col-12 col-lg-4 mb-4" style={{ height: "auto" }}>      
           
            <div className="text-center" >
            <Link to="/Contactus">  <img src="../img/banner.png" alt="Apartment Ad" className="img-fluid"  style={{cursor:"pointer"}} /></Link>
            </div>
            {/* blog classes .blogs-column img   .blogs-column  */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const Pagination = ({ totalPages, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination justify-content-center">
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
            <a onClick={() => paginate(number)} href="#!" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Blogs;
