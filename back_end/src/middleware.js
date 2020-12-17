
//route not found
const notFound = (request, response, next) =>{
    const error = new Error(`These are not the routes you are looking for - ${request.originalUrl}` )
        response.status(404)
        next(error) // push it to the error middleware
    }

//error in response 
//disable lint because next is needed in to get correct path
//eslint-disable-next-line no-unused-vars
const errorHandler = (error, request, response, next) =>{
    const statusCode = response.statuscode === 200 ? 500 : response.statusCode
    response.status(statusCode)
    response.json({
      message: error.message,
      stack: process.env.NODE_ENV === 'PRODUCTION' ? 'This is the stacktrace' : error.stack
    })
}


//Export all modules
module.exports = {
    notFound,
    errorHandler
}
