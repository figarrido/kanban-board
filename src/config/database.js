/* eslint no-console: 0 */
const mongoose = require('mongoose')

const { MONGO_HOST, MONGO_PORT, MONGO_NAME } = process.env

const dbUrl = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}`
console.log(dbUrl)
mongoose.connect(dbUrl, {
  useNewUrlParser: true
})

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected correctly')
})

mongoose.connection.on('error', err => {
  console.log(`Mongoose error: ${err}`)
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected')
})

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection closed through app termination')
    process.exit(0)
  })
})
