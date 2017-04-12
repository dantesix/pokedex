// Utility stuff
String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

function parseJSON(response) {
    return response.json();
};


(function (pd) {

    pokeDex.init = function () {
        pokeDex.getInitialData();
        pokeDex.assignPagerEvents();
    };

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
                Promise.all(typeLoadDone).then(function () { pokeDex.render.init() });
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
    pokeDex.addType = function (ptype, resolve) {
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

        pokeDex.typeList.push({ name: typeName, id: ptype.id });
    };

    // Default values
    pokeDex.default = {
        pageSize: 10 // how many pokemons on one page
    };

<<<<<<< HEAD
    //details view and it's children
    pokeDex.details = {};
    pokeDex.details.detailsView = document.getElementById("pokemon-details");
    pokeDex.details.detailsName = document.getElementById("pokemonDetailsName");
    pokeDex.details.detailsContent = document.getElementById("pokemonDetailsContent");
    pokeDex.details.detailsImage = document.getElementById("pokemonDetailsImage");


    var detailsBackground = document.getElementById("pokemonDetailsBackground");
    detailsBackground.addEventListener("click", changeDetailsVisibility);


    //update the content of the details view
    function updateDetails(details) {
        pokeDex.details.detailsName.innerText = details.name.capitalizeFirstLetter();
        pokeDex.details.detailsContent.innerHTML =
            `Súly: ${details.weight}<br/>Magasság: ${details.height}<br/>`;
        pokeDex.details.detailsImage.src = details.sprites.front_default;
    }

    //download and show details
    function handlePokemonClick(event) {
        pokeDex.details.detailsName.innerText = "Betöltés...";
        pokeDex.details.detailsContent.innerHTML = "";
        pokeDex.details.detailsImage.src = "";

        changeDetailsVisibility();

        var id = event.currentTarget.getAttribute("data-pokemon-id");
        fetch("https://pokeapi.co/api/v2/pokemon/" + id)
            .then(parseJSON)
            .then(updateDetails);
    }

    //change the visibility of the details dialog
    function changeDetailsVisibility() {
        if (pokeDex.details.detailsView.style.top === "150%") {
            pokeDex.details.detailsView.style.top = "50%";
            detailsBackground.classList.add("fadein");

        } else {
            pokeDex.details.detailsView.style.top = "150%";
            detailsBackground.classList.remove("fadein");
        }
    }
    
=======
>>>>>>> 7b77bb93ae3543f85194e900fbea383d52a497a8
    pokeDex.assignPagerEvents = function () {
        document.getElementById("nextPage").addEventListener("click", pokeDex.nextPage);
        document.getElementById("prevPage").addEventListener("click", pokeDex.prevPage);
        document.getElementById("firstPage").addEventListener("click", pokeDex.firstPage);
        document.getElementById("lastPage").addEventListener("click", pokeDex.lastPage);
    };

    // Rendering :)
    pokeDex.render = {};

    // filteredList: array from pokemonList
    pokeDex.render.init = function (filteredList) {
        pokeDex.currentPokemonList = filteredList || Object.keys(pokeDex.pokemonList).map(key => pokeDex.pokemonList[key]);
        pokeDex.render.pageSize = pokeDex.default.pageSize;
        pokeDex.render.currentPage = 0;
        pokeDex.render.drawPage();
    };

    pokeDex.render.nextPage = function () {
        var nextPage = pokeDex.render.currentPage + 1;
        if (pokeDex.currentPokemonList.length - nextPage * pokeDex.render.pageSize < 0) return;
        pokeDex.render.currentPage = nextPage;
        pokeDex.render.drawPage();
    };

    pokeDex.render.prevPage = function () {
        var nextPage = pokeDex.render.currentPage -1;
        if (nextPage < 0) return;
        pokeDex.render.currentPage = nextPage;
        pokeDex.render.drawPage();
    };

    pokeDex.render.firstPage = function () {
        pokeDex.render.currentPage = 0;
        pokeDex.render.drawPage();
    };

    pokeDex.render.lastPage = function () {
        pokeDex.render.currentPage = Math.floor(pokeDex.currentPokemonList.length/pokeDex.render.pageSize);
        pokeDex.render.drawPage();
    };

    pokeDex.render.drawPage = function () {
        var container = document.getElementById("pokemonList");
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        for (var i = 0; i < pokeDex.render.pageSize; i++) {
            var index = pokeDex.render.pageSize * pokeDex.render.currentPage + i;
            if (index < pokeDex.currentPokemonList.length) pokeDex.render.drawPokemon(pokeDex.currentPokemonList[index], container);
        }
    };

    pokeDex.render.drawPokemon = function (pokemon, container) {
        // This should be rewriten, but im lazy as fuck
        //console.log(pokemon, container);
        var childElement = appendCh(
            createEl("div", { className: "pokemon-card pure-u-md-1-2", pokemonId: pokemon.id }),
            appendCh(
                createEl("div", { className: "poke-container" }),
                appendCh(
                    createEl("div", { className: "content-subhead" }),
                    document.createTextNode(pokemon.name)
                ),
                appendCh(
                    createEl("div", { className: "pure-g" }),
                    getpokeinfo(pokemon.types),
                    getpokethumb(pokemon.id)
                )
            )
        );
        appendCh(container, childElement);

        childElement.addEventListener("click", handlePokemonClick);

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
            if (options.pokemonId) el.setAttribute("data-pokemon-id", options.pokemonId);
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