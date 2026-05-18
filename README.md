# BulbaDex 
### INST377 Final Project - Ademir Ferreyra

Hello! This is Bulbadex! A website I created where you can find the latest pokemon news along with adding your favorite 115 pokemon from the pokedex onto your list! This was builte using Node.js, express, and supabase!

## Target Browsers
- Google Chrome
- Safari
- Microsoft Edge

## Link to Developer Manual
See the Developer Manual section below.

---

# Developer Manual

## About This Document
This document is intended for future developers who will take over the BulbaDex project. No experience required! So feel free to modify it.

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm
- A Supabase account

### Steps
1. Clone the repository:
```bash
git clone https://github.com/arshibarshi/INST377-FinalProject-Ferreyra.git
cd INST377-FinalProject-Ferreyra
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:

4. Set up supabase by creating a 'favorites table with these columns:
    - 'id' (int8, primary key)
    - 'pokemon_name' (text)
    - 'pokemon_type' (text)
    - 'image_url' (text)

5. DISABLE RLS on the favorites table in Supabase!!!

## Run the application 
```bash
node index.js
```

and then open your browser and go to http://localhost:3000