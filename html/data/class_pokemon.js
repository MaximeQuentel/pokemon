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
        return `${this.nom} : #${this.id}, [${this.types.join(', ')}], [STA: ${this.stamina}, ATK: ${this.attack}, DEF: ${this.defense}], Rapides = [${this.fast_moves.map(m => m.nom).join(', ')}], Chargées = [${this.charged_moves.map(m => m.nom).join(', ')}]`;
    }

    getTypes() {
        return this.types;
    }

    getAttacks() {
        return [this.fast_moves, this.charged_moves];
    }

    static fill_pokemons() {
        this.all_pokemons = {};

        pokemons.forEach(pokemon => {
            const pkmn = new Pokemon(pokemon.id, pokemon.name, pokemon.stamina, pokemon.attack, pokemon.defense, pokemon.types, pokemon.fast_moves, pokemon.charged_moves);
            this.all_pokemons[pokemon.id] = pkmn;
        });
    }
}