import React, { useState } from 'react'
import styles from "./Pagination.module.css"

export default function Pagination(props) {
 const [input, setInput] = useState(1);


 const nextPage = () => {
    setInput(input + 1);
    props.setPage(props.page + 1);
 }

 const previousPage = () => {
    setInput(input - 1);
    props.setPage(props.page - 1);
 }

  return (
    <div className={styles.container}>
    <button disabled ={props.page === 1 } onClick={previousPage}>previous</button>
    <div className={styles.ent}>
    <p>{input} de {Math.ceil(props.maxPages)}</p>
    </div>
    
    <button disabled = {props.page === Math.ceil(props.maxPages)}onClick={nextPage}>next</button>
    </div>
  )
}
