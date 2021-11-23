require('dotenv').config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const sampleWordsRouter = require("./routes/sampleWordsRoutes")
const wordsRouter = require("./routes/wordsRoutes")
const usersRouter = require("./routes/usersRoutes")

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on("error", (err) => console.error(err))
db.once("open", () => console.log("Connected to Databse"))

app.use("/sampleWords", sampleWordsRouter)
app.use("/api/words", wordsRouter)
app.use("/users", usersRouter)


app.listen(5000, () => console.log("Server started"))