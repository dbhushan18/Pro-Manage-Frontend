import React, { useState } from 'react';
import styles from "../Register/RegisterComponent.module.css";
import eye from "../../assets/showPass.png";
import { useNavigate } from 'react-router-dom';
import { RegisterUser } from '../../apis/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterComponent() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" }); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        // Validate required fields
        for (const key in data) {
            if (!data[key].trim()) {
                newErrors[key] = "Field is required";
            }
        }

        // Validate email format if provided
        if (data.email.trim() && !/^\S+@\S+\.\S+$/.test(data.email)) {
            newErrors.email = "Invalid email format";
        }

        // Validate password match
        if (data.password !== data.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        // Update errors state
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const response = await RegisterUser({ ...data });
            if (response) {
                toast.success("User Registered successfully!");
                localStorage.setItem("token", response.token);
                localStorage.setItem("owner", response.id)
                localStorage.setItem("userName", response.name);
                navigate('/board')
            }
        }
    };

    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
    };

    const toggleConfirmPasswordVisiblity = () => {
        setConfirmPasswordShown(!confirmPasswordShown);
    };

    return (
        <>
            <div className={styles["main-container"]}>
                <h2 id={styles["register-text"]}>Register</h2>
                <form action="">
                    <input type="text"
                        placeholder='Name'
                        id={styles.profile}
                        className={styles.fields}
                        name='name'
                        onChange={handleChange}
                        value={data.name}
                    />
                    {errors.name ? <p className={styles.error}>{errors.name}</p> :
                        (<div className={styles["no-error"]}></div>)}

                    <input type="text"
                        placeholder='Email'
                        id={styles.email}
                        className={styles.fields}
                        name='email'
                        onChange={handleChange}
                        value={data.email}
                    />
                    {errors.email ? <p className={styles.error}>{errors.email}</p> :
                        (<div className={styles["no-error"]}></div>)}

                    <input type={passwordShown ? "text" : "password"}
                        placeholder='Password'
                        className={`${styles.password} ${styles.fields}`}
                        name='password'
                        onChange={handleChange}
                        value={data.password}
                    />
                    <span className={styles.eye}>
                        <img id={styles.eye_img} src={eye} alt="show" onClick={togglePasswordVisiblity} />
                    </span>
                    {errors.password ? <p className={styles.error}>{errors.password}</p> :
                        (<div className={styles["no-error"]}></div>)}


                    <input type={confirmPasswordShown ? "text" : "password"}
                        placeholder='Confirm Password'
                        className={`${styles.password} ${styles.fields}`}
                        name='confirmPassword'
                        onChange={handleChange}
                        value={data.confirmPassword}
                    />
                    <span className={styles.eye}>
                        <img src={eye} alt="show" onClick={toggleConfirmPasswordVisiblity} />
                    </span>
                    {errors.confirmPassword ? <p className={styles.error}>{errors.confirmPassword}</p> :
                        (<div className={styles["no-error"]}></div>)}


                </form>
                <button id={styles.register} onClick={(e) => handleSubmit(e)}>Register</button>
                <p id={styles.already}>Have an account ?</p>
                <button id={styles.login} onClick={() => navigate("/login")}>Log in</button>
            </div>
        </>
    )
}

export default RegisterComponent
