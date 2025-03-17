import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./db/database.js";
import authRoutes from "./routes/auth.route.js"
import cors from 'cors'
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config()

const app = express();
const PORT = process.env.PORT || 4000
const __dirname = path.resolve()

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))

app.use(express.json()) // allows us to parse incoming request: req.body
app.use(cookieParser())



app.use('/api/auth', authRoutes)

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "frontend/dist")))
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  })
}


connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
  })
  .catch((error) => {
    console.log("Database Connection Error: ", error)
  })