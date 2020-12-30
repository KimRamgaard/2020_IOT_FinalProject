// setup the configuation variables
const dotEnvResult = require('dotenv').config({ path: (__dirname + "/.env") })
if (dotEnvResult.error) {
  throw dotEnvResult.error
}

//imports
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')

//Custom modules
require('./mqttClient')
const middleware = require('./middleware')
const sensorDataApi = require('./api/sensorData')
const app = express()

//setup express
app.use(morgan('common'))
app.use(helmet())
app.use(express.json()) //bodyparser
app.use(cors({
  origin: process.env.CORS_ORIGIN //will only accept requests from this local webaddress
}))

//Connect to database
var dbConnection = require("./dbconnection")
const { request } = require('express')
const { MongooseDocument } = require('mongoose')
dbConnection.connectToDb();

//middleware
app.use('/sensordata', sensorDataApi)

app.use(middleware.notFound)
app.use(middleware.errorHandler)

app.listen(process.env.APP_PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.APP_PORT}`)
})

