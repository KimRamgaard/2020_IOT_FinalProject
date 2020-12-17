const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const app = express()

app.use(morgan('common'))
app.use(helmet())
app.use(cors({
  origin: 'http://localhost:3000' //will only accept requests from this local webaddress
}))

// setup the configuation variables
var env = require('dotenv')
env.config()

//Connect to database
var dbConnection = require("../database/connection")
dbConnection.connectToDb();

//TODO move middleware/routes to seperate export
app.get('/', (req, res) => {
  res.json({
    message: 'Hello world'
  })
})

//route not found
app.use((request, response, next) =>{
const error = new Error(`These are not the routes you are looking for - ${request.originalUrl}` )
  response.status(404)
  next(error) // push it to the error middleware
})

//error in response 
//disable lint because next is needed in to get correct path
//eslint-disable-next-line no-unused-vars
app.use((error, request, response, next) =>{
  const statusCode = response.statuscode === 200 ? 500 : response.statusCode
  response.status(statusCode)
  response.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'PRODUCTION' ? ':smile:' : error.stack
  })
})



app.listen(process.env.App_Port, () => {
  console.log(`Example app listening at http://localhost:${process.env.App_Port}`)
})