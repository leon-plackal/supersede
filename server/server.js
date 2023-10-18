// Server (server.js)
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());


// Middleware to verify the JWT token
function verifyToken(req, res, next) {
    const token = req.headers.authorization.split(' ')[1]; // Get the token from the Authorization header

    jwt.verify(token, 'your-secret-key', (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden if the token is invalid
        }
        req.user = user; // Attach the user information to the request object
        next(); // Continue with the request
    });
}

// API route to generate articles
app.post('/generatearticle', async (req, res) => {
    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const { keywords } = req.body;

        const response = await openai.completions.create({
            model: "text-davinci-003",
            prompt: `Generate an article about ${keywords}`,
            temperature: 0,
            max_tokens: 500,
            top_p: 1,
            frequency_penalty: 1.5,
            presence_penalty: 0.0,
            stop: ['/'],
        });

        res.json({ article: response.choices[0].text });
    } catch (error) {
        console.error('Error generating article:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
