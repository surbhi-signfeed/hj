import React, { useEffect } from 'react';
import { useLanguage } from '../LanguageContext';

const AsSeenon = () => {
    const { language, translations, updateTranslations } = useLanguage();

    // Define translation keys for the texts
    const textKeys = {
        asSeenOn: 'asSeenOn',
        quote: 'quote',
        founderName: 'founderName',
        founderTitle: 'founderTitle'
    };

    useEffect(() => {
        // Update translations for each text key
        updateTranslations(textKeys.asSeenOn, 'AS SEEN ON');
        updateTranslations(textKeys.quote, `“Mark your real estate journey with HJ Real Estates. For more than a
            decade, we’ve served dedicatedly making your property dreams come
            true in Dubai. Let’s find your perfect space together.”`);
        updateTranslations(textKeys.founderName, 'Sathbir Siingh Sachdeva');
        updateTranslations(textKeys.founderTitle, 'Founder of HJ Real Estates');
    }, [language, updateTranslations]);

    return (
        <div>
            <div className='container'>
                <div className="real-estate-section">
                    <div className="asseenon">
                        <br />
                        <h5 style={{ fontSize: "16px", color: "#333538" }}>
                            {translations[textKeys.asSeenOn] || 'Loading...'}
                        </h5>
                        <br />
                        <div className="logos">
                            <img src="../img/mid.png" alt="Mid Day" />
                            <img src="../img/gulf.png" alt="Gulf News" />
                            <img src="../img/mint.png" alt="Mint" />
                            <img src="../img/hj-real-estates-hindustan-times-logo.svg" alt="Hindustan Times" />
                            <img src="../img/out.png" alt="Outlook" />
                        </div>
                    </div>
                    <br />
                    <div className="quote">
                        <p>
                            {translations[textKeys.quote] || 'Loading...'}
                        </p>
                        <h4>{translations[textKeys.founderName] || 'Loading...'}</h4>
                        <h4>{translations[textKeys.founderTitle] || 'Loading...'}</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AsSeenon;



















// import React from 'react'

// const AsSeenon = () => {
//   return (
//     <div>
//         <div className='container'>
//          {/* as seen on */}
//          <div className="real-estate-section">
//         <div className="asseenon">
//           <br></br>
//           <h5 style={{fontSize:"16px", color:" #333538"}}>AS SEEN ON</h5>
//           <br></br>
//           <div className="logos">
//             <img src="../img/mid.png" alt="Mid Day" />
//             <img src="../img/gulf.png" alt="Gulf News" />
//             <img src="../img/mint.png" alt="Mint" />
//             <img src="../img/hj-real-estates-hindustan-times-logo.svg" alt="Hindustan Times" />
//             <img src="../img/out.png" alt="Outlook" />
//           </div>
//         </div>
//         <br />
//         <div className="quote">
//           <p>
//             “Mark your real estate journey with HJ Real Estates. For more than a
//             <br />
//             decade, we’ve served dedicatedly making your property dreams come
//             <br /> true in Dubai. Let’s find your perfect space together.”
//           </p>
//           <h4>Sathbir Siingh Sachdeva</h4>
//           <h4>Founder of HJ Real Estates</h4>
//         </div>
//       </div>
//     </div>
//     </div>
//   )
// }

// export default AsSeenon
