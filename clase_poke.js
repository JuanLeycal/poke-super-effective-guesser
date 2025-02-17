export function getRandomNumber() {
    return Math.floor(Math.random() * 1025) + 1;
}

export function getRandomNumber2() {
    return Math.floor(Math.random() * 919) + 1;
}

export async function getPokemon(id, timeout = 5000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, { signal: controller.signal });

        clearTimeout(timer); // Prevent unnecessary aborting

        if (!response.ok) {
            if (response.status === 404) return null;
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        if (error.name === "AbortError") {
            console.error("Request timed out");
            throw new Error("Request timed out");
        }
        console.error("Error fetching Pokémon move:", error);
        throw error;
    }
}


export async function getMove(id, timeout = 5000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/move/${id}`, { signal: controller.signal });

        clearTimeout(timer); // Prevent unnecessary aborting

        if (!response.ok) {
            if (response.status === 404) return null;
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        if (error.name === "AbortError") {
            console.error("Request timed out");
            throw new Error("Request timed out");
        }
        console.error("Error fetching Pokémon move:", error);
        throw error;
    }
}


