import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllPoke } from "../../actions/Actions";
import styles from "./LandingPage.module.css"

//import styles from "./LandingPage.module.css";

export default function LandingPage() {

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getAllPoke());
  }, [dispatch]);


  return (
    <div className={styles.container}>
      <div>
        <h1>
          Pokemon <span>App</span>
        </h1>
      </div>
      <div>
        <p>
          Go <Link to="/Home" className={styles.a}>Home</Link>. Welcome to the <b>Pokemon App</b>.
        </p>
      </div>
    </div>
  );
}
