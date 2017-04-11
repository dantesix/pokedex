/*
            <div class="pokemon-card pure-u-md-1-2">
                <div class="poke-container">
                    <div class="content-subhead">
                        Bulbu
                    </div>
                    <div class="pure-g">
                        <div class="poke-info pure-u-1-2">
                            ez egy bulbu
                        </div>
                        <div class="poke-thumb pure-u-1-2">
                            <img class="pure-img-responsive" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png">
                        </div>
                    </div>
                </div>
            </div>
*/

var parent = document.getElementById("pokemonList");

function parseJSON(response) {
    return response.json();
};

function renderPokemon(body) {
    console.log(body);
    var p = {
        name: body.name,
        sprite: body.sprites.front_default,
        type: body.types.map(t => t.type.name)
    };
    addPokemon(p);
};

fetch('https://pokeapi.co/api/v2/pokemon/?limit=5')
    .then(parseJSON)
    .then(function (data) {
        console.log(data.results);
        data.results.forEach(function (element) {
            fetch(element.url)
                .then(parseJSON)
                .then(renderPokemon);
        });
    });

// create to pokemon :)
function addPokemon(pokemon) {
    appendCh(
        parent,
        appendCh(
            createEl("div", "pokemon-card pure-u-md-1-2"),
            appendCh(
                createEl("div", "poke-container"),
                appendCh(
                    createEl("div", "content-subhead"),
                    document.createTextNode(pokemon.name)
                ),
                appendCh(
                    createEl("div", "pure-g"),
                    getpokeinfo(pokemon.type),
                    getpokethumb(pokemon.sprite)
                )
            )
        )
    );
}

// Create info part of the pokemon card
// types: array of types of pokemon - from pokemon json
// returns created node object
function getpokeinfo(types) {
    var info = createEl("div", "poke-info pure-u-1-2");
    types.map(function (type) {
        appendCh(info, document.createTextNode(type), createEl("br"));
    });
    return info;
}

// Creates the thumbnail container and the img
// sprite: a jsonbol a sprite erteke, ami a kep cime
// returns created node object
function getpokethumb(sprite) {
    return appendCh(createEl("div", "poke-thumb pure-u-1-2"), createEl("img", "pure-img-responsive", sprite));
}

// createElement - fujj, hogy beleegetett szar cl meg src....de most jo ide
// elname: tag name
// cl: className attribute
// src: src attribute
// returns the created node object
function createEl(elname, cl, src) {
    var el = document.createElement(elname);
    if (cl) el.className = cl;
    if (src) el.src = src;
    return el;
}

// appendChild - ez sem a legszebb
// p: a parent, ahova kell passzintani, sajnos elhiszem, hogy lesz ilyen
// arguments[1-...]: ezeket ebben a sorrendben appendchildolja
// returns the parent node object
function appendCh(p) {
    for (var i = 1; i < arguments.length; i++) {
        p.appendChild(arguments[i]);
    }
    return p;
}
