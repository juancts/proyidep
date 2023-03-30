import React from "react";
//import axios from "axios";
import { searchPokemones } from "../../actions/Actions";
import { useDispatch } from "react-redux";
import { useState } from "react";
import styles from "./SearchBar.module.css";
import { useHistory } from "react-router-dom";

export default function SearchBar(props) {
  const [search, setSearch] = useState("");
  let history = useHistory();
  let dispatch = useDispatch();



  async function onSubmit(e) {
    try {
      e.preventDefault();
      dispatch(searchPokemones(search));
      props.setPage(1);
      history.push("/allPokes");
    } catch (error) {
      console.error(error);
    }
  }

  function onInputChange(e) {
    setSearch(e.target.value);
  }

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <input type="text" onChange={onInputChange} value={search} />
        <button type="submit" value="search">
          Search
        </button>
      </form>
    </div>
  );
}
