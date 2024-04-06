import AppError from "../utils/AppError.js"


export default ((err, req, res, next)=>{
    err.statusCode =  err.statusCode || 500
    err.status = err.status || 'error'

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res)
    }
    if (process.env.NODE_ENV === 'production') {
        let error = { ...err }
        if (err.name === 'CastError') error = handleCastErrorDB(error)

        if (error.code === 11000) {
            const value = Object.keys(error.keyValue)[0]
            const message = `Duplicate field value: ${value}. Please use another value`
            error = new AppError(message, 400)
        }

        if (error.name === 'ValidationError') {
            const message = Object.values(err.errors).map(el => el.message).join('. ')
            error = new AppError(message, 400)
        }

        sendErrorProd(error, res)
    }
})


const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`
    return new AppError(message, 400)
}

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack
    })
}

const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    } else {
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong'
        })
    }
}