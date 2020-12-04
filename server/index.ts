export {}
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const chalk = require('chalk')
const debug = require('debug')('server')
const workoutModel = require('./src/models/workoutModel')
const workoutRouter = require('./src/routes/workoutRouter')(workoutModel)
const scheduleModel = require('./src/models/scheduleModel')
const scheduleRouter = require('./src/routes/scheduleRouter')(scheduleModel)
const userModel = require('./src/models/userModel')
const userRouter = require('./src/routes/scheduleRouter')(userModel)

const server = express()
const port = process.env.PORT || 2130
const dbUrl = process.env.DBURL || 'mongodb+srv://Jheavi:GymAppSkylab@gymapp.yu4va.mongodb.net/gymappdb?retryWrites=true&w=majority'

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })

server.use(morgan('dev'))

server.use(cors())

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

server.use('/workouts', workoutRouter)
server.use('/schedules', scheduleRouter)
server.use('/users', userRouter)

server.listen(port, () => {
  debug(`Server listening on port ${chalk.blueBright(port)}...`)
})
