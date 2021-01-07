const mqtt = require('mqtt')

exports.Client =  Client = mqtt.connect(process.env.MQTT_SERVER_PATH, {
  port: process.env.MQTT_PORT,
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD
})

//subscribe to all when connecting
Client.on('connect', function(){
    console.log('Succesfully connected to mosquitto client')
    Client.subscribe('test', function(err){
    if (err){
        console.log(err)
    } else {
        console.log('server subbed to all topics')
    }
  })
})

Client.on('message', function(topic, payload, packet){
  console.log(`topic:${topic}, payload:${payload}, packet${packet}`)
})

Client.on('error', function(err){
    console.log(err)
})

/*
function publishData(topic, message){
  Client.publish(topic,message, function(err,packet) {
    if (err)
      console.log(err);
    console.log(packet)
  })
}

publishData
*/
