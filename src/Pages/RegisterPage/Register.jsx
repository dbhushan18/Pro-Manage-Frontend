import React from 'react'
import styles from "../RegisterPage/Register.module.css"
import RegisterComponent from '../../Components/Register/RegisterComponent'
import image from "../../assets/registerIMG.png"
import Back from "../../assets/Back.png"

function Register() {
    return (
        <div className={styles.container}>
            <div className={styles["left-container"]}>
                <div className={styles.images}>
                    <img src={Back} alt="" id={styles.back} />
                    <img src={image} alt="image" id={styles["bg-image"]} />
                </div>
                <div className={styles.text}>
                    <h3 className={styles.text1}>Welcome aboard my friend </h3>
                    <p className={styles.text2}>just a couple of clicks and we start</p>
                </div>
            </div>
            <div className={styles["right-container"]}>
                <RegisterComponent />
            </div>
        </div>
    )
}

export default Register