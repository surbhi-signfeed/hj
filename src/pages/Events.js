 import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Footer from '../component/Footer';
import NavToAll from '../component/NavToAll';
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { useLanguage } from '../LanguageContext';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(8); // Number of events to display per page
  const { language, translations, updateTranslations } = useLanguage();
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/event-list');
        const fetchedProperties = response.data;

        // Update translations for dynamic data
        fetchedProperties.forEach(property => {
          updateTranslations(`title${property.id}`, property.title);
        });

        setEvents(response.data);

      } catch (error) {
        console.error('Error fetching events data:', error);
      }
    };

    fetchEvents();
  }, [language, updateTranslations]);



  // Handle sorting
  const handleSort = (order) => {
    setSortOrder(order);
  };

  // Sort events based on the selected order
  const sortedEvents = [...events].sort((a, b) => {
    if (sortOrder === 'aToZ') {
      return a.title.localeCompare(b.title);
    } else if (sortOrder === 'zToA') {
      return b.title.localeCompare(a.title);
    } else if (sortOrder === 'newest') {
      return new Date(b.stdate) - new Date(a.stdate);
    } else if (sortOrder === 'oldest') {
      return new Date(a.stdate) - new Date(b.stdate);
    }
    return 0;
  });

  console.log("sorted",sortedEvents)

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = sortedEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCardClick = (event) => {
    navigate(`/eventsDsc/${event.slug}`, { state: { event, id: event.id } });
    localStorage.setItem('id', event.id);
  };

  const textKeys = {
    UPCOMING: 'UPCOMING',
    UPCOMINGp:'UPCOMINGp',
    open:'open',
    a:'a',
    z:'z',
    Newest:'Newest',
    Oldest:'Oldest',
    Enquire:'Enquire',
  
  
  };

  useEffect(() => {
    // Update translations for each text key
    updateTranslations(textKeys.UPCOMING, 'UPCOMING PROPERTY EVENTS');  
    updateTranslations(textKeys.UPCOMINGp, '    The HJ Real Estates events offer one-on-one consultations with top Dubai real estate experts, take a closer look at the top UAE investment opportunities, and get access to a wide range of   truly exclusive deals that do not appear on the regular market.');
    updateTranslations(textKeys.open, 'Open this select menu');
    updateTranslations(textKeys.a, 'A to Z');
    updateTranslations(textKeys.z, 'Z to A');
    updateTranslations(textKeys.Newest, 'Newest');
    updateTranslations(textKeys.Oldest, 'Oldest'); 
    updateTranslations(textKeys.Enquire, 'Enquire Now');
    

  }, [language, updateTranslations]);
  return (
    <div>
        <Helmet>
      <title> Event
      </title>
      <meta name="title" content="Event" />
      {/* need to chng */}
        <meta name="description" content="HJ Real Estates will help you find the best properties to rent, buy or sell in Dubai Real Estate market. Find your dream property in Dubai with us." />
        <meta name="keywords" content="Dubai Real Estate Event" />
        {/* <link rel="canonical" href="https://www.omkatech.com/services/designing"></link> */}

        <meta name="robots" content="index, follow" />
      </Helmet>
      <NavToAll />
      <div style={{ padding: "30px" }}>
  <div className='row mt-5'>
    <div className='col-12 col-md-1 col-lg-1'></div>
    <div className='col-12 col-md-5 col-lg-5'>
      <h1 className='event-h'>{translations[textKeys.UPCOMING] || 'Loading...'}</h1>
    </div>
    {/* <div className='col-12 col-md-1'></div> */}
    <div className='col-12 col-md-5 col-lg-5'>
      <p className='event-p'>
      {translations[textKeys.UPCOMINGp] || 'Loading...'}
      </p>
    </div>
    <div className='col-12 col-md-1 col-lg-1'></div>
  </div>

  <div className='row mt-5'>
    <div className='col-12 col-md-1'></div>
    <div className='col-12 col-md-8'>
      {`Showing${indexOfFirstEvent + 1}-${Math.min(indexOfLastEvent, events.length)} of ${events.length} results`}
    </div>
    <div className='col-12 col-md-2'>
      <select className="form-select" aria-label="Default select example" onChange={(e) => handleSort(e.target.value)}>
        <option value="">      {translations[textKeys.open] || 'Loading...'}
       </option>
        <option value="aToZ"> {translations[textKeys.a] || 'Loading...'}</option>
        <option value="zToA">  {translations[textKeys.z] || 'Loading...'}</option>
        <option value="newest"> {translations[textKeys.Newest] || 'Loading...'}</option>
        <option value="oldest">{translations[textKeys.Oldest] || 'Loading...'}</option>
      </select>
    </div>
    <div className='col-12 col-md-1'></div>
  </div>

  <div className='row mt-4 events-cards'>
    {currentEvents.map(event => (
      <div className='col-12 col-sm-6 col-md-4 col-lg-3' key={event.id}>
        <div style={{ border: "none" }} onClick={() => handleCardClick(event)}>
          <img src={event.image} className="card-img-events img-fluid" alt="..." />
          <div className="card-body">
            <br />
            <h5 className="card-title"> {translations[`title${event.id}`] || event.title}</h5>
            <br />
            <p>{new Date(event.stdate).toLocaleDateString()} | {event.time}</p>
            <Link onClick={() => handleCardClick(event)}>{translations[textKeys.Enquire] || 'Loading...'}</Link>
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* Pagination */}
  <div className="row mt-4">
    <div className="col-12">
      <ul className="pagination justify-content-center">
        {[...Array(Math.ceil(events.length / eventsPerPage)).keys()].map(number => (
          <li key={number} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
            <button onClick={() => paginate(number + 1)} className="page-link">
              {number + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
</div>
      <Footer />
    </div>
  );
};

export default Events;
