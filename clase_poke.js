class Pokemon {
    constructor(name, types, image) {
        this.name = name;
        this.types = types;
        this.image = image;
    }

    correctName() {
        this.name = this.name.replace(/\b\w/g, char => char.toUpperCase()).replace(/-/g, ' ');
    }
}

function parseMove(pokemonData) {
    let pokeTypes = pokemonData.types.map(pokeType => pokeType.type.name);
    return new Pokemon(pokemonData.name, pokeTypes, pokemonData.image);
}

export function getRandomNumber() {
    return Math.floor(Math.random() * 1025) + 1;
}

export function getPokemon(id) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    return null;
                }
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error("Error fetching Pokémon:", error);
            throw error;
        });
}


