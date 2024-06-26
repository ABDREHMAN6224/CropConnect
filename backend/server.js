import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import path from "path";


import authRoutes from "./routes/auth.js";
import storyRoutes from "./routes/storyRoutes.js";
import connection from "./connection/connection.js";
import eventRoutes from "./routes/event.js";
import messageRoutes from "./routes/message.js";
import marketPlaceRoutes from "./routes/marketplace.js";
import chatRoutes from "./routes/chat.js";
import resourcesRoutes from "./routes/resources.js";
import reviewRoutes from "./routes/review.js";
import orderRoutes from "./routes/order.js";
import feedbackRoutes from "./routes/feedback.js";
import notificationRoutes from "./routes/notification.js";
import annoucementRoutes from "./routes/announcement.js";



import AppError from "./utils/AppError.js";
import errorController from "./controllers/errorController.js";


dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public/")));
app.use(cors());

app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use("/messages", messageRoutes);
app.use("/marketplace", marketPlaceRoutes);
app.use("/stories", storyRoutes);
app.use("/chats", chatRoutes);
app.use("/resources", resourcesRoutes);
app.use("/reviews", reviewRoutes);
app.use("/orders", orderRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/notification", notificationRoutes);
app.use("/announcement", annoucementRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(errorController);

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.log(err.name, err.message);

  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

connection();
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});

// Socket setup for chat

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const usersToChatRooms = new Map();
const onlineUsers = new Map();

io.on("connection", (socket) => {
  socket.on("setup", (user) => {
    socket.emit("connected");
    socket.join(user._id);
    socket.id = user._id;
    onlineUsers.set(user._id, user);
    console.log("user connected", user._id);
    socket.emit("onlineUsers", Array.from(onlineUsers.values()));
  });

  socket.on("disconnect", () => {
    socket.emit("disconnected", socket.id);
    onlineUsers.delete(socket.id);
    usersToChatRooms.delete(socket.id);
    socket.emit("onlineUsers", Array.from(onlineUsers.values()));
  });

 socket.on("join:room",({room,user})=>{
    socket.join(room);
    usersToChatRooms.set(user,room);
    console.log(`${user} joined ${room}`);
 })

 socket.on("send:message",(data)=>{
  const {chat,sender}=data;
  chat.members.forEach(member=>{
    if(member!==sender){
      if(typeof member==="object"){
        member=member._id;
      }
      socket.to(member).emit("receive:message",data);
      if(usersToChatRooms.get(member)===chat._id){
      }else{
        console.log("sending notification to ",member)
        socket.to(member).emit("notification:chat",data);
      }
      
    }
  })
 })

 socket.on("chat:created",({chat,userId})=>{
    chat.members.forEach(member=>{
      if(member!==userId){
        if(typeof member==="object"){
          member=member._id;
        }
        socket.to(member).emit("chat:created",chat);
      }
    })
 })
socket.on("notification:general",(data)=>{
  socket.broadcast.emit("notification:general",data);
})
 socket.on("chat:removed",({chat,user})=>{
  socket.to(user).emit("chat:removed",{chat});
 })
 socket.on("chat:added",({user})=>{
  socket.to(user).emit("chat:added");
 })

 socket.on("stream:join",({room,user})=>{
   socket.join(room);
   socket.to(room).emit("stream:joined",user);
 })

 socket.on("stream:send",({room,...data})=>{
   socket.to(room).emit("stream:received",{...data});
  })
  socket.on("stream:answer",({user,room,...data})=>{
    socket.to(room).emit("stream:answered",{...data});
  })

});
