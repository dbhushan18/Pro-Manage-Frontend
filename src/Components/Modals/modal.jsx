import React, { useEffect, useState } from 'react'
import styles from "../Modals/Modal.module.css"

function modal(props) {
    const { title_text, btn1_text, btn2_text, modalval, onConfirm } = props;
    if (modalval) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
       
    }
    return (
        <>
            {modalval && (
                <div className={styles.modal}>
                    <div className={styles.overlay}></div>
                    <div className={styles.modal_content}>
                        <p id={styles.confirmation}>{title_text}</p>
                        <button className={styles.confirm_btn} onClick={onConfirm}>{btn1_text}</button>
                        <button className={styles.cancel_btn} onClick={modalval}>{btn2_text}</button>
                    </div>
                </div>
            ) 
            }
        </>
    )
}

export default modal