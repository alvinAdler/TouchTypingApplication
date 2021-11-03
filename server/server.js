require('dotenv').config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection

db.on("error", (err) => console.error(err))
db.once("open", () => console.log("Connected to Databse"))

const sampleWordsRouter = require("./routes/sampleWordsRoutes")
app.use("/sampleWords", sampleWordsRouter)


app.listen(5000, () => console.log("Server started"))