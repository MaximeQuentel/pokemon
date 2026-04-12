$(function() {
    Pokemon.fill_pokemons();
    let premierPokemon = 0; // index du premier pokemon a afficher
    const pokemonsParPage = 25; // nombre de pokemon a afficher par page
    let pokemons = Object.values(Pokemon.all_pokemons);
    let ordreCroissant = true;

    function afficherListe(liste) {
        let table = $('#liste-pokemon'); //selectionne la partie du tableau ou seront affiches les pokemon
        table.empty(); //vide le tableau pour le remplir avec les pokemon

        liste.forEach(pokemon => {
            let ligne = `<tr data-id="${pokemon.id}" class="lignePokemon">
                <td>${pokemon.id}</td>
                <td>${pokemon.nom}</td>
                <td>${pokemon.form}</td>
                <td>${pokemon.types.map(t => t.name).join(', ')}</td>
                <td>${pokemon.stamina}</td>
                <td>${pokemon.attack}</td>
                <td>${pokemon.defense}</td>
                <td><img src="webp/images/${String(pokemon.id).padStart(3, '0')}.webp" class="miniature" alt="${pokemon.nom}"></td>
                </tr>`;
            table.append(ligne);
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
    Object.values(Type.all_types).forEach(t => { //parcours des types
        $('#type').append(`<option value="${t.name}">${t.name}</option>`);
    });

    $('#attaquesRapides').append('<option value=""></option>');
    Object.values(Attack.all_attacks).filter(a => a.puissance > 0).forEach(a => {
        $('#attaquesRapides').append(`<option value="${a.nom}">${a.nom}</option>`);
    });

    function filtre(){
        let nom = $('#nom').val().toLowerCase(); //recuperer le nom saisi
        let type = $('#type').val(); //recuperer le type choisi
        let attaque = $('#attaquesRapides').val(); //recuperer l'attaque saisie

        listeTri = pokemons;

        if (nom !== "") {
            listeTri = listeTri.filter(p => p.nom.toLowerCase().includes(nom)); //recuperation des pokemon avec nom correspondant
        }

        if (type !== "") {
            listeTri = listeTri.filter(p => p.types.some(t => t.name === type)); //pokemon avec dans ses types le type choisi
        }

        if (attaque !== "") {
            listeTri = listeTri.filter(p => p.fast_moves.some(m => m.nom === attaque)); //pokemon avec dans ses attaques rapides l'attaque choisi
        }

        premierPokemon = 0;
        afficherListe(listeTri.slice(0, pokemonsParPage));
    }

    $('#nom').on('input', filtre);
    $('#type').on('change', filtre);
    $('#attaquesRapides').on('change', filtre);

    $('thead th').on('click', function() {
        let colonne = $(this).text().toLowerCase();
        pokemons.sort((a, b) => {
            let valA, valB;
            
            switch (colonne) {
                case 'id': 
                    valA = a.id;
                    valB = b.id;
                    break;
                case 'nom': 
                    valA = a.nom; 
                    valB = b.nom; 
                    break;
                case 'form': 
                    valA = a.form; 
                    valB = b.form; 
                    break;
                case 'types': 
                    valA = a.types.map(t => t.name).join(', '); 
                    valB = b.types.map(t => t.name).join(', '); 
                    break;
                case 'endurance': 
                    valA = a.stamina; 
                    valB = b.stamina; 
                    break;
                case 'attaque': 
                    valA = a.attack; 
                    valB = b.attack; 
                    break;
                case 'défense': 
                    valA = a.defense; 
                    valB = b.defense;
                    break;
                default: 
                    return 0;
            }

            if (valA < valB) return ordreCroissant ? -1 : 1;
            if (valA > valB) return ordreCroissant ? 1 : -1;
            return 0; 
        });

        ordreCroissant = !ordreCroissant;
        premierPokemon = 0;
        afficherListe(pokemons.slice(0, pokemonsParPage));
    });

    $(document).on('click', 'tbody tr', function() {
        let id = $(this).data('id');
        let pokemon = Pokemon.all_pokemons[id];

        let details = `
            <h2>${pokemon.nom} (${pokemon.form})</h2>
            <img src="webp/images/${String(pokemon.id).padStart(3, '0')}.webp" alt="${pokemon.nom}">
            <p><strong>Types:</strong> ${pokemon.types.map(t => t.name).join(', ')}</p>
            <p><strong>Endurance:</strong> ${pokemon.stamina}</p>
            <p><strong>Attaque:</strong> ${pokemon.attack}</p>
            <p><strong>Défense:</strong> ${pokemon.defense}</p>
            <h3>Attaques Rapides</h3>
            <ul>${pokemon.fast_moves.map(m => `<li>${m.nom} (Puissance: ${m.puissance})</li>`).join('')}</ul>
            <h3>Attaques Chargées</h3>
            <ul>${pokemon.charged_moves.map(m => `<li>${m.nom} (Puissance: ${m.puissance})</li>`).join('')}</ul>
        `;

        $('#details').html(details);
        $('#popup').fadeIn();
    });

    $('.close-button').on('click', function() {
        $('#popup').fadeOut();
    });

    $(document).on('mouseenter', '.miniature', function(e) {
        let src = $(this).attr('src');
        let popupWidth = $('#image-hover-popup').outerWidth();
        let posX = e.pageX - popupWidth - 20;
        $('#image-zoom').attr('src', src);
        $('#image-hover-popup').css({
            top: e.pageY + 10,
            left: posX
        }).show();
    }).on('mouseleave', '.miniature', function() {
        $('#image-hover-popup').hide();
    });

    afficherListe(pokemons.slice(premierPokemon, premierPokemon + pokemonsParPage));

});