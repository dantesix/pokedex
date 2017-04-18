/*var filters = document.getElementById("filters");

var checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.name = "name";
checkbox.value = "value";
checkbox.id = "id";

var label = document.createElement("label");
//label.innerHtml = pokeDex.typeList[0].name;
label.htmlFor = "id";

// for (var i = 0; i < pokeDex.typeList.length; i++) {
//     label.appendChild(document.createTextNode(

//       )
//     );
// }

var div = document.createElement("div");
div.className = "pure-u-1-2";

filters.appendChild(div);
div.appendChild(checkbox);
div.appendChild(label);*/

(function (pd) {
    pokeDex.filtering = {};

    pokeDex.filtering.initFilters = function () {
        var filters = document.getElementById("filters");
        var typesDiv = document.createElement("div");
        typesDiv.className = "pure-u-1-2";

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = pokeDex.typeList[0].name;
        checkbox.id = "type" + pokeDex.typeList[0].name;

        var label = document.createElement("label");
        label.htmlFor = "type" + pokeDex.typeList[0].name;

        typesDiv.appendChild(checkbox);
        typesDiv.appendChild(label);

        filters.appendChild(typesDiv);
        label.innerHtml = pokeDex.typeList[0].name;
    };

}(window.pokeDex = window.pokeDex || {}));
