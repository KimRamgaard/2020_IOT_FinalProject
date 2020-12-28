const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
//TODO might need to move
const http = require('http')
const https = require('https')
const fs = require('fs')
const mqtt = require('mqtt')


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
const { request } = require('express')
const { MongooseDocument } = require('mongoose')
dbConnection.connectToDb();

//TODO MQTT stuff to seperate module
const mqttClient = mqtt.connect('mqtts://kimramgaard.dk', {
  port: 8883,
  username: 'iotuser',
  password: 'iot2020'
})

if (mqttClient.connected) {
  console.log('connected to MQTT server')
}

//TODO HTTP might need to move to frontend
httpsKey = fs.readFileSync(process.env.PRIVATE_KEY_PATH)
httpsCert = fs.readFileSync(process.env.CERTIFICATE_PATH)

const httpServer = http.createServer(app)
const httpsServer = https.createServer({
  cert: httpsCert,
  key: httpsKey  
}, app)

//Socket.IO Init
const io = require('socket.io')(httpsServer)

//subscribe to all when connecting
mqttClient.on('connect', function(){
  mqttClient.subscribe('#', function(err){
    console.log(err)
  })
})

//on recieved message
mqttClient.on('message', function(topic, payload, packet){
  io.emit('mqttRecieveMessage', {topic: topic, message: payload.toString(), packet: packet.toString()})
  //TODO Save the message to db here, for now just consolelog
  console.log(`topic: [${topic}], payload: [${payload.toString()}], packet: [${packet.toString()}]`)
})

//middleware
app.use('/api/sensordata', sensorDataApi)

app.use(middleware.notFound)
app.use(middleware.errorHandler)

//if request is http redirect to https
//this should already happen from the server, but double safe is double good
app.use((request, response, next) => {
  if(request.secure){
    next();
  } else {
    response.redirect(`https://${request.headers.host}${request.url}`)
  }
})

httpServer.listen(process.env.HTTPPORT, () => {
  console.log(`app is listening with http on port ${process.env.HTTPPORT}`)
})

httpsServer.listen(process.env.HTTPSPORT, () => {
  console.log(`app is listening with http on port ${process.env.HTTPSPORT}`)
})

  /*
app.listen(process.env.App_Port, () => {
  console.log(`Example app listening at http://localhost:${process.env.App_Port}`)
})
*/