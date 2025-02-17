import { getPokemon, getRandomNumber, getMove, getRandomNumber2} from "./clase_poke.js"
import { typeCalculator } from "./pokecalculator.js";

const result = await getPokemon(getRandomNumber())
console.log(result.sprites.other["official-artwork"].front_default)

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));  
        [array[i], array[j]] = [array[j], array[i]];  
    }
    return array;
}


function mostrarImagen() {
    const imagenElemento = document.getElementById('imagen'); 
    imagenElemento.src = result.sprites.other["official-artwork"].front_default;
}

mostrarImagen()

let typePokemon = []

for (let key in result.types) {
    if (result.types.hasOwnProperty(key)) {
        typePokemon.push(result.types[key].type.name);
    }
}

console.log(typePokemon)

let moves = [];
let isActive = false;

do {
    let aux = await getMove(getRandomNumber2());

    if (typeCalculator(aux.type.name, typePokemon) > 1.0 && aux.damage_class.name !== 'status') {
        isActive = true;
        moves.push(aux);
    } 

    if (isActive && moves.length < 4) {
        let aux2 = await getMove(getRandomNumber2());
        if (typeCalculator(aux2.type.name, typePokemon) < 2.0 && aux2.damage_class.name !== 'status') {
            moves.push(aux2);
        }
    }
} while (moves.length < 4);


moves = shuffleArray(moves)

let moves_buttons = [
    { nombre: moves[0].name },
    { nombre: moves[1].name },
    { nombre: moves[2].name},
    { nombre: moves[3].name}
];

moves_buttons.forEach((objeto, index) => {
    document.getElementById(`button${index + 1}`).innerText = objeto.nombre;
});