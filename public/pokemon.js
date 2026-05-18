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
        
        row.appendChild(imgCell);
        row.appendChild(numCell);
        row.appendChild(nameCell);
        row.appendChild(typeCell);
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




allPkmn();