import uuid from '../components/cards/uuid';

async function ArticleGenerator(inputText: string, callAPI: boolean) {
    if (callAPI) {
        console.log("Calling Open AI API...");
        try {
            const response = await fetch('http://localhost:3001/generate-article', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ keywords: inputText }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();

            // Modify the data to include a 'topic' field
            return {
                id: uuid(),
                article: data.article,
                topic: inputText, // Add the 'topic' field and set it as the inputText
            }; // Return the modified data
        } catch (error) {
            console.error('Error AI articles:', error);
            return []; // Return an empty array in case of an error
        }
    }
}

export default ArticleGenerator;
