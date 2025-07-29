import compression from 'compression'
import express from 'express'
import { apply } from 'vike-server/express'
import { serve } from 'vike-server/express/serve'

const isProduction = process.env.NODE_ENV === 'production'

async function startServer() {
  const app = express()

  app.set('trust proxy', true)

  app.use(compression())

  console.log('Starting server in mode: ', isProduction ? 'production' : 'development')

  const port = Number(process.env.PORT) || 3000
  apply(app)
  return serve(app, {
    // options
    port: port,
  })
}

startServer()
