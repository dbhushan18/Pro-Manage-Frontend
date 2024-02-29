import React, { useState } from 'react'
import styles from "../Settings/Settings.module.css"
import { changePassword } from '../../apis/auth';
import eye from "../../assets/showPass.png";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Settings() {
 let name = localStorage.getItem("userName");
  const [formData, setFormData] = useState({
    name: name,
    oldPassword: '',
    newPassword: '',
    newName:name,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await changePassword(formData);
      if (response){
        toast.success("Password changed successfully!");
        localStorage.setItem("userName", formData.newName)
        name = formData.newName;
      }
      else{
        toast.error("Something went wrong");
      }
    } catch (error) {
        console.log(error)
    }
    setFormData({
      name:name,
      oldPassword:"",
      newPassword:"",
      newName:name,
    })
  };

  const [passwordShown, setPasswordShown] = useState(false);
  const [oldPasswordShown, setOldPasswordShown] = useState(false);
  const toggleOldPasswordVisiblity = () => {
    setOldPasswordShown(!oldPasswordShown);
  };

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className={styles.settings_container}>
      <h2 id={styles.settings_text}>Settings</h2>
      <form action="">
        <div className={styles.inputs}>
          <input type="text"
            placeholder='Name'
            id={styles.profile}
            className={styles.fields}
            name='newName'
            onChange={handleChange}
            value={formData.newName}
          />

          <input type={oldPasswordShown ? "text" : "password"}
            placeholder='Old Password'
            className={`${styles.password} ${styles.fields}`}
            name='oldPassword'
            onChange={handleChange}
            value={formData.oldPassword}
          />
          <span className={styles.eye}>
            <img id={styles.eye_img} src={eye} alt="show" onClick={toggleOldPasswordVisiblity} />
          </span>

          <input type={passwordShown ? "text" : "password"}
            placeholder='New Password'
            className={`${styles.password} ${styles.fields}`}
            name='newPassword'
            onChange={handleChange}
            value={formData.newPassword}
          />
          <span className={styles.eye}>
            <img id={styles.eye_img2} src={eye} alt="show" onClick={togglePasswordVisiblity} />
          </span>
        </div>
      </form>
      <button id={styles.update} onClick={(e) => handleSubmit(e)}>Update</button>
    </div>
  );
}

export default Settings;