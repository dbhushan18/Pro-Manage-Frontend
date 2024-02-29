import React from 'react'
import styles from "../Login/LoginComponent.module.css"
import eye from "../../assets/showPass.png"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginUser } from '../../apis/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginComponent() {
    const navigate = useNavigate();
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const error = "Field is required";
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setEmailError(false); 
        setPasswordError(false); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError(false)
        setPasswordError(false)

        if (!data.email.trim()) {
            setEmailError(true);
        }

        if (!data.password.trim()) {
            setPasswordError(true);
        }

        const response = await LoginUser({ ...data });
            if (response) {
                toast.success("User logged in successfully!");
                localStorage.setItem("token", response.token);
                localStorage.setItem("owner", response.id)
                localStorage.setItem("userName", response.name);
                navigate('/board')
            }
            else {
                toast.error("User not found. Please check your email and password and try again.");
            }
    }

    return (
        <>
            <div className={styles["main-container"]}>
                <h2 id={styles["login-text"]}>Login</h2>
                <form action="">
                    <input type="text"
                        placeholder='Email'
                        id={styles.email}
                        className={styles.fields}
                        name='email'
                        onChange={handleChange}
                    />
                    {emailError ? (<p className={styles.error}>{error}</p>) :
                        (<div className={styles["no-error"]}></div>)}

                    <input type={passwordShown ? "text" : "password"}
                        placeholder='Password'
                        className={`${styles.password} ${styles.fields}`}
                        name='password'
                        onChange={handleChange}
                    />
                    <span className={styles.eye}>
                        <img src={eye} alt="show" onClick={togglePasswordVisiblity} />
                    </span>
                    {passwordError ? (<p className={styles.error}>{error}</p>) :
                        (<div className={styles["no-error"]}></div>)}
                </form>
                <button id={styles.login} onClick={(e) => handleSubmit(e)}>Log in</button>
                <p id={styles["no-account"]}>Have no account yet ?</p>
                <button id={styles.register} onClick={()=>navigate("/")}>Register</button>
            </div>
        </>
    )
}

export default LoginComponent