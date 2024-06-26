# Chess.com Clone

This project is a clone of the popular online chess platform, [Chess.com](https://www.chess.com), created using Node.js, Express.js, Socket.io, Chess.js, and EJS. It allows users to play real-time chess games with others over the web, with support for spectators.

## Live Demo

Check out the live demo: [chess-com-game.onrender.com](https://chess-com-game.onrender.com)

## Features

- **Real-time Gameplay**: Play chess with another player in real-time.
- **Player Roles**: The first connected player is assigned the white pieces, the second player is assigned the black pieces, and any additional connections become spectators.
- **Move Validation**: Utilizes Chess.js to validate moves and ensure the game follows standard chess rules.
- **Spectator Mode**: Users who join after two players are already connected can watch the game as spectators.
- **Responsive Design**: The chessboard is rendered using EJS templates and is styled to be responsive and visually appealing.

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend server.
- **Express.js**: Web framework for Node.js to handle routing and server logic.
- **Socket.io**: Library for real-time web applications, enabling real-time, bidirectional communication between web clients and servers.
- **Chess.js**: JavaScript library for chess move generation/validation, piece placement/movement, and check/checkmate/stalemate detection.
- **EJS (Embedded JavaScript)**: Templating engine to generate HTML markup with plain JavaScript.


