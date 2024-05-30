// const express = require("express");
// const http = require("http");
// const socket = require("socket.io");
// const { Chess } = require("chess.js");
// const path = require("path");

// const app = express();

// const server = http.createServer(app);
// const io = socket(server);

// const chess = new Chess();

// let players = {};
// let currentPlayer = "w";
// app.set("view engine", "ejs");
// app.use(express.static(path.join(__dirname, "public")));



// app.get("/", (req, res) => {
//   res.render("index");
// });
// //CONNECTION DONE TO FRONTEND USING THE SOCKET IO
// io.on("connection", function (uniqueSocket) {
//   console.log("Connected");
//   //ASSIGNING THE FIRST PLAYER WHITE AND SECOND PLAYER BLACK AND THIRD PLAYER SPECTATOR
//   if (!players.white) {
//     players.white = uniqueSocket.id;
//     uniqueSocket.emit("playerRole", "w");
//   } else if (!players.black) {
//     players.black = uniqueSocket.id;
//     uniqueSocket.emit("playerRole", "b");
//   } else {
//     uniqueSocket.emit("spectatorRole");
//   }
//   //CHECKING FOR THE DISCONNECTION FOR ALL WHITE, BLACK AND SPECTATOR
//   uniqueSocket.on("disconnect", () => {
//     if (players.white === uniqueSocket.id) {
//       delete players.white;
//     } else if (players.black === uniqueSocket.id) {
//       delete players.black;
//     }
//   });
//   // CHECKING THE MOVE AND THE PLAYERS TURN SIMONTANEOUSLY
//   uniqueSocket.on("move", (move) => {
//     try {
//       if (chess.turn() === "w" && uniqueSocket.id !== players.white) return;
//       if (chess.turn() === "b" && uniqueSocket.id !== players.black) return;

//       const result = chess.move(move);
//       if (result) {
//         currentPlayer = chess.turn();
//         io.emit("move", move);
//         io.emit("boardState", chess.fen());
//       } else {
//         console.log("Invalid Move: ", move);
//         uniqueSocket.emit("InvalidMove", move);
//       }
//     } catch (error) {
//       console.log(`Error Occured: ${error}`);
//       uniqueSocket.emit("InvalidMove", move);
//     }
//   });
// });

// server.listen(3000, () => {
//   console.log("http://localhost:3000");
// });
const express = require("express");
const http = require("http");
const socket = require("socket.io");
const { Chess } = require("chess.js");
const path = require("path");

const app = express();

const server = http.createServer(app);
const io = socket(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

let players = {};
let games = {};

app.get("/", (req, res) => {
  res.render("index");
});

io.on("connection", (uniqueSocket) => {
  console.log("Connected");

 
  const chess = new Chess();


  if (!players.white) {
    players.white = uniqueSocket.id;
    uniqueSocket.emit("playerRole", "w");
  } else if (!players.black) {
    players.black = uniqueSocket.id;
    uniqueSocket.emit("playerRole", "b");
  } else {
    uniqueSocket.emit("spectatorRole");
  }

 
  uniqueSocket.on("disconnect", () => {
    if (players.white === uniqueSocket.id) {
      delete players.white;
    } else if (players.black === uniqueSocket.id) {
      delete players.black;
    }
  });


  uniqueSocket.on("move", (move) => {
    try {
      if (chess.turn() === "w" && uniqueSocket.id !== players.white) return;
      if (chess.turn() === "b" && uniqueSocket.id !== players.black) return;

      const result = chess.move(move);
      if (result) {
        io.emit("move", move);
        io.emit("boardState", chess.fen());
      } else {
        uniqueSocket.emit("InvalidMove", move);
      }
    } catch (error) {
      console.log(`Error Occured: ${error}`);
      uniqueSocket.emit("InvalidMove", move);
    }
  });


  uniqueSocket.emit("boardState", chess.fen());
});

server.listen(3000, () => {
  console.log("http://localhost:3000");
});