import classes from "./Login.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
const axios = require("axios");

const Login = ({ password, setPassword, email, setEmail, login, error }) => {
  console.log(error);
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className={classes.loginContainer}>
      <div className={classes.login}>
        <div className={classes.header}>Log in</div>
        {/* <form className={classes.loginform}> */}
        <input
          value={email}
          type="text"
          placeholder="Email or Username"
          onChange={handleEmail}
          className={classes.input}
        />

        <input
          value={password}
          id="password"
          type="password"
          placeholder="Password"
          onChange={handlePassword}
          className={classes.input}
        />

        <button onClick={login} type="submit" className={classes.loginbtn}>
          Log in
        </button>

        {error ? (
          <div className={classes.error}>Enter a valid email or password</div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Login;
