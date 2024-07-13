// DOM element references
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonCard = document.getElementById("pokemon-card");
const output = document.getElementById("pokemon-info");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonImage = document.getElementById("sprite");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const table =document.getElementById("stats-table");
const hp = document.getElementById("pokemon-hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

//Type name and colors mapping
const typeNameAndColors = {
  bug: "#94BC4A",
  dark: "#736C75",
  dragon: "#6A7BAF",
  electric: "#E59506",
  fairy: "#E397D1",
  fighting: "#E391D1", 
  fire: "#EA7A3C", 
  flying: "#7DA6DE", 
  ghost: "#846AB6", 
  grass: "#71C558", 
  ground: "#CC9F4F", 
  ice: "#70CBD4", 
  normal: "#AAB09F", 
  poison: "#B468B7", 
  psychic: "#E5609B", 
  rock: "#B2A061", 
  steel: "#89A1B0",
  water: "#539AE2"
};

// Fetch  and display Pokemon data
const pokemonSearch= async()=> {
  try {
    const nameOrId= searchInput.value.toLowerCase();

    //Update UI with Pokemon details
    const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${nameOrId}`);
    const data = await response.json();
    const image = data.sprites.front_default;
    pokemonImage.src = image;
    pokemonImage.style.display = "inline";
    const feet = Math.floor((data.height * 3.93700787)/12);
    const inches = Math.floor((data.height * 3.93700787)%12);

    pokemonName.textContent = `${data.name.toUpperCase()}`;
    pokemonId.textContent = `NO. ${data.id}`;
    weight.textContent =`WT: ${((data.weight * 0.22046226).toFixed(1))} lbs`;
    height.textContent = `HT: ${feet}' ${inches}"`;
    hp.textContent = `${data.stats[0].base_stat}`;
    attack.textContent = `${data.stats[1].base_stat}`;
    defense.textContent = `${data.stats[2].base_stat}`;
    specialAttack.textContent = `${data.stats[3].base_stat}`;
    specialDefense.textContent = `${data.stats[4].base_stat}`;
    speed.textContent = ` ${data.stats[5].base_stat}`;

    //Update types with background colors
    types.innerHTML = data.types.map(obj=> {
      const typeName = obj.type.name;
      const color = typeNameAndColors[typeName];
      return `<span class="type" style="background-color: ${color};">${typeName}</span>`}).join(" ");

  //Handle errors
} catch(error){
    alert("Pokémon not found");
    console.log("Pokémon not found");
  }  
};

//Reset Pokemon details and image
const reset = () => {
  pokemonName.textContent = "";
  pokemonId.textContent = "";
  weight.textContent ="";
  height.textContent = "";
  hp.textContent ="";
  attack.textContent = "";
  defense.textContent = "";
  specialAttack.textContent = "";
  specialDefense.textContent ="";
  speed.textContent = "";
  types.textContent = "";
};

//Display Pokemon details with animations
const displayInfo = () => {
  pokemonCard.animate([
    {opacity: 1, transform: "translateX(0)"},
     {opacity: 0, transform:"translateX(-100%)"}
  ],{
    duration: 150,
     fill: "forwards"
    });

    setTimeout(() => {
      pokemonCard.style.display = "none";

      output.animate([
      {opacity: 0, transform:"translateX(100%)"},
       {opacity: 1, transform:"translateX(0)"}
      ],{
          duration: 150,
          fill: "forwards"
         });
         output.style.display = "block";
         table.style.display ="block";
      }, 50);

    }

// Event listener for button
searchButton.addEventListener("click", event => {
  event.preventDefault();
  reset();
  pokemonSearch();
  displayInfo();
 
  });
