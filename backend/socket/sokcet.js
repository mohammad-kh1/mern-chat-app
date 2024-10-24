import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

export const getReceiverSocketId = (receiverId) => {
  return usersSocketMap[receiverId];
};

const usersSocketMap = {};

io.on("connection", (socket) => {
  console.log(socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") {
    usersSocketMap[userId] = socket.id;
  }
  //send event to all clients connected clients
  io.emit("getOnlineUsers", Object.keys(usersSocketMap));
  socket.on("disconnect", () => {
    console.log("dis ", socket.io);
    delete usersSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(usersSocketMap));
  });
});

export { app, io, server };
