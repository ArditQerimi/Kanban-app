import axios from "axios";
import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import Navbar from "./Navbar";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Button from "react-bootstrap/Button";
import classes from "./Home.module.css";
import { useLocation } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";

const Home = () => {
  const [basicActive, setBasicActive] = useState("tab1");

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };

  const [cards, setCards] = useState([]);

  const location = useLocation();
  console.log(location);

  var axios = require("axios");

  const user = JSON.parse(localStorage.getItem("user"));
  const id = user[0].id;

  var config = {
    method: "get",
    url: `https://my-json-server.typicode.com/ArditQerimi/Kanban-app/tasks?userId=${id}`,
    headers: {},
  };

  const data = async () => {
    await axios(config)
      .then(function (response) {
        console.log(response.data);
        setCards(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    data();
  }, []);

  const removeUser = () => {
    localStorage.getItem("user");
  };

  return (
    <div>
      <Navbar />
      {/* <Breadcrumb className={classes.breadcrumb}>
        <Breadcrumb.Item
          href="/login"
          onClick={removeUser}
          classes={classes.breadcrumbitem}
        >
          Login
        </Breadcrumb.Item>
        <Breadcrumb.Item
          active
          href={location.pathname}
          classes={classes.breadcrumbitem}
        >
          Home
        </Breadcrumb.Item>
        <Button variant="success">Success</Button>
      </Breadcrumb> */}

      <>
        <Nav
          variant="pills"
          defaultActiveKey={location.pathname}
          className={classes.navlinks}
        >
          <Nav.Item>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href={location.pathname}>Home</Nav.Link>
          </Nav.Item>
        </Nav>
      </>

      {cards.length > 0 && <Cards cardsArr={cards} setCards={setCards} />}
    </div>
  );
};

export default Home;
