const axios = require("axios");
const { Pokemon, Type } = require("../db");

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

//GET ALL POKEMONES
async function getAllPokemons(req, res, next) {
  let allPokemones = [];

  const name = req.query.name;

  if (name) getPokemonByName(req, res, next); //separar las rutas

  try {
    let dataTotal = 40;
    let allPokesApi = [];
    let dataSpecies = [];

    for (let i = 1; i < dataTotal; i++) {
      let pokemonesApi = await axios(
        `https://pokeapi.co/api/v2/pokemon/${i}/`,
        { headers: { "Accept-Encoding": "null" } }
      ).then((res) => res.data);
      allPokesApi.push(pokemonesApi);
    }

    for (let i = 0; i < allPokesApi.length; i++) {
      let pokemonSpecie = await axios(allPokesApi[i].species.url, {
        headers: { "Accept-Encoding": "null" },
      }).then((res) => res.data);
      dataSpecies.push(pokemonSpecie);
    }

    allPokesApi = allPokesApi.map((p, index) => {
      let gender = dataSpecies[index].gender_rate;
      return {
        id: p.id,
        name: p.name,
        img: p.sprites.other["official-artwork"].front_default,
        height: `${p.height / 10} m`,
        weight: `${p.weight / 10} kg`,
        health: p.stats[0].base_stat,
        attack: p.stats[1].base_stat,
        defense: p.stats[2].base_stat,
        speed: p.stats[5].base_stat,
        category: dataSpecies[index].genera[7].genus,
        ability: p.abilities[0].ability.name,
        gender:
          gender === -1
            ? "Genderless"
            : gender === 0
            ? "Male"
            : gender === 8
            ? "Female"
            : "Male or Female",
        types: p.types.map((t) => t.type.name),
        fromDb: false,
      };
    });
    let pokesDb = await Pokemon.findAll({
      include: {
        model: Type,
        through: {
          attributes: [],
        },
      },
    });
    console.log("POKE DB:",pokesDb);
    allPokemones = [...allPokesApi, ...pokesDb];
    res.status(200).send(allPokemones);
  } catch (error) {
    console.error("Error in getAllPokemons:", error.message);
  }
}

//POKEMONES BY ID
async function getPokemonById(req, res, next) {
  try {
    const id = req.params.id;
    console.log(id);
    if (typeof id === "string" && id.length > 7) {
      let pokemon = await Pokemon.findOne({
        where: {
          id,
        },
        include: {
          model: Type,
          through: {
            attributes: [],
          },
        },
      });
      res.send(pokemon);
    } else {
      let pokemon = await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${id}`, {
          headers: { "Accept-Encoding": "null" },
        })
        .then((res) => {
          return {
            id: res.data.id,
            name: res.data.name,
            img: res.data.sprites.other["official-artwork"].front_default,
            height: `${res.data.height / 10} m`,
            weight: `${res.data.weight / 10} kg`,
            health: res.data.stats[0].base_stat,
            attack: res.data.stats[1].base_stat,
            defense: res.data.stats[2].base_stat,
            speed: res.data.stats[5].base_stat,
            ability: res.data.abilities[0].ability.name,
            types: res.data.types.map((t) => t.type.name),
            fromDb: false,
          };
        });
      res.status(200).send(pokemon);
    }
    //console.log(pokemon);
    //res.send(pokemon)
  } catch (error) {
    console.error("Error in getPokemonById:", error.message);
  }
}

//GET POKEMONES BY NAME
async function getPokemonByName(req, res, next) {
  const name = req.query.name;
  let pokemonDb;
  let pokemonApi;
  //try {
  try {
    pokemonDb = await Pokemon.findOne({
      where: {
        name,
      },
      include: {
        model: Type,
        through: {
          attributes: [],
        },
      },
    });

    if (pokemonDb === null) {
      pokemonApi = await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${name}`, {
          headers: { "Accept-Encoding": "null" },
        })
        .then((res) => {
          return {
            id: res.data.id,
            name: res.data.name,
            img: res.data.sprites.other["official-artwork"].front_default,
            height: `${res.data.height / 10} m`,
            weight: `${res.data.weight / 10} kg`,
            health: res.data.stats[0].base_stat,
            attack: res.data.stats[1].base_stat,
            defense: res.data.stats[2].base_stat,
            speed: res.data.stats[5].base_stat,
            ability: res.data.abilities[0].ability.name,
            types: res.data.types.map((t) => t.type.name),
            fromDb: false,
          };
        });
      return res.status(200).send(pokemonApi);
    }

    res.status(200).send(pokemonDb);
  } catch (error) {
    console.error("Pokemon no existe:", error.message);
  }
}

//GET TYPES

async function getPokeTypes(req, res, next) {
  try {
    let poketpedb;
    const pokeTypes = await axios
      .get("https://pokeapi.co/api/v2/type", {
        headers: { "Accept-Encoding": "null" },
      })
      .then((res) => res.data);
    console.log(pokeTypes.results);
    pokeTypes.results.forEach((type) => {
      Type.findOrCreate({
        where: {
          name: type.name,
        },
      });
    });
    poketpedb = await Type.findAll();
    res.status(200).send(poketpedb);
  } catch (error) {
    console.error("Error in getTypesPokemons:", error.message);
  }
}

async function createPokemons(req, res, next) {
  const {
    name,
    height,
    weight,
    health,
    attack,
    defense,
    speed,
    fromDb,
    types,
    obs,
    img,
  } = req.body;
  {
    try {
      const newPokemon = await Pokemon.create({
        name,
        height,
        weight,
        health,
        attack,
        defense,
        speed,
        fromDb,
        obs,
        img,
      });
      await Type.findAll({
        where: {
          name: types,
        },
      }).then((res) => newPokemon.addType(res));
      res.status(200).send(newPokemon);
      return "Your pokemon was successfully created";
    } catch (error) {
      console.error("Error in createPokemon:", error.message);
    }
  }
}

//DELETE POKEMON BY NAME
async function deletePokemon(req, res, next) {
  const name = req.query.name;
  if (name) {
    //console.log(name);
    try {
      if (name) {
        await Pokemon.destroy({
          where: {
            name,
          },
        });
      }
      res.send(`pokemon borrado: ${name}`);
      return "Your pokemon was successfully deleted";
    } catch (error) {
      console.error("Error in deletePokemon:", error.message);
    }
  }
}

module.exports = {
  getAllPokemons,
  getPokemonById,
  getPokemonByName,
  getPokeTypes,
  createPokemons,
  deletePokemon,
};
