import React, { useState, useEffect } from "react";
import "./App.css"; // Include your custom CSS
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Footer from "./component/Footer";
import News from "./component/News";
import AsSeenon from "./component/AsSeenon";
import Assocaition from "./component/Assocaition";
import Stayinloop from "./component/Stayinloop";
import Gallery from "./component/Gallery";
import BlogsDsc from "./pages/BlogsDsc";

import { LanguageProvider } from './LanguageContext';
// import LanguageSwitcher from './translationService';

import ImageGallery from "./component/ImageGallery"; 
import Invester from "./pages/Invester";
import Blogs from "./pages/Blogs";
import Guide from "./pages/Guide";
import PropertyManagment from "./pages/PropertyManagment";
import Sellproperty from "./pages/Sellproperty";
import Mortgage from "./pages/Mortgage";
import Events from "./pages/Events";
import Areaguide from "./pages/Areaguide";
import Careers from "./pages/Careers";
import About from "./pages/About";
import Contactus from "./pages/Contactus";
import RentFilter from "./pages/RentFilter";
import NewoffplanFilter from "./pages/NewoffplanFilter";
import FooterM from "./component/FooterM";
import Nawnew from "./component/Nav-new";
import EventsDsc from "./pages/EventsDsc";  
import Offplan from "./pages/Offplan";   
import NewrentFilter from "./pages/NewrentFilter"; 
import Fav from "./pages/Fav";    
import Comparison from "./pages/Comparison";    
import NewBuyFilter from "./pages/NewBuyFilter";   
import NewRoffplan from "./pages/NewRoffplan";    

import FilterNav from "./component/FilterNav";  
import PriceFilter from "./component/PriceFilter";
import BathroomFilter from "./component/BathroomFilter";
import HomeType from "./component/Hometype";
import HomeSearch from './component/HomeSearch'
import ContactForm from './component/ContactForm' 


import { CurrencyProvider } from './CurrencyContext';
import NavToAll from "./component/NavToAll";

import NotFound from "./NotFound";
import RentProperty from "./pages/RentProperty";
import Map from "./pages/Map";
import Calculator from "./pages/Calculator";
import MapOffplan from "./pages/MapOffplan";
import MaptoAll from "./component/MaptoAll";
import NewRent from "./pages/NewRent";
import NewBuy from "./pages/NewBuy";
import Property from "./pages/Property";
import BuyerGuide from "./pages/BuyerGuide";
import SellerGuide from "./pages/SellerGuide";

const App = () => {

  return (
    <div>
       <LanguageProvider>
     <CurrencyProvider>
   <Router>
   {/* <div className="navbar">
            <LanguageSwitcher /> 
          </div> */}
    <Routes>
      <Route exact path="/" element={<Home/>}></Route>
      <Route exact path="*" element={<NotFound/>}></Route>
      <Route exact path="/Footer" element={<Footer/>}></Route>
      <Route exact path="/News" element={<News/>}></Route>
      <Route exact path="/AsSeenon" element={<AsSeenon/>}></Route>
      <Route exact path="/Assocaition" element={<Assocaition/>}></Route>
      <Route exact path="/Stayinloop" element={<Stayinloop/>}></Route>
      <Route exact path="/Gallery" element={<Gallery/>}></Route>
      
      
      <Route exact path="/imggallery" element={<ImageGallery/>}></Route>
      <Route exact path="/Invester" element={<Invester/>}></Route>
      <Route exact path="/Blogs" element={<Blogs/>}></Route>
      <Route exact path="/Guide/:slug" element={<Guide/>}></Route>
      <Route exact path="/PropertyManagment" element={<PropertyManagment/>}></Route>
      <Route exact path="/sell-your-property-with-us/" element={<Sellproperty/>}></Route>
      <Route exact path="/Mortgage" element={<Mortgage/>}></Route>
      <Route exact path="/Property" element={<Property/>}></Route>
      <Route exact path="/BuyersGuide" element={<BuyerGuide/>}></Route>
      <Route exact path="/SellersGuide" element={<SellerGuide/>}></Route>
      <Route exact path="/Events" element={<Events/>}></Route>
      <Route exact path="/Areaguide" element={<Areaguide/>}></Route>
      <Route exact path="/Careers" element={<Careers/>}></Route>
      <Route exact path="/Contactus" element={<Contactus/>}></Route> 
      <Route exact path="/About" element={<About/>}></Route>  
      <Route exact path="/RentFilter" element={<RentFilter/>}></Route> 
      <Route exact path="/FilterNav" element={ <div id="selldiv">
        <FilterNav />
     
      </div>}></Route> 
      <Route exact path="/NewoffplanFilter" element={<NewoffplanFilter/>}></Route> 
      <Route exact path="/FooterM" element={<FooterM/>}></Route> 
      <Route exact path="/Nawnew" element={<Nawnew/>}></Route>
      <Route exact path="/EventsDsc/:slug" element={<EventsDsc/>}></Route>  
      <Route exact path="/Offplan/:slug" element={<Offplan/>}></Route>  
      <Route exact path="/NewrentFilter" element={<NewrentFilter/>}></Route>  
      <Route exact path="/PriceFilter" element={<PriceFilter/>}></Route>  
      <Route exact path="/BathroomFilter" element={<BathroomFilter/>}></Route>  
      <Route exact path="/HomeType" element={<HomeType/>}></Route>  
      <Route exact path="/Contact" element={<ContactForm/>}></Route>  
      <Route exact path="/HomeSearch" element={<HomeSearch/>}></Route>  
      <Route exact path="/Fav" element={<Fav/>}></Route> 
      <Route exact path="/BlogsDsc/:slug" element={<BlogsDsc/>}></Route>  
      <Route exact path="/Comparison" element={<Comparison/>}></Route>  
      <Route exact path="/NavToAll" element={<NavToAll/>}></Route> 
      <Route exact path="/NewBuyFilter" element={<NewBuyFilter/>}></Route> 
      <Route exact path="/NewRoffplan" element={<NewRoffplan/>}></Route> 
      <Route exact path="/NewRent" element={<NewRent/>}></Route>
      <Route exact path="/NewBuy" element={<NewBuy/>}></Route>
      <Route exact path="/Map" element={<Map/>}></Route> 
      <Route exact path="/Calculator" element={<Calculator/>}></Route>
      <Route exact path="/MapOffplan" element={<MapOffplan/>}></Route>
      <Route exact path="/MaptoAll" element={<MaptoAll/>}></Route>
      <Route exact path="/RentProperty/:slug" element={<RentProperty/>}></Route> 
    </Routes>
   </Router>
      
   </CurrencyProvider>
   </LanguageProvider>
    
    </div>
  );
};

export default App;
