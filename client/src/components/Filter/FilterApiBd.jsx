import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterPokemones } from "../../actions/Actions";
import styles from "./Filter.module.css";

export default function FilterApiBd() {
  const [filter, setFilter] = useState("");
  const [looking, setLooking] = useState("");
  const dispatch = useDispatch();

  function onSelectChange(e) {
    setFilter(e.target.value);
    setLooking(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    dispatch(filterPokemones(filter));
    setFilter("");
  }

  return (
    <div className={styles.container}>
      <div className={styles.ord}>
        <h4>DB or Api?</h4>
        <form className={styles.form} onSubmit={onSubmit}>
          <select value = {filter} name="select" onChange={onSelectChange}>
            <option value="" selected>
              Select
            </option>
            <option value="database">Database</option>
            <option value="api">Api</option>
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
