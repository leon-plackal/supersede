import uuid from '../utilities/uuid';

async function fetchNewsArticles(keyword: string, articleCount: number) {
    console.log("Calling News API...");
    try {
        const response = await fetch(`${import.meta.env.VITE_BASEURL}/newsarticles?keyword=${keyword}&articleCount=${articleCount}`);
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
        console.error('There has been a problem with your fetch operation:', error);
        return []; // Return an empty array on error
    }
}
export default fetchNewsArticles;