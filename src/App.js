import Login from "./components/Login";
import Home from "./components/Home";

import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

const qs = require("qs");
let axios = require("axios");

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fetchedData, setFetchedData] = useState();
  // console.log(fetchedData);

  const navigate = useNavigate();

  var axios = require("axios");
  var qs = require("qs");
  var data = qs.stringify({
    email: email,
    password: password,
  });
  var config = {
    method: "get",
    url: `https://my-json-server.typicode.com/ArditQerimi/Kanban-app/users/?email=${email}&passwrod=${password}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  const login = () => {
    axios(config)
      .then(function (response) {
        console.log(response.data);

        setFetchedData(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));

        navigate("/homepage");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <Routes>
        {localStorage.getItem("data") ? (
          <Route path="/" element={<Navigate replace to="/homepage" />} />
        ) : (
          <Route path="/" element={<Navigate replace to="/login" />} />
        )}

        <Route path="/homepage" element={<Home data={fetchedData} />} />

        <Route
          path="/login"
          element={
            <Login
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              login={login}
              error={error}
              setError={setError}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
