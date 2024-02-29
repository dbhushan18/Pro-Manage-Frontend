import React, { useState } from 'react'
import styles from "../Home/Sidebar.module.css"
import { SidebarData } from './SidebarData'
import logout from "../../assets/Sidebar/Logout.png"
import Modal from "../Modals/modal.jsx"
import {useNavigate } from 'react-router-dom'

function Sidebar() {
    const [modalvalue, setModalValue] = useState(false);
    const navigate = useNavigate();

    const logoutModal = () => {
        setModalValue(!modalvalue)
    };

    const onConfirmLogout = () => {
        localStorage.clear();
        navigate("/login")
    }

    return (
        <div className={styles.sidebar}>
            <ul className={styles.SidebarList}>
                {SidebarData.map((val, key) => {
                    return (
                        <li
                            id={window.location.pathname == val.link ? styles.active : ''}
                            key={key}
                            onClick={()=>navigate(val.link)}
                            className={styles.row}
                        >
                            <div className={styles.icon}>
                                <img src={val.icon} alt="" />
                            </div>
                            <div className={styles.title}>{val.title}</div>
                        </li>
                    )
                })}
                
                <li className={styles.logout} onClick={logoutModal}>
                    <div id={styles.icon}><img src={logout} alt="" /></div>
                    <div id={styles.logout_text}>Log out</div>
                </li>
            </ul>
            {modalvalue && (
                <Modal title_text="Are you sure you want to Logout?"
                    btn1_text="Yes, Logout"
                    btn2_text="Cancel"
                    modalval={logoutModal}
                    onConfirm={onConfirmLogout}
                />
            )}
        </div>
    )
}

export default Sidebar