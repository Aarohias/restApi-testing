const express = require('express');
const bodyParser = require('body-parser');
const { translate } = require('@vitalets/google-translate-api');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('This is the page for fetch Api to translate from english to french');
});

app.post('/translate', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Please enter text!' });
  }

  try {
    const translation = await translate(text, { to: 'fr', apiKey: process.env.GOOGLE_TRANSLATE_API_KEY });
    res.json({ translation: translation.text });
  } catch (error) {
    console.error('Error!....', error);
    res.status(500).json({ error: 'Server Failed!' });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: '404 page not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running ....port: ${PORT}`);
});