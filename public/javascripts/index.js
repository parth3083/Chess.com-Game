const socket = io();
socket.emit("parth");
socket.on("darshan", () => {
    console.log("received mesaage from darshan");
});