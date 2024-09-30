import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import styles from "./register.module.scss";

const Register = () => {

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
    setError(null);
  };

  const isFormValid = () => {
    return (
      data.firstName !== '' &&
      data.lastName !== '' &&
      data.email !== '' &&
      data.password !== ''
    );
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/auth/register', data);

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred during registration.");
    }
  };

  return (
    <div className={styles.register}>
      <div className={styles.newContainer}>
        <div className={styles.top}>
          <h1>Registrace</h1>
        </div>
        <div className={styles.bottom}>
          <div className={styles.right}>
            <form onSubmit={handleAdd}>
              <div className={styles.formInput}>
                <label>Jméno</label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Jméno"
                  onChange={handleInput}
                />
              </div>
              <div className={styles.formInput}>
                <label>Přijmení</label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Přijmení"
                  onChange={handleInput}
                />
              </div>
              <div className={styles.formInput}>
                <label>Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  onChange={handleInput}
                />
              </div>
              <div className={styles.formInput}>
                <label>Heslo</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Heslo"
                  onChange={handleInput}
                />
              </div>
              {error && <div className={styles.error}>{error}</div>}
              <button disabled={!isFormValid()} type="submit">
                Vytvořit
              </button>
              <div>
                <span>Už máš účet? </span>
                <a href="/login">Přihlaš se zde.</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;