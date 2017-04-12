var btn = document.getElementById("testbtn");
var detailsView = document.getElementById("pokemon-details");
var detailsBackground = document.getElementById("pokemon-details-background");
btn.addEventListener("click", handlePokemonClick);
detailsBackground.addEventListener("click", handlePokemonClick);


function handlePokemonClick(event) {
    changeDetailsVisibility();
}

function changeDetailsVisibility(){
    if (detailsView.style.top === "150%") {
        detailsView.style.top = "50%";
        detailsBackground.classList.add("fadein");

    } else {
        detailsView.style.top = "150%";
        detailsBackground.classList.remove("fadein");
    }
}