import classes from "./Login.module.css";

const Login = ({ password, setPassword, email, setEmail, login, error }) => {
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className={classes.loginpageContainer}>
      <div className={classes.loginContainer}>
        <div className={classes.login}>
          <div className={classes.header}>Log in</div>

          <input
            value={email}
            type="text"
            placeholder="Email "
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
      <div className="text-white">
        <img
          src={require("../imgs/trello.jpg")}
          className={classes.trelloImg}
        />
      </div>
    </div>
  );
};

export default Login;
