const { Router } = require("express");
const pokemonRoute = require("./pokemonRoute");
const typeRoute = require("./typeRoute");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
router.use("/pokemons", pokemonRoute)
router.use("/pokemons", pokemonRoute);
router.use("/pokemons/:id", pokemonRoute);
//router.use("/pokemones?name=", pokemonRoute);
router.use("/types", typeRoute);
router.use("/delete/:name", pokemonRoute);

module.exports = router;
