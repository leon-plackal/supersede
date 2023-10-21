import {fetchPostsFromReddit} from './redditAPI';
import fetchNewsArticles from './newsAPI';
import RelatedVideos from './YoutubeAPI';
import ArticleGenerator from './openAPI';
import {supabaseClient} from "../supabase/supabaseclient";
import toast from 'react-hot-toast';

interface Post {
    id?: string;
    YouTubeID?: string;
    title: string;
    date: string;
    channel: string;
    sourceType: string;
}
interface User {
    // Define your user interface here
    id: string;
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

const getUserInterests = async (userId: string, source:string): Promise<any[]> => {
    const { data, error } = await supabaseClient
        .from('user_interests')
        .select('*')
        .eq('user_id', userId)
        .eq( 'source_type', source);

    if (error) {
        console.error('Error fetching interests:', error);
    }
    if (data){
        return data.map((interest) => [interest.interest_name, interest.weighting_value])
    }
    return [];
};

async function fetchPostsFromSources(user: User): Promise<Post[]> {
    
    let allPosts: Post[] = [];

    if (user) {
        try {
            if (await loadPreferences(user.id, "Reddit")) {
                const Interests = await getUserInterests(user.id, "Reddit")
                const numberOfInterests = Interests.length;
                const numberOfPostsToFetch = Math.floor(15 / numberOfInterests);
                for (const interest of Interests) {
                    //numberOfPostsToFetch = calculateNumberOfPostsToFetch(interest[1]);
                    const postsFromReddit = await fetchPostsFromReddit(interest[0].toLowerCase(), numberOfPostsToFetch);
                    if (postsFromReddit) {
                        allPosts = allPosts.concat(postsFromReddit);
                    }
                }
            }

            if (await loadPreferences(user.id, "Youtube")) {
                const Interests = await getUserInterests(user.id, "Youtube")
                const numberOfInterests = Interests.length;
                const numberOfPostsToFetch = Math.floor(10 / numberOfInterests);
                for (const interest of Interests) {
                    //numberOfPostsToFetch = calculateNumberOfPostsToFetch(interest[1]);
                    const videoIds = await RelatedVideos(interest[0], numberOfPostsToFetch);
                    if (videoIds) {
                        allPosts = allPosts.concat(videoIds);
                    }
                    
                }
            }

            if (await loadPreferences(user.id, "News")) {
                const Interests = await getUserInterests(user.id, "News")
                const numberOfInterests = Interests.length;
                const numberOfPostsToFetch = Math.floor(15 / numberOfInterests);
                for (const interest of Interests) {
                    let articles: Post[] = [];
                    articles = await fetchNewsArticles(interest[0], numberOfPostsToFetch);
                    if (articles) {
                        allPosts = allPosts.concat(articles);
                    }
                }
            }

            if (await loadPreferences(user.id, "AI_Articles")) {
                const Interests = await getUserInterests(user.id, "AI_Articles")
                for (const interest of Interests) {
                    let articles: Post[] = [];
                    // @ts-ignore
                    articles = await ArticleGenerator(interest[0]);
                    if (articles) {
                        allPosts = allPosts.concat(articles);
                    }
                }
            }

            // If no posts were found, fetch some default posts
            if (allPosts.length === 0) {
                toast.success("Set up your profile to get personalised posts!");
                console.log("No posts found, fetching default posts");
                allPosts = allPosts.concat(await fetchPostsFromReddit("tennis", 5))
                allPosts = allPosts.concat(await fetchPostsFromReddit("funky", 10))
                allPosts = allPosts.concat(await fetchPostsFromReddit("animals", 10))
                allPosts = allPosts.concat(await fetchNewsArticles("global warming", 15))
                allPosts = allPosts.concat(await RelatedVideos("Nature", 2))
                allPosts = allPosts.concat(await RelatedVideos("Cats", 2))
                // @ts-ignore
                allPosts = allPosts.concat(await ArticleGenerator("Nature"))
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
        return 1;
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

async function fetchPostsFromSourcesAndCache(user: User): Promise<Post[]> {
    const cachedPosts: Post[] | null = await getCachedPosts();

    if (cachedPosts) {
        return cachedPosts;
    } else {
        return await fetchPostsFromSources(user);
    }
}

function clearCache() {
    localStorage.removeItem('cachedPosts');
}

export { fetchPostsFromSources, fetchPostsFromSourcesAndCache, clearCache };