import React from 'react'
import Analytics from '../../Components/Analytics/Analytics'
import Sidebar from '../../Components/Home/Sidebar'
import styles from "../AnalyticsPage/AnalyticsPage.module.css"

function AnalyticsPage() {
  return (
    <div className={styles.analytics_container}>
        <div className={styles.sidebar}><Sidebar/></div>
        <div className={styles.analytics}><Analytics /></div>
    </div>
)
}

export default AnalyticsPage