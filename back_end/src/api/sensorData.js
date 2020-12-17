const { Router } = require('express')

const router = Router();
const sensorDataMdl = require('../models/SensorDataMdl')

router.post('/', async (request, response, next) =>{
  try {
    var SensorData = new sensorDataMdl(request.body)
    const SensordataResult = await SensorData.save()
    response.json(SensordataResult);
  } catch (error) {
    next(error) //pass it on to the error handler 
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