const { Router } = require("express");
const { getPokeTypes } = require("../controllers/controllers");
const { Type } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get("/gettypes/", getPokeTypes)

router.get("/", async (req, res, next) => {
  try {
   const type = await Type.findAll()
   res.send(type);
   
 } catch (error) {
  next(error)
 }
});

router.post("/", async (req, res, next) => {
  try {
    const { name } = req.body;
    
    const newType = await Type.create({
        //where:{
          name
        //}
      });
      console.log(newType)
      res.status(201).send(newType);
    
      
  } catch (error) {
    next(error);
  }
});

router.post('/:name', async (req, res, next) =>{
  try {
    const { name } = req.params;
    const newType = await Type.findOrCreate({
      where:{
        name,
      }
    });
    res.status(201).send(newType);
  } catch (error) {
    next(error);
  }
})

router.put("/", (req, res, next) => {
  res.send("put /typeroute");
});

router.delete("/", (req, res, next) => {
  res.send("delete /typeroute");
});

module.exports = router;
