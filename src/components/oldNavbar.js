// import axios from "axios";
// import Container from "react-bootstrap/Container";
// import Navbar from "react-bootstrap/Navbar";
// import Nav from "react-bootstrap/Nav";
// import Button from "react-bootstrap/Button";
// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";

// function NavbarFunction() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");

//   const logOut = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   var data = "";

//   var config = {
//     method: "get",
//     url: "http://homework.tachyonstudio.com/api/user",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
//     },
//     data: data,
//   };

//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       const getlogindata = () => {
//         axios(config)
//           .then(function (response) {
//             setEmail(response.data.email);
//             // console.log(response.data);
//           })
//           .catch(function (error) {
//             console.log(error);
//           });
//       };
//       navigate("/homepage");
//       getlogindata();
//     }
//   }, []);

//   return (
//     <>
//       <Navbar bg="dark" variant="dark">
//         <Container>
//           <Navbar.Brand href="#home">
//             <img
//               src="https://sovisual.co/wp-content/uploads/2022/06/icon-color-1080-1024x1024.png"
//               width="70"
//               height="70"
//               className="d-inline-block align-top"
//               alt="React Bootstrap logo"
//             />
//           </Navbar.Brand>
//           <Nav className="me-auto">
//             <Nav.Link href="#home">
//               <Navbar.Collapse className="justify-content-end">
//                 <Navbar.Text>
//                   Hello <a href="#login">{email ? email : ""}</a>
//                 </Navbar.Text>
//               </Navbar.Collapse>
//             </Nav.Link>
//           </Nav>

//           <Navbar.Toggle />
//           <Navbar>
//             <Button variant="danger" onClick={logOut}>
//               Log out
//             </Button>
//           </Navbar>
//         </Container>
//       </Navbar>
//     </>
//   );
// }

// export default NavbarFunction;
