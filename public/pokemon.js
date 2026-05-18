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
        buildTypeChart(pkmnData);

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

function buildTypeChart(pkmnData){
    const typeCounts = {};
    pkmnData.forEach(pokemon => {
        pokemon.types.split(', ').forEach(type => {
            typeCounts[type] = (typeCounts[type] || 0) + 1;
        });
    });

    const labels = Object.keys(typeCounts);
    const counts = Object.values(typeCounts);

    const typeColors = {
        fire: '#F08030',
        water: '#6890F0',
        grass: '#78C850',
        electric: '#F8D030',
        psychic: '#F85888',
        ice: '#98D8D8',
        dragon: '#7038F8',
        dark: '#705848',
        fairy: '#EE99AC',
        normal: '#A8A878',
        fighting: '#C03028',
        flying: '#A890F0',
        poison: '#A040A0',
        ground: '#E0C068',
        rock: '#B8A038',
        bug: '#A8B820',
        ghost: '#705898',
        steel: '#B8B8D0',
    };

    const colors = labels.map(type => typeColors[type] || '#68A090');

    const ctx = document.getElementById('type-chart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Number of Pokemon',
                data: counts,
                backgroundColor: colors
            }]
        },
        options: {
            plugins: {
                legend: {
                    position: 'right'
                },
                title: {
                    display: true,
                    text: 'Pokemon Types'
                }
            }
        }
    });
}




allPkmn();
loadFavorites();