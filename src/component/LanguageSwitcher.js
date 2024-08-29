import React, { useEffect } from 'react';

const LanguageSwitcher = () => {
  useEffect(() => {
    const googleTranslateElementInit = () => {
      if (!window.google || !window.google.translate) {
        console.error('Google Translate API not loaded');
        return;
      }
      new window.google.translate.TranslateElement(
        { pageLanguage: 'en', includedLanguages: 'en,es,fr,de,it,zh-CN,ja,ar' },
        'google_translate_element'
      );
    };

    const addTranslateScript = () => {
      if (document.querySelector('script[src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]')) {
        googleTranslateElementInit();
        return;
      }
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      script.onerror = () => console.error('Error loading Google Translate script');
      document.body.appendChild(script);
    };

    window.googleTranslateElementInit = googleTranslateElementInit;

    if (!window.google || !window.google.translate) {
      addTranslateScript();
    } else {
      googleTranslateElementInit();
    }

    return () => {
      if (document.querySelector('#google_translate_element')) {
        document.querySelector('#google_translate_element').innerHTML = '';
      }
    };
  }, []);

  return (
    <div>
      <div id="google_translate_element"></div>
      {/* <style>
        {`
          .goog-te-banner-frame {
            display: none !important;
          }
        `}
      </style> */}
    </div>
  );
};

export default LanguageSwitcher;
