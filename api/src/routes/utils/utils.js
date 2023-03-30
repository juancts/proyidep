const axios = require("axios");
const { Pokemon, Type } = require("../db");



const catchEmAll = async () => {
  let dbApi = [];
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=150",
      { headers: { "Accept-Encoding": "gzip,deflate,compress" } }
    );

    dbApi = [...response.data.results];

    let pokemonApi = await Promise.all(
      dbApi?.map((el) => {return el.url ? axios.get(el.url, { headers: { "Accept-Encoding": "gzip,deflate,compress" }, }) : undefined;
      })
    );
    pokemonApi = pokemonApi.map((res) => res.data);
    pokemonApi = pokemonApi.filter((poke) => poke.id !== undefined);
    pokemonApi = pokemonApi.map((r) => {
      return {
        id: r.id,
        name: r.name,
        hp: r.stats[0].base_stat,
        attack: r.stats[1].base_stat,
        defense: r.stats[2].base_stat,
        specialAttack: r.stats[3].base_stat,
        specialDefense: r.stats[4].base_stat,
        speed: r.stats[5].base_stat,
        height: r.height,
        weight: r.weight,
        img: r.sprites.other["official-artwork"]["front_default"],
        type: r.types.map((t) => t.type.name),
      };
    });
    const db = await Pokemon.findAll({
      include: {
        model: Type,
        as: "types",
      },
    });
    if (db.length) {
      dbApi = [...pokemonApi, ...db];
    } else {
      dbApi = [...pokemonApi];
    }
    return dbApi;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { catchEmAll };
