import axios from 'axios';
import uuid from "../components/cards/uuid";
/**
 * Fetch news articles based on a keyword using the NewsAPI.
 *
 * @param {string} keyword - The keyword to search for in news articles.
 * @param {boolean} callAPI - Whether to call the NewsAPI to fetch articles.
 * @returns {Array} An array of news articles matching the keyword.
 */
async function fetchNewsArticles(keyword, callAPI) {
    // Get the API key from the environment variables.
    const apiKey = process.env.REACT_APP_NEWSAPI_KEY;

    // Check if we should call the NewsAPI based on the 'callAPI' parameter.
    if (callAPI) {
        console.log("Calling News API...")
        try {
            // Make an HTTP GET request to the NewsAPI endpoint.
            const response = await axios.get('https://newsapi.org/v2/everything', {
                params: {
                    apiKey,
                    q: keyword,
                    language: 'en',
                    pageSize: 2, // Limit the number of articles to 2
                },
            });

            // Extract and return an array of news articles from the response.
            return response.data.articles.map((article) => ({
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
}

export default fetchNewsArticles;
