const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
 const pokemonImage = document.getElementById("sprite");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const output = document.getElementById("output");

const pokemonSearch= async()=> {
  
  try {
    const nameOrId= searchInput.value.toLowerCase();
    const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${nameOrId}`);

    const data = await response.json();
    const image = data.sprites.front_default;
    //adding css and html to pokemonImage element
    pokemonImage.src = image;
    pokemonImage.style.display = "inline";
      //adding corresponding information to textContent      
      pokemonName.textContent = `${data.name.toUpperCase()}`;
    pokemonId.textContent = `#${data.id}`;
    weight.textContent =`Weight: ${data.weight}`;
    height.textContent = `Height: ${data.height}`;
    hp.textContent = `${data.stats[0].base_stat}`;
    attack.textContent = `${data.stats[1].base_stat}`;
    defense.textContent = `${data.stats[2].base_stat}`;
    specialAttack.textContent = `${data.stats[3].base_stat}`;
    specialDefense.textContent = `${data.stats[4].base_stat}`;
    speed.textContent = ` ${data.stats[5].base_stat}`;
    types.innerHTML = data.types.map(obj=>`<span class="type ${obj.type.name}">${obj.type.name}</span>`).join(" ");
  }
  catch(error){
    alert("Pokémon not found");
    console.log("Pokémon not found");
  }  
};

//reset
const reset = () => {
  if(output) output.remove;
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

//when button is clicked the pokemonSearch function runs as well as cancelling default action
searchButton.addEventListener("click", event => {
  event.preventDefault();
  pokemonSearch();
  });
