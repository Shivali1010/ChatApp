const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.use(express.static("./public"));

io.on("connection", (socket) => {
    // console.log("New user connected");
    socket.on("message", (receivedMsg) => {
        socket.broadcast.emit("message", receivedMsg);
    });
});

httpServer.listen(3000, () => {
    console.log("Server listening on port 3000");
});