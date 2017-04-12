// Utility stuff
String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

function parseJSON(response) {
    return response.json();
};


(function (pd) {

    pokeDex.getInitialData = function () {
        fetch('https://pokeapi.co/api/v2/type/')
            .then(parseJSON)
            .then(function (data) {
                var typeLoadDone = data.results.map((pokemonType) => {
                        return new Promise((resolve) => {
                            fetch(pokemonType.url)
                            .then(parseJSON)
                            .then(function (type) {
                                pokeDex.addType(type);
                            })
                            .then(resolve);
                    });
                });
                Promise.all(typeLoadDone).then(function () {pokeDex.render.init()});
            });
    };

    // Array for pokemon types
    // { name, id}
    pokeDex.typeList = [];

    // Array for pokemons without detail
    // {name, id, types[]}
    pokeDex.pokemonList = {};

    // Filtered list of pokemon list
    pokeDex.currentPokemonList = [];

    // Add the type to the pokemon, if pokemon not exists then create it
    // pokemon: {id, name, type}
    pokeDex.addPokemon = function (pokemon) {
        var list = pokeDex.pokemonList;
        if (pokemon.id && list[pokemon.id]) {
            list[pokemon.id].types.push(pokemon.type);
        } else {
            list[pokemon.id] = {
                id: pokemon.id,
                name: pokemon.name,
                types: [pokemon.type]
            };
        }
    };

    // Parse pokemon type
    // ptype: response from api/v2/type/XXX
    pokeDex.addType =  function (ptype, resolve) {
        // Get preferred language name
        var _getName = function (names, language) {
            var lang = language || "en";
            return names.filter(function (name) {
                return name.language.name == lang;
            })[0].name;
        };
        var typeName = _getName(ptype.names);

        // Get pokemon type from url
        // WARNING! This is like a vibrator -> does the job, but not the same -> use regexp
        var _getPokeId = function (urlString) {
            return urlString.replace("https://pokeapi.co/api/v2/pokemon/", "").replace("/", "");
        };

        ptype.pokemon.map(function (pokecont) {
            pokeDex.addPokemon({
                id: _getPokeId(pokecont.pokemon.url),
                name: pokecont.pokemon.name.capitalizeFirstLetter(),
                type: typeName
            });
        });

        pokeDex.typeList.push({name: typeName, id: ptype.id});
    };

    // Default values
    pokeDex.default = {
        pageSize: 10 // how many pokemons on one page
    };
    
    // Rendering :)
    pokeDex.render = {};

    // filteredList: array from pokemonList
    pokeDex.render.init = function (filteredList) {
        pokeDex.currentPokemonList = filteredList || Object.keys(pokeDex.pokemonList).map(key => pokeDex.pokemonList[key]);
        pokeDex.render.pageSize = pokeDex.default.pageSize;
        pokeDex.render.currentPage = 1;
        pokeDex.render.drawPage();
    };

    pokeDex.render.drawPage = function () {
        var container = document.getElementById("pokemonList");
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        for (var i = 0; i < pokeDex.render.pageSize; i++) {
            var index = pokeDex.render.pageSize * (pokeDex.render.currentPage - 1) + i;
            pokeDex.render.drawPokemon(pokeDex.currentPokemonList[index], container);
        }
    };

    pokeDex.render.drawPokemon = function (pokemon, container) {
        // This should be rewriten, but im lazy as fuck

        appendCh(
            container,
            appendCh(
                createEl("div", {className: "pokemon-card pure-u-md-1-2 ", pokemonId: pokemon.id}),
                appendCh(
                    createEl("div", {className: "poke-container"}),
                    appendCh(
                        createEl("div", {className: "content-subhead"}),
                        document.createTextNode(pokemon.name)
                    ),
                    appendCh(
                        createEl("div", {className: "pure-g"}),
                        getpokethumb(),
                        getpokeinfo()
                    )
                )
            )
        );

        // Create info part of the pokemon card
        // types: array of types of pokemon - from pokemon json
        // returns created node object
        function getpokeinfo() {
            var info = createEl("div", {className: "poke-info pure-u-1-2 " + pokemon.types[0]});
            pokemon.types.map(function (type) {
                appendCh(info, document.createTextNode(type), createEl("br"));
            });
            return info;
        }

        // Creates the thumbnail container and the img
        // sprite: a jsonbol a sprite erteke, ami a kep cime
        // returns created node object
        function getpokethumb() {
            return appendCh(createEl("div", {className: "poke-thumb pure-u-1-2 " + (pokemon.types[1] || pokemon.types[0])}), createEl("img", {className: "pure-img-responsive", src: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemon.id + ".png"}));
        }

        // createElement - fujj, hogy beleegetett szar cl meg src....de most jo ide
        // elname: tag name
        // cl: className attribute
        // src: src attribute
        // returns the created node object
        function createEl(elname, opt) {
            var options = opt || {};
            var el = document.createElement(elname);
            if (options.className) el.className = options.className;
            if (options.src) el.src = options.src;
            if (options.pokemonId)  el.setAttribute("data-pokemon-id", options.pokemonId);
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
    };
    
}(window.pokeDex = window.pokeDex || {}));

pokeDex.getInitialData();