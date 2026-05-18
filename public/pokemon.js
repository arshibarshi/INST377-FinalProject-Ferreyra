async function allPkmn(){
    const url = await fetch("/api/pokemon");
    const data = await url.json();

    const info = document.getElementById('national-dex');

    const pkmnData = await Promise.all(
        data.results.map(pokemon => getPkmnData(pokemon.url))
    );

    data.results.forEach((pokemon, index) => {
        const row = document.createElement('tr');

        const imgCell = document.createElement('td');
        const img = document.createElement('img');
        img.src = pkmnData[index].sprite;
        img.alt = pokemon.name;
        imgCell.appendChild(img);

        const numCell = document.createElement('td');
        numCell.textContent = index + 1; // Pokemon numbers start at 1

        const nameCell = document.createElement('td');
        nameCell.textContent = pokemon.name;

        const typeCell = document.createElement('td');
        typeCell.textContent = pkmnData[index].types;

        const favCell = document.createElement('td');
        const favBtn = document.createElement('button');
        favBtn.textContent = '⭐';
        favBtn.onclick = () => addFavorite(
        pokemon.name,
        pkmnData[index].types,
        pkmnData[index].sprite
        );
        favCell.appendChild(favBtn);
        
        row.appendChild(imgCell);
        row.appendChild(numCell);
        row.appendChild(nameCell);
        row.appendChild(typeCell);
        row.appendChild(favCell);
        info.appendChild(row);
    });
}
async function getPkmnData(url){
    const response = await fetch(url);  // fetches "https://pokeapi.co/api/v2/pokemon/1/"
    const data = await response.json(); // now you have the full pokemon data
    return {
        types: data.types.map(t => t.type.name).join(', '),
        sprite: data.sprites.front_default
    };
}

async function addFavorite(name, type, image_url){
    const response = await fetch("/api/favorites", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, type, image_url })
    });
    const data = await response.json();
    console.log('Added to favorites:', data);
    alert(`${name} added to favorites!`);
    loadFavorites();
    
}

async function loadFavorites(){
    const response = await fetch("/api/favorites");
    const favorites = await response.json();
    console.log('Current favorites:', favorites);
    const favoritesList = document.getElementById('favorites-list');
    favoritesList.innerHTML = '';

    favorites.forEach(pokemon => {
        const card = document.createElement('div');
        card.classList.add('favorite-card');
        card.innerHTML = `
            <h3>${pokemon.name}</h3>
            <img src="${pokemon.image}" alt="${pokemon.name}">
            <p>Type: ${pokemon.type}</p>
        `;
        favoritesList.appendChild(card);
    });
}




allPkmn();
loadFavorites();