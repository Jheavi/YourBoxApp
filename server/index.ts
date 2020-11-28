const express = require('express')
const debug = require('debug')('server')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const chalk = require('chalk')

const server = express()
const port = process.env.PORT || 2130

server.use(morgan('dev'))

server.use(cors())

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

server.listen(port, () => {
  debug(`Server listening on port ${chalk.blueBright(port)}...`)
})
