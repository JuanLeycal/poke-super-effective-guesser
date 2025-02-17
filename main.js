import { getPokemon, getRandomNumber} from "./clase_poke.js"

const result = await getPokemon(getRandomNumber())
console.log(result.sprites.other["official-artwork"].front_default)

function mostrarImagen() {
    const imagenElemento = document.getElementById('imagen');  // Seleccionamos el elemento <img>
    imagenElemento.src = result.sprites.other["official-artwork"].front_default; // Asignamos la URL de la imagen al atributo src
}

mostrarImagen()