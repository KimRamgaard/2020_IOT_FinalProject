//Mongoose schema for sensordata
const mongoose = require( 'mongoose' )


//Define schema
const schema =  mongoose.Schema


const SensorDataSchema = new schema({
    topic: {
        type: String, 
        required: true
    },
    message: String
}, {
    timestamps: true //adds timestamps (Created at, Modified at)
})

//create and export model from schema

const SensorDataModel = mongoose.model('SensorData', SensorDataSchema)
module.exports = SensorDataModel

