/* eslint no-console: 0 */
const mongoose = require('mongoose')

const connect = async () => {
  const { MONGO_HOST, MONGO_PORT, MONGO_NAME } = process.env
  const dbUrl = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}`

  await mongoose.connect(dbUrl, {
    useNewUrlParser: true,
  })

  const conn = mongoose.connection

  conn.on('connected', () => {
    console.log('Mongoose connected correctly')
  })

  conn.on('error', err => {
    console.log(`Mongoose error: ${err}`)
  })

  conn.on('disconnected', () => {
    console.log('Mongoose disconnected')
  })

  process.on('SIGINT', () => {
    conn.close(() => {
      console.log('Mongoose connection closed through app termination')
      process.exit(0)
    })
  })

  return conn
}

const clearCollections = async (models) => {
  await Object.keys(models).forEach(async model => {
    await models[model].deleteMany({})
  })
}

const disconnect = async () => {
  await mongoose.connections.forEach(async conn => conn.close())
  await mongoose.disconnect()
}

module.exports = {
  connect,
  clearCollections,
  disconnect,
}
