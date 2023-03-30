const { Router } = require("express");
//const morgan = require("morgan");
//const axios = require("axios");
const {
  getAllPokemons, 
  getPokemonById,
  getPokemonByName,
  getPokeTypes,
  createPokemons,
  deletePokemon,

} = require("../controllers/controllers");

const { Pokemon, Type } = require("../db");

const router = Router();


router.get("/", getAllPokemons)
router.post("/", createPokemons)

router.get("/:id", getPokemonById)

//router.get("/?name", getPokemonByName)
router.delete("/", deletePokemon)



module.exports = router;









  //GET DE PATO
//   let pokemonPromiseApi = await axios("https://pokeapi.co/api/v2/pokemon?limit=40",
//   { headers: { "Accept-Encoding": "gzip,deflate,compress" } }
// );

//   let pokemonPromiseDb = Pokemon.findAll({
//     include: Type,
//   });

//   Promise.all([pokemonPromiseApi, pokemonPromiseDb])
//   .then(async (respuesta) => {
//     let i = 0;
//     const [pokeApi, pokeDb] = respuesta;
    
//     dbApi = [...pokeApi.data.results];

//     let itUrl = await Promise.all(
//       dbApi?.map((el) => {return el.url ? axios(el.url, { headers: { "Accept-Encoding": "gzip,deflate,compress" }, }) : undefined;
//       })
//     );

//     itUrl = itUrl.map((res) => res.data);
//     //itUrl = itUrl.filter((poke) => poke.id !== undefined);

//     itUrl = itUrl.map((r) => {
//       //console.log(r);
//       return {
//         id: r.id,
//         name: r.name,
//         hp: r.stats[0].base_stat,
//         attack: r.stats[1].base_stat,
//         defense: r.stats[2].base_stat,
//         specialAttack: r.stats[3].base_stat,
//         specialDefense: r.stats[4].base_stat,
//         speed: r.stats[5].base_stat,
//         height: r.height,
//         weight: r.weight,
//         img: r.sprites.other["official-artwork"]["front_default"],
//         type: r.types.map((t) => t.type.name),
//       };
//     });
//     let allPokemones = [...itUrl, ...pokeDb];
//    console.log("ITURL ES: ", itUrl);
//    console.log("POKE API: ", pokeApi.data.results);
//     res.send(allPokemones);
//   });
// });

//router.get("/", (req, res, next) => {
//   return Pokemon.findAll({
//     include: Type,
//   })
//     .then((pokemon) => {
//       res.send(pokemon); // pokemon es la tabla de la base de datos "pokemon" en psql
//     })
//     .catch((error) => {
//       next(error);
//     });
// });

// router.post("/", async (req, res, next) => {
//   try {
//     const { name } = req.body;
//     const newPokemon = await Pokemon.create({
//       name,
//     });
//     res.status(201).send(newPokemon);
//   } catch (error) {
//     next(error);
//   }
// });

// //creo una ruta para relacionar los pokemones con los types

// router.post("/:pokemonId/type/:typeId", async (req, res, next) => {
//   try {
//     const { pokemonId, typeId } = req.params;
//     const pokemon = await Pokemon.findByPk(pokemonId);
//     await pokemon.addType(typeId);
//     res.send(200);
//   } catch (error) {
//     next(error);
//   }
// });

// router.put("/", (req, res, next) => {
//   res.send("soy put /pokemonroute");
// });

// router.delete("/", (req, res, next) => {
//   res.send("soy delete /pokemonroute");
// });


