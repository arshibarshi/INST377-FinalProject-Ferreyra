const express = require('express');
const bodyParser = require('body-parser');
const supabaseClient = require('@supabase/supabase-js');
const dotenv = require('dotenv');

const app = express();
const port = 3000;
dotenv.config();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.get('/', (req, res) => {
  res.sendFile('public/main.html', { root: __dirname });
});


app.get('/api/pokemon', async (req, res) => {
  console.log('Attempting to get pokemon from PokeAPI!!');
  try{
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const data = await response.json();
    res.json(data);
  }
  catch (error) {
    console.error('Error fetching pokemon:', error);
    res.statusCode = 500;
    res.json({ message: 'Error fetching pokemon data' });
  }
});

app.get('/api/favorites', async (req, res) => {
  console.log('Attempting to get favorites from Supabase');
  const { data, error } = await supabase
    .from('favorites')
    .select();

  if (error) {
    console.log(`Error: ${error}`);
    res.statusCode = 500;
    res.send(error);
  } else {
    console.log('Received Favorites:', data.length);
    res.json(data);
  }
});


app.post('/api/favorites', async (req, res) => {
  const { name, type, image_url } = req.body;
  console.log('Received new favorite:', name, type, image_url);

  if (!name || !type || !image_url) {
    res.statusCode = 400;
    res.json({ message: 'Missing required fields: name, type, image_url' });
    return;
  }

  const { data, error } = await supabase
    .from('favorites')
    .insert([{ pokemon_name:name, pokemon_type:type, image_url:image_url }])
    .select();

  if (error) {
    console.error('Error inserting favorite:', error);
    res.statusCode = 500;
    res.json({ message: 'Error inserting favorite' });
  } else {
    console.log('Inserted favorite:', data);
    res.json(data[0]);
  }
});

app.listen(port, () => {
  console.log(`App is available on port: ${port}`);
});
