$(function() {
    function afficherListe(liste) {
        let table = $('#liste-pokemon'); //selectionne la partie du tableau ou seront affiches les pokemon
        table.empty(); //vide le tableau pour le remplir avec les pokemon

        liste.forEach(pokemon => { //parcours des 25 pokemon
            let ligne = `<tr>
                <td>${pokemon.id}</td>
                <td>${pokemon.nom}</td>
                <td>${pokemon.stamina}</td>
                <td>${pokemon.attack}</td>
                <td>${pokemon.defense}</td>
                <td>${pokemon.types.map(t => t.typeName).join(', ')}</td>
                <td>${pokemon.fast_moves.map(m => m.nom).join(', ')}</td>
                <td>${pokemon.charged_moves.map(m => m.nom).join(', ')}</td>
                <td><img src="webp/images/${String(pokemon.id).padStart(3, '0')}.webp" alt="${pokemon.nom}"></td>
            </tr>`;
            table.append(ligne); // ajout du pokemon au tbaleau
        });
    }

    pokemons = Object.values(Pokemon.all_pokemons);
    let page1 = pokemons.slice(0, 25);
    afficherListe(page1);

});