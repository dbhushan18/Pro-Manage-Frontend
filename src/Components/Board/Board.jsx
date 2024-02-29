import React, { useState } from 'react'
import styles from "../Board/Board.module.css"
import collapseAll from "../../assets/Board/collapseAll.png"
import Card from '../Card/Card'
import add from "../../assets/Board/add.png"
import FormModal from '../Modals/FormModal'
import { v4 as uuidv4 } from 'uuid';

function Board({ board_title, filter }) {
  const [modalvalue, setModalValue] = useState(false);
  const [collapsed, setCollapsed] = useState(false);


  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  //to open new task create form
  const ModalForm = () => {
    setModalValue(!modalvalue)
  };


  return (
    <div className={styles["board-container"]}>
      <div className={styles.board_top}>
        <p className={styles.board_top_title}>{board_title}</p>
        {board_title == "To-do" ? <img src={add} id={styles.add} onClick={ModalForm} /> : <></>}
        <img src={collapseAll} alt="collapseAll" id={styles.collapseAll} onClick={toggleCollapse} />
      </div>
      {modalvalue && (<FormModal modalval={ModalForm} />)}
      <div className={styles.board_cards}>
        <Card board_title={board_title} key={uuidv4()} collapsed={collapsed} filter={filter} />
      </div>

    </div>
  )
}

export default Board