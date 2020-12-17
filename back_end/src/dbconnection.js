var mongoose = require('mongoose')

exports.connectToDb = function(){
    mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true}, err => {
        if (err){
            console.log('connecting to database gave following error: ' + err)
        }else{
            console.log('connection to database established')
        }
        
    });
}
