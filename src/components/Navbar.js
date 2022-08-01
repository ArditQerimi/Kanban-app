import axios from "axios";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function NavbarFunction() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  console.log(email);

  const user = JSON.parse(localStorage.getItem("user"));
  const id = user[0].id;
  console.log(id);

  const logOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  var axios = require("axios");

  var config = {
    method: "get",
    url: `https://my-json-server.typicode.com/ArditQerimi/Kanban-app/userdata?userId=${id}`,
    headers: {},
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const getlogindata = () => {
        axios(config)
          .then(function (response) {
            setEmail(response.data[0].email);
            // console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      };
      navigate("/homepage");
      getlogindata();
    }
  }, []);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="https://sovisual.co/wp-content/uploads/2022/06/icon-color-1080-1024x1024.png"
              width="70"
              height="70"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  Hello{" "}
                  <a href="#login">

                    {email}
                  </a>
                </Navbar.Text>
              </Navbar.Collapse>
            </Nav.Link>
          </Nav>

          <Navbar.Toggle />
          <Navbar>
            <Button variant="danger" onClick={logOut}>
              Log out
            </Button>
          </Navbar>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarFunction;
