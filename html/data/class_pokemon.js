class Pokemon {
    static all_pokemons = {};

    constructor(id, nom, stamina, attack, defense, types, fast_moves, charged_moves) {
        this.id = id;
        this.nom = nom;
        this.stamina = stamina;
        this.attack = attack;
        this.defense = defense;
        this.types = types;
        this.fast_moves = fast_moves;
        this.charged_moves = charged_moves;
    }

    toString() {
        return `${this.nom}: #${this.id}, [${this.types.map(t => t.typeName).join(', ')}], [STA: ${this.stamina}, ATK: ${this.attack}, DEF: ${this.defense}], Rapides = [${this.fast_moves.map(m => m.nom).join(', ')}], Chargées = [${this.charged_moves.map(m => m.nom).join(', ')}]`;
    }

    getTypes() {
        return this.types;
    }

    getAttacks() {
        return this.fast_moves.concat(this.charged_moves);
    }

    getWeakestEnemies(attackName) {
        const attackNameLower = attackName.toLowerCase();
        const attack = Object.values(Attack.all_attacks).find(a => a.nom.toLowerCase() === attackNameLower);

        if (!attack) {
            console.log(`Attaque "${attackName}" introuvable`);
            return;
        }
        let maxEff = -Infinity;
        let best = [];

        for (const enemy of Object.values(Pokemon.all_pokemons)){
            const eff = calcEfficiency(attack.type, enemy.types);

            if (eff > maxEff) {
                maxEff = eff;
                best = [enemy];
            } else if (eff === maxEff) {
                best.push(enemy);
            }
        }

        printPokemonList(best);
        return best;
    }

    // Q6
    getBestFastAttacksForEnemy(print, pokemonName) {
        const nameLower = pokemonName.toLowerCase();
        const enemyB = Object.values(Pokemon.all_pokemons).find(p => p.nom.toLowerCase() === nameLower);

        if (!enemyB) {
            console.log(`Pokemon "${pokemonName}" introuvable`);
            return null;
        }

        const results = this.fast_moves.map(atk => {
            const eff = calcEfficiency(atk.type, enemyB.types);
            const pts = atk.puissance * eff * (this.attack / enemyB.defense);
            return { atk, pts, eff };
        });

        results.sort((a, b) => {
            if (b.pts !== a.pts) return b.pts - a.pts;
            return a.atk.nom.localeCompare(b.atk.nom);
        });

        if (print) {
            const n = results.length;
            console.log(`Liste des ${n} attaques :`);
            for (const r of results) {
                console.log(`- ${r.atk.toString()} | degats: ${r.pts.toFixed(4)} | eff: ${r.eff}`);
            }
        }
        return results[0] ?? null;
    }

    static fill_pokemons() {
        Pokemon.all_pokemons = {};

        for (const data of pokemons) {
            if (data.form !== 'Normal') continue;

            const typesEntry = pokemon_types.find(
                pt => pt.pokemon_id === data.pokemon_id
            );
            const types = typesEntry
                ? typesEntry.type.map(name => Type.all_types[name]).filter(Boolean)
                : [];

            const movesEntry = pokemon_moves.find(
                pm => pm.pokemon_id === data.pokemon_id
            );

            const findAttackByName = name => {
                return Object.values(Attack.all_attacks).find(a => a.nom === name) ?? null;
            };

            let fast = [];
            let charged = [];

            if (movesEntry) {
                fast = movesEntry.fast_moves.map(findAttackByName).filter(Boolean);
                charged = movesEntry.charged_moves.map(findAttackByName).filter(Boolean);
            }

            const pkmn = new Pokemon(
                data.pokemon_id,
                data.pokemon_name,
                data.base_stamina,
                data.base_attack,
                data.base_defense,
                types,
                fast,
                charged
            );

            pkmn.form = data.form;

            Pokemon.all_pokemons[data.pokemon_id] = pkmn;
        }
    }
}

// fonctions utiles :
function calcEfficiency(attackTypeName, defenderTypes) {
    const attackType = Type.all_types[attackTypeName];
    if (!attackType) return 1.0;

    let eff = 1.0;
    for (const defType of defenderTypes) {
        eff *= attackType.getEffectivenessAgainst(defType.name);
    }
    return eff;
}

function printPokemonList(list) {
    console.log(`Liste des ${list.length} pokemons :`);
    for (const p of list) {
        console.log(`- ${p.toString()}`);
    }
}

function printAttackList(list) {
    console.log(`Liste des ${list.length} attaques :`);
    for (const a of list) {
        console.log(`- ${a.toString()}`);
    }
}