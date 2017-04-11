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
    var pokecard = document.createElement("div");
    pokecard.className = "pokemon-card pure-u-md-1-2";
    var pokecont = document.createElement("div");
    pokecont.className = "poke-container";
    pokecard.appendChild(pokecont);

    var pokename = document.createElement("div");
    pokename.className = "content-subhead";
    pokename.appendChild(document.createTextNode(pokemon.name));
    pokecont.appendChild(pokename);

    var innerContainer = document.createElement("div");
    innerContainer.className = "pure-g";
    innerContainer.appendChild(getpokeinfo(pokemon.type));
    innerContainer.appendChild(getpokethumb(pokemon.sprite));
    pokecont.appendChild(innerContainer);

    parent.appendChild(pokecard);
}

function getpokeinfo (types) {
    var info = document.createElement("div");
    info.className = "poke-info pure-u-1-2";
    types.map(function (type) {
        info.appendChild(document.createTextNode(type));
    });
    return info;
}

function getpokethumb (sprite) {
    var thumb = document.createElement("div");
    thumb.className = "poke-thumb pure-u-1-2";
    var img = document.createElement("img");
    img.className = "pure-img-responsive";
    img.src = sprite;
    thumb.appendChild(img);
    return thumb;
}