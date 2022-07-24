import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';
import { Navigate, useNavigate } from "react-router-dom";

function NavbarFunction({ email }) {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            {" "}
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
                  <a href="#login">{email ? email : "user@emailaddress.com"}</a>
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
