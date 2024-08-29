import axios from 'axios';

const apiKey = 'AIzaSyCXENRI6QU3NowjVqVzhP_2Tv6IyUXVjPc';

export const translateText = async (text, targetLanguage) => {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
    
    try {
        const response = await axios.post(url, {
            q: text,
            target: targetLanguage
        });
        return response.data.data.translations[0].translatedText;
    } catch (error) {
        console.error('Error translating text:', error);
        return text; // Return original text if there's an error
    }
};
