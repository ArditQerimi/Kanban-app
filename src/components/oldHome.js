// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import Cards from "./Cards";
// import Navbar from "./Navbar";

// const Home = ({ token }) => {
//   const [cards, setCards] = useState([]);

//   const data = async () => {
//     const url = "https://my-json-server.typicode.com/ArditQerimi/Kanban-app/db";
//     await axios.get(url).then((response) => {
//       setCards(response.data.tasks);
//     });
//   };

//   useEffect(() => {
//     data();
//   }, []);

//   return (
//     <div>
//       <Navbar token={token} />
//       {/* {cards.length > 0 && ( */}
//       <Cards cardsArr={cards} setCards={setCards} />
//       {/* )} */}
//     </div>
//   );
// };

// export default Home;
