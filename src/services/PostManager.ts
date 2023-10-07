import {fetchPostsFromReddit} from './redditAPI';
import fetchNewsArticles from './newsAPI';
import RelatedVideos from './YoutubeAPI';
import ArticleGenerator from './openAPI';
import {Articles, generalInterests, Subreddits, YouTubeQueries} from '../utilities/sampleInterests';
import {supabaseClient} from "../supabase/supabaseclient";

interface Post {
    id?: string;
    YouTubeID?: string;
    title: string;
    date: string;
    channel: string;
    sourceType: string;
}

async function loadPreferences(userId: string, source: string): Promise<boolean> {
    try {
        const { data, error } = await supabaseClient
            .from('user_source_preferences')
            .select('source_type, enabled')
            .eq('user_id', userId)
            .eq('source_type', source);

        if (error) {
            console.error("Error fetching user source preferences:", error);
            return false;
        }

        // Check if there is any data and return the enabled value
        if (data && data.length > 0) {
            return data[0].enabled;
        } else {
            return false; // or default value if no preference data is found
        }

    } catch (err) {
        console.error("Error fetching user source preferences:", err);
        return false;
    }
}

async function fetchPostsFromSources(user: User): Promise<Post[]> {
    let numberOfPostsToFetch: number = 0;
    let allPosts: Post[] = [];

    if (user) {
        try {
            if (await loadPreferences(user.id, "Reddit")) {
                for (const {subreddit, interestLevel} of Subreddits) {
                    numberOfPostsToFetch = calculateNumberOfPostsToFetch(interestLevel);
                    const postsFromReddit = await fetchPostsFromReddit(subreddit, numberOfPostsToFetch);
                    if (postsFromReddit) {
                        allPosts = allPosts.concat(postsFromReddit);
                    }
                }
            }

            if (await loadPreferences(user.id, "Youtube")) {
                for (const {query, interestLevel} of YouTubeQueries) {
                    numberOfPostsToFetch = calculateNumberOfPostsToFetch(interestLevel);
                    const videoIds = await RelatedVideos(query);

                    if (videoIds) {
                        allPosts = allPosts.concat(videoIds);
                    }
                }
            }

            if (await loadPreferences(user.id, "News")) {
                for (const {newsInterest, interestLevel} of Articles) {
                    let articles: Post[] = [];
                    numberOfPostsToFetch = calculateNumberOfPostsToFetch(interestLevel);
                    articles = await fetchNewsArticles(newsInterest);
                    if (articles) {
                        allPosts = allPosts.concat(articles);
                    }
                }
            }

            if (await loadPreferences(user.id, "AI_Articles")) {
                for (const {interest} of generalInterests) {
                    let articles: Post[] = [];
                    // @ts-ignore
                    articles = await ArticleGenerator(interest);
                    if (articles) {
                        allPosts = allPosts.concat(articles);
                    }
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
    else{
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
interface User {
    // Define your user interface here
    id: string;
}

async function fetchPostsFromSourcesAndCache(user: User): Promise<Post[]> {
    const cachedPosts: Post[] | null = await getCachedPosts();

    if (cachedPosts) {
        return cachedPosts;
    } else {
        return await fetchPostsFromSources(user);
    }
}

export { fetchPostsFromSources, fetchPostsFromSourcesAndCache };