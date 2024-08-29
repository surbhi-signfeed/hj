import React, { useState, useEffect } from "react";
import { useLanguage } from '../LanguageContext';

const Assocaition = () => {
  const { language, translations, updateTranslations } = useLanguage();

  const textKeys = {
    Asheading: 'Asheading',
    Asp: 'Asp',
    Asp1:'Asp1',
    Asp2:'Asp2',
    
 
      // quote: 'quote',
      
  };

  useEffect(() => {
    // Update translations for each text key
 
    updateTranslations(textKeys.Asheading, 'Association with 25+ Developers'); 
    updateTranslations(textKeys.Asp, '  We are a reliable real estate sales channel partner working closely with 25 leading');
    updateTranslations(textKeys.Asp1, '  Dubai real estate developers, having privileged access to prime-location properties.');

    updateTranslations(textKeys.Asp2, '   Your gateway to exclusive real estate opportunities starts here.');


    // updateTranslations(textKeys.founderTitle, 'Founder of HJ Real Estates');
}, [language, updateTranslations]);
  return (
    <div className=''>
      {/* association */}
      <div className="developers-section">
        <div className="container">
          <h2>   {translations[textKeys.Asheading] || 'Loading...'}</h2>
          <p className="d1">
          {translations[textKeys.Asp] || 'Loading...'}
          
            <br />
            {translations[textKeys.Asp1] || 'Loading...'}
          
            <br />
            {translations[textKeys.Asp2] || 'Loading...'}
         
          </p>
          <div className="logos">
            <img src="../img/tiger.png" alt="Tiger Group" />
            <img src="../img/vincitore.png" alt="Vincitore" />
            <img src="../img/sobha.png" alt="Sobha Realty" />
            <img src="../img/damac.png" alt="Damac" />
            <img src="../img/mag.png" alt="MAG" />
            <img src="../img/danube.png" alt="Danube Properties" />
            <img src="../img/emaar.png" alt="Emaar" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Assocaition
