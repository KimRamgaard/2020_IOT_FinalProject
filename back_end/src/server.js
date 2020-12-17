const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')

const middleware = require('./middleware')
const sensorDataApi = require('./api/sensorData')
const app = express()

// setup the configuation variables
const dotEnvResult = require('dotenv').config({ path: (__dirname + "/.env") })
if (dotEnvResult.error) {
  throw dotEnvResult.error
}

app.use(morgan('common'))
app.use(helmet())
app.use(express.json()) //bodyparser
app.use(cors({
  origin: process.env.CORS_ORIGIN //will only accept requests from this local webaddress
}))

//Connect to database
var dbConnection = require("./dbconnection")
dbConnection.connectToDb();

//middleware
app.use('/api/sensordata', sensorDataApi)

app.use(middleware.notFound)
app.use(middleware.errorHandler)

app.listen(process.env.App_Port, () => {
  console.log(`Example app listening at http://localhost:${process.env.App_Port}`)
})