import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getPokeById } from "../../actions/Actions";
import NavBar from "../Navbar/Navbar";
import styles from "./Details.module.css";

export default function Details() {
  const pokemon = useSelector((state) => state.pokedetail);
  const params = useParams();
  const dispatch = useDispatch();

  
  const types = (data)=>{
    try {
      if(data && data.types){
        return data.types.map((e, i)=> {return <div className={styles.types} key={i}><h2>{e.toUpperCase()}</h2></div>});
      
    } }catch (error) {
        console.error(error)   
    }
  }
  

 

  useEffect(() => {
    dispatch(getPokeById(params.id));
  }, []);

 

  // var pokemonmap = pokemon.types.map((e)=>e)
  // console.log("POKE MAP:",pokemonmap);

  return (
    <div>
      <NavBar />
      <div className={styles.title}>
        <h1>{pokemon.name}</h1>
        <h2>TYPES:</h2>
        
        <div className={styles.container}>
          {types(pokemon)}
          
          </div>
         
      </div>
      <div className={styles.container}>
        <div className={styles.statistics}>
          <p>id: {pokemon.id}</p>
          <h4>Statistics</h4>
          <p>life: {pokemon.health}</p>
          <p>attack: {pokemon.attack}</p>
          <p>defense: {pokemon.defense}</p>
          <p>speed: {pokemon.speed}</p>
          <p>Height:{pokemon.heigth}</p>
          <p>Weight: {pokemon.weight}</p>
        </div>
        <div className={styles.img}>
          <img className={styles.pic} width="250" src={pokemon.img} alt="" />
        </div>
      </div>
    </div>
  );
}
