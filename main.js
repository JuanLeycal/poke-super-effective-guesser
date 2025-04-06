import { getPokemon, getRandomNumber, getMove, getRandomNumber2} from "./clase_poke.js"
import { typeCalculator } from "./pokecalculator.js";

let puntaje = parseInt(localStorage.getItem("puntaje")) || 0;

const puntajeSpan = document.getElementById("puntaje");
puntajeSpan.textContent = puntaje;

function myFunction(x) {
    var x = document.getElementById(x);
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));  
        [array[i], array[j]] = [array[j], array[i]];  
    }
    return array;
}


function mostrarImagen(x) {
    const imagenElemento = document.getElementById('imagen'); 
    imagenElemento.src = x.sprites.other["official-artwork"].front_default;
}

myFunction('body')

let moves = [];
let isActive = false;

const result = await getPokemon(getRandomNumber())

console.log(result.sprites.other["official-artwork"].front_default)

let typePokemon = []

for (let key in result.types) {
    if (result.types.hasOwnProperty(key)) {
        typePokemon.push(result.types[key].type.name);
    }
}
console.log(typePokemon)

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
    { nombre: moves[0].name.split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ') },
    { nombre: moves[1].name.split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ') },
    { nombre: moves[2].name.split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')},
    { nombre: moves[3].name.split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')}
];

moves_buttons.forEach((objeto, index) => {
    document.getElementById(`button${index + 1}`).innerText = objeto.nombre;
});

myFunction('loading')
mostrarImagen(result)


myFunction('body')

export const button1 = moves[0].type.name
export const button2 = moves[1].type.name
export const button3 = moves[2].type.name
export const button4 = moves[3].type.name

export function export_type_value() {
    
  }


document.getElementById('button1').addEventListener('click', function() {
    console.log(button1);
    if (typeCalculator(button1, typePokemon) > 1.0){
        alert("CORRECTO");
        puntaje++;
        localStorage.setItem("puntaje", puntaje);
        puntajeSpan.textContent = puntaje;
        location.reload()
    }
    else alert("MALO DE MIERDA")
});
document.getElementById('button2').addEventListener('click', function() {
    if (typeCalculator(button2, typePokemon) > 1.0){
        alert("CORRECTO");
        puntaje++;
        localStorage.setItem("puntaje", puntaje);
        puntajeSpan.textContent = puntaje;
        location.reload()
    }
    else alert("MALO DE MIERDA")
});
document.getElementById('button3').addEventListener('click', function() {
    if (typeCalculator(button3, typePokemon) > 1.0){
        alert("CORRECTO");
        puntaje++;
        localStorage.setItem("puntaje", puntaje);
        puntajeSpan.textContent = puntaje;
        location.reload()
    }
    else alert("MALO DE MIERDA")
});
document.getElementById('button4').addEventListener('click', function() {
    if (typeCalculator(button4, typePokemon) > 1.0){
        alert("CORRECTO");
        puntaje++;
        localStorage.setItem("puntaje", puntaje);
        puntajeSpan.textContent = puntaje;
        location.reload()
    }
    else alert("MALO DE MIERDA")
});

console.log(button1)