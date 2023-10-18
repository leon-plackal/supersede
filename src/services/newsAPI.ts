import uuid from '../utilities/uuid';

async function fetchNewsArticles(keyword: string, articleCount: number) {
    console.log("Calling News API...");
    try {
        const response = await fetch(`http://localhost:3001/newsarticles?keyword=${keyword}&articleCount=${articleCount}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.articles.map((article: any) => ({
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
        // Handle errors
        console.error('There has been a problem with your fetch operation:', error);
        return []; // Return an empty array or handle the error as appropriate for your use case
    }
}
export default fetchNewsArticles;