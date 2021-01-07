const { Router } = require('express')

const router = Router();
const sensorDataMdl = require('../models/SensorDataMdl')
const mqttClient = require('./../mqttClient')

router.post('/', async (request, response, next) =>{
  
  //Save to the database
  try {
    var SensorData = new sensorDataMdl({topic: request.body.topic,
                                        message: JSON.stringify(request.body.message)})
    const SensordataResult = await SensorData.save()
    response.json(SensordataResult);
  } catch (error) {
    next(error) //pass it on to the error handler 
  }

  //publish to MQTT server
  try {
    
    mqttClient.Client.publish(request.body.topic, JSON.stringify(request.body.message))
  } catch (error) {
    next(error)
  }
})

router.get('/', async(request, response, next) => {
  try {
    const entries = await sensorDataMdl.find()
    response.json(entries)
  } catch (error) {
    next(error);
  }
})

module.exports = router