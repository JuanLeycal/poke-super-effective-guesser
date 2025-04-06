import { getPokemon, getRandomNumber, getMove, getRandomNumber2 } from "./clase_poke.js";
import { typeCalculator } from "./pokecalculator.js";

// === Inicializar puntaje ===
let puntaje = parseInt(localStorage.getItem("puntaje")) || 0;
const puntajeSpan = document.getElementById("puntaje");
puntajeSpan.textContent = puntaje;

// === Mostrar/Ocultar elementos ===
function toggleDisplay(id) {
    const element = document.getElementById(id);
    element.style.display = element.style.display === "none" ? "block" : "none";
}

// === Desordenar arreglo ===
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// === Mostrar imagen del Pokémon ===
function mostrarImagen(pokemon) {
    const imagenElemento = document.getElementById('imagen');
    imagenElemento.src = pokemon.sprites.other["official-artwork"].front_default;
}

// === Capitalizar nombre del movimiento ===
function formatearNombre(nombre) {
    return nombre
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// === Obtener tipos del Pokémon ===
function obtenerTipos(pokemon) {
    return pokemon.types.map(t => t.type.name);
}

// === Lógica principal ===
toggleDisplay('game-container');

const pokemon = await getPokemon(getRandomNumber());
const tipoPokemon = obtenerTipos(pokemon);
let moves = [];

do {
    const move = await getMove(getRandomNumber2());

    if (typeCalculator(move.type.name, tipoPokemon) > 1.0 && move.damage_class.name !== 'status') {
        moves.push(move);

        while (moves.length < 4) {
            const extraMove = await getMove(getRandomNumber2());
            if (typeCalculator(extraMove.type.name, tipoPokemon) < 2.0 && extraMove.damage_class.name !== 'status') {
                moves.push(extraMove);
            }
        }
    }
} while (moves.length < 4);

moves = shuffleArray(moves);

// === Mostrar movimientos en botones ===
moves.forEach((move, index) => {
    const button = document.getElementById(`button${index + 1}`);
    button.innerText = formatearNombre(move.name);
    button.dataset.tipo = move.type.name;
});

// === Mostrar imagen y ocultar loader ===
toggleDisplay('loading');
mostrarImagen(pokemon);
toggleDisplay('game-container');

// === Manejar clic en botones ===
function manejarRespuesta(tipoMovimiento) {
    const esCorrecto = typeCalculator(tipoMovimiento, tipoPokemon) > 1.0;

    if (esCorrecto) {
        alert("CORRECTO");
        puntaje++;
    } else {
        alert("MALO DE MIERDA");
        puntaje = 0;
    }

    localStorage.setItem("puntaje", puntaje);
    puntajeSpan.textContent = puntaje;
    location.reload();
}

// === Asignar eventos a todos los botones ===
document.querySelectorAll("button[id^='button']").forEach(button => {
    button.addEventListener("click", () => manejarRespuesta(button.dataset.tipo));
});
