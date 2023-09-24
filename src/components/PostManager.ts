import { fetchPostsFromReddit } from '../services/redditAPI';
import fetchNewsArticles from '../services/newsAPI';
import RelatedVideos from '../services/YoutubeAPI';
import ArticleGenerator from '../services/openAPI';
import { Articles, generalInterests, Subreddits, YouTubeQueries } from './sampleInterests';

interface Post {
    YouTubeID?: string;
    title: string;
    date: string;
    channel: string;
    sourceType: string;
}

async function fetchPostsFromSources(): Promise<Post[]> {
    let numberOfPostsToFetch: number = 0;
    let allPosts: Post[] = [];

    try {
        for (const { subreddit, interestLevel } of Subreddits) {
            numberOfPostsToFetch = calculateNumberOfPostsToFetch(interestLevel);
            const postsFromReddit = await fetchPostsFromReddit(subreddit, numberOfPostsToFetch, true);
            if (postsFromReddit) {
                allPosts = allPosts.concat(postsFromReddit);
            }
        }

        for (const { query, interestLevel } of YouTubeQueries) {
            //let videoIds: string[] = [];
            numberOfPostsToFetch = calculateNumberOfPostsToFetch(interestLevel);
            const videoIds = await RelatedVideos(query, false);

            if (videoIds) {
                const youtubePosts: Post[] = videoIds.map((video) => ({
                    YouTubeID: video.videoId,
                    title: video.title,
                    date: video.postedDate,
                    channel: video.channelName,
                    sourceType: 'youtube',
                }));
                allPosts = allPosts.concat(youtubePosts);
            }
        }

        for (const { newsInterest, interestLevel } of Articles) {
            let articles: Post[] = [];
            numberOfPostsToFetch = calculateNumberOfPostsToFetch(interestLevel);
            articles = await fetchNewsArticles(newsInterest, true);
            if (articles) {
                allPosts = allPosts.concat(articles);
            }
        }

        for (const { interest } of generalInterests) {
            let articles: Post[] = [];
            // @ts-ignore
            articles = await ArticleGenerator(interest, true);
            if (articles) {
                allPosts = allPosts.concat(articles);
            }
        }

        allPosts = shuffleArray(allPosts);

        const expirationTime: number = new Date().getTime() + 24 * 60 * 60 * 1000;
        localStorage.setItem('cachedPosts', JSON.stringify({ posts: allPosts, expirationTime }));

        const seenPosts: Post[] = [];
        localStorage.setItem('seenPosts', JSON.stringify(seenPosts));

        return allPosts;
    } catch (error) {
        console.error('Error fetching posts PM:', error);
        return [];
    }
}

function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j: number = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function calculateNumberOfPostsToFetch(interestLevel: number): number {
    if (interestLevel >= 8 && interestLevel <= 10) {
        return 10;
    } else if (interestLevel >= 4 && interestLevel <= 7) {
        return 5;
    } else if (interestLevel >= 1 && interestLevel <= 3) {
        return 2;
    } else {
        return 0;
    }
}

async function getCachedPosts(): Promise<Post[] | null> {
    const cachedData: string | null = localStorage.getItem('cachedPosts');
    if (cachedData) {
        const { posts, expirationTime }: { posts: Post[]; expirationTime: number } = JSON.parse(cachedData);
        if (expirationTime > new Date().getTime()) {
            return posts;
        }
    }
    return null;
}

async function fetchPostsFromSourcesAndCache(): Promise<Post[]> {
    const cachedPosts: Post[] | null = await getCachedPosts();

    if (cachedPosts) {
        return cachedPosts;
    } else {
        return await fetchPostsFromSources();
    }
}

export { fetchPostsFromSources, fetchPostsFromSourcesAndCache };