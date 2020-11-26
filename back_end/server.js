const express = require('express')
const app = express()

// setup the configuation variables
var env = require('dotenv')
env.config()

//Connect to database
var dbConnection = require("./database/connection")
dbConnection.connectToDb();


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.App_Port, () => {
  console.log(`Example app listening at http://localhost:${process.env.App_Port}`)
})