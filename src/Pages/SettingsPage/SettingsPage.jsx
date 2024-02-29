import React from 'react'
import Settings from '../../Components/Settings/Settings'
import Sidebar from '../../Components/Home/Sidebar'
import styles from "../SettingsPage/SettingsPage.module.css"

function SettingsPage() {
    return (
        <div className={styles.settings_container}>
            <div className={styles.sidebar}><Sidebar/></div>
            <div className={styles.settings}><Settings /></div>
        </div>
    )
}

export default SettingsPage