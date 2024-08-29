import React, { createContext, useState, useContext, useEffect } from 'react';
import { translateText } from './translationService';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');
    const [translations, setTranslations] = useState({});

    const updateTranslations = async (key, text) => {
        // Lazy translation update
        if (!translations[key]) {
            const translatedText = await translateText(text, language);
            setTranslations((prev) => ({ ...prev, [key]: translatedText }));
        }
    };

    useEffect(() => {
        // Reset translations when language changes
        setTranslations({});
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, translations, updateTranslations }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
