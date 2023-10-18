import uuid from '../utilities/uuid';

async function ArticleGenerator(inputText: string) {
        console.log("Calling Open AI API...", inputText);
        try {
            const response = await fetch('http://localhost:3001/generatearticle', {
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
                sourceType: "ai_article",
                article: data.article,
                topic: inputText, // Add the 'topic' field and set it as the inputText
            }; // Return the modified data
        } catch (error) {
            console.error('Error AI articles:', error);
            return []; // Return an empty array in case of an error
        }
    }

export default ArticleGenerator;

