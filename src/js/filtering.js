var typeList = [
    "grass",
    "fire",
    "stb..."
];

var select = document.getElementById("searchType");
for(index in typeList) {
    select.options[select.options.length] = new Option(typeList[index], index);
}