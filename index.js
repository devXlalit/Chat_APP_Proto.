import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve("./")));
app.get("/", (req, res) => {
  res.sendFile("./index.html");
});

io.on("connection", (socket) => {
  // console.log("New user connected", socket.id);

  socket.on("chat message", (msg, roomId) => {
    if (roomId == "") {
      io.emit("chat message", msg, socket.id);
    } else {
      socket.to(roomId).emit("chat message", msg);
    }
  });
});

server.listen(3001, () => {
  console.log("listening on *:3001");
});
