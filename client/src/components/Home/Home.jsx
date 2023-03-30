import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addTypes, getAllPoke, getType } from "../../actions/Actions.js";
import Card from "../Card/Card.jsx";
import LoadingPage from "../LoadingPage/LoadingPage.jsx";
import NavBar from "../Navbar/Navbar.jsx";
import styles from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const pokemones = useSelector((state) => state.filteredPokemones);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllPoke());
    dispatch(addTypes(types));
    setTimeout(() => {
      setIsLoading(false);
    }, 8000);
    
  }, []);

 return (
      <div>
        {
          isLoading ? (<div>

            <LoadingPage />
            
            </div>) : (
        <div>    
        <div>
          <NavBar />
        </div>
        <div className={styles.title} align="center">
          <h1>¡WELCOME TO THE POKEMON HOME!</h1>
          <h3>
            click on:{" "}
            <Link to="/allPokes" className={styles.a}>
              {" "}
              "All Pokemons"{" "}
            </Link>
            to start!
          </h3>
          <hr width="400" size="2px" color="black" />
        </div>

        <div className={styles.container}>
          {pokemones &&
            pokemones.slice(20, 24).map((e, i) => (
              <div key={i}>
                <Card
                  key={e.id}
                  name={e.name}
                  type={getType(e.id, pokemones)}
                  img={e.img}
                  id={e.id}
                />
              </div>
            ))}
        </div>
       </div>               
        )}
      </div>
         
      )
    }
   
      

