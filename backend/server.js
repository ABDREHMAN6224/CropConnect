import dotenv from "dotenv"
import express from "express"
import bodyParser from "body-parser";
import cors from "cors"
import { fileURLToPath } from "url";
import path from "path";
import authRoutes from "./routes/auth.js";
import storyRoutes from "./routes/storyRoutes.js";
import connection from "./connection/connection.js";
import {Server} from "socket.io";
import { deleteMessage, sendMessage } from "./controllers/messageController.js";

dotenv.config()
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public/")))


app.use("/api/auth", authRoutes)
app.use("/api/stories", storyRoutes)

connection()
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})

// Socket setup for chat

const io = new Server(server, {
    cors: {
        origin: "*",
    }

    
});

const usersToSocket = new Map();
const onlineUsers = new Map();

io.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("disconnect", () => {
        onlineUsers.delete(socket.id);
        console.log("Client disconnected");
    });

    socket.on("join:room", (data) => {
        // room = chatId
        socket.join(data.room);
        usersToSocket.set(data.user, socket.id);
        onlineUsers.set(data.user, data.user);
        socket.to(data.room).emit("user:joined", data.user);
    })
    socket.on("leave:room", (data) => {
        socket.leave(data.room);
        onlineUsers.delete(data.user);
        socket.to(data.room).emit("user:left", data.user);
    })
    socket.on("send:message",async (data) => {
        // data: {
        //     sender: sender,
        //     group: group,
        //     content: content,
        //     type: type
        // }
        const recievers = data.group.users.filter(user => user !== data.sender);
        recievers.forEach(receiver => {
            const receiverSocket = usersToSocket.get(receiver);
            if (receiverSocket) {
                socket.to(receiverSocket).emit("new:message", data);
                sendMessage(data);
            }
        })
        
    })
    socket.on("get:onlineUsers", () => {
        socket.emit("onlineUsers", Array.from(onlineUsers.values()));
    })
    socket.on("get:socketId", (user) => {
        socket.emit("socketId", usersToSocket.get(user));
    })
    socket.on("typing", (data) => {
        const receiverSocket = usersToSocket.get(data.receiver);
        if (receiverSocket) {
            socket.to(receiverSocket).emit("typing", data);
        }
    })
    socket.on("stopTyping", (data) => {
        const receiverSocket = usersToSocket.get(data.receiver);
        if (receiverSocket) {
            socket.to(receiverSocket).emit("stopTyping", data);
        }
    })
    socket.on("message:seen", (data) => {
        socket.to(data.room).emit("message:seen", data);
    })
    socket.on("message:deleted", (data) => {
        socket.to(data.room).emit("message:deleted", data);
        deleteMessage(data._id);
    })

});

