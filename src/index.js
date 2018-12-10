/* eslint no-console: 0 */

// Set environment variables in process.env
require('dotenv').config()
const { ApolloServer } = require('apollo-server-koa')
const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

// Create MongoDB connection
const { connect: connectMongo } = require('./config/database')

// Mongo models
const models = require('./models')

// Koa routes
const routes = require('./routes')

// GraphQL schema
const { typeDefs, resolvers } = require('./schema')

connectMongo()
const { APP_PORT } = process.env
const app = new Koa()
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ ctx }) => ctx,
})

// Set koa application in Apollo server
apolloServer.applyMiddleware({ app })

app.keys = ['This is a great key for koa']

// Models are available in ctx.models
app.context.models = models

app.use(bodyparser())
app.use(logger())
app.use(routes.routes())

app.on('error', (err, ctx) => {
  console.log('An error occurred!')
  console.log(`Error message: ${err}`)
  console.log('Context:')
  console.log(ctx)
})

app.listen(APP_PORT, () => {
  console.log(`Listening in port ${APP_PORT}`)
  console.log(`accepting queries in ${apolloServer.graphqlPath}`)
})
