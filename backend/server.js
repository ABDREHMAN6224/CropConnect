import dotenv from "dotenv"
import express from "express"
import bodyParser from "body-parser";
import cors from "cors"
import { fileURLToPath } from "url";
import path from "path";


dotenv.config()
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express();
app.use(cors({
    origin:["https://archats-arm.netlify.app","http://localhost:5173"],
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public/")))