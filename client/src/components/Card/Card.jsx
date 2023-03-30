import { Link } from "react-router-dom";
import styles from "./Card.module.css";

export default function Card(props) {
  let types = props.type[0].map((e) => e);

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <button>✔</button>
      </div>
      <Link to={`/details/${props.id}`}>
        <div className={styles.title}>
          <h2>{props.name.toUpperCase()}</h2>
          <h4>Tipos:</h4>
        </div>
        <div className={styles.data}>
          {types.map((e) => (
            <p>{e}</p>
          ))}
        </div>

        <img className={styles.image} src={props.img} alt={props.name} />
      </Link>
    </div>
  );
}


//export { types };
