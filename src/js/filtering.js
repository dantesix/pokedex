var filters = document.getElementById("filters");

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
div.appendChild(label);