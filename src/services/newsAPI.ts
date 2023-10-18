import axios from 'axios';
import uuid from '../utilities/uuid';
import {formattedDate} from '../utilities/DateCoverter';

async function fetchNewsArticles(keyword: string, articleCount: number) {
    // Get the API key from the environment variables.
    const apiKey = import.meta.env.VITE_NEWSAPI_KEY;
    const yesterdayDate = formattedDate();
    console.log("Calling News API...");
    
    try {
        // Make an HTTP GET request to the NewsAPI endpoint.
        const response = await axios.get(`https://newsapi.org/v2/everything?q=${keyword}&from=${yesterdayDate}&sortBy=popularity&apiKey=${apiKey}&language=en&pageSize=${articleCount}`, {
        });

        // Extract and return an array of news articles from the response.
        return response.data.articles.map((article: any) => ({
            id: uuid(),
            sourceType: "news_article",
            title: article.title,
            description: article.description,
            url: article.url,
            date: article.publishedAt,
            sourceName: article.source.name,
            imageUrl: article.urlToImage,
        }));
    } catch (error) {
        let message;
        if (error instanceof Error) message = error.message;
        else message = String(error);
        console.error('Error fetching new API:', message);
        reportError({message});

        return []; // Return an empty array in case of an error
    }
}

export default fetchNewsArticles;
