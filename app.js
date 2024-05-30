const express = require("express");
const http = require("http");
const socket = require("socket.io");
const { Chess } = require("chess.js");
const path = require("path");

const app = express();

const server = http.createServer(app);
const io = socket(server);

let players = {};
let currentPlayer = "w";

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

// Create a new game instance for each connection
const createNewGame = () => {
  return new Chess();
};

let chess = createNewGame();

io.on("connection", (uniqueSocket) => {
  console.log("Connected");
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
      chess = createNewGame(); // Reset game if white disconnects
    } else if (players.black === uniqueSocket.id) {
      delete players.black;
      chess = createNewGame(); // Reset game if black disconnects
    }
  });

  uniqueSocket.on("move", (move) => {
    try {
      if (chess.turn() === "w" && uniqueSocket.id !== players.white) return;
      if (chess.turn() === "b" && uniqueSocket.id !== players.black) return;

      const result = chess.move(move);
      if (result) {
        currentPlayer = chess.turn();
        io.emit("move", move);
        io.emit("boardState", chess.fen());
      } else {
        console.log("Invalid Move: ", move);
        uniqueSocket.emit("InvalidMove", move);
      }
    } catch (error) {
      console.log(`Error Occurred: ${error}`);
      uniqueSocket.emit("InvalidMove", move);
    }
  });
});

server.listen(3000, () => {
  console.log("http://localhost:3000");
});
