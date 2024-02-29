import React, { useState } from 'react'
import Sidebar from '../../Components/Home/Sidebar'
import Board from '../../Components/Board/Board'
import styles from "../HomePage/Home.module.css"
import { format } from 'date-fns';

function Home() {
  const [filter, setFilter] = useState('thisWeek');
  const dateString = format(
    new Date(),
    "do  MMM, yyyy"
  );
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const username = localStorage.getItem("userName")

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}><Sidebar /></div>
      <div className={styles.board_container}>
        <div className={styles.home_header}>
          <div className={styles.navbar}>
            <h1 id={styles.welcome_text}>Welcome! {username}</h1>
            <p id={styles.date}>{dateString}</p>
          </div>
          <div className={styles.filter_container}>
            <h2 id={styles.board_text}>Board</h2>
            <select id="filterSelect" value={filter} className={styles.filter_options} onChange={(e) => handleFilterChange(e.target.value)}>
              <option value="today">Today</option>
              <option value="thisWeek">This Week</option>
              <option value="thisMonth">This Month</option>
            </select>
          </div>
        </div>
        <div className={styles.board}>
          <Board board_title="Backlog" key="Backlog" filter={filter} />
          <Board board_title="To-do" key="To-do" filter={filter} />
          <Board board_title="In Progress" key="In Progress" filter={filter} />
          <Board board_title="Done" key="Done" filter={filter} />
        </div>

      </div>

    </div>
    

  )
}

export default Home