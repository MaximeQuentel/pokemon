// Q1 affichant, dans la console, la liste des Pokémons pour un type donné (en argument).

Attack.fill_attacks();
Pokemon.fill_pokemons();

function getPokemonByType(typeName){
    const type = Type.all_types[typeName];
    if (!type) {
        console.error(`Type ${typeName} not found.`);
        return [];
    }

    const pokemonsOfType = [];
    for (const pokemon of Object.values(Pokemon.all_pokemons)) {
        if (pokemon.types.includes(typeName)) {
            pokemonsOfType.push(pokemon);
        }
    }

    return pokemonsOfType;
}

// Q2 affichant, dans la console, la liste des Pokémons pour une attaque donnée (en argument).

function getPokemonsByAttack(attackName){
    const pokemonsWithAttack = [];
    for (const pokemon of Object.values(Pokemon.all_pokemons)) {
        const attacks = [...pokemon.fast_moves, ...pokemon.charged_moves];
        if (attacks.some(attack => attack.nom === attackName)) {
            pokemonsWithAttack.push(pokemon);
        }
    }

    return pokemonsWithAttack;
}

// Q3 affichant, dans la console, la liste des attaques pour un type donné (en argument).

function getAttacksByType(typeName){
    const type = Type.all_types[typeName];
    if (!type) {
        console.error(`Type ${typeName} not found.`);
        return [];
    }

    const attacksOfType = [];
    for (const pokemon of Object.values(Pokemon.all_pokemons)) {
        const attacks = [...pokemon.fast_moves, ...pokemon.charged_moves];
        for (const attack of attacks) {
            if (attack.type === typeName && !attacksOfType.includes(attack)) {
                attacksOfType.push(attack);
            }
        }
    }

    return attacksOfType;
}

function getPokemonsByType(typeName) {
    return getPokemonByType(typeName);
}