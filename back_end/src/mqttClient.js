const mqtt = require('mqtt')

//TODO MQTT stuff to seperate module
const mqttClient = mqtt.connect(process.env.MQTT_SERVER_PATH, {
  port: process.env.MQTT_PORT,
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD
})

//subscribe to all when connecting
mqttClient.on('connect', function(){
    console.log('Succesfully connected to mosquitto client')
    mqttClient.subscribe('test', function(err){
    if (err){
        console.log(err)
    } else {
        console.log('server subbed to all topics')
    }
  })
})

mqttClient.on('message', function(topic, payload, packet){
  console.log(`topic:${topic}, payload:${payload}, packet${packet}`)
})

mqttClient.on('error', function(err){
    console.log(err)
})
