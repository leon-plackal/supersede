import axios from 'axios';
import uuid from '../utilities/uuid';
import {formattedDate} from '../utilities/DateCoverter';

async function fetchNewsArticles(keyword: string, articleCount: number) {
    // Get the API key from the environment variables.
    const apiKey = import.meta.env.VITE_NEWSAPI_KEY;
    const yesterdayDate = formattedDate();

    console.log("Calling News API...", yesterdayDate);
    try {
        // Make an HTTP GET request to the NewsAPI endpoint.
        const response = await axios.get('https://newsapi.org/v2/everything', {
            params: {
                apiKey,
                q: keyword,
                from: yesterdayDate,
                language: 'en',
                pageSize: articleCount,
            },
        });

        // Extract and return an array of news articles from the response.
        return response.data.articles.map((article: any) => ({
            id: uuid(),
            sourceType: "newsArticle",
            title: article.title,
            description: article.description,
            url: article.url,
            publishedAt: article.publishedAt,
            sourceName: article.source.name,
            imageUrl: article.urlToImage, // URL to the thumbnail image
        }));
    } catch (error) {
        console.error('Error fetching news:', error);
        return []; // Return an empty array in case of an error
    }
}

export default fetchNewsArticles;
