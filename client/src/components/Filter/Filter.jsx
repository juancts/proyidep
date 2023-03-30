import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addTypes, filterPokemones } from "../../actions/Actions";
import Cards from "../Cards/Cards";
import styles from "./Filter.module.css";


export default function Filter() {
  //Seteo los hooks de useState
  const [filter, setFilter] = useState("");
  const  [looking, setLooking] = useState("");
  const typesApi = useSelector((state) => state.types);
  const dispatch = useDispatch();
  
  

  function onSubmit(e) {
    e.preventDefault();
    dispatch(filterPokemones(filter));
    setFilter("");
    
  }

  function onSelectChange(e) {
    setFilter(e.target.value);
    setLooking(e.target.value);
  }

  useEffect(() => {
  dispatch(addTypes(typesApi));
   }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.ord}>
        <h4>Filter By Type</h4>
        <form className={styles.form} onSubmit={onSubmit}>
          <select value = {filter} name="select" onChange={onSelectChange}>
            <option value="" selected>Select</option>
            {typesApi && typesApi.map((e,i) => <option key={i} name = "type" value={e}>{e}</option>)}
          </select>
          <p>{looking} {looking ? "Pokemons" : ""}</p>
          <button className={styles.btn} type="submit" value="Filter">
            Filter
          </button>
        </form>
      </div>
    </div>
  );
}
