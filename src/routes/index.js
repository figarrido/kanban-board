const Router = require('koa-router')
const routesPath = require('path').join(__dirname) // eslint-disable-line

const mainRouter = new Router()

require('fs').readdirSync(routesPath).forEach(filename => {
  const routeFileName = filename.split('.')[0]
  if (routeFileName !== 'index') {
    const route = require(`./${routeFileName}`)
    mainRouter.use(route.routes())
  }
})

module.exports = mainRouter
