require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3001; // Choose a port for your proxy server
const rateLimit = require('express-rate-limit');
const { check, validationResult } = require('express-validator');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 2 requests per windowMs
});

app.use('/newsarticles', apiLimiter);

app.get('/newsarticles',
  [
    check('keyword').isString().trim().escape(),
    check('articleCount').isInt({ min: 1, max: 15 }),
  ],
  async (req, res) => {
    // Validate request parameters, queries using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { keyword, articleCount } = req.query;
    const apiKey = process.env.NEWSAPI_KEY; // Get your NewsAPI key from environment variables
    try {
        const response = await axios.get(
            `https://newsapi.org/v2/everything?q=${keyword}&sortBy=popularity&apiKey=${apiKey}&language=en&pageSize=${articleCount}`
        );

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching news from NewsAPI:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});
