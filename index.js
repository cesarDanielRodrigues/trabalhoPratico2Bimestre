const express = require("express")
const mongoose = require("mongoose")
const server = express()


const produtoRoutes = require('./routes/produtoRoutes')

//Middleware
server.use(
  express.urlencoded({
    extended: true,
  })
)

server.use(express.json())

server.use('/produto', produtoRoutes)

const DB_USER = "cesar"
const DB_PASSWORD = encodeURIComponent("KDG52iaebVAEEo2E")

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.4gttqrq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log("Conectado ao MongoDB!")
  })

server.listen(3000)
