import http from'http'
import express from 'express'
import bodyParser, { json } from 'body-parser'
import logging from './config/logging'
import config from './config/config'
import peopleRoutes from './routes/people'
const NAMESPACE = 'Server'
const router = express()

// logging the request
router.use((req,res, next)=>{
    logging.info(NAMESPACE,`METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`)

    res.on('finish', ()=>{
        logging.info(NAMESPACE,`METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`)
    })
    next()
})
// request parsing
router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())

//API rules
router.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Header','Origin, X-Requested-With, Content-Type, Accept, Authorization')

    if(req.method=='OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT')
        return res.status(200).json({})

    }
    next()
})
//routes
router.use('/people', peopleRoutes)

//error handling
router.use((req,res,next)=>{
    const error = new Error('not found')
    return res.status(404).json({
        message: error.message
    })
})
 //server
 const httpServer = http.createServer(router)
 httpServer.listen(config.server.port, ()=> logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`))