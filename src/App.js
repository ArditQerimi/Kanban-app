import Login from "./components/Login";
import Home from "./components/Home";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
const qs = require("qs");
let axios = require("axios");

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  let data = qs.stringify({
    username: email,
    password: password,
    grant_type: "password",
    scope: "",
    client_id: "1",
    client_secret: "akDXnrIjbAEEMB6hWi7VE7JQwikYBPrE4lyYetnf",
  });
  let config = {
    method: "post",
    url: "http://homework.tachyonstudio.com/oauth/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
    }
  }, []);

  const login = () => {
    axios(config)
      .then(function (response) {
        localStorage.setItem(
          "token",
          JSON.stringify(response.data.access_token)
        );
        navigate("/homepage");
        setError("");
      })
      .catch(function (error) {
        setError(error.message);
      });
  };

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <Login
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              data={data}
              config={config}
              login={login}
              error={error}
              setError={setError}
            />
          }
        />

        <Route path="/homepage" element={<Home email={email} />} />
      </Routes>
    </>
  );
}

export default App;
