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
pokeList.map(function(poke) {
    addPokemon(poke);
});

function addPokemon (pokemon) {
    var pokecard = createEl("div", "pokemon-card pure-u-md-1-2");
    var pokecont = createEl("div", "poke-container");
    pokecard.appendChild(pokecont);

    var pokename = createEl("div", "content-subhead");
    pokename.appendChild(document.createTextNode(pokemon.name));
    pokecont.appendChild(pokename);

    var innerContainer = createEl("div", "pure-g");
    innerContainer.appendChild(getpokeinfo(pokemon.type));
    innerContainer.appendChild(getpokethumb(pokemon.sprite));
    pokecont.appendChild(innerContainer);

    parent.appendChild(pokecard);
}

function getpokeinfo (types) {
    var info = createEl("div", "poke-info pure-u-1-2");
    types.map(function (type) {
        info.appendChild(document.createTextNode(type));
        info.appendChild(createEl("br"));
    });
    return info;
}

function getpokethumb (sprite) {
    var thumb = createEl("div", "poke-thumb pure-u-1-2");
    var img = createEl("img", "pure-img-responsive");
    img.src = sprite;
    thumb.appendChild(img);
    return thumb;
}

function createEl (elname, cl) {
    var el = document.createElement(elname);
    if (cl) el.className = cl;
    return el;
}

