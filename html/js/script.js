$(function() {
    let premierPokemon = 0; // index du premier pokemon a afficher
    const pokemonsParPage = 25; // nombre de pokemon a afficher par page
    let pokemons = Object.values(Pokemon.all_pokemons);

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

    $('#suiv').on('click', function() { // affichage page suivante
        if (premierPokemon + pokemonsParPage < pokemons.length) { //verification que ce n'est pas la fin de liste
            premierPokemon += pokemonsParPage;
            afficherListe(pokemons.slice(premierPokemon, premierPokemon + pokemonsParPage));
        }
    });

    $('#prec').on('click', function() { // affichage page precedente
        if (premierPokemon > 0) { //verification que ce n'est pas le debut de liste
            premierPokemon -= pokemonsParPage;
            afficherListe(pokemons.slice(premierPokemon, premierPokemon + pokemonsParPage));
        }
    });

    $('#type').append('<option value=""></option>');//option de base
    Object.values(TypeError.all_types).forEach(t => { //parcours des types
        $('#type').append(`<option value="${t.typeName}">${t.typeName}</option>`);
    });

    $('#type').on('change', function() {
        let choix = $(this).val(); //recuperer le type choisi
        let listePokemon; //liste final

        if (choix === '') { //defaut
            listePokemon = Object.values(Pokemon.all_pokemons);
        }
        else { 
            listePokemon = Object.values(Pokemon.all_pokemons).filter(p => p.types.some(t => t.typeName === choix)); //pokemon avec dans ses types le type choisi
        }

        premierPokemon = 0;
        pokemons = listePokemon;
        afficherListe(pokemons.slice(0, pokemonsParPage));
    });



    $('#nom').on('input', function() { //recherche du nom
        let nom = $(this).val().toLowerCase(); //recuperer le nom saisi
        let pokemonsNom = Object.values(Pokemon.all_pokemons).filter(p => p.nom.toLowerCase().includes(nom)); //recuperation des pokemon avec nom correspondant

        premierPokemon = 0;
        pokemons = pokemonsNom;
        afficherListe(pokemons.slice(0, pokemonsParPage));
    });

    afficherListe(pokemons.slice(premierPokemon, premierPokemon + pokemonsParPage));

});