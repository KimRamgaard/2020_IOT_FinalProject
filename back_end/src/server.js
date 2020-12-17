const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')

const middleware = require('./middleware')
const app = express()

app.use(morgan('common'))
app.use(helmet())
app.use(cors({
  origin: process.env.CORS_ORIGIN //will only accept requests from this local webaddress
}))

// setup the configuation variables
var env = require('dotenv')
env.config()

//Connect to database
var dbConnection = require("./dbconnection")
dbConnection.connectToDb();

app.get('/', (req, res) => {
  res.json({
    message: 'Hello world'
  })
})

//middleware
app.use(middleware.notFound)
app.use(middleware.errorHandler)



app.listen(process.env.App_Port, () => {
  console.log(`Example app listening at http://localhost:${process.env.App_Port}`)
})