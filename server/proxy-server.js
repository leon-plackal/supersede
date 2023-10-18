require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3001; // Choose a port for your proxy server
const rateLimit = require('express-rate-limit');
const { check, validationResult } = require('express-validator');
const OpenAI = require('openai');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 2 requests per windowMs
});

app.use('/newsarticles', apiLimiter);
app.use('/redditposts', apiLimiter);

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

app.get('/redditposts',
  [
    check('subreddit').isString().trim().escape(),
    check('postCount').isInt({ min: 1, max: 15 }),
  ],
  async (req, res) => {
    // Validate request parameters, queries using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { subreddit, postCount } = req.query;
    const redditAPIUrl = `https://www.reddit.com/r/${subreddit}/hot.json?limit=${postCount}`;
    // Top post API: const redditAPIUrl = `https://www.reddit.com/r/${subreddit}/top.json?t=day&limit=${postCount}`;
    try {
      const response = await axios.get(redditAPIUrl);

      res.json(response.data);
    } catch (error) {
      console.error('Error fetching posts from Reddit:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.get('/youtubevideos',
  [
    check('query').isString().trim().escape(),
  ],
  async (req, res) => {
    // Validate request parameters, queries using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { query } = req.query;

    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          key: process.env.YOUTUBE_KEY,
          part: 'snippet',
          maxResults: 1,
          q: query,
          type: 'video',
        },
      })

      res.json(response.data);
    } catch (error) {
      console.error('Error fetching posts from Youtube:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.use(express.json());
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

app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
