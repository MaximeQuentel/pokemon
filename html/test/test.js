// q1

function getPokemonsByType(typeName) {
    const lower = typeName.toLowerCase();

    const result = Object.values(Pokemon.all_pokemons).filter(p => p.types.some(t => t.name.toLowerCase() === lower));

    printPokemonList(result);
    return result;
}

// q2
function getPokemonsByAttack(attackName) {
    const lower = attackName.toLowerCase();

    const result = Object.values(Pokemon.all_pokemons).filter(p => p.getAttacks().some(a => a.nom.toLowerCase() === lower));

    printPokemonList(result);
    return result;
}

// q3
function getAttacksByType(typeName) {
    const lower = typeName.toLowerCase();
    const result = Object.values(Attack.all_attacks).filter(a => a.type.toLowerCase() === lower);

    printAttackList(result);
    return result;
}

// q4
function sortPokemonsByTypeThenName() {
    const list = Object.values(Pokemon.all_pokemons);

    list.sort((a, b) => {
        
        const typesA = a.types.map(t => t.name).sort().join(',');
        const typesB = b.types.map(t => t.name).sort().join(',');

        if (typesA !== typesB) return typesA.localeCompare(typesB);
       
        return a.nom.localeCompare(b.nom);
    });

    printPokemonList(list);
    return list;
}

// q7
function fastFight(pokemonNameA, pokemonNameB) {
    const lowerA = pokemonNameA.toLowerCase();
    const lowerB = pokemonNameB.toLowerCase();

    
    
    
    const pkmnA = Object.values(Pokemon.all_pokemons).find(p => p.nom.toLowerCase() === lowerA);
    const pkmnB = Object.values(Pokemon.all_pokemons).find(p => p.nom.toLowerCase() === lowerB);

    if (!pkmnA || !pkmnB) {
        console.log("Pokémon introuvable");
        return;
    }

    let staA = pkmnA.stamina;
    let staB = pkmnB.stamina;

    const rows = [];
    let tour = 1;

    while (staA > 0 && staB > 0) {
        const resA = pkmnA.getBestFastAttacksForEnemy(false, pkmnB.nom);
        if (resA) {

            const degats = Math.ceil(resA.pts);
            staB = Math.max(0, staB - degats);
            rows.push({
                Tour: tour,
                Attaquant: pkmnA.nom,
                ATK: pkmnA.attack,
                Défenseur: pkmnB.nom,
                DEF: pkmnB.defense,
                "Nom attaque": resA.atk.nom,
                Efficacité: resA.eff,
                Dégâts: degats,
                Reste: staB
            });
            tour++;
        }

        if (staB <= 0) break;

        const resB = pkmnB.getBestFastAttacksForEnemy(false, pkmnA.nom);
        if (resB) {
            const degats = Math.ceil(resB.pts);
            staA = Math.max(0, staA - degats);
            rows.push({
                Tour: tour,
                Attaquant: pkmnB.nom,
                ATK: pkmnB.attack,
                Défenseur: pkmnA.nom,
                DEF: pkmnA.defense,
                "Nom attaque": resB.atk.nom,
                Efficacité: resB.eff,
                Dégâts: degats,
                Reste: staA
            });
            tour++;
        }
    }

    console.table(rows);

// vainqueur
    const winner = staA > 0 ? pkmnA.nom : pkmnB.nom;
    console.log(`Vainqueur : ${winner}`);
}
