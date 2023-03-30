import { AZ, ZA, ATTACKASC, ATTACKDSC } from "./types";
import { getAllPoke, sortPokemones } from "../../actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Order.module.css";
import { useEffect, useState } from "react";

export default function Order() {
  const dispatch = useDispatch();
  const [opc, setOpc] = useState('')
  const orderchanged = useSelector((state) => state.orderchanged);
  

  function onSelectChange(e) {
    e.preventDefault();
    setOpc(e.target.value);
    if(e.target.value === ""){
      setOpc("")
    }else{
      console.log("soy opc:", opc);
      console.log("soy etarget:", e.target.value);
      dispatch(sortPokemones(e.target.value));
    }
    //setOpc("");
  }



  return (
    <div className={styles.container}>
      <div className={styles.ord}>
        <h4>Order by name</h4>

        <select value={opc} name="name" onChange={onSelectChange}>
          <option value="">orden alf</option>
          <option value={AZ}>A-Z</option>
          <option value={ZA}>Z-A</option>
        </select>
      </div>
      <div className={styles.ord}>
        <h4>Order by attack</h4>

        <select value={opc} name="attack" onChange={onSelectChange}>
          <option value="">order atk</option>
          <option value={ATTACKASC}>Attack asc</option>
          <option value={ATTACKDSC}>Attack dsc</option>
        </select>
        
      </div>
    </div>
  );
}
