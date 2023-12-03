const express = require("express");
const app = express();
const http = require("http"); // socket.io는 http 서버에서 생성되므로..
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected : ${socket.id}`);

  socket.on("join_room", (data) => {
    console.log("join room server start");
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data);
  });
});

const port = 4000;

server.listen(port, () => {
  console.log(`server is running on ${port}!`);
});
