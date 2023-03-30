import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar.jsx";
import styles from "./NavBar.module.css";

export default function NavBar(props) {
  return (
    <div className={styles.container}>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/Home">Poke Home</Link>
            </li>
            <li>
              <Link to="/allpokes">All Pokemon</Link>
            </li>
           <li>
              <Link to="/addpokes">Add Poke</Link>
            </li>
            {/* <li>
              <Link to="/filter">Filter Pokemon </Link>
            </li> */}
          </ul>
        </nav>
      </div>
      <div>
        <SearchBar setPage = {props.setPage} />
      </div>
    </div>
  );
}
