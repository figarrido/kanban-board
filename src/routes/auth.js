const Router = require('koa-router')

const authRouter = new Router()

authRouter.post('log-in', '/login', async ctx => {
  ctx.body = 'It is time to login'
})

module.exports = authRouter
