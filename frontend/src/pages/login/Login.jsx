import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import styles from "./login.module.scss";
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const isFormValid = () => {
    return email !== '' && password !== '';
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', 
        { email, password }, 
        { withCredentials: true }
      );

      login(response.data.access_token);

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.newContainer}>
        <div className={styles.top}>
          <h1>Přihlášení</h1>
        </div>
        <div className={styles.bottom}>
          <div className={styles.right}>
            <form onSubmit={handleLogin}>
              <div className={styles.formInput}>
                <label>Email</label>
                <input
                  type="email"
                  placeholder="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={styles.formInput}>
                <label>Heslo</label>
                <input
                  type="password"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <div className={styles.error}>{error}</div>}
              <button disabled={!isFormValid()} type="submit">
                Login
              </button>
              <div>
                <span>Nemáš účet? </span>
                <a href="/register">Registruj se zde.</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;