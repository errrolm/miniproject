const URL = "https://pokeapi.co/api/v2";

export async function getPokemonDetails(name: string) {
  const response = await fetch(`${URL}/pokemon/${name.toLowerCase().trim()}`);

  if (!response.ok) {
    throw new Error("Pokemon not found");
  }

  const data = await response.json();

  const speciesResponse = await fetch(data.species.url);
  const species = await speciesResponse.json();

  let types = "";
  let abilities = "";
  let description = "";

  for (let i = 0; i < data.types.length; i++) {
    types = types + data.types[i].type.name + " ";
  }

  for (let i = 0; i < data.abilities.length; i++) {
    abilities = abilities + data.abilities[i].ability.name + " ";
  }

  for (let i = 0; i < species.flavor_text_entries.length; i++) {
    if (species.flavor_text_entries[i].language.name === "en") {
      description = species.flavor_text_entries[i].flavor_text;
      break;
    }
  }

  description = description.replaceAll("\n", " ");
  description = description.replaceAll("\f", " ");

  return {
    id: data.id,
    name: data.name,
    image: data.sprites.other["official-artwork"].front_default,
    height: data.height / 10,
    weight: data.weight / 10,
    types: types,
    abilities: abilities,
    description: description,
  };
}

export async function getPokemonList() {
  const pokemon = [];

  for (let i = 1; i <= 20; i++) {
    const data = await getPokemonDetails(i.toString());
    pokemon.push(data);
  }

  return pokemon;
}